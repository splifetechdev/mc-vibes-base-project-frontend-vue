<template>
  <v-container fluid>
    <v-card class="ma-3">
      <v-row class="mt-5 ml-5 mr-5">
        <v-col cols="12" md="12">
          <v-row>
              <v-toolbar-title class="text-h6 mt-4">Production Status Report : </v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-col cols="12" md="2">
                <v-autocomplete  label="Work order" v-model="itemsearch.doc_running_no" hide-details outlined dense
                :items="workOrders" item-text="doc_running_no" item-value="doc_running_no" clearable></v-autocomplete>
                    </v-col>
              <v-col cols="12" md="2">
                <v-autocomplete  label="Work Center" v-model="itemsearch.work_center_id" hide-details outlined dense
                :items="workCenters" :item-text="getwork_center_name" item-value="id" clearable></v-autocomplete>
                      </v-col>
              <v-col cols="12" md="2">
                <v-autocomplete  label="Machine" v-model="itemsearch.machine_id" hide-details outlined dense
                :items="machines"  :item-text="getmachine_name" item-value="id" clearable></v-autocomplete>
        </v-col>
            <v-col cols="12" md="2" justify="center">
              <v-btn
                  color="#1f51ff"
                  dark
                  class="mb-2 mr-2"
                  @click="SearchData"
                >
                  Search
                </v-btn>
            </v-col>
      </v-row>
        </v-col>
      </v-row>
      <v-row >
        <v-col cols="12" md="4">
      <v-data-table :headers="headers" :items="itemsAlldata" :search="search" :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus',
      }" sort-by="fullname" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title class="flex text-center">
      <h4>Plan</h4>
 </v-toolbar-title>
          </v-toolbar>
        </template>
      <template v-slot:item.setup_time="{ item }">
        {{ Number(item.setup_time).toFixed(2) }}
        </template>
        <template v-slot:item.time_process_by_opn="{ item }">
          {{ Number(item.production_time).toFixed(2) }}
        </template>
        <template v-slot:item.real_qty_order_scrap_by_opn="{ item }">
          {{ Number(item.opn_qty).toFixed(2) }}
        </template>
        <template v-slot:item.defect_qty="{ item }">
         0
        </template>
      </v-data-table>
    </v-col>

    <v-col cols="12" md="4">
      <v-data-table :headers="headers" :items="itemsAlldata" :search="search" :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus',
      }" sort-by="fullname" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title class="flex text-center">
      <h4>Actual</h4>
 </v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:item.setup_time="{ item }">
          {{ item.tbl_routings[0]?Number(item.tbl_routings[0].setup_time).toFixed(2):Number(0).toFixed(2) }}
        </template>
        <template v-slot:item.time_process_by_opn="{ item }">
          {{ Number(item.actual_sum_work_hours).toFixed(2) }}
        </template>
        <template v-slot:item.real_qty_order_scrap_by_opn="{ item }">
          {{ Number(item.actual_sum_qty).toFixed(2) }}
        </template>
        <template v-slot:item.defect_qty="{ item }">
          {{ item.actual_sum_qty * ((item.tbl_routings[0]?Number(item.tbl_routings[0].scrap).toFixed(2):Number(0).toFixed(2))/100) }}
        </template>
      </v-data-table>
    </v-col>

    <v-col cols="12" md="4">
      <v-data-table :headers="headers" :items="itemsAlldata" :search="search" :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus',
      }" sort-by="fullname" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title class="flex text-center">
      <h4>Different</h4>
 </v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:item.setup_time="{ item }">
           <span class="red--text" v-if="Number(item.tbl_routings[0]?Number(item.tbl_routings[0].setup_time).toFixed(2):Number(0).toFixed(2) - item.setup_time).toFixed(2) < 0"> {{ Number(item.tbl_routings[0]?Number(item.tbl_routings[0].setup_time).toFixed(2):Number(0).toFixed(2) - item.setup_time).toFixed(2)}}</span>
          <span v-else> {{ Number(item.tbl_routings[0]?Number(item.tbl_routings[0].setup_time).toFixed(2):Number(0).toFixed(2) - item.setup_time).toFixed(2)}}</span> 
        </template>
        <template v-slot:item.time_process_by_opn="{ item }">
          <span class="red--text" v-if="Number(item.actual_sum_work_hours - item.production_time).toFixed(2) < 0"> {{ Number(item.actual_sum_work_hours - item.production_time).toFixed(2)}}</span>
          <span v-else> {{ Number(item.actual_sum_work_hours - item.production_time).toFixed(2)}}</span> 
        </template>
        <template v-slot:item.real_qty_order_scrap_by_opn="{ item }">
          <span class="red--text" v-if="Number(item.actual_sum_qty - item.opn_qty) < 0"> {{ Number(item.actual_sum_qty - item.opn_qty)}}</span>
          <span v-else> {{ Number(item.actual_sum_qty - item.opn_qty)}}</span> 
        </template>
        <template v-slot:item.defect_qty="{ item }">
          <span class="red--text" v-if="Number(0 - item.actual_sum_qty * ((item.tbl_routings[0]?Number(item.tbl_routings[0].scrap).toFixed(2):Number(0).toFixed(2))/100)) < 0"> {{ Number(0 - item.actual_sum_qty * ((item.tbl_routings[0]?Number(item.tbl_routings[0].scrap).toFixed(2):Number(0).toFixed(2))/100))}}</span>
          <span v-else> {{ Number(0 - item.actual_sum_qty * ((item.tbl_routings[0]?Number(item.tbl_routings[0].scrap).toFixed(2):Number(0).toFixed(2))/100))}}</span>
        </template>
      </v-data-table>
    </v-col>
    </v-row>
    </v-card>
    <SuccessDialog :status="dialogAdd" :text_color="text_color" :title="title" :message="message" />
    <v-dialog v-model="confirmDeleteDlg" max-width="290">
      <v-card>
        <v-card-title primary-title>
          Confirm Delete
        </v-card-title>

        <v-card-text class="body">
          Are you sure to delete this timecard? You cannot restore it after
          clicking confirm.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="confirmDeleteDlg = false">
            Cancel
          </v-btn>

          <v-btn color="error" text @click="confirmDelete">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import SuccessDialog from "@/components/cards/SuccessDialog";
