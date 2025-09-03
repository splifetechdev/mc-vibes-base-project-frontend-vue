<template>
     <v-container fluid>
  <v-card class="ma-3">
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        sort-by="fullname"
        class="elevation-1"
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          prevIcon: 'mdi-minus',
          nextIcon: 'mdi-plus',
        }"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Department Name : </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              label="Search"
              append-icon="mdi-magnify"
              hide-details
              outlined
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
              Add Department
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
          <v-icon small @click="deleteItem(item)" 
          v-if="authorize_del" 
          :style="{
            backgroundColor: '#FFEBEE',
            color: '#F44336',
          }">
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
          <v-card-title class="text-h5">Add Department</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12"> </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                  autofocus
                    v-model="itemadd.code"
                    label="Department Code"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="itemadd.name"
                    label="Department Name"
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
                  @change="changeSPGroupMenu"
                  v-on:change="showdepartName"
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
          <v-card-title class="text-h5">Edit Department</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="itemedit.code"
                    label="Department Code"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="itemedit.name"
                    label="Department Name"
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
                  @change="changeSPGroupMenu"
                  v-on:change="showdepartName"
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
    dialogAdd: false,
    text_color: "text-h5 green--text text-center",
    title: "green",
    message: "green",
    search: "",
    dialogadd: false,
    dialogedit: false,
    headers: [
      { text: "ID", value: "id" },
      { text: "Department Code", value: "department_code" },
      { text: "Department Name", value: "department_name" },
      { text: "company name", value: "company_name" },
      // { text: "status", value: "status" },
      { text: "Action", value: "actions" },
    ],
    desserts: [],
    itemadd: {
      code: "",
      name: "",
      company_id:0,
      user_create: localStorage.getItem(server.USER_ID),
    },
    itemeditid: 0,
    itemedit: {
      code: "",
      name: "",
      company_id: 0,
      user_update: localStorage.getItem(server.USER_ID),
    },
    companyAll: [],
    delete_item_id: 0,
 dialogDelete: false,
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
    await this.loadCompany();
    await this.loadDetartment();
  },
  methods: {
    setupAlertDialog(status, title, message, text_color) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
    },
    async loadCompany() {
      const result = await api.getAllCompany();
      this.companyAll = result.data;
    },
    async loadDetartment() {
      this.$showLoader();
      // getAllDepartmentByCompany(localStorage.getItem(server.COMPANYID))
      const result = await api.getAllDepartment();
      this.desserts = result.data;
      // this.$showLoader();
      this.$hideLoader();
    },

    openadd() {
      this.itemadd = {
        code:"",
        name: "",
        company_id:0,
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
      this.dialogadd = false;

      if (this.itemadd.code == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Department Code",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.name == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Department Name",
          "text-h5 red--text text-center"
        );
        return;
      }
      // this.itemadd.company_id = localStorage.getItem(server.COMPANYID);
      const res_add = await api.addDepartment(this.itemadd);
      if (res_add.status == 200) {
        //   alert("debug1");
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Add data success",
          "text-h5 green--text text-center"
        );
        // this.getcompanydata();
        await this.loadDetartment();
      } else {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Add data Failed",
          "text-h5 red--text text-center"
        );
      }
    },

    async openeditItem(item) {
      this.itemeditid = item.id;
      this.itemedit.code = item.department_code;
      this.itemedit.name = item.department_name;
      this.itemedit.company_id = item.company_id;
      this.dialogedit = true;
    },
    async savedataedit() {
      this.dialogedit = false;
      if (this.itemedit.code == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Department Code",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemedit.name == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Department Name",
          "text-h5 red--text text-center"
        );
        return;
      }
      // this.itemedit.company_id = localStorage.getItem(server.COMPANYID);
      const res_update = await api.updateDepartment(
        this.itemeditid,
        this.itemedit
      );
      if (res_update.status == 200 || res_update.status == 201) {
        //   alert("debug1");
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Update data success",
          "text-h5 green--text text-center"
        );
        // this.getcompanydata();
        await this.loadDetartment();
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
      this.delete_item_id = item.id;
      this.dialogDelete = true;
    },
    closeDelete() {
      this.delete_item_id = 0;
      this.dialogDelete = false;
    
    },
    async deleteItemConfirm() {
      const res_del = await api.DeleteDepartment(this.delete_item_id);
      if (res_del.status == 200) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Delete data success",
          "text-h5 green--text text-center"
        );
        await this.loadDetartment();
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
    // console.log("beforeCreate");
    this.$store.state.navMenu = true;
  },
};
</script>
