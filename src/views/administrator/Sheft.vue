<template>
  <v-container fluid>
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
            <v-toolbar-title>Shelf : </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search by name"
              single-line
              outlined
              hide-details
              dense
            ></v-text-field>

            <v-spacer></v-spacer>
            <v-btn
              color="#254E58"
              dark
              class="mb-2"
              @click="openadd()"
              :disabled="!authorize_add"
            >
              Add Shelf
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            class="mr-2"
            @click="openeditItem(item)"
            v-if="authorize_edit"
          >
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
          <v-card-title class="text-h5">Add Shelf</v-card-title>
          <v-card-text>
            <v-container>
              <v-row no-gutters>
                <v-col cols="12" sm="12" md="12"> </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="12" md="12">
                  <v-select
                    v-validate="'required'"
                    :items="warehouseAll"
                    label="Warehouse"
                    item-text="fwh_name"
                    item-value="id"
                    v-model="itemadd.wh_id"
                    outlined
                    required
                    v-on:change="loadLocationByWH"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="12" md="12">
                  <v-select
                    v-validate="'required'"
                    :items="locationList"
                    label="Location"
                    item-text="flc_name"
                    item-value="id"
                    v-model="itemadd.lc_id"
                    outlined
                    required
                  ></v-select>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="itemadd.shf_id"
                    label="Shelf ID"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="itemadd.sf_name"
                    label="Shelf Name"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col>
                  <v-select
                    v-validate="'required'"
                    :items="statusall"
                    label="Status"
                    item-text="text"
                    item-value="value"
                    v-model="itemadd.sf_status"
                    outlined
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="canceladd()"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="savedata()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogedit" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Edit Position</v-card-title>
          <v-card-text>
            <v-container>
              <v-row no-gutters>
                <v-col cols="12" sm="12" md="12"> </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="12" md="12">
                  <v-select
                    v-validate="'required'"
                    :items="warehouseAll"
                    label="Warehouse"
                    item-text="fwh_name"
                    item-value="id"
                    v-model="itemedit.wh_id"
                    outlined
                    required
                    v-on:change="loadLocationByWHEdit"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="12" md="12">
                  <v-select
                    v-validate="'required'"
                    :items="locationListEdit"
                    label="Location"
                    item-text="flc_name"
                    item-value="id"
                    v-model="itemedit.lc_id"
                    outlined
                    required
                  ></v-select>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="itemedit.shf_id"
                    label="Shelf ID"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="itemedit.sf_name"
                    label="Shelf Name"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col>
                  <v-select
                    v-validate="'required'"
                    :items="statusall"
                    label="Status"
                    item-text="text"
                    item-value="value"
                    v-model="itemedit.sf_status"
                    outlined
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="canceledit()"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="savedataedit()"
              >Save</v-btn
            >
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
      { text: "Warehouse ", value: "wh_name" },
      { text: "Location ", value: "lc_name" },
      { text: "Shelf", value: "shf_id" },
      { text: "Shelf Description", value: "sf_name" },
      { text: "Status", value: "sf_status" },
      { text: "Manage", value: "actions" },
    ],
    desserts: [],
    itemadd: {
      wh_id: "",
      lc_id: "",
      shf_id: "",
      sf_name: "",
      sf_status: "",
      user_create: localStorage.getItem(server.USER_ID),
    },
    itemeditid: 0,
    itemedit: {
      wh_id: "",
      lc_id: "",
      shf_id: "",
      sf_name: "",
      sf_status: "",
      user_update: localStorage.getItem(server.USER_ID),
    },
    statusall: [
      { value: "A", text: "Active" },
      { value: "I", text: "Inactive" },
    ],
    warehouseAll: [],
    locationList: [],
    locationListEdit: [
      {
        id: 0,
      },
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
    await this.getSheftData();
    await this.loadWarehouse();
  },
  methods: {
    setupAlertDialog(status, title, message, text_color) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
    },
    async loadWarehouse(id) {
      const result = await api.getAllWarehouse();
      // const result = await api.getAllWarehouse(id);
      this.warehouseAll = result.data;
    },
    async getSheftData() {
      const result = await api.getAllSheft();
      this.desserts = result.data;
      // this.$showLoader();
      this.$hideLoader();
    },

    openadd() {
      this.itemadd = {
        name: "",
        company_id: 0,
        department_id: 0,
        status: "",
        user_create: localStorage.getItem(server.USER_ID),
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
      if (this.itemadd.wh_id == 0 || this.itemadd.wh_id == "0") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Warehouse",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.lc_id == 0 || this.itemadd.lc_id == "0") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Location",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.shf_id == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Shelf ID",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.sf_name == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Shelf Name",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.sf_status == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Status",
          "text-h5 red--text text-center"
        );
        return;
      }

      const res_add = await api.addSheft(this.itemadd);
      if (res_add.status == 200) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Add data success",
          "text-h5 green--text text-center"
        );
        this.getSheftData();
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
    async loadLocationByWH() {
      //  getDepartmentByCompanyID
      const result = await api.getLocationMaster(this.itemadd.wh_id);
      this.locationList = result.data;
    },
    async loadLocationByWHEdit() {
      //  getDepartmentByCompanyID
      const result = await api.getLocationMaster(this.itemedit.wh_id);

      if (result.data.length == 0) {
        this.itemedit.department_id = 0;
        this.locationListEdit = [];
      } else {
        this.locationListEdit = result.data;
      }
    },
    async openeditItem(item) {
      // console.log(item);

      // const result = await api.getDepartmentByCompanyID(item.company_id);
      // this.locationListEdit = result.data;
      this.itemedit.wh_id = item.wh_id;
      this.itemedit.lc_id = item.lc_id;

      await this.loadLocationByWHEdit();

      this.itemeditid = item.shf_id;
      this.itemedit.shf_id = item.shf_id;
      this.itemedit.sf_name = item.sf_name;
      this.itemedit.sf_status = item.sf_status;
      // console.log(`edit item: ${JSON.stringify(this.itemedit)}`);
      this.dialogedit = true;
    },
    async savedataedit() {
      if (this.itemedit.wh_id == 0 || this.itemedit.wh_id == "0") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Warehouse",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemedit.lc_id == 0 || this.itemedit.lc_id == "0") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Location",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemedit.shf_id == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Shelf ID",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemedit.sf_name == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Shelf Name",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemedit.sf_status == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Status",
          "text-h5 red--text text-center"
        );
        return;
      }

      const res_update = await api.updateSheft(this.itemeditid, this.itemedit);

      if (res_update.status == 200 || res_update.status == 201) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Update data success",
          "text-h5 green--text text-center"
        );
        this.getSheftData();
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
      this.delete_item_id = item.shf_id;
      this.dialogDelete = true;
    },
    closeDelete() {
      this.delete_item_id = 0;
      this.dialogDelete = false;
    },
    async deleteItemConfirm() {
      const res_del = await api.deleteSheft(this.delete_item_id);
      if (res_del.status == 200) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Delete data success",
          "text-h5 green--text text-center"
        );
        await this.getSheftData();
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
    //console.log("beforeCreate");
    this.$store.state.navMenu = true;
  },
};
</script>
