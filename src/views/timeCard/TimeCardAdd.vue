<template>
  <v-card-title>
    <v-container class="pa-1" fluid>
      <v-card class="pa-12">
        <v-card-title>
          <v-row>
            <v-col cols="12" md="12" justify="center" class="mb-6">
              <h3>Time card add</h3>
            </v-col>
          </v-row>
        </v-card-title>
        <v-row>
          <v-col cols="12" sm="8" md="4" justify="center" align="center" class="mb-n6 d-flex">
            <v-select :items="docGroups" item-text="module" item-value="id" v-model="selectedDocGroup"
              label="Document Group" outlined dense class="px-2" pa-0 :disabled="isSaveTimecardType" />
          </v-col>
          <v-col cols="12" sm="8" md="4">
            <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
              offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field :value="formatDisplayDate(date)" label="Doc Date" prepend-icon="mdi-calendar" readonly dense
                  outlined v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-radio-group v-model="selectedRadio" row>
            <v-col md="6" sm="6" class="d-flex" justify="center" align="center">
              <v-radio :label="`Work center`" value="work_center" hide-details />
              <v-autocomplete v-model="selectedWorkCenter" hide-details :items="workCenters" item-value="id"
                item-text="label" dense outlined :disabled="selectedRadio !== 'work_center'"></v-autocomplete>
            </v-col>
            <v-col md="6" sm="6" class="d-flex" justify="center" align="center">
              <v-radio :label="`Machine`" value="machine" hide-details />
              <v-autocomplete v-model="selectedMachine" @change="onSelectMachine" hide-details :items="machines"
                item-value="id" item-text="label" dense outlined :disabled="selectedRadio !== 'machine'"></v-autocomplete>
            </v-col>
            <v-col md="6" sm="6" class="d-flex" justify="center" align="center">
              <v-radio :label="`Work order`" value="work_order" hide-details />
              <v-autocomplete v-model="selectedWorkOrder" hide-details :items="workOrders" dense outlined
                :disabled="selectedRadio !== 'work_order'"></v-autocomplete>
            </v-col>
            <v-col md="6" sm="6" class="d-flex" justify="center" align="center">
              <v-radio :label="`Worker`" value="worker" hide-details />
              <v-autocomplete v-model="selectedWorker" hide-details :items="workers" item-value="id" item-text="label"
                dense outlined :disabled="selectedRadio !== 'worker'"></v-autocomplete>
            </v-col>
            <v-col md="6" sm="6" class="d-flex" justify="center" align="center">
              <v-radio :label="`Operation ORD`" value="operation_order" hide-details />
              <v-autocomplete v-model="selectedOperation" @change="onSelectOperationOrder" hide-details
                :items="operations" item-text="label" item-value="id" dense outlined
                :disabled="selectedRadio !== 'operation_order'"></v-autocomplete>
            </v-col>
          </v-radio-group>
        </v-row>
        <v-card-actions>
          <v-row justify="center" class="mt-3">
            <v-btn depressed width="100" class="mr-3 buttonblue" @click="savedata()" :disabled="isSaveTimecardType">
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
import dayjs from 'dayjs'
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
  },


  data: (vm) => ({
    isSaveTimecardType: false,
    date: dayjs().format('YYYY-MM-DD'),
    headers: [
      { text: "ORD", value: "ord", },
      { text: "WC", value: "wc" },
      { text: "MCH", value: "mch" },
      { text: "WO", value: "wo" },
      { text: 'OPN', value: 'opn' },
      { text: 'Item', value: 'item' },
      { text: 'Item Name', value: 'item_name' },
      { text: 'Worker', value: 'worker' },
      { text: 'WO type', value: 'wo_type' },
      { text: 'Downtime', value: 'downtime' },
      { text: 'Setup time', value: 'setup_time' },
      { text: 'qty', value: 'qty' },
      { text: 'defect', value: 'defect' },
      { text: 'Date', value: 'date' },
      { text: 'Time Start', value: 'time_start' },
      { text: 'Time End', value: 'time_end' },
      { text: 'Work Hr.', value: 'work_hours' },
      { text: 'Action', value: 'action' },
    ],
    mocks: [
      {
        ord: null,
        wc: null,
        mch: null,
        wo: null,
        opn: null,
        item: null,
        item_name: null,
        worker: null,
        wo_type: null,
        downtime: null,
        setup_time: null,
        qty: null,
        defect: null,
        date: null,
        time_start: null,
        time_end: null,
        work_hours: null,
      }
    ],
    date1: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted1: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu1: false,
    select_holiday_type: null,
    holiday_type_list: [
      { id: "D", status_name: "D" },
      { id: "H", status_name: "H" },
      { id: "I", status_name: "I" },
    ],
    tab: null,

    selectedRadio: null,
    workCenters: [],
    selectedWorkCenter: null,
    machines: [],
    selectedMachine: null,
    workOrders: [],
    selectedWorkOrder: null,
    workers: [],
    selectedWorker: null,
    operations: [],
    selectedOperation: null,
    docGroups: [],
    selectedDocGroup: null,

    select_work_center_group: null,
    itemadd: {
      wcg_id: null,
      date_from: null,
      holiday_type: null,
      hours: null,
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
    datetimeMenu: false,
    itemaddudefine: {
      module_master_id: 0,
      // u_define_module_id =1 คือ Item
      u_define_module_id: 1,
      numeric1: "",
      numeric2: "",
      company_id: localStorage.getItem(server.COMPANYID),
      date1: "",
      date2: "",
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
  watch: {
    selectedRadio(val) {
      this.selectedWorkCenter = null
      this.selectedMachine = null
      this.selectedWorkOrder = null
      this.selectedWorker = null
      this.selectedOperation = null
    },
  },
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

    this.loadWorkCenter();
    this.loadMachine()
    this.loadWorker()
    this.loadDocGroup()
    this.loadWorkOrder()
    this.loadOpn()
    await this.onLoadUdefineIDByCompanyAndModuleName(
      udgroup.TIMECARD,
      localStorage.getItem(server.COMPANYID)
    );
    this.udmodule_name = udgroup.TIMECARD;
    await this.loadAuthorize();
    this.$hideLoader();
  },
  methods: {
    async onHoursChange() {
      if (this.select_holiday_type == "D") {
        this.itemadd.hours = null;

        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Type of holiday is  D, Cannot input Hours",
          "text-h5 red--text text-center"
        );
        return;
      }
    },
    async loadWorkCenter() {
      const response = await api.getWorkCenterMaster(
        localStorage.getItem(server.COMPANYID)
      )
      this.workCenters = response.data.map(data => ({ ...data, label: `${data.wc_id}:${data.wc_name}` }))
    },
    async loadMachine() {
      const response = await api.listMachineByCompany(
        localStorage.getItem(server.COMPANYID)
      )
      this.machines = response.data.map(data => ({ ...data, label: `${data.machine_id}:${data.name}` }))
    },
    async loadWorker() {
      const response = await api.getWorkerByCompany()
      this.workers = response.data.map(data => ({ ...data, label: `${data.emp_id}:${data.firstname} ${data.lastname}` }))
    },
    async loadWorkOrder() {
      const response = await api.getWorkOrderOption()
      this.workOrders = response.data
    },
    async loadOpn() {
      const response = await api.getOpnOrdOption(localStorage.getItem(server.COMPANYID))
      this.operations = response.data
    },
    async loadDocGroup() {
      const res_get = await api.getDocRunningGroupByGroupName("TC");
      this.docGroups = res_get.data;
    },
    async changeHolidayType() {
      if (this.select_holiday_type == "D") {
        this.itemadd.hours = null;
      }
    },
    async loadWorkCenterGroup() {
      const res_get = await api.getWorkCenterGroupMaster(
        localStorage.getItem(server.COMPANYID)
      );

      this.work_center_group_list = res_get.data.map(data => ({ ...data, label: `${data.work_center_group_id}: ${data.work_center_group_name}` }));
    },
    async onSelectMachine(val) {
      const response = await api.getMachineWithWCById(val)
      this.selectedWorkCenter = response.data.tbl_work_center.id
    },
    async onSelectOperationOrder(val) {
      const response = await api.getOpnOrd(val)
      if (response.data) {
        this.selectedWorkCenter = response.data.tbl_mch.work_center_id
        this.selectedMachine = response.data.tbl_mch.id
        this.selectedWorkOrder = response.data.doc_running_no
      }

    },
    async onSelectWorker(val) {

    },
    formatDisplayDate(date) {
      if (!date) {
        return
      }
      return date === 'Invalid Date' ? "" : dayjs(date).format('DD/MM/YYYY')
    },
    async onLoadUdefineIDByCompanyAndModuleName(module_name, company_id) {
      const res_get = await api.getu_define_module_UdefineIDByCompanyAndModuleName(
        module_name,
        company_id
      );

      this.main_u_define_module_id = res_get.data[0].id;
      this.itemaddudefine.u_define_module_id = this.main_u_define_module_id;
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

      const addData = {
        "company_id": localStorage.getItem(server.COMPANYID),
        "doc_group_id": this.selectedDocGroup,
        "wc_id": this.selectedWorkCenter,
        "mch_id": this.selectedMachine,
        "wo_running_no": this.selectedWorkOrder,
        "worker_id": this.selectedWorker,
        "opn_ord_id": this.selectedOperation,
        "time_card_type": this.selectedRadio,
        "doc_date": this.date,
        "status": "save"
      }
      this.itemadd = addData

      if (addData.doc_group_id === null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select document group",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (addData.doc_date === null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select document date",
          "text-h5 red--text text-center"
        );
        return;
      }


      if (addData.time_card_type === null || addData.time_card_type === "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please choose time card type",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (addData.time_card_type === 'work_center' && addData.wc_id === null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select work center",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (addData.time_card_type === 'machine' && addData.mch_id === null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select machine",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (addData.time_card_type === 'work_order' && addData.wo_id === null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select work order",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (addData.time_card_type === 'worker' && addData.worker_id === null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select work order",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (addData.time_card_type === 'operation_order' && addData.opn_ord_id === null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select operation order",
          "text-h5 red--text text-center"
        );
        return;
      }
      const res_add = await api.addTimecard(this.itemadd);

      if (res_add.status == 200) {
        this.$hideLoader();
        this.itemaddudefine.module_master_id = res_add.data.id;
        this.itemaddudefine.date1 = this.parseDate(this.itemaddudefine.date1);
        this.itemaddudefine.date2 = this.parseDate(this.itemaddudefine.date2);

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
            `/time-card/${res_add.data.id}/edit`
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
        // this.initial_dataimage = baseimagetosignature;


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
    get_work_center_group_name(item) {
      return `${item.work_center_group_id}:${item.work_center_group_name}`;
    },

    // getunitname(item){
    //   return `${item.unit_name} (${item.unit_item})`;
    // },

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

.v-input--selection-controls {
  margin-top: 0px
}

.v-input__slot {
  margin-bottom: 0px
}

.v-data-table {
  width: 100%;
}
</style>