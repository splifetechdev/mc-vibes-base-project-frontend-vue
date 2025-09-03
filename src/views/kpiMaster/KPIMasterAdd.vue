<template>
  <v-card-title>
    <v-container class="pa-1" fluid>
      <v-card class="pa-12">
        <v-card-title>
          <v-row>
            <v-col cols="12" md="12" justify="center" class="mb-6">
              <h3>KPI Master Add</h3>
            </v-col>
          </v-row>
        </v-card-title>
        <v-row>
          <v-col cols="12" md="12" justify="center">
            <div id="tabs" class="containertab">
              <div class="tabs">
                <div v-on:click="activetab = 1" v-bind:class="[activetab === 1 ? 'active' : '']">
                  General
                </div>
                <div class="ml-1" v-on:click="activetab = 3" v-bind:class="[activetab === 3 ? 'active' : '']">
                  U-define
                </div>
              </div>

              <div class="content">
                <div v-if="activetab === 1 && callsoopentab == true" class="tabcontent">
                  <v-row no-gutters class="mb-n6">
                    <v-col cols="12" sm="2" md="2">
                      <div class="pt-4" align="center">
                        <p>
                          Setup By *
                        </p>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="10" md="10">
                      <v-radio-group autofocus v-model="rd_wc_row" row @change="onSetupChange()">
                        <v-radio label="Work Center Group" value="wcg"></v-radio>
                        <v-radio label="Work Center" value="wc"></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                  <v-row class="mb-n6">
                    <v-col cols="12" sm="6" md="6" v-show="!rd_status">
                      <v-select ref="sl_wcg" v-model="select_work_center_group" :items="work_center_group_list"
                        label="Work Center Group *" outlined item-text="work_center_group_name"
                        item-value="work_center_group_id" dense></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" v-show="rd_status">
                      <v-select ref="sl_wc" v-model="select_work_center" :items="work_center_list" label="Work Center *"
                        outlined item-text="wc_name" item-value="wc_id" dense></v-select>
                    </v-col>
                  </v-row>

                  <v-row class="mb-n6">
                    <v-col cols="12" sm="6" md="6">
                      <v-select v-model="select_title" :items="title_list" label="Title *" outlined item-text="kpi_title"
                        item-value="id" dense></v-select>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <v-text-field v-model="itemadd.target" label="Target" outlined dense type="number"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <v-text-field v-model="itemadd.uom" label="UOM" outlined dense></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="mb-n6">
                    <v-col cols="12" sm="6" md="6">
                      <v-menu v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y
                        max-width="290px" min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field v-model="computedDateFormatted1" label="Date Start" persistent-hint
                            prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" dense outlined></v-text-field>
                        </template>
                        <v-date-picker v-model="date1" no-title @input="menu1 = false"></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-menu v-model="menu2" :close-on-content-click="false" transition="scale-transition" offset-y
                        max-width="290px" min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field v-model="computedDateFormatted2" label="Date End" persistent-hint
                            prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" dense outlined></v-text-field>
                        </template>
                        <v-date-picker v-model="date2" no-title @input="menu2 = false"></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </div>
                <div v-if="activetab === 3" class="tabcontent">
                  <UDefine :udmodulename="udmodule_name" :dataudefine="itemaddudefine" @dataOnUdefine="getdataOnUdefine">
                  </UDefine>
                </div>
              </div>
            </div>
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
import UDefine from "@/views/u-define/UDefine";

