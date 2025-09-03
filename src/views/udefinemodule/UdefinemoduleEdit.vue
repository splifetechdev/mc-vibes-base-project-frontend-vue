<template>
  <v-card-title>
    <v-container class="pa-1" fluid>
      <v-card class="pa-12">
        <v-card-title>
          <v-row>
            <v-col cols="12" md="12" justify="center" class="mb-6">
              <h3>U-define Edit</h3>
            </v-col>
          </v-row>
        </v-card-title>
        <v-row>
          <v-col cols="12" sm="12" md="3">
            <v-text-field v-model="itemadd.module_name" label="Module Name" outlined dense disabled  background-color="#F5F5F5"></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-text-field v-model="itemadd.define_numeric1" label="Define Numeric1" outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-text-field v-model="itemadd.define_numeric2" label="Define Numeric2" outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-text-field v-model="itemadd.define_date1" label="Define Date1" outlined dense></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12" md="3">
            <v-text-field v-model="itemadd.define_date2" label="Define Date2" outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-text-field v-model="itemadd.define_boolean1" label="Define Boolean1" outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-text-field v-model="itemadd.define_boolean2" label="Define Boolean2" outlined dense></v-text-field>
          </v-col>
          
          <v-col cols="12" sm="12" md="3">
            <v-text-field v-model="itemadd.define_char1" label="Define Char1" outlined dense></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12" md="3">
            <v-text-field v-model="itemadd.define_char2" label="Define Char2" outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-text-field v-model="itemadd.define_text1" label="Define Text1" outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-text-field v-model="itemadd.define_text2" label="Define Text2" outlined dense></v-text-field>
          </v-col>
        
        </v-row>

        <v-card-actions>
          <v-row justify="center" class="mt-3">
            <v-btn depressed width="100" class="mr-3  buttonblue" @click="savedata()">
              Save
            </v-btn>
            <v-btn depressed outlined width="100" @click="$router.back()">
              Cancel
            </v-btn>
          </v-row>
        </v-card-actions>

        

        

        <SuccessDialog :status="dialogAdd" :text_color="text_color" :title="title" :message="message" />
        <SuccessDialogPush :status="dialogAdd" :text_color="text_color" :title="title" :message="message" :link="link" />
      </v-card>
    </v-container>
  </v-card-title>
</template>
<script>
import SuccessDialog from "@/components/cards/SuccessDialog";
import SuccessDialogPush from "@/components/cards/SuccessDialogPush";
import api from "@/services/api";
import { server, imageUrl } from "@/services/constants";
export default {
  components: {
    SuccessDialog,
    SuccessDialogPush,
  },
  computed: {
    computedDateFormatted() {
      return this.formatDaparseDatete(this.date);
    },
  },

  watch: {
    entry_date(val) {
      this.itemadd.entry_date = this.formatDate(this.entry_date);
    },
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  data: (vm) => ({
    itemadd: {
      module_name: "",
      define_numeric1: "",
      define_numeric2: "",
      define_date1: "",
      define_date2: "",
      define_boolean1: "",
      define_boolean2: "",
      define_char1: "",
      define_char2: "",
      define_text1: "",
      define_text2: "",
    },
    approver_show: [],
    companyshow: [],
    prename_th: ["นาย", "นาง", "นางสาว"],
    prename_en: ["Mr", "Miss", "Mrs."],
    user_role_show: [
      { id: "WORKER", status_name: "WORKER" },
    ],
    emp_status: [
      { id: "A", status_name: "Active" },
      { id: "D", status_name: "Inactive" },
    ],
    authorize: [],
    department_list: [],
    position_list: [],
    division_list: [],
    section_list: [],
    signature: "",
    initial_dataimage: "",
    isShowPassword: false,
    showbuttonsavesigimage: false,
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
    link: "",
    search: "",
    dialogadd: false,
    dialogedit: false,
    headers: [
      { text: "id", value: "id" },
      { text: "code", value: "code" },
      { text: "name", value: "name" },
      // { text: "address", value: "address" },
      // { text: "provice", value: "provice" },
      // { text: "zipcode", value: "zipcode" },
      { text: "status", value: "status" },
      { text: "action", value: "actions" },
    ],
    desserts: [],
    imagename: "",
    previewimage: null,
    checkimageadd: false,
    previewimage: null,
    image: null,
    entry_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    statusall: ["ACTIVE", "INACTIVE"],
    userId: 0,
  }),
  async mounted() {
    this.userId = localStorage.getItem(server.USER_ID);
    // await api.checkVersion();
    await this.loadAuthorize();
    await this.loaddataEdit();
    this.$hideLoader();
  },
  methods: {
    async loaddataEdit() {
      this.main_id = this.$route.params.id;
      const result = await api.getu_define_moduleByID(this.main_id);
      if (result.data[0]) {
        this.itemadd.module_name = result.data[0].module_name;
        this.itemadd.define_numeric1 = result.data[0].define_numeric1;
        this.itemadd.define_numeric2 = result.data[0].define_numeric2;
        this.itemadd.define_date1 = result.data[0].define_date1;
        this.itemadd.define_date2 = result.data[0].define_date2;
        this.itemadd.define_boolean1 = result.data[0].define_boolean1;
        this.itemadd.define_boolean2 = result.data[0].define_boolean2;
        this.itemadd.define_char1 = result.data[0].define_char1;
        this.itemadd.define_char2 = result.data[0].define_char2;
        this.itemadd.define_text1 = result.data[0].define_text1;
        this.itemadd.define_text2 = result.data[0].define_text2;

       
      }
    },
    setupAlertDialog(status, title, message, text_color) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
    },
    setupAlertDialogPush(status, title, message, text_color, link) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
      this.link = link;
    },
    
   
    async savedata() {
      if (this.itemadd.define_numeric1 == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Define Numeric1",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.define_numeric2 == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Define Numeric2",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.define_date1 == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Define Date1",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.define_date2 == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Define Date2",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.define_boolean1 == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Define Boolean1",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.define_boolean2 == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Define Boolean2",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.define_char1 == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Define Char1",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.define_char2 == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Define Char2",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.define_text1 == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Define Text1",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.define_text2 == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Define Text2",
          "text-h5 red--text text-center"
        );
        return;
      }


      // Update
      const res_add = await api.updateu_define_module(
        this.$route.params.id,
        this.itemadd
      );
      if (res_add.status == 200 || res_add.status == 201) {
        this.$hideLoader();
        this.$store.state.global_dialog_push = true;
        this.setupAlertDialogPush(
          true,
          "Success!!!",
          "Edit data success",
          "text-h5 green--text text-center",
          "/u-define-module"
        );
        return;
      } else {
        this.$hideLoader();
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Edit data Failed",
          "text-h5 red--text text-center"
        );
        return;
      }
    },

    async loadAuthorize() {
      const res_get = await api.getSettingGroupMenu();
      res_get.data.filter(x => {
        if (x.sgm_name == "Worker" || x.sgm_name == "WORKER") {
          this.authorize = x;
        }
      })
      // this.authorize = res_get.data;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("/");
      return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
    },
  },
  beforeCreate() {
    this.$store.state.navMenu = true;
  },
};
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--default.buttonblue {
  background-color: #1f51ff;
  color: white;
}

.v-btn:not(.v-btn--round).v-size--default.buttonred {
  width: 100%;
  background-color: #9e3b1b;
  color: white;
}
</style>
