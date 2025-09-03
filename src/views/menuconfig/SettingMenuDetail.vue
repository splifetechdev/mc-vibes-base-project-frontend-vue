<template>
    <v-container fluid>
  <v-card class="ma-3">
    <v-row class="mt-5 ml-5 mr-5 mb-3">
        <v-col cols="12" md="12">
          <v-row>
              <v-toolbar-title class="text-h6 mt-4">Setting Menu Detail : </v-toolbar-title>
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
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <!-- <v-toolbar-title>List Data</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider> -->
          <v-spacer></v-spacer>
          <v-btn
            color="#254e58"
            outlined
            class="mr-2 mb-2"
            width="120px"
            dark
            @click="$router.back()"
            >Back</v-btn
          >

          <v-dialog v-model="dialogDelete" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="#254e58"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                :disabled="!authorize_edit"
              >
                Save Data
              </v-btn>
            </template>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to save this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeSaveDialog"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="saveItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.smd_view="{ item }">
        <v-switch
          :input-value="item.smd_view"
          color="#254e58"
          @change="setSwitchesForItem(item, 1)"
        />
      </template>
      <template v-slot:item.smd_add="{ item }">
        <v-switch
          :input-value="item.smd_add"
          color="#254e58"
          @change="setSwitchesForItem(item, 2)"
        />
      </template>

      <template v-slot:item.smd_edit="{ item }">
        <v-switch
          :input-value="item.smd_edit"
          color="#254e58"
          @change="setSwitchesForItem(item, 3)"
        />
      </template>

      <template v-slot:item.smd_del="{ item }">
        <v-switch
          :input-value="item.smd_del"
          color="#254e58"
          @change="setSwitchesForItem(item, 4)"
        />
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
      { text: "Group Config", value: "cgm_name" },
      { text: "Detail Config", value: "cmd_name" },
      { text: "Authorize", value: "sgm_name" },
      { text: "View", value: "smd_view" },
      { text: "Add", value: "smd_add" },
      { text: "Edit", value: "smd_edit" },
      { text: "Delete", value: "smd_del" },
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
    update_authorize: {
      smd_view: false,
      smd_add: false,
      smd_edit: false,
      smd_del: false,
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
    saveStatus: false,
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

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeSaveDialog();
    },
  },

  async created() {
    await this.initialize();
  },
  async mounted() {
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

    // const router_path = parser.pathname.replace("/", "");
    // alert(parser.pathname);
    const myArray = parser.pathname.split("/");
    const router_path = myArray[1];
    // alert(router_path);
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

    await this.initialize();
  },
  methods: {
    async setSwitchesForItem(item, position) {
      //   console.log("setSwitchesForItem position : " + position);
      console.log("setSwitchesForItem position: " + position);
      console.log("setSwitchesForItem item.cmd_route: " + item.cmd_route);
      // console.log("setSwitchesForItem item: " + JSON.stringify(item));
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);

      console.log("setSwitchesForItem editedIndex: " + this.editedIndex);

      // if (
      //   item.cmd_route == "setting-menu-detail" &&
      //   (position == 2 || position == 4)
      // ) {
      //   this.$store.state.global_dialog = true;
      //   this.setupAlertDialog(
      //     true,
      //     "Authorize Failed!!!",
      //     "You Can't Authorize Add or Delete For This Menu!!!",
      //     "text-h5 red--text text-center"
      //   );

      //   // await this.initialize();
      //   return;
      // }

      // if (
      //   (item.cmd_route == "customer" || item.cmd_route == "employee") &&
      //   position == 4
      // ) {
      //   this.$store.state.global_dialog = true;
      //   this.setupAlertDialog(
      //     true,
      //     "Authorize Failed!!!",
      //     "You Can't Authorize Delete For This Menu!!!",
      //     "text-h5 red--text text-center"
      //   );

      //   // await this.initialize();
      //   return;
      // }

      if (position == 1) {
        item.smd_view = !item.smd_view;
      } else if (position == 2) {
        item.smd_add = !item.smd_add;
      } else if (position == 3) {
        item.smd_edit = !item.smd_edit;
      } else if (position == 4) {
        item.smd_del = !item.smd_del;
      }
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      Object.assign(this.desserts[this.editedIndex], item);
      //   const id = this.desserts[this.editedIndex].id;

      //   console.log("setSwitchesForItem item: " + JSON.stringify(item));
      // console.log(
      //   "setSwitchesForItem desserts: " + JSON.stringify(this.desserts)
      // );

      // console.log("setSwitchesForItem item: " + JSON.stringify(item));
    },
    async initialize() {
      //   alert("initialize");
      this.desserts = [];
      const res_get = await api.getListMenuDetailById(this.$route.params.id);
      this.desserts = res_get.data;

      this.$hideLoader();
      //   console.log("initialize desserts: " + JSON.stringify(res_get.data));
    },

    async saveItemConfirm() {
      // this.desserts.splice(this.editedIndex, 1);
      this.$showLoader();

      this.update_authorize.user_update = localStorage.getItem(server.USER_ID);
      // this.desserts.forEach(async (item, index) => {
      //   this.saveStatus = false;
      //   // console.log(
      //   //   "saveItemConfirm item: " + JSON.stringify(item) + " index: " + index
      //   // );
      //   this.update_authorize.smd_view = item.smd_view;
      //   this.update_authorize.smd_add = item.smd_add;
      //   this.update_authorize.smd_edit = item.smd_edit;
      //   this.update_authorize.smd_del = item.smd_del;
      //   // this.update_authorize.id = item.id;
      //   const res_update = await api.updateSettingMenuDetail(
      //     item.id,
      //     this.update_authorize
      //   );
      //   if (res_update.status == 200) {
      //     this.saveStatus = true;
      //   } else {
      //     this.saveStatus = false;
      //   }
      // });

      for (let i = 0; i < this.desserts.length; i++) {
        this.saveStatus = false;
        // console.log(
        //   "saveItemConfirm item: " + JSON.stringify(item) + " index: " + index
        // );
        this.update_authorize.smd_view = this.desserts[i].smd_view;
        this.update_authorize.smd_add = this.desserts[i].smd_add;
        this.update_authorize.smd_edit = this.desserts[i].smd_edit;
        this.update_authorize.smd_del = this.desserts[i].smd_del;
        // this.update_authorize.id = item.id;
        const res_update = await api.updateSettingMenuDetail(
          this.desserts[i].id,
          this.update_authorize
        );
        if (res_update.status == 200) {
          this.saveStatus = true;
        } else {
          this.saveStatus = false;
          break;
        }
      }

      if (this.saveStatus == true) {
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

      this.$hideLoader();

      this.closeSaveDialog();
    },

    closeSaveDialog() {
      this.dialogDelete = false;
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