import { server, udgroup } from "@/services/constants";
export default {
  components: {
    SuccessDialog,
    SuccessDialogPush,
    UDefine,
  },
  computed: {
    computedDateFormatted() {
      return this.formatDaparseDatete(this.date);
    },
    computedDateFormatted1() {
      return this.formatDate(this.date1);
    },
    computedDateFormatted2() {
      return this.formatDate(this.date2);
    },
  },

  watch: {
    date1(val) {
      this.dateFormatted1 = this.formatDate(this.date1);
    },
    date2(val) {
      this.dateFormatted2 = this.formatDate(this.date2);
    },

    last_purchase_price_date(val) {
      this.itemadd.last_purchase_price_date = this.formatDate(
        this.last_purchase_price_date
      );
    },
    cost_price_date(val) {
      this.itemadd.cost_price_date = this.formatDate(this.cost_price_date);
    },
    sales_price_date(val) {
      this.itemadd.sales_price_date = this.formatDate(this.sales_price_date);
    },

    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  data: (vm) => ({
    rd_status: false,
    work_center_group_list: [],
    select_work_center_group: null,
    work_center_list: [],
    select_work_center: null,
    title_list: [],
    select_title: null,
    date1: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted1: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    dateFormatted2: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu1: false,
    menu2: false,
    rd_wc_row: null,
    tab: null,
    itemadd: {
      set_up_by: null,
      wcg_id: null,
      wc_id: null,
      title_id: null,
      target: null,
      uom: null,
      date_start: null,
      date_end: null,
      company_id: localStorage.getItem(server.COMPANYID),
      user_create: localStorage.getItem(server.USER_ID),
      created_at: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    },
    last_purchase_price_date: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),
    cost_price_date: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),
    sales_price_date: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),

    main_u_define_module_id: 0,
    itemaddudefine: {
      module_master_id: 0,
      // u_define_module_id =1 คือ Item
      u_define_module_id: 1,
      numeric1: "",
      numeric2: "",
      company_id: localStorage.getItem(server.COMPANYID),
      date1: null,
      date2: null,
      boolean1: false,
      boolean2: false,
      char1: "",
      char2: "",
      text1: "",
      text2: "",
    },
    approver_show: [],
    itemgrouplist: [],
    unitgrouplist: [],
    companyshow: [],
    itemtypelist: [],
    dimgrouplist: [],
    modelgrouplist: [],
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
    menu2: false,
    menu3: false,
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
    statusall: ["ACTIVE", "INACTIVE"],
    userId: 0,
    activetab: 1,
    callsoopentab: true,
    udmodule_name: "",
  }),
  async mounted() {
    this.userId = localStorage.getItem(server.USER_ID);
    // await api.checkVersion();
    //await this.loadAccounts();
    //await this.loadCompanyMaster(localStorage.getItem(server.COMPANYID));
    // await this.loadItemGroupList(localStorage.getItem(server.COMPANYID));
    // await this.loadItemTypeMaster(localStorage.getItem(server.COMPANYID));
    // await this.loadUnitGroupList(localStorage.getItem(server.COMPANYID));
    // await this.loadDimGroupList(localStorage.getItem(server.COMPANYID));
    // await this.loadModelGroupList(localStorage.getItem(server.COMPANYID));

    // console.log("udgroup.KPI_MASTER", udgroup.KPI_MASTER);
    this.rd_wc_row = "wcg";

    await this.onLoadUdefineIDByCompanyAndModuleName(
      udgroup.KPI_MASTER,
      localStorage.getItem(server.COMPANYID)
    );
    this.udmodule_name = udgroup.KPI_MASTER;
    await this.loadAuthorize();
    await this.loadWorkCenterGroup();
    await this.loadWorkCenter();
    await this.loadTitle();
    this.$hideLoader();
  },
  methods: {
    async onSetupChange() {
      console.log("this.rd_wc_row", this.rd_wc_row);
      if (this.rd_wc_row == "wcg") {
        this.select_work_center = null;
        this.rd_status = false;
      } else {
        this.select_work_center_group = null;
        this.rd_status = true;
      }
    },
    async loadTitle() {
      const res_get = await api.getKPITitleMaster(
        localStorage.getItem(server.COMPANYID)
      );
      this.title_list = res_get.data;
      // console.log("this.title_list", JSON.stringify(this.title_list));
    },
    async loadWorkCenterGroup() {
      const res_get = await api.getWorkCenterGroupAndName(
        localStorage.getItem(server.COMPANYID)
      );
      this.work_center_group_list = res_get.data;
      // console.log(
      //   "this.work_center_group_list",
      //   JSON.stringify(this.work_center_group_list)
      // );
    },
    async loadWorkCenter() {
      const res_get = await api.getWorkCenterAndName(
        localStorage.getItem(server.COMPANYID)
      );
      this.work_center_list = res_get.data;
      // console.log(
      //   "this.work_center_list",
      //   JSON.stringify(this.work_center_list)
      // );
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    // parseDate(date) {
    //   if (!date) return null;

    //   const [month, day, year] = date.split("/");
    //   return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    // },
    async onLoadUdefineIDByCompanyAndModuleName(module_name, company_id) {
      const res_get = await api.getu_define_module_UdefineIDByCompanyAndModuleName(
        module_name,
        company_id
      );

      // console.log("res_get", JSON.stringify(res_get.data));
      this.main_u_define_module_id = res_get.data[0].id;
      this.itemaddudefine.u_define_module_id = this.main_u_define_module_id;
      // console.log("this.main_u_define_module_id:", this.main_u_define_module_id);
    },
    async getdataOnUdefine(dataudefine) {
      this.itemaddudefine = dataudefine;
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
      this.itemadd.date_start = this.date1;
      this.itemadd.date_end = this.date2;
      this.itemadd.set_up_by = this.rd_wc_row;
      this.itemadd.wcg_id = this.select_work_center_group;
      this.itemadd.wc_id = this.select_work_center;
      this.itemadd.title_id = this.select_title;

      // console.log("savedata:", JSON.stringify(this.itemadd));
      // console.log(this.itemaddudefine);
      // return;

      if (this.itemadd.set_up_by == null || this.itemadd.set_up_by == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please fill in the Setup By",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.set_up_by == "wcg") {
        if (this.itemadd.wcg_id == null || this.itemadd.wcg_id == "") {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Please fill in the Work Center Group",
            "text-h5 red--text text-center"
          );
          return;
        }
      } else {
        if (this.itemadd.wc_id == null || this.itemadd.wc_id == "") {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Please fill in the Work Center",
            "text-h5 red--text text-center"
          );
          return;
        }
      }

      if (this.itemadd.title_id == null || this.itemadd.title_id == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please fill in the Title",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.target == null || this.itemadd.target == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please fill in the Target",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.uom == null || this.itemadd.uom == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please fill in the UOM",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.date_start == null || this.itemadd.date_start == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please fill in the Date Start",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.date_end == null || this.itemadd.date_end == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please fill in the Date End",
          "text-h5 red--text text-center"
        );
        return;
      }

      console.log("this.itemadd : ", JSON.stringify(this.itemadd));
      const res_add = await api.addKPIMaster(this.itemadd);

      console.log("res_add: ", JSON.stringify(res_add.data));
      if (res_add.status == 200) {
        this.$hideLoader();
        this.itemaddudefine.module_master_id = res_add.data.id;
        this.itemaddudefine.date1 = this.parseDate(this.itemaddudefine.date1);
        this.itemaddudefine.date2 = this.parseDate(this.itemaddudefine.date2);

        // console.log(
        //   "this.itemaddudefine : ",
        //   JSON.stringify(this.itemaddudefine)
        // );
        this.itemaddudefine.u_define_module_id = this.main_u_define_module_id;
        const res_addudefine = await api.addu_define_master(
          this.itemaddudefine
        );

        if (res_addudefine.status == 200) {
          this.$hideLoader();
          this.$store.state.global_dialog_push = true;
          this.setupAlertDialogPush(
            true,
            "Success!!!",
            "Add data success",
            "text-h5 green--text text-center",
            "/kpi-master-list"
          );
          return;
        } else {
          this.itemaddudefine.date1 = this.formatDate(
            this.itemaddudefine.date1
          );
          this.itemaddudefine.date2 = this.formatDate(
            this.itemaddudefine.date2
          );
          this.$hideLoader();
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Add data Failed",
            "text-h5 red--text text-center"
          );
          return;
        }
        return;
      } else if (res_add.status == 204) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Add data Item ID Duplicate",
          "text-h5 red--text text-center"
        );
        return;
      } else {
        this.$hideLoader();
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Add data Failed",
          "text-h5 red--text text-center"
        );
        return;
      }
    },
    async loadItemGroupList(id) {
      const result = await api.getGroupItemByCompanyID(id);
      this.itemgrouplist = result.data;
    },
    async loadUnitGroupList(id) {
      const result = await api.getUnitByCompanyID(id);
      this.unitgrouplist = result.data;
    },
    async loadDimGroupList(id) {
      const result = await api.getDimGroupByCompanyID(id);
      this.dimgrouplist = result.data;
      // this.dimgrouplist = [{id:1,name:"dim group fixed"}]
    },
    async loadModelGroupList(id) {
      const result = await api.getModelGroupByCompanyID(id);
      this.modelgrouplist = result.data;
      // this.modelgrouplist = [{id:1,name:"model group fixed"}]
    },

    async loadCompanyMaster(id) {
      const result = await api.getAllCompany();
      this.companyshow = result.data;
    },
    async loadItemTypeMaster(id) {
      const result = await api.getItemTypeByCompanyID(id);
      this.itemtypelist = result.data;
      // this.itemtypelist = [{id:1,name:"item type fixed"}]
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
        // console.log(baseimagetosignature);
        // this.initial_dataimage = baseimagetosignature;
        // console.log(this.initial_dataimage);

        // this.$refs.imagesignaturePad.resizeCanvas();
        // this.$refs.imagesignaturePad.fromDataURL(this.initial_dataimage);

        // this.savesigimage();
        // this.showbuttonsavesigimage = true;
        // this.showbuttonsavesig1 = false;
        // this.$refs.firstsignaturePad.lockSignaturePad();
      } catch (error) {
        console.log("onFileSelected error:", error);
      }
    },
    getgroupname(item) {
      return `${item.group_name} (${item.group_item})`;
    },
    getgroupnameitemtype(item) {
      return `${item.type_name} (${item.item_type})`;
    },
    getgroupnamedimgroup(item) {
      return `${item.dimgroup_name}`;
    },
    getgroupnamemodelgroup(item) {
      return `${item.model_group_name}`;
    },
    // getunitname(item){
    //   return `${item.unit_name} (${item.unit_item})`;
    // },

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