import SuccessDialogPush from "@/components/cards/SuccessDialogPush";
import api from "@/services/api";
import { server } from "@/services/constants";
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)
export default {
  data: (vm) => ({
    itemsAlldata:[],
    itemsearch:{
      doc_running_no:"",
      work_center_id:0,
      machine_id:0,
    },
    menu: false,
    dateFormatted1: '',
    docNoList: [],
    workOrders: [],
    docGroups: [],
    workCenters: [],
    machines: [],
    opnOrdList: [],
    confirmDeleteDlg: false,
    selectedTimecardId: null,
    selectedWorkCenterId: null,
    selectedDocGroupId: null,
    selectedDocRunningNo: null,
    selectedOpnOrdId: null,
    selectedDates: null,
    selectedStatus: 'save',
    statusOptions: ['save', 'post'],
    list: [],
    headers: [
    { text: "ID", value: "id", },
      { text: "Set Up Hrs", value: "setup_time", },
      { text: "Run Hrs", value: "time_process_by_opn" },
      { text: "QTY", value: "real_qty_order_scrap_by_opn" },
      { text: "Defect QTY", value: "defect_qty" },
    ],
    itemchangeapproval: {
      oldapproval: 0,
      newapproval: 0,
    },
    authorize_add: false,
    authorize_edit: false,
    authorize_del: false,
    approver_active_show: [],
    approver_all_show: [],
    dialogchangeapproval: false,
    title: "green",
    message: "green",
    text_color: "text-h5 green--text text-center",
    dialogAdd: false,
    search: "",
    documentGroupOptions: [],
    selectedDocumentGroup: "",
    menu1: false,
    dates: [null, null],
  }),
  components: {
      SuccessDialog,
      SuccessDialogPush
    },
  computed: {
    dateRangeText() {
      return this.dates.join(' ~ ')
    },
  },
  watch: {
    dates(val) {
      const [dates1, dates2] = val
      this.dateFormatted1 = ''
      if (dates1) {
        this.dateFormatted1 += dayjs(dates1).format('DD/MM/YYYY')
      }
      if (dates2) {
        this.dateFormatted1 += ','
        this.dateFormatted1 += dayjs(dates2).format('DD/MM/YYYY')
      }

    },
  },
  methods: {
    async SearchData(){
      if(this.itemsearch.doc_running_no == "" || this.itemsearch.doc_running_no == null){
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Please enter Work Order",
            "text-h5 red--text text-center"
          );
          return;
        }
        this.$showLoader();
       const results = await api.productionStatusReport(this.itemsearch);
        this.itemsAlldata = results.data;
        this.$hideLoader();
    },
    onChange(event) {
    },
    openchangeapproval() {
      this.dialogchangeapproval = true;
    },
    getStatusColor(item) {
      const { status } = item
      if (status?.toLowerCase() === 'post') {
        return 'green'
      } else {
        return 'yellow'
      }
    },
    setupAlertDialog(status, title, message, text_color) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
    },
    onClickDeleteBtn(item) {
      this.selectedTimecardId = item.id
      this.confirmDeleteDlg = true
    },
    async loadWorkOrder() {
      const response = await api.getOrderByCompanyID(
        localStorage.getItem(server.COMPANYID)
      );
      this.workOrders = response.data
    },
    
    async confirmDelete() {
      await api.deleteTimecard(this.selectedTimecardId);
      this.confirmDeleteDlg = false;
    },
    async loadAccountsActive() {
      const resultList = await api.getAccountslistActive();
      this.approver_active_show = resultList.data;
    },
    async loadAccountsAll() {
      const resultList = await api.getAccountslist();
      this.approver_all_show = resultList.data;
    },
    async loadAuthorize() {
      const res_get = await api.getSettingGroupMenu();
      this.authorize = res_get.data;
    },
    async loadDocGroup() {
      const res_get = await api.getDocRunningGroupByGroupName("TC");
      this.docGroups = res_get.data;
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
    getwork_center_name(item) {
      return `${item.wc_id}:${item.wc_name}`;
    },
    getmachine_name(item) {
      return `${item.machine_id}:${item.name}`;
    },
  },
  async created() {
  },
  async mounted() {
    this.userId = localStorage.getItem(server.USER_ID);
    let yourUrlString = window.location;
    let parser = document.createElement("a");
    parser.href = yourUrlString;
    this.authorize_id = localStorage.getItem(server.AUTHORIZE_ID);
    if (this.authorize_id == null || this.authorize_id == 0) {
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
    const res_auth = await api.getAuthorize(this.userId, router_path);
    this.authorize_view = res_auth.data[0].smd_view >= 1 ? true : false;
    this.authorize_add = res_auth.data[0].smd_add >= 1 ? true : false;
    this.authorize_edit = res_auth.data[0].smd_edit >= 1 ? true : false;
    this.authorize_del = res_auth.data[0].smd_del >= 1 ? true : false;

    if (!this.authorize_view) {
      this.$router.back();
    }
    // ----------------- Check Authorize ---------------------------
    this.loadDocGroup()
    this.loadWorkCenter()
    this.loadMachine()
    this.loadWorkOrder()
    this.$hideLoader();

    let comp_id = localStorage.getItem(server.COMPANYID);
    await this.loadAuthorize();

    if (this.userId && api.isLoggedIn()) {
      // this.$router.push("/");
    } else {
      this.$store.state.isLogged = false;
      this.$router.push("/login");
    }
  },
  beforeCreate() {
    this.$store.state.navMenu = true;
  },
}
</script>
<style scoped>
.row1 {
  padding-top: 20px;
}
</style>
