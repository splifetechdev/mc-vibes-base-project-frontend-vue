<template>
   <v-container fluid>
  <v-card class="ma-3">
    <v-data-table :headers="headers" :items="desserts" :search="search" sort-by="fullname" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Doc-Running Config : </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search by name" single-line outlined
            hide-details dense></v-text-field>

          <v-spacer></v-spacer>

          <v-btn color="#3F7652" rounded dark class="mb-2 mr-3" v-bind="attrs" v-on="on" @click="openAddNew()"
            :disabled="!authorize_add">
            + Add New
          </v-btn>

          <v-btn color="#3F7652" rounded dark class="mb-2" v-bind="attrs" v-on="on" @click="openadd()"
            :disabled="!authorize_add">
            Update All
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="openeditItem(item)" v-if="authorize_edit">
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
    <v-dialog v-model="dialogAddNew" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Add New Doc-Running</v-card-title>
        <v-card-text>
          <v-container>
            <v-row no-gutters>
              <v-col cols="12" sm="12" md="12">
                <v-text-field autofocus v-model="itemAddNew.doc_group_name" label="Doc. Group" outlined></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="itemAddNew.module" label="Name" outlined></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="itemAddNew.id_prefix" label="Prefix" outlined></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="itemAddNew.running_year" label="Running Year" outlined></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="itemAddNew.running_len" label="Running Len" outlined type="number"></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="itemAddNew.running_next" label="Running Next" outlined
                  type="number"></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="12" md="12">
                <v-select v-model="itemAddNew.status" :items="statusAddNew" label="Status" item-text="text"
                  item-value="value" outlined></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogAddNew = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="onAddNewData()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogadd" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Update All</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="itemaddall.running_year" label="Running Year" outlined></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="itemaddall.running_next" label="Running Next" outlined></v-text-field>
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
        <v-card-title class="text-h5">Edit Doc-Running</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="itemedit.running_year" label="Running Year" outlined></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="itemedit.running_next" label="Running Next" outlined></v-text-field>
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
  data: () => ({
    dialogAddNew: false,
    dialogAdd: false,
    text_color: "text-h5 green--text text-center",
    title: "green",
    message: "green",
    search: "",
    dialogadd: false,
    dialogedit: false,
    headers: [
      { text: "ID", value: "id" },
      { text: "Doc. Group", value: "doc_group_name" },
      { text: "Name", value: "module" },
      { text: "Prefix", value: "id_prefix" },
      { text: "Running Year", value: "running_year" },
      { text: "Running Len", value: "running_len" },
      { text: "Running Next", value: "running_next" },
      // { text: "provice", value: "provice" },
      // { text: "zipcode", value: "zipcode" },
      { text: "Status", value: "status" },
      { text: "Action", value: "actions" },
    ],
    desserts: [],
    itemAddNew: {
      doc_group_name: "",
      module: "",
      id_prefix: "",
      running_year: "",
      running_len: 5,
      running_next: 1,
      status: "A",
      user_create: localStorage.getItem(server.USER_ID),
    },
    itemadd: {
      code: "",
      name: "",
      status: "",
    },
    itemaddall: {
      running_year: "",
      running_next: "",
    },
    itemeditid: 0,
    itemedit: {
      running_year: "",
      running_next: "",
      user_update: localStorage.getItem(server.USER_ID),
    },
    statusall: ["ACTIVE", "INACTIVE"],
    statusAddNew: [
      {
        text: "ACTIVE",
        value: "A",
      },
      {
        text: "INACTIVE",
        value: "I",
      },
    ],
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

    let token = localStorage.getItem(server.USER_ID);

    if (userId && api.isLoggedIn()) {
      // this.$router.push("/");
    } else {
      this.$store.state.isLogged = false;
      this.$router.push("/login");
    }

    await this.onLoadDocRunningData();
  },
  methods: {
    setupAlertDialog(status, title, message, text_color) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
    },
    async onLoadDocRunningData() {
      //   const result = await api.getAllCompany();
      const result = await api.getDoc_running();
      this.desserts = result.data;

      // this.$showLoader();
      this.$hideLoader();
    },
    async onAddNewData() {
      this.dialogAddNew = false;
      console.log("itemAddNew : ", JSON.stringify(this.itemAddNew));

      if (this.itemAddNew.doc_group_name == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Doc. Group",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemAddNew.module == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Name",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemAddNew.id_prefix == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Prefix",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemAddNew.running_year == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Running Year",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemAddNew.running_len == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Running Len",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemAddNew.running_next == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Running Next",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemAddNew.status == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Status",
          "text-h5 red--text text-center"
        );
        return;
      }

      const res_add = await api.addDocRunning(this.itemAddNew);
      console.log("res_add:" + JSON.stringify(res_add.data));
      if (res_add.status == 200 || res_add.status == 201) {
        //   alert("debug1");
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Add data success",
          "text-h5 green--text text-center"
        );
        this.onLoadDocRunningData();
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
    openAddNew() {
      this.itemAddNew = {
        doc_group_name: "",
        module: "",
        id_prefix: "",
        running_year: "",
        running_len: 5,
        running_next: 1,
        status: "A",
        user_create: localStorage.getItem(server.USER_ID),
      };
      this.dialogAddNew = true;
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
      if (this.itemaddall.running_year == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Running Year",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemaddall.running_next == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Running Next",
          "text-h5 red--text text-center"
        );
        return;
      }
      //   const res_add = await api.addCompany(this.itemadd);
      //   console.log("updateAll req.body : ", JSON.stringify(this.itemaddall));
      // const res_add = await api.getDoc_runningUpdateAll(this.itemaddall);
      const res_add = await api.getDoc_runningUpdateAll(
        this.itemaddall.running_year,
        this.itemaddall.running_next
      );
      if (res_add.status == 200) {
        //   alert("debug1");
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Add data success",
          "text-h5 green--text text-center"
        );
        this.onLoadDocRunningData();
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
      this.itemedit.running_year = item.running_year;
      this.itemedit.running_next = item.running_next;
      this.dialogedit = true;
    },
    async savedataedit() {
      if (this.itemedit.running_year == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Running Year",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemedit.running_next == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Running Next",
          "text-h5 red--text text-center"
        );
        return;
      }
      //   const res_update = await api.updateCompany(
      const res_update = await api.getDoc_runningupdate(
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
        this.onLoadDocRunningData();
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
    console.log("beforeCreate");
    this.$store.state.navMenu = true;
  },
};
</script>
