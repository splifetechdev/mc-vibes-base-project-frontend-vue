<template>
  <v-container fluid>
    <v-card class="ma-3">
      <v-row class="mt-5 ml-5 mr-5">
        <v-col cols="12" md="10">
          <v-row>
            <v-toolbar-title class="text-h6 mt-4"
              >Delete Job :
            </v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-col cols="12" md="2">
              <v-autocomplete
                label="Work order"
                v-model="selectedWORunningNo"
                hide-details
                outlined
                dense
                :items="workOrders"
                item-text="wo_running_no"
                item-value="wo_running_no"
                clearable
                @click:clear="
                  $nextTick(() => {
                    selectedWORunningNo = '';
                  })
                "
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" md="2">
              <v-autocomplete
                label="Machine"
                v-model="selectedMachineId"
                hide-details
                outlined
                dense
                :items="machines"
                item-text="machine_id"
                item-value="id"
                clearable
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="2">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateFormatted1"
                    label="Date"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    dense
                    clearable
                    @click:clear="
                      $nextTick(() => {
                        dateFormatted1 = '';
                        date1 = '';
                      })
                    "
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date1" no-title @input="menu1 = false">
                  <!-- <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(dates)">
                    OK
                  </v-btn> -->
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="2">
              <v-autocomplete
                label="Timecard No"
                v-model="selectedDocRunningNo"
                hide-details
                outlined
                dense
                :items="docNoList"
                item-text="doc_running_no"
                item-value="doc_running_no"
                clearable
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="2">
              <v-btn color="#254E58" dark class=" mr-2" @click="searchData">
                <v-icon>mdi-magnify</v-icon>
                Search
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          prevIcon: 'mdi-minus',
          nextIcon: 'mdi-plus',
        }"
        sort-by="fullname"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer />
            <v-btn
              color="#254E58"
              dark
              class="mb-2 mr-2"
              @click="$router.push(`/time-card/add`)"
              :disabled="!authorize_add"
            >
              Add Timecard
            </v-btn>
          </v-toolbar>
        </template>
        <!-- <template v-slot:item.mch="{ item }">
          {{
            machines.find((obj) => {
              return obj.id === item.mch_id;
            }).machine_id ?? "empty"
          }}
        </template> -->
        <template v-slot:item.status="{ item }">
          <v-chip :color="getStatusColor(item)">
            {{ item.status }}
          </v-chip>
        </template>
        <template v-slot:item.manage="{ item }">
          <!-- <v-icon
            small
            class="mr-2"
            @click="$router.push(`/time-card/${item.id}/edit`)"
          >
            mdi-pencil
          </v-icon> -->
          <v-icon
            small
            v-if="item.isPosted !== true"
            @click="onClickDeleteBtn(item)"
            class="mr-2"
            :style="{
              backgroundColor: '#FFEBEE',
              color: '#F44336',
            }"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
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
import api from "@/services/api";
import { server } from "@/services/constants";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
export default {
  data: (vm) => ({
    desserts: [],
    menu: false,
    dateFormatted1: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    docNoList: [],
    workOrders: [],
    docGroups: [],
    workCenters: [],
    machines: [],
    opnOrdList: [],
    confirmDeleteDlg: false,
    selectedTimecardId: null,
    selectedMachineId: null,
    selectedWORunningNo: "",
    selectedWorkCenterId: null,
    selectedDocGroupId: null,
    selectedDocRunningNo: null,
    selectedOpnOrdId: null,
    selectedDates: null,
    selectedStatus: "save",
    statusOptions: ["save", "post"],
    list: [],
    headers: [
      { text: "WO", value: "wo_running_no" },
      { text: "Timecard No", value: "doc_running_no" },
      { text: "Machine", value: "tbl_mch.machine_id" },
      { text: "Date", value: "doc_date_show" },
      { text: "Start", value: "tbl_time_card_details[0].time_start" },
      { text: "End", value: "tbl_time_card_details[0].time_end" },
      { text: "Manage", value: "manage" },
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
    date1: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  }),
  computed: {},
  watch: {
    date1(val) {
      this.dateFormatted1 = this.formatDate(this.date1);
    },
    // dates(val) {
    //   const [dates1, dates2] = val;
    //   this.dateFormatted1 = "";
    //   if (dates1) {
    //     this.dateFormatted1 += dayjs(dates1).format("DD/MM/YYYY");
    //   }
    //   if (dates2) {
    //     this.dateFormatted1 += ",";
    //     this.dateFormatted1 += dayjs(dates2).format("DD/MM/YYYY");
    //   }
    // },
  },
  methods: {
    onChange(event) {
      // console.log(event);
    },
    openchangeapproval() {
      this.dialogchangeapproval = true;
    },
    getStatusColor(item) {
      const { status } = item;
      if (status?.toLowerCase() === "post") {
        return "green";
      } else {
        return "yellow";
      }
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
    // formatDisplayDate() {
    //   // const { time_card_date } = item
    //   const [dates1, dates2] = this.dates
    //   console.log([dates1, dates2])
    //   let displayDate = ''
    //   if (dates1) {
    //     displayDate += dayjs(dates1).format('DD/MM/YYYY')
    //   }
    //   if (dates2) {
    //     displayDate += `,${dayjs(dates2).format('DD/MM/YYYY')}`
    //   }
    //   return displayDate
    // },
    async searchData() {
      const response = await api.listDeleteJobByCompany({
        company_id: localStorage.getItem(server.COMPANYID),
        wo_running_no: this.selectedWORunningNo,
        mch_id: this.selectedMachineId,
        doc_date: this.date1,
        datefrom: `${this.date1} 00:00:00.000 +00:00`,
        dateto: `${this.date1} 23:59:59.000 +00:00`,
        doc_running_no: this.selectedDocRunningNo,
      });
      this.desserts = response.data;
    },
    async loadWorkOrder() {
      const response = await api.getTimecardWorkOrderOption(
        localStorage.getItem(server.COMPANYID)
      );
      this.workOrders = response.data;
    },
    async loadDocumentNo() {
      const response = await api.getListDocumentsNycompany(
        localStorage.getItem(server.COMPANYID)
      );
      this.docNoList = response.data;
    },
    async loadData() {
      const response = await api.listDeleteJobByCompany({
        company_id: localStorage.getItem(server.COMPANYID),
        wo_running_no: this.selectedWORunningNo,
      });
      this.desserts = response.data;
      // const formattedData = response.data.map((data) => ({
      //   id: data.id,
      //   documentGroup: data.doc_running.module,
      //   documentNo: data.doc_running_no,
      //   documentDate: dayjs(data.doc_date).format("DD/MM/YYYY"),
      //   createdAt: dayjs(data.created_at).format("DD/MM/YYYY"),
      //   ...data,
      //   status: data.status?.toUpperCase(),
      //   isPosted: data.status?.toUpperCase() === "POST",
      // }));
      // this.docNoList = formattedData.map((data) => data.documentNo);
      // this.opnOrdList = response.data.reduce((acc, cur) => {
      //   if (acc.includes(cur.opn_ord_id)) {
      //     return acc;
      //   }
      //   return [...acc, cur.opn_ord_id];
      // }, []);
      // this.list = formattedData;
    },
    async confirmDelete() {
      // alert(this.selectedTimecardId);
      // return;
      await api.deleteTimecard(this.selectedTimecardId);
      await api.deleteTimecardDetail(this.selectedTimecardId);
      this.confirmDeleteDlg = false;
      await this.searchData();
      // this.loadData();
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
      this.workCenters = response.data;
    },
    async loadMachine() {
      const response = await api.listMachineByCompany(
        localStorage.getItem(server.COMPANYID)
      );
      this.machines = response.data;
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
  async created() {
    // console.log("created");
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

    await this.loadDocGroup();
    await this.loadWorkCenter();
    await this.loadMachine();
    await this.loadWorkOrder();
    await this.loadDocumentNo();
    await this.searchData();
    // await this.loadData();
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
</style>
