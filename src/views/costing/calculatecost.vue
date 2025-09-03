<template>
  <v-container fluid>
    <v-card class="ma-3">
      <v-row class="mt-5 ml-5 mr-5">
        <v-col cols="12" md="12">
          <v-row>
            <v-toolbar-title class="text-h6 mt-4"
              >Calculate Cost:
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-col cols="12" md="3">
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    clearable
                    @click:clear="
                      $nextTick(() => {
                        itemsearch.date1 = '';
                        date1 = '';
                      })
                    "
                    v-model="itemsearch.date1"
                    persistent-hint
                    @keydown.enter="date1 = parseDate(itemsearch.date1)"
                    @blur="date1 = parseDate(itemsearch.date1)"
                    append-icon="mdi-calendar"
                    label="วันที่ผลิต"
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    dense
                  ></v-text-field>
                </template>

                <v-date-picker
                  v-model="date1"
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" md="2" justify="center">
              <v-btn color="#1f51ff" dark class="mb-2 mr-2" @click="SearchData">
                Calculate
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!-- <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        sort-by="fullname"
        class="elevation-1"
        hide-default-header
        disable-pagination
        disable-sort
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          prevIcon: 'mdi-minus',
          nextIcon: 'mdi-plus',
        }"
      >
      
        <template v-slot:[`item.actions`]="{ item }">
        
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">
            Reset
          </v-btn>
        </template>
      </v-data-table> -->
    </v-card>
    <SuccessDialog
      :status="dialogAdd"
      :text_color="text_color"
      :title="title"
      :message="message"
    />
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
import {
  tolocalestringnumber,
  stringcommatonumber,
} from "../jsfunction/tolocalestringnumber";
import api from "@/services/api";
import { server } from "@/services/constants";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
export default {
  data: (vm) => ({
    menu1: false,
    menu2: false,
    date1: "",
    date2: "",
    doc_status: [
      { id: "A", status_name: "Approve" },
      { id: "C", status_name: "Close" },
    ],
    itemsAlldata: [],
    itemsearch: {
      date1: "",
    },
    menu: false,
    dateFormatted1: "",
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
    selectedStatus: "save",
    statusOptions: ["save", "post"],
    list: [],
    headers: [
      {
        text: "ORD",
        value: "doc_running_no",
        align: "center",
        divider: true,
      },
      { text: "Status", value: "status", align: "center" },
      { text: "Item", value: "item_id", align: "center" },
      { text: "Item Name", value: "item_name", align: "center" },
      {
        text: "Standart HRS",
        value: "std_hours",
        sortable: false,
        align: "center",
      },
      {
        text: "ACTUAL HRS",
        value: "act_hours",
        sortable: false,
        align: "center",
      },
      {
        text: "Standart",
        value: "std_labor",
        sortable: false,
        align: "center",
        divider: true,
        children: [
          { title: "DL", value: "std_labor" },
          { title: "FOH", value: "std_foh" },
          { title: "VOH", value: "std_voh" },
        ],
      },
      // { text: "STD FOH", value: "std_foh", sortable: false },
      // { text: "STD VOH", value: "std_voh", sortable: false },
      // { text: "ACT DL", value: "act_labor", sortable: false },
      // { text: "ACT FOH", value: "act_foh", sortable: false },
      // { text: "ACT VOH", value: "act_voh", sortable: false },
      {
        text: "ACTUAL",
        value: "act_labor",
        sortable: false,
        align: "center",
        children: [
          { title: "DL", value: "act_labor" },
          { title: "FOH", value: "act_foh" },
          { title: "VOH", value: "act_voh" },
        ],
      },
      {
        text: "Varience",
        value: "V_DL_Hours",
        sortable: false,
        align: "center",
        divider: true,
        children: [
          { title: "DL HR", value: "V_DL_Hours" },
          // { title: "DL RATE", value: "V_DL_Rate" },
          { title: "FOH HR", value: "V_foh" },
          { title: "VOH HR", value: "V_voh" },
        ],
        triplechildren: [
          { title: "DL", value: "std_labor" },
          { title: "FOH", value: "std_foh" },
          { title: "DL", value: "std_labor" },
          { title: "FOH", value: "std_foh" },
        ],
      },

      // {
      //   text: "V DL HR",
      //   value: "V_DL_Hours",
      //   sortable: false,
      //   align: "center",
      // },
      // {
      //   text: "V DL RATE",
      //   value: "V_DL_Rate",
      //   sortable: false,
      //   align: "center",
      // },
      // { text: "V FOH", value: "V_foh", sortable: false, align: "center" },
      // { text: "V VOH", value: "V_voh", sortable: false, align: "center" },
    ],
    desserts: [],
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
    SuccessDialogPush,
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
  watch: {
    date1(val) {
      this.itemsearch.date1 = this.formatDate(this.date1);
    },
    date2(val) {
      this.itemsearch.date2 = this.formatDate(this.date2);
    },
  },
  methods: {
    async SearchData() {
      if (!this.date1 || this.date1 == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "กรุณาใส่ข้อมูลวันที่ผลิต",
          "text-h5 red--text text-center"
        );
        return;
      }

      this.itemsearch.date1 = this.date1;

      this.$showLoader();
      const results = await api.SearchBycostingmanual(this.itemsearch);
      this.itemsearch.date1 = this.formatDate(this.date1);
      // console.log(results.status);
      if (results.status == 200) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Calculate Cost Success",
          "text-h5 green--text text-center"
        );
        this.$hideLoader();
        return;
      } else {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Calculate Cost Failed",
          "text-h5 red--text text-center"
        );
        this.$hideLoader();
        return;
      }

      // this.desserts = results.data;
    },
    onChange(event) {},
    openchangeapproval() {
      this.dialogchangeapproval = true;
    },
    getRows(rows) {
      console.log(rows);
      const result = {};
      _.forEach(rows, (i, key) => {
        if (i.children) {
          _.forEach(i.children, (i1, key1) => {
            result["c" + key1] = i1;
          });
        } else result[key] = i;
      });
      return result;
    },
    getStatusColor(item) {
      const { status } = item;
      if (status?.toLowerCase() === "post") {
        return "green";
      } else {
        return "yellow";
      }
    },
    fntolocalestringnumber(price) {
      return tolocalestringnumber(price);
    },
    setupAlertDialog(status, title, message, text_color) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
    },
    onClickDeleteBtn(item) {
      this.selectedTimecardId = item.id;
      this.confirmDeleteDlg = true;
    },
    async loadWorkOrder() {
      const response = await api.getOrderByCompanyID(
        localStorage.getItem(server.COMPANYID)
      );
      this.workOrders = response.data;
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
      );
      this.workCenters = response.data.map((data) => ({
        ...data,
        label: `${data.wc_id}:${data.wc_name}`,
      }));
    },
    async loadMachine() {
      const response = await api.listMachineByCompany(
        localStorage.getItem(server.COMPANYID)
      );
      this.machines = response.data.map((data) => ({
        ...data,
        label: `${data.machine_id}:${data.name}`,
      }));
    },
    getSubHeader(headers) {
      let result = [];
      headers
        .filter((i) => i.children)
        .forEach((v) => {
          result = result.concat(v.children);
        });
      return result;
    },
    getSubtripleHeader(headers) {
      let result = [];
      headers
        .filter((i) => i.triplechildren)
        .forEach((v) => {
          result = result.concat(v.triplechildren);
        });
      return result;
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
    getwork_center_name(item) {
      return `${item.wc_id}:${item.wc_name}`;
    },
    getmachine_name(item) {
      return `${item.machine_id}:${item.name}`;
    },
  },
  async created() {},
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
    await this.$hideLoader();

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
};
</script>
<style scoped>
.row1 {
  padding-top: 20px;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  color: #ffffff;
}
/* .theme--light.v-data-table {
  background-color: #ffffff;
  color: rgb(133 25 25 / 87%);
} */
</style>
