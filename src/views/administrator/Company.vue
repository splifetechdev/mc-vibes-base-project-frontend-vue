<template>
    <v-container fluid>
  <v-card class="ma-3">
    <v-data-table :headers="headers" :items="desserts" :search="search" sort-by="fullname" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Company Name : </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search by name" single-line outlined
            hide-details dense></v-text-field>

          <v-spacer></v-spacer>
          <!--   @click="openadd()" -->
          <v-btn color="#254E58" dark class="mb-2" v-bind="attrs" v-on="on" :disabled="!authorize_add"
            @click="$router.push('/company-add')">
            Add company
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <!--  @click="openeditItem(item)" -->
        <v-icon small class="mr-2" @click="$router.push(`/company-edit/${item.id}`)" v-if="authorize_edit" :style="{
          backgroundColor: '#E1F5FE',
          color: '#2196F3',
        }">
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
        <v-card-title class="text-h5">Add company</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="itemadd.code" label="Company code" outlined></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="itemadd.name" label="Company Name" outlined></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-select v-validate="'required'" :items="statusall" label="Status" item-text="cgm_name" item-value="id"
                  v-model="itemadd.status" outlined @change="changeSPGroupMenu" required :rules="commonRules"></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y
                  max-width="290px" min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="dateFormatted" label="Date Expire" persistent-hint prepend-icon="mdi-calendar"
                      v-bind="attrs" @blur="date = parseDate(dateFormatted)" v-on="on" dense outlined></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                </v-menu>
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
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="itemedit.name" label="Company Name" outlined></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-select v-validate="'required'" :items="statusall" label="Status" item-text="cgm_name" item-value="id"
                  v-model="itemedit.status" outlined @change="changeSPGroupMenu" required :rules="commonRules"></v-select>
              </v-col>

              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition"
                    offset-y max-width="290px" min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="dateFormatted" label="Date Expire" persistent-hint
                        prepend-icon="mdi-calendar" v-bind="attrs" @blur="date = parseDate(dateFormatted)" v-on="on" dense
                        outlined></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
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

    <SuccessDialog :status="dialogAdd" :text_color="text_color" :title="title" :message="message" />
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
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  data: (vm) => ({
    txt_encode: "@spkitztech",
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu1: false,
    dialogAdd: false,
    text_color: "text-h5 green--text text-center",
    title: "green",
    message: "green",
    search: "",
    dialogadd: false,
    dialogedit: false,
    headers: [
      { text: "ID", value: "id" },
      { text: "Code", value: "code" },
      { text: "Company Name(TH)", value: "name_th" },
      { text: "Company Name(EN)", value: "name_en" },
      // { text: "address", value: "address" },
      // { text: "provice", value: "provice" },
      // { text: "zipcode", value: "zipcode" },
      { text: "Status", value: "status" },
      { text: "Action", value: "actions" },
    ],
    desserts: [],
    itemadd: {
      code: "",
      name: "",
      status: "",
      expire_date: "",
    },
    itemeditid: 0,
    itemedit: {
      name: "",
      status: "",
      expire_date: "",
    },
    statusall: ["ACTIVE", "INACTIVE"],
  }),
  async mounted() {
    // await api.checkVersion();
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
  },
  methods: {
    setupAlertDialog(status, title, message, text_color) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
    },
    async getcompanydata() {
      const result = await api.getAllCompany();
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
      if (this.itemadd.code == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Company Code",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.name == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Company Name",
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

      // encode expire_date
      this.itemadd.expire_date = btoa(this.dateFormatted + this.txt_encode);

      if (this.itemadd.expire_date == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Expire Date",
          "text-h5 red--text text-center"
        );
      }

      const res_add = await api.addCompany(this.itemadd);
      if (res_add.status == 200) {
        //   alert("debug1");
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

    async openeditItem(item) {
      this.itemeditid = item.id;
      this.itemedit.name = item.name;
      this.itemedit.status = item.status;
      this.itemedit.expire_date = atob(item.expire_date).split(
        this.txt_encode
      )[0];
      this.dateFormatted = this.itemedit.expire_date;
      this.dialogedit = true;
    },
    async savedataedit() {
      if (this.itemedit.name == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Company Name",
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

      // encode expire_date
      this.itemedit.expire_date = btoa(this.dateFormatted + this.txt_encode);

      if (this.itemedit.expire_date == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Expire Date",
          "text-h5 red--text text-center"
        );
      }

      const res_update = await api.updateCompany(
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

    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
  beforeCreate() {
    // console.log("beforeCreate");
    this.$store.state.navMenu = true;
  },
};
</script>
