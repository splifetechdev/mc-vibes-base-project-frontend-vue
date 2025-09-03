<template>
  <v-card class="ma-3">
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      sort-by="fullname"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Warehouse : </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search by name"
            single-line
            outlined
            hide-details
          ></v-text-field>

          <v-spacer></v-spacer>
          <!-- <v-btn
            color="#3F7652"
            rounded
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
            @click="openadd()"
            :disabled="!authorize_add"
          >
            Add company
          </v-btn> -->

          <v-btn
            color="#254E58"
            dark
            class="mb-2"
            @click="openadd()"
            :disabled="!authorize_add"
          >
            Add Warehouse
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="mr-2" @click="openeditItem(item)" v-if="authorize_edit">
          mdi-pencil
        </v-icon>
        <v-icon @click="deleteItem(item)" v-if="authorize_del">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogadd" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Add Warehouse</v-card-title>
        <v-card-text>
          <v-container>
            <v-row no-gutters>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="itemadd.wh_id"
                  label="Warehouse ID"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="itemadd.wh_name"
                  label="Warehouse Desc"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="12" md="12">
                <v-select
                  v-validate="'required'"
                  :items="statusall"
                  label="Status"
                  item-text="text"
                  item-value="value"
                  v-model="itemadd.wh_status"
                  outlined
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="canceladd()">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="savedata()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogedit" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Edit company</v-card-title>
        <v-card-text>
          <v-container>
            <v-row no-gutters>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="itemedit.wh_id"
                  label="Warehouse ID"
                  outlined
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="itemedit.wh_name"
                  label="Warehouse Name"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="12" md="12">
                <v-select
                  v-validate="'required'"
                  :items="statusall"
                  label="Status"
                  item-text="text"
                  item-value="value"
                  v-model="itemedit.wh_status"
                  outlined
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="canceledit()">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="savedataedit()">Save</v-btn>
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
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <SuccessDialog
      :status="dialogAdd"
      :text_color="text_color"
      :title="title"
      :message="message"
    />
  </v-card>
</template>
<script>
import SuccessDialog from "@/components/cards/SuccessDialog";
import api from "@/services/api";
import { server } from "@/services/constants";
export default {
  components: {
    SuccessDialog,
  },
  data: () => ({
    dialogDelete: false,
    dialogAdd: false,
    text_color: "text-h5 green--text text-center",
    title: "green",
    message: "green",
    search: "",
    dialogadd: false,
    dialogedit: false,
    headers: [
      // { text: "id", value: "id" },
      { text: "Warehouse", value: "wh_id" },
      { text: "Warehouse Desc", value: "wh_name" },
      { text: "status", value: "wh_status" },
      { text: "Manage", value: "actions" },
    ],
    desserts: [],
    itemadd: {
      wh_id: "",
      wh_name: "",
      wh_status: "",
      user_create: localStorage.getItem(server.USER_ID),
    },
    itemeditid: 0,
    itemedit: {
      wh_id: "",
      wh_name: "",
      wh_status: "",
      user_update: localStorage.getItem(server.USER_ID),
    },
    statusall: [
      { value: "A", text: "Active" },
      { value: "I", text: "Inactive" },
    ],
  }),
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

    const router_path = parser.pathname.replace("/", "");

    const res_auth = await api.getAuthorize(userId, router_path);

    this.authorize_view = res_auth.data[0].smd_view >= 1 ? true : false;
    this.authorize_add = res_auth.data[0].smd_add >= 1 ? true : false;
    this.authorize_edit = res_auth.data[0].smd_edit >= 1 ? true : false;
    this.authorize_del = res_auth.data[0].smd_del >= 1 ? true : false;
    // this.$router.back();

    if (!this.authorize_view) {
      this.$router.back();
    }

    // ----------------- Check Authorize ---------------------------

    let token = localStorage.getItem(server.USER_ID);

    if (userId && api.isLoggedIn()) {
      // this.$router.push("/");
    } else {
      this.$store.state.isLogged = false;
      this.$router.push("/login");
    }

    await this.getWarehouseData();
  },
  methods: {
    setupAlertDialog(status, title, message, text_color) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
    },
    async getWarehouseData() {
      const result = await api.getAllWarehouse();
      this.desserts = result.data;

      // this.$showLoader();
      this.$hideLoader();
    },

    openadd() {
      this.itemadd = {
        code: "",
        name: "",
        status: "",
      };
      this.dialogadd = true;
    },
    canceladd() {
      this.dialogadd = false;
    },
    canceledit() {
      this.dialogedit = false;
    },
    async savedata() {
      if (this.itemadd.wh_id == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Warehouse ID",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.wh_name == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Warehouse Desc",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.wh_status == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Status",
          "text-h5 red--text text-center"
        );
        return;
      }
      const res_add = await api.addWarehouse(this.itemadd);
      if (res_add.status == 200) {
        //   alert("debug1");
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Add data success",
          "text-h5 green--text text-center"
        );
        this.getWarehouseData();
      } else {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Add data Failed",
          "text-h5 red--text text-center"
        );
      }
      this.dialogadd = false;
    },

    async openeditItem(item) {
      // console.log("item:", item);

      this.itemeditid = item.wh_id;
      this.itemedit.wh_id = item.wh_id;
      this.itemedit.wh_name = item.wh_name;
      this.itemedit.wh_status = item.wh_status;
      this.dialogedit = true;
    },
    async savedataedit() {
      if (this.itemedit.wh_name == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Warehouse Desc",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemedit.wh_status == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Status",
          "text-h5 red--text text-center"
        );
        return;
      }

      const res_update = await api.updateWarehouse(
        this.itemeditid,
        this.itemedit
      );
      console.log(res_update);
      if (res_update.status == 200 || res_update.status == 201) {
        //   alert("debug1");
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Update data success",
          "text-h5 green--text text-center"
        );
        this.getWarehouseData();
      } else {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Update data Failed",
          "text-h5 red--text text-center"
        );
      }
      this.dialogedit = false;
    },

    deleteItem(item) {
      this.delete_item_id = item.wh_id;
      this.dialogDelete = true;
    },
    closeDelete() {
      this.delete_item_id = 0;
      this.dialogDelete = false;
    },
    async deleteItemConfirm() {
      const res_del = await api.deleteWarehouse(this.delete_item_id);
      if (res_del.status == 200) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Delete data success",
          "text-h5 green--text text-center"
        );
        await this.getWarehouseData();
        // this.initialize();
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
  },
  beforeCreate() {
    console.log("beforeCreate");
    this.$store.state.navMenu = true;
  },
};
</script>
