<template>
  <v-card-title>
    <v-container class="pa-1" fluid>
      <v-card class="pa-12">
        <v-card-title>
          <v-row>
            <v-col cols="12" md="12" justify="center" class="mb-6">
              <h3>User Edit</h3>
            </v-col>
          </v-row>
        </v-card-title>
        <v-row>
          <v-col cols="12" sm="12" md="3">
            <v-text-field v-model="itemadd.emp_id" label="Employee ID" outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-select :items="prename_th" v-model="itemadd.prename_th" label="Title(TH)" outlined dense></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-text-field v-model="itemadd.firstname" label="Firstname(TH)" outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-text-field v-model="itemadd.lastname" label="Lastname(TH)" outlined dense></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12" md="3">
            <v-text-field v-model="itemadd.abbname_en" label="Abb name" outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-select :items="prename_en" v-model="itemadd.prename_en" label="Title(EN)" outlined dense></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-text-field v-model="itemadd.firstname_en" label="Firstname(EN)" outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-text-field v-model="itemadd.lastname_en" label="Lastname(EN)" outlined dense></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12" md="3">
            <v-select required outlined :items="companyshow" v-model="itemadd.company_id" item-value="id"
              item-text="name_th" label="Company" @change="changeCompany" dense></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-select required outlined :items="department_list" v-model="itemadd.department_id" item-value="id"
              item-text="name" label="Department" @change="changeDepartment" dense></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-select required outlined :items="division_list" v-model="itemadd.division_id" item-value="id"
              item-text="name" label="Division" @change="changeDivision" dense></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-select required outlined :items="section_list" v-model="itemadd.section_id" item-value="id"
              item-text="name" label="Section" dense></v-select>
          </v-col>
        </v-row>


        <v-row>
          <v-col cols="12" sm="12" md="3">
            <v-select required outlined :items="position_list" v-model="itemadd.position_id" item-value="id"
              item-text="name" label="Position" dense></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-text-field v-model="itemadd.level" label="Level" outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-menu v-model="menu1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
              offset-y max-width="290px" min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <!--     hint="Format DD/MM/YYYY" -->
                <v-text-field clearable @click:clear="
                  $nextTick(() => {
                    itemadd.entry_date = '';
                    entry_date = '';
                  })
                  " v-model="itemadd.entry_date" persistent-hint @keydown.enter="
    entry_date = parseDate(itemadd.entry_date)
    " @blur="
    entry_date = parseDate(itemadd.entry_date)
    " append-icon="mdi-calendar" label="Entry Date" v-bind="attrs" v-on="on" outlined
                  dense></v-text-field>
              </template>

              <v-date-picker v-model="entry_date" @input="menu1 = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-text-field v-model="itemadd.email" label="Email" outlined dense></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12" md="3">
            <v-select required outlined :items="authorize" v-model="itemadd.authorize_id" item-value="id"
              item-text="sgm_name" label="Authorize" dense></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-select :items="user_role_show" v-model="itemadd.user_role" item-text="status_name" item-value="id"
              label="User Role" outlined dense></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-select :items="emp_status" v-model="itemadd.emp_status" item-text="status_name" item-value="id"
              label="Status" outlined dense></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-text-field v-model="itemadd.emp_rate" label="Rate/Hour" outlined dense></v-text-field>
          </v-col>
        </v-row>


        <v-row>
          <v-col align="center" cols="12" sm="12" md="3">
            <v-select :items="approver_show" v-model="itemadd.approver_level1" item-text="name" item-value="id"
              label="Approver1" outlined dense clearable @click:clear="
                $nextTick(() => {
                  itemadd.approver_level1 = 0;
                })"></v-select>
          </v-col>
          <v-col align="center" cols="12" sm="12" md="3">
            <v-select :items="approver_show" v-model="itemadd.approver_level2" item-text="name" item-value="id"
              label="Approver2" outlined dense clearable @click:clear="
                $nextTick(() => {
                  itemadd.approver_level2 = 0;
                })"></v-select>
          </v-col>
          <v-col align="center" cols="12" sm="12" md="3">
            <v-select :items="approver_show" v-model="itemadd.approver_level3" item-text="name" item-value="id"
              label="Approver3" outlined dense clearable @click:clear="
                $nextTick(() => {
                  itemadd.approver_level3 = 0;
                })"></v-select>
          </v-col>

        </v-row>


        <v-row>
          <v-col align="center" cols="12" sm="12" md="3">
            <v-card>
              <v-img lazy-src="https://upload.wikimedia.org/wikipedia/en/2/24/Crystal_personal.svg" max-height="150"
                class="mt-3" aspect-ratio="1.7" contain :src="initial_dataimage"></v-img>
            </v-card>
            <v-row :style="{
              visibility: showbuttonsavesigimage
                ? 'visible'
                : 'hidden',
            }">
              <v-col align="center">
                <v-btn depressed class="ml-5" @click="clearsigimage()">
                  Clear
                </v-btn>
              </v-col>
              <v-col>
                <v-btn class="mr-5 mb-5 primary" depressed @click="savesigimage()">
                  Save
                </v-btn>
              </v-col>
            </v-row>
            <v-row :style="{
              visibility: showbuttonsavesigimage
                ? 'visible'
                : 'hidden',
            }">
            </v-row>
            <input type="file" accept="image/*" @change="previewimagetobasesignatureimage" class="inputsize"
              ref="filefileimage" style="display: none" />
            <v-btn depressed :style="{
              backgroundColor: '#254E58',
              color: 'white',
            }" class="widthbtnimagefile mb-2 mt-n7" @click="$refs.filefileimage.click()" elevation="7">
              Signature image</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12" md="3">
            <v-text-field v-model="itemadd.username" label="User Name" outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-text-field name="password" label="Password" id="password" v-model="itemadd.password"
              :append-icon="isShowPassword ? 'visibility' : 'visibility_off'"
              @click:append="isShowPassword = !isShowPassword" :type="isShowPassword ? 'text' : 'password'" disabled
              outlined dense>
            </v-text-field>
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


        <v-dialog v-model="dialogpreviewimage" max-width="700px">
          <v-card>
            <v-card-title class="text-h5">
              <v-btn icon @click="closepreviewimage">
                <v-icon large>mdi-close</v-icon>
              </v-btn>
              Preview Image</v-card-title>

            <v-img disabled :src="previewimage" class="grey lighten-2 mt-3 mb-5" aspect-ratio="1" contain>
            </v-img>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closepreviewimage">Cancel</v-btn>

              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDeleteimage" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this image?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDeleteimage">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirmimage">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

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
      emp_id: "",
      prename_th: "",
      firstname: "",
      lastname: "",
      phone: "",
      username: "",
      prename_en: "",
      firstname_en: "",
      lastname_en: "",
      abbname_en: "",
      company_id: 0,
      department_id: 0,
      position_id: 0,
      division_id: "",
      section_id: "",
      level: "",
      entry_date: vm.formatDate(new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10)),
      authorize_id: 0,
      emp_rate: 0.0,
      emp_status: "A",
      email: "",
      password: "",
      image: null,
      imagesignature: "",
      user_role: "",
      filename: "",
      approver_level1: 0,
      approver_level2: 0,
      approver_level3: 0,
    },
    approver_show: [],
    companyshow: [],
    prename_th: ["นาย", "นาง", "นางสาว"],
    prename_en: ["Mr", "Miss", "Mrs."],
    user_role_show: [
      { id: "ADMIN", status_name: "ADMIN" },
      { id: "APPROVAL", status_name: "APPROVAL" },
      { id: "EMPLOYEE", status_name: "EMPLOYEE" },
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
    dialogDeleteimage: false,
    image: null,
    dialogpreviewimage: false,
    entry_date: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),
    statusall: ["ACTIVE", "INACTIVE"],
    userId: 0,
  }),
  async mounted() {
    this.userId = localStorage.getItem(server.USER_ID);
    // await api.checkVersion();
    await this.loadAccounts();
    await this.loadCompanyMaster(localStorage.getItem(server.COMPANYID));
    await this.loadAuthorize();
    await this.loaddataEdit();
    this.$hideLoader();
  },
  methods: {
    async loaddataEdit() {
      this.main_id = this.$route.params.id;
      const result = await api.getAccountid(this.main_id);
      if (result.data) {
        this.itemadd.emp_id = result.data.emp_id;
        this.itemadd.prename_th = result.data.prename_th;
        this.itemadd.firstname = result.data.firstname;
        this.itemadd.lastname = result.data.lastname;
        this.itemadd.username = result.data.username;
        this.itemadd.prename_en = result.data.prename_en;
        this.itemadd.firstname_en = result.data.firstname_en;
        this.itemadd.lastname_en = result.data.lastname_en;
        this.itemadd.abbname_en = result.data.abbname_en;
        this.itemadd.company_id = result.data.company_id;
        this.itemadd.department_id = result.data.department_id;
        this.itemadd.position_id = result.data.position_id;
        this.itemadd.division_id = result.data.division_id;
        this.itemadd.section_id = result.data.section_id;
        this.itemadd.level = result.data.level;
        this.itemadd.entry_date = result.data.entry_date;
        this.itemadd.authorize_id = result.data.authorize_id;
        this.itemadd.emp_rate = result.data.emp_rate;
        this.itemadd.emp_status = result.data.emp_status;
        this.itemadd.email = result.data.email;
        this.itemadd.password = result.data.password;
        this.itemadd.image = "";
        this.itemadd.imagesignature = result.data.imagesignature;
        this.itemadd.user_role = result.data.user_role;
        this.itemadd.filename = result.data.filename;
        this.itemadd.approver_level1 = result.data.approver_level1;
        this.itemadd.approver_level2 = result.data.approver_level2;
        this.itemadd.approver_level3 = result.data.approver_level3;

        this.initial_dataimage = result.data.imagesignature;
        this.initial_dataimage = `${imageUrl}/${result.data.id}/${result.data.imagesignature}`;
        await this.changeCompany(this.itemadd.company_id);
        await this.changeDepartment(this.itemadd.department_id);
        await this.changeDivision(this.itemadd.division_id);
        // if (result.data.logo == "" || result.data.logo == null) {
        //   this.checkimageadd = false;
        // } else {
        //   this.checkimageadd = true;
        // }
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
    previewImage: function (event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.previewimage = e.target.result;
          this.checkimageadd = true;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }

      this.imagename = this.image.name;
    },

    async popupdeleteimage() {
      this.dialogDeleteimage = true;
    },
    async closeDeleteimage() {
      this.dialogDeleteimage = false;
    },
    async deleteItemConfirmimage() {
      this.checkimageadd = false;
      this.image = null;
      this.previewimage = "";
      this.imagename = "";
      this.dialogDeleteimage = false;
    },
    async popuppreviewimage() {
      this.dialogpreviewimage = true;
    },
    async closepreviewimage() {
      this.dialogpreviewimage = false;
    },
    async savedata() {

      if (this.itemadd.emp_id == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Employee ID",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.prename_th == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter pre name",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.firstname == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter first name",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.lastname == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter last name",
          "text-h5 red--text text-center"
        );
        return;
      }


      if (this.itemadd.company_id == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select company",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.department_id == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Department Name",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.division_id == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Devision Name",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.section_id == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Section Name",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.authorize_id == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select authorize",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.position_id == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select position",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.username == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter username",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.password == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter password",
          "text-h5 red--text text-center"
        );
        return;
      }

      this.$showLoader();
      let formData = new FormData();
      formData.append("emp_id", this.itemadd.emp_id);
      formData.append("image", this.itemadd.image);
      // this.initial_dataimage
      formData.append("imagesignature", this.itemadd.imagesignature);
      formData.append("user_role", this.itemadd.user_role);
      formData.append("username", this.itemadd.username);
      formData.append("password", this.itemadd.password);
      formData.append("email", this.itemadd.email);
      formData.append("phone", this.itemadd.phone);
      formData.append("prename_th", this.itemadd.prename_th);
      formData.append("firstname", this.itemadd.firstname);
      formData.append("lastname", this.itemadd.lastname);
      formData.append("prename_en", this.itemadd.prename_en);
      formData.append("firstname_en", this.itemadd.firstname_en);
      formData.append("lastname_en", this.itemadd.lastname_en);
      formData.append("abbname_en", this.itemadd.abbname_en);
      formData.append("company_id", this.itemadd.company_id);
      formData.append("department_id", this.itemadd.department_id);
      formData.append("position_id", this.itemadd.position_id);
      formData.append("division_id", this.itemadd.division_id);
      formData.append("section_id", this.itemadd.section_id);
      formData.append("level", this.itemadd.level);
      formData.append("entry_date", this.entry_date);
      formData.append("emp_rate", this.itemadd.emp_rate);
      formData.append("emp_status", this.itemadd.emp_status);
      formData.append("authorize_id", this.itemadd.authorize_id);
      formData.append("approver_level1", this.itemadd.approver_level1);
      formData.append("approver_level2", this.itemadd.approver_level2);
      formData.append("approver_level3", this.itemadd.approver_level3);
      formData.append("user_create", this.userId);

      // Insert
      const res_add = await api.updateUserAccount(this.$route.params.id, formData);
      if (res_add.status == 200 || res_add.status == 201) {
        this.$hideLoader();
        this.$store.state.global_dialog_push = true;
        this.setupAlertDialogPush(
          true,
          "Success!!!",
          "Edit data success",
          "text-h5 green--text text-center",
          "/employee"
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
    async loadCompanyMaster(id) {
      const result = await api.getAllCompany();
      this.companyshow = result.data;
    },
    async changeCompany(com_id) {
      await this.loadDepartmentMaster(com_id);
      await this.loadPositionMaster(com_id);
    },

    async loadDepartmentMaster(id) {
      const result = await api.getDepartmentMaster(id);
      this.department_list = result.data;
    },

    async loadPositionMaster(id) {
      const result = await api.getPositionMaster(id);
      this.position_list = result.data;
    },
    async changeDepartment(department_id) {
      const result = await api.getDivisionByDepartment(department_id);
      this.division_list = result.data;

    },
    async changeDivision(division_id) {
      const result = await api.getSectionByCompanyID(division_id);
      this.section_list = result.data;

    },
    async loadAuthorize() {
      const res_get = await api.getSettingGroupMenu();
      this.authorize = res_get.data;
    },
    async loadAccounts() {
      const result = await api.getAccounts();
      this.desserts = result.data;
      const resultList = await api.getAccountslistActive();
      this.approver_show = resultList.data;

      // this.$showLoader();
      this.$hideLoader();
    },
    async previewimagetobasesignatureimage(event) {
      let setimage = "";
      try {
        var input = event.target;
        const reader = new FileReader();
        reader.onload = (event) => {
          // for preview image
          // this.imageURL = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);

        // for upload image
        setimage = event.target.files[0];
        this.itemadd.image = event.target.files[0];

        const toBase64 = (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          });

        this.initial_dataimage = await await toBase64(setimage);
        this.itemadd.imagesignature = input.files[0].name;
        // this.initial_dataimage = baseimagetosignature;

        // this.$refs.imagesignaturePad.resizeCanvas();
        // this.$refs.imagesignaturePad.fromDataURL(this.initial_dataimage);

        // this.savesigimage();
        // this.showbuttonsavesigimage = true;
        // this.showbuttonsavesig1 = false;
        // this.$refs.firstsignaturePad.lockSignaturePad();
      } catch (error) {
        // console.log("onFileSelected error:", error);
      }
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
  background-color: #1F51FF;
  color: white;
}

.v-btn:not(.v-btn--round).v-size--default.buttonred {
  width: 100%;
  background-color: #9e3b1b;
  color: white;
}
</style>