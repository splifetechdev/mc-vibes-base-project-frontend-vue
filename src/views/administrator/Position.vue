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
          <v-toolbar-title>Position Name : </v-toolbar-title>
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
            color="#3F7652"
            rounded
            dark
            class="mb-2"
            @click="openadd()"
            :disabled="!authorize_add"
          >
            Add Position
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="openeditItem(item)"
          v-if="authorize_edit"
          :style="{
            backgroundColor: '#E1F5FE',
            color: '#2196F3',
          }"
        >
          mdi-pencil
        </v-icon>
        <!-- <v-icon small @click="deleteItem(item)" v-if="authorize_del">
          mdi-delete
        </v-icon> -->
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogadd" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Add Position</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12"> </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                autofocus
                  v-model="itemadd.name"
                  label="Position Name"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-select
                  v-validate="'required'"
                  :items="companyAll"
                  label="Company"
                  item-text="name_th"
                  item-value="id"
                  v-model="itemadd.company_id"
                  outlined
                  v-on:change="showdepartName"
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-select
                  v-validate="'required'"
                  :items="departmentShow"
                  label="Department"
                  item-text="name"
                  item-value="id"
                  v-model="itemadd.department_id"
                  outlined
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  v-validate="'required'"
                  :items="statusall"
                  label="Status"
                  item-text="cgm_name"
                  item-value="id"
                  v-model="itemadd.status"
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
        <v-card-title class="text-h5">Edit Position</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="itemedit.name"
                  label="Position Name"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-select
                  v-validate="'required'"
                  :items="companyAll"
                  label="Company"
                  item-text="name_th"
                  item-value="id"
                  v-model="itemedit.company_id"
                  outlined
                  required
                  v-on:change="showdepartNameEdit"
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-select
                  v-validate="'required'"
                  :items="departmentShowEdit"
                  label="Department"
                  item-text="name"
                  item-value="id"
                  v-model="itemedit.department_id"
                  outlined
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  v-validate="'required'"
                  :items="statusall"
                  label="Status"
                  item-text="cgm_name"
                  item-value="id"
                  v-model="itemedit.status"
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
    dialogAdd: false,
    text_color: "text-h5 green--text text-center",
    title: "green",
    message: "green",
    search: "",
    dialogadd: false,
    dialogedit: false,
    headers: [
      { text: "ID", value: "id" },
      { text: "Position Name", value: "name" },
      // { text: "address", value: "address" },
      // { text: "provice", value: "provice" },
      // { text: "zipcode", value: "zipcode" },
      { text: "Company Name", value: "companyName" },
      { text: "Department Name", value: "departmentName" },

      { text: "Status", value: "status" },
      { text: "Action", value: "actions" },
    ],
    desserts: [],
    itemadd: {
      name: "",
      company_id: 0,
      department_id: 0,
      status: "",
      user_create: localStorage.getItem(server.USER_ID),
    },
    itemeditid: 0,
    itemedit: {
      name: "",
      company_id: 0,
      department_id: 1,
      status: "",
      user_update: localStorage.getItem(server.USER_ID),
    },
    companyAll: [],
    departmentShow: [],
    departmentShowEdit: [
      {
        id: 0,
      },
    ],
    statusall: ["ACTIVE", "INACTIVE"],
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
    await this.getcompanydata();
    await this.loadCompany();
  },
  methods: {
    setupAlertDialog(status, title, message, text_color) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
    },
    async loadCompany(id) {
      const result = await api.getAllCompany(id);
      this.companyAll = result.data;
    },
    async getcompanydata() {
      const result = await api.getAllPosition();
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
      if (this.itemadd.name == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Position Name",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.company_id == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Company",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (
        this.itemadd.department_id == 0 ||
        this.itemadd.department_id == "0"
      ) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Department",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.status == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Status",
          "text-h5 red--text text-center"
        );
        return;
      }
      const res_add = await api.addPosition(this.itemadd);
      if (res_add.status == 200) {
      
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Add data success",
          "text-h5 green--text text-center"
        );
        this.getcompanydata();
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
    async showdepartName() {
      //  getDepartmentByCompanyID
      const result = await api.getDepartmentByCompanyID(
        this.itemadd.company_id
      );
      this.departmentShow = result.data;
    },
    async showdepartNameEdit() {
      //  getDepartmentByCompanyID
      const result = await api.getDepartmentByCompanyID(
        this.itemedit.company_id
      );

      if (result.data.length == 0) {
        this.itemedit.department_id = 0;
        this.departmentShowEdit = [];
      } else {
        this.departmentShowEdit = result.data;
      }
    },
    async openeditItem(item) {

      const result = await api.getDepartmentByCompanyID(item.company_id);
      this.departmentShowEdit = result.data;

      this.itemeditid = item.id;
      this.itemedit.name = item.name;
      this.itemedit.company_id = item.company_id;
      this.itemedit.department_id = item.department_id;
      this.itemedit.status = item.status;
      this.dialogedit = true;
    },
    async savedataedit() {
      if (this.itemedit.name == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Position Name",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemedit.company_id == 0 || this.itemedit.company_id == "0") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Company",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (
        this.itemedit.department_id == 0 ||
        this.itemedit.department_id == "0"
      ) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Department",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemedit.status == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Status",
          "text-h5 red--text text-center"
        );
        return;
      }
      const res_update = await api.updatePosition(
        this.itemeditid,
        this.itemedit
      );

      if (res_update.status == 200 || res_update.status == 201) {

        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Update data success",
          "text-h5 green--text text-center"
        );
        this.getcompanydata();
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
  },
  beforeCreate() {
    //console.log("beforeCreate");
    this.$store.state.navMenu = true;
  },
};
</script>