.v-tab.v-tab--active {
  background-color: #1f51ff;
  color: white;
}

.v-slide-group__content {
  border: solid;
}

.theme--light.v-tabs>.v-tabs-bar .v-tab:not(.v-tab--active),
.theme--light.v-tabs>.v-tabs-bar .v-tab:not(.v-tab--active)>.v-icon,
.theme--light.v-tabs>.v-tabs-bar .v-tab:not(.v-tab--active)>.v-btn,
.theme--light.v-tabs>.v-tabs-bar .v-tab--disabled {
  color: black;
  /* border: solid 1px; */
}

.containertab {
  max-width: 100%;
  min-width: 100%;
  margin: 40px auto;
  /* font-family: Arial, Helvetica, sans-serif; */
  font-size: 0.9em;
  color: #888;
}

.tabs {
  overflow: hidden;
  /* margin-left: 20px; */
  /* margin-bottom: -2px; */
}

.tabs ul {
  list-style-type: none;
  margin-left: 20px;
}

.tabs div {
  width: 150px;
  height: 50px;
  color: #000000;
  float: left;
  cursor: pointer;
  padding: 10px 24px;
  transition: background-color 0.2s;
  border: 1px solid #595959;
  /* border-right: none; */
  border-right: 1px solid #595959;
  background-color: #ffffff;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}

/* .tabs a:last-child {
  border-right: 1px solid #595959;
} */

/* Change background color of tabs on hover */
.tabs div:hover {
  background-color: #2f5bfc;
  color: #fff;
}

/* Styling for active tab */
.tabs div.active {
  background-color: #1f51ff;
  color: #ffffff;
  /* border-bottom: 2px solid #fff; */
  cursor: default;
}

/* Style the tab content */
.tabcontent {
  padding: 30px;
  border: 1px solid #595959;
  /* border-radius: 10px; */
  border-radius: 0px 10px 10px 10px;
  box-shadow: 3px 3px 6px #e1e1e1;
}
</style>
