<template>
  <v-container fluid>
  <v-card class="ma-3">
    <v-row class="mt-5 ml-5 mr-5 mb-3">
        <v-col cols="12" md="12">
          <v-row>
              <v-toolbar-title class="text-h6 mt-4">Group Menu : </v-toolbar-title>
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
                + Group Menu
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
                        v-model="editedItem.cgm_name"
                        label="Group Menu Name"
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
  name: "group-menu",
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
      { text: "Name", value: "cgm_name" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      cgm_name: "",
      user_create: 0,
      user_update: 0,
    },
    editedItem2: {
      cgm_name: "",
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
    fullPage: true,
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
    // ----------------- Check Authorize ---------------------------
    const userId = localStorage.getItem(server.USER_ID);
    let yourUrlString = window.location;
    // alert(yourUrlString);

    let parser = document.createElement("a");
    parser.href = yourUrlString;
    // alert(yourUrlString);
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
    // alert(router_path);
    const res_auth = await api.getAuthorize(userId, router_path);

    console.log("res_auth:" + JSON.stringify(res_auth.data));

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

    // const userId = localStorage.getItem(server.USER_ID);
    if (userId && api.isLoggedIn()) {
      // this.$router.push("/");
    } else {
      this.$store.state.isLogged = false;
      this.$router.push("/login");
    }
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
    async initialize() {
      //   alert("initialize");
      const res_get = await api.getGroupMenu();
      this.desserts = res_get.data;
      // this.$showLoader();
      this.$hideLoader();

      //   console.log("initialize desserts: " + JSON.stringify(res_get.data));
    },

    editItem(item) {
      this.edit_item_id = item.id;
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.edit_item_id = item.id;
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      const res_del = await api.deleteGroupMenu(this.edit_item_id);
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
        this.editedItem2.user_update = localStorage.getItem(server.USER_ID);
        this.editedItem2.cgm_name = this.editedItem.cgm_name;
        const res_edit = await api.updateGroupMenu(
          this.edit_item_id,
          this.editedItem2
        );
        if (res_edit.status == 200) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Success!!!",
            "Edit data success",
            "text-h5 green--text text-center"
          );
          this.initialize();
        } else {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Edit data Failed",
            "text-h5 red--text text-center"
          );
        }
      } else {
        // alert("create");
        this.editedItem.user_create = localStorage.getItem(server.USER_ID);
        const res_add = await api.createGroupMenu(this.editedItem);
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
