<template>
   <v-container fluid>
  <v-card class="ma-3">
    <v-row class="mt-5 ml-5 mr-5 mb-3">
        <v-col cols="12" md="12">
          <v-row>
              <v-toolbar-title class="text-h6 mt-4">Setting Authorize : </v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-col cols="12"  md="6">
                <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        hide-details
        outlined
        dense
      ></v-text-field>
      </v-col>
          </v-row>
        </v-col>
      </v-row>

    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <!-- <v-toolbar-title>List Data</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider> -->
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="#254e58"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                :disabled="!authorize_add"
              >
                + Authorize
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                      autofocus
                        v-model="editedItem.sgm_name"
                        label="Setting Group Menu Name"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
          v-if="authorize_edit"
          :style="{
            backgroundColor: '#E1F5FE',
            color: '#2196F3',
          }"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
          v-if="authorize_del"
          :style="{
            backgroundColor: '#FFEBEE',
            color: '#F44336',
          }"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="#254e58" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>
    <SuccessDialog
      :status="dialogAdd"
      :text_color="text_color"
      :title="title"
      :message="message"
    />
  </v-card>
</v-container>
</template>

<script>
import SuccessDialog from "@/components/cards/SuccessDialog";
import api from "@/services/api";
import { server } from "@/services/constants";
export default {
  name: "setting-group-menu",
  data: () => ({
    dialog: false,
    search: "",
    dialogDelete: false,
    dialogEdit: false,
    dialogAdd: false,
    text_color: "text-h5 green--text text-center",
    title: "green",
    message: "green",
    headers: [
      {
        text: "ID",
        align: "start",
        value: "id",
      },
      { text: "Name", value: "sgm_name" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      sgm_name: "",
      user_create: 0,
      user_update: 0,
    },
    editedItem2: {
      sgm_name: "",
      user_update: 0,
    },
    edit_item_id: 0,
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    setting_menu_detail: {
      setting_group_menu_id: 0,
      group_menu_id: 0,
      menu_detail_id: 0,
      user_create: 0,
    },
    fullPage: true,
    checkDataLoop: false,
    mArrayInsertMenuDetail: [],
    authorize_view: false,
    authorize_add: false,
    authorize_edit: false,
    authorize_del: false,
    authorize_id: 0,
  }),
  components: {
    SuccessDialog,
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  async mounted() {
    // this.$showLoader();
    this.$hideLoader();
    // ----------------- Check Authorize ---------------------------
    const userId = localStorage.getItem(server.USER_ID);
    let yourUrlString = window.location;
    // alert(yourUrlString);

    let parser = document.createElement("a");
    parser.href = yourUrlString;

    this.authorize_id = localStorage.getItem(server.AUTHORIZE_ID);
    // alert("authorize_id:" + this.authorize_id);
    if (this.authorize_id == null || this.authorize_id == 0) {
      // this.$router.push("/login");
      this.$store.state.global_dialog = true;
      this.setupAlertDialog(
        true,
        "Authorize Failed!!!",
        "Please Logout And Login Again!!!",
        "text-h5 red--text text-center"
      );
      this.$router.back();
    }

    const router_path = parser.pathname.replace("/", "");

    const res_auth = await api.getAuthorize(userId, router_path);

    // console.log("res_auth:" + JSON.stringify(res_auth.data));

    this.authorize_view = res_auth.data[0].smd_view >= 1 ? true : false;
    this.authorize_add = res_auth.data[0].smd_add >= 1 ? true : false;
    this.authorize_edit = res_auth.data[0].smd_edit >= 1 ? true : false;
    this.authorize_del = res_auth.data[0].smd_del >= 1 ? true : false;

    // console.log("res_auth:" + JSON.stringify(res_auth.data));
    // console.log("authorize_view:" + this.authorize_view);
    // console.log("authorize_add:" + this.authorize_add);
    // console.log("authorize_edit:" + this.authorize_edit);
    // console.log("authorize_del:" + this.authorize_del);
    // this.$router.back();

    if (!this.authorize_view) {
      this.$router.back();
    }

    // ----------------- Check Authorize ---------------------------

    await this.deleteMenuCache();
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  async created() {
    await this.initialize();
  },

  methods: {
    async deleteMenuCache() {
      this.$showLoader();
      await api.deleteMenuCacheSettingGroupMenu();
      this.$hideLoader();
    },
    async initialize() {
      let loader = this.$loading.show({
        // Optional parameters
        color: "green",
        loader: "dots",
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
        width: 120,
        height: 120,
        backgroundColor: "#ffffff",
        opacity: 0.5,
        zIndex: 999,
        onCancel: this.onCancel,
      });

      //   alert("initialize");
      const res_get = await api.getSettingGroupMenu();
      this.desserts = res_get.data;
      loader.hide();
      //   console.log("initialize desserts: " + JSON.stringify(res_get.data));
    },

    async editItem(item) {
      let loader = this.$loading.show({
        // Optional parameters
        color: "green",
        loader: "dots",
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
        width: 120,
        height: 120,
        backgroundColor: "#ffffff",
        opacity: 0.5,
        zIndex: 999,
        onCancel: this.onCancel,
      });

      this.edit_item_id = item.id;
      //   this.editedIndex = this.desserts.indexOf(item);
      //   this.editedItem = Object.assign({}, item);
      //   this.dialog = true;
      // Go To Setting Menu Detail

      const res_main_for_check = await api.getMenuDetail();
      // console.log(
      //   "editItem res_main_for_check: " +
      //     JSON.stringify(res_main_for_check.data.count)
      // );

      const res_check = await api.getSMD_ById(item.id);
      // console.log(
      //   "editItem res_check: " + JSON.stringify(res_check.data.count)
      // );
      // console.log("editItem res_check: " + JSON.stringify(res_check.data.rows));

      if (res_check.data.count < res_main_for_check.data.count) {
        // alert("0");
        // console.log(
        //   "editItem res_main_for_check: " +
        //     JSON.stringify(res_main_for_check.data.rows)
        // );
        this.setting_menu_detail.user_create = localStorage.getItem(
          server.USER_ID
        );

        this.mArrayInsertMenuDetail = res_main_for_check.data.rows;

        // Start Loop Check Data
        for (let i = 0; i < res_main_for_check.data.count; i++) {
          this.checkDataLoop = false;
          console.log("Loop Data: " + this.mArrayInsertMenuDetail[i].id);
          this.setting_menu_detail.setting_group_menu_id = item.id;
          this.setting_menu_detail.group_menu_id = this.mArrayInsertMenuDetail[
            i
          ].group_menu_id;
          this.setting_menu_detail.menu_detail_id = this.mArrayInsertMenuDetail[
            i
          ].id;

          for (let i = 0; i < res_check.data.count; i++) {
            // console.log(
            //   "Sub Loop Data menu_detail_id: " +
            //     this.setting_menu_detail.menu_detail_id +
            //     " compare id :" +
            //     res_check.data.rows[i].menu_detail_id
            // );
            if (
              this.setting_menu_detail.menu_detail_id ==
              res_check.data.rows[i].menu_detail_id
            ) {
              // console.log("Sub Loop Data True");
              this.checkDataLoop = true;
            }
            if (this.checkDataLoop == true) {
              break;
            }
          }

          // console.log("Sub Loop Data End");
          // console.log("Sub Loop checkDataLoop :" + this.checkDataLoop);
          if (this.checkDataLoop == false) {
            const res_add_stdt = await api.createSettingMenuDetail(
              this.setting_menu_detail
            );
            // console.log("Loop Data " + i + ":" + res_add_stdt.status);
          }
        }
        // End Loop Check Data
        loader.hide();
        this.$router.push(`/setting-menu-detail/${item.id}`);
      } else {
        loader.hide();
        this.$router.push(`/setting-menu-detail/${item.id}`);
      }
    },

    deleteItem(item) {
      this.edit_item_id = item.id;
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      const res_del = await api.deleteSettingGroupMenu(this.edit_item_id);
      if (res_del.status == 200) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Delete data success",
          "text-h5 green--text text-center"
        );
        this.initialize();
      } else {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Delete data Failed",
          "text-h5 red--text text-center"
        );
      }
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        // Go To Setting Menu Detail
      } else {
        // alert("create");
        this.editedItem.user_create = localStorage.getItem(server.USER_ID);
        const res_add = await api.createSettingGroupMenu(this.editedItem);
        if (res_add.status == 200) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Success!!!",
            "Add data success",
            "text-h5 green--text text-center"
          );
          this.initialize();
        } else {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Add data Failed",
            "text-h5 red--text text-center"
          );
        }
      }

      this.close();
    },
    setupAlertDialog(status, title, message, text_color) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
    },
  },
  beforeCreate() {
    this.$store.state.navMenu = true;
  },
};
</script>

<style></style>
