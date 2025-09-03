<template>
  <v-card-title>
    <v-container class="pa-1" fluid>
      <v-card class="pa-12">
        <v-card-title>
          <v-row>
            <v-col cols="12" md="12" justify="center" class="mb-6">
              <h3>Time Card</h3>
            </v-col>
          </v-row>
        </v-card-title>
        <v-row>
          <v-col cols="12" md="12" justify="center">
            <div id="tabs" class="containertab">
              <div class="tabs">
                <div
                  v-on:click="activetab = 1"
                  v-bind:class="[activetab === 1 ? 'active' : '']"
                >
                  General
                </div>
                <div
                  class="ml-1"
                  v-on:click="activetab = 2"
                  v-bind:class="[activetab === 2 ? 'active' : '']"
                >
                  U-define
                </div>
              </div>

              <div class="content">
                <div
                  v-if="activetab === 1 && callsoopentab == true"
                  class="tabcontent"
                >
                  <v-data-table
                    calculate-widths
                    width-full
                    :headers="headers"
                    :items="computedAvailableLog"
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
                        <v-card-title>
                          Running No. {{ doc_running_no }}
                          <v-spacer></v-spacer>
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="defectDialog" max-width="500px">
                          <v-card>
                            <v-card-text>
                              <v-container>
                                <v-data-table
                                  hide-default-footer
                                  width-full
                                  :headers="defectHeaders"
                                  :items="computedAvailableDefect"
                                  :search="search"
                                >
                                  <template v-slot:top>
                                    <v-toolbar flat>
                                      <v-spacer></v-spacer>
                                      <v-dialog max-width="500px">
                                        <template
                                          v-slot:activator="{ on, attrs }"
                                        >
                                          <v-btn
                                            v-bind="attrs"
                                            @click="onClickNewDefect"
                                            depressed
                                            width="100"
                                            class="mr-3 buttonblue"
                                          >
                                            Add New
                                          </v-btn>
                                        </template>
                                      </v-dialog>
                                    </v-toolbar>
                                  </template>
                                  <template v-slot:item.qty="{ item }">
                                    <v-text-field
                                      v-model="item.qty"
                                      hide-details
                                      min="0"
                                      type="number"
                                      dense
                                    ></v-text-field>
                                  </template>
                                  <template
                                    v-slot:item.defect_cause_id="{ item }"
                                  >
                                    <v-autocomplete
                                      v-model="item.defect_cause_id"
                                      item-disabled="disabled"
                                      hide-details
                                      item-text="waste_code"
                                      item-value="id"
                                      :items="getDefectOptions"
                                      dense
                                    ></v-autocomplete>
                                  </template>
                                  <template
                                    v-slot:item.defect_cause_name="{ item }"
                                  >
                                    <v-autocomplete
                                      v-model="item.defect_cause_id"
                                      hide-details
                                      item-text="description"
                                      item-value="id"
                                      :items="getDefectOptions"
                                      dense
                                    ></v-autocomplete>
                                  </template>
                                  <template v-slot:item.action="{ item }">
                                    <v-icon
                                      small
                                      class="mr-2"
                                      @click="() => onRemoveDefect(item)"
                                      :style="{
                                        backgroundColor: '#FFEBEE',
                                        color: '#F44336',
                                      }"
                                    >
                                      mdi-delete
                                    </v-icon>
                                  </template>
                                </v-data-table>
                              </v-container>
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="close">
                                Cancel
                              </v-btn>
                              <v-btn color="blue darken-1" text @click="save">
                                Save
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <v-dialog max-width="500px">
                          <template
                            v-slot:activator="{ on, attrs }"
                            v-if="isPost !== true"
                          >
                            <v-btn
                              v-bind="attrs"
                              @click="onClickNewLog"
                              depressed
                              width="100"
                              class="mr-3 buttonblue"
                            >
                              Add New
                            </v-btn>
                          </template>
                        </v-dialog>
                      </v-toolbar>
                    </template>
                    <template v-slot:item.opn_ord_id="{ item }">
                      <v-autocomplete
                        v-model="item.opn_ord_id"
                        @change="(e) => onOpnOrdIdChange(e, item)"
                        hide-details
                        :items="operations"
                        item-text="label"
                        item-value="id"
                        :disabled="fixed_operation_order !== null"
                        dense
                      ></v-autocomplete>
                    </template>
                    <template v-slot:item.wc_id="{ item }">
                      <v-autocomplete
                        v-model="item.wc_id"
                        hide-details
                        :items="workCenters"
                        item-value="id"
                        item-text="wc_id"
                        dense
                        :disabled="fixed_work_center !== null"
                      ></v-autocomplete>
                    </template>
                    <template v-slot:item.mch_id="{ item }">
                      <v-autocomplete
                        v-model="item.mch_id"
                        hide-details
                        @change="(e) => onMchIdChange(e, item)"
                        :items="machines"
                        item-value="id"
                        item-text="machine_id"
                        dense
                        :disabled="fixed_machine !== null"
                      ></v-autocomplete>
                    </template>
                    <template v-slot:item.wo_running_no="{ item }">
                      <v-autocomplete
                        v-model="item.wo_running_no"
                        hide-details
                        :items="workOrders"
                        dense
                        :disabled="fixed_work_order !== null"
                      ></v-autocomplete>
                    </template>
                    <template v-slot:item.opn_desc="{ item }">
                      <v-text-field
                        v-model="item.opn_desc"
                        hide-details
                        dense
                      ></v-text-field>
                    </template>
                    <template v-slot:item.item_id="{ item }">
                      <v-autocomplete
                        v-model="item.item_id"
                        hide-details
                        :items="items"
                        dense
                        item-value="id"
                        item-text="item_id"
                        :disabled="fixed_item !== null"
                      ></v-autocomplete>
                    </template>
                    <template v-slot:item.item_name="{ item }">
                      <v-autocomplete
                        v-model="item.item_id"
                        hide-details
                        :items="items"
                        item-value="id"
                        item-text="item_name"
                        dense
                        disabled
                      ></v-autocomplete>
                    </template>
                    <template v-slot:item.worker_id="{ item }">
                      <v-autocomplete
                        v-model="item.worker_id"
                        hide-details
                        :items="workers"
                        item-value="id"
                        item-text="label"
                        dense
                        :disabled="fixed_worker !== null"
                      ></v-autocomplete>
                    </template>
                    <template v-slot:item.batch="{ item }">
                      <v-text-field
                        v-model="item.batch"
                        hide-details
                        min="0"
                        step="1"
                        type="number"
                        dense
                      ></v-text-field>
                    </template>
                    <template v-slot:item.downtime_id="{ item }">
                      <v-autocomplete
                        v-model="item.downtime_id"
                        @change="onSelectedDowntime(item)"
                        hide-details
                        item-text="description"
                        item-value="id"
                        :items="downtimes"
                        dense
                        :disabled="
                          item.qty != 0 || getDefectCount(item.id) != 0
                        "
                      ></v-autocomplete>
                      <!-- <v-text-field v-model="item.downtime" hide-details dense></v-text-field> -->
                    </template>
                    <template v-slot:item.setup_time="{ item }">
                      <!-- <v-autocomplete v-model="item.setup_time" hide-details :items="[1, 2]" dense></v-autocomplete> -->
                      <v-text-field
                        v-model="item.setup_time"
                        @change="validateSetupTime(item)"
                        type="number"
                        step="0.5"
                        hide-details
                        dense
                        :disabled="getDefectCount(item.id) != 0"
                      ></v-text-field>
                    </template>
                    <template v-slot:item.qty="{ item }">
                      <v-text-field
                        v-model="item.qty"
                        hide-details
                        min="0"
                        type="number"
                        dense
                        :disabled="item.downtime_id !== null"
                      ></v-text-field>
                    </template>
                    <template v-slot:item.defect="{ item }">
                      <v-row>
                        <v-col>
                          <v-text-field
                            :value="getDefectCount(item.id)"
                            hide-details
                            type="number"
                            dense
                            disabled
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-icon
                            small
                            class="mr-2"
                            :disabled="item.downtime_id !== null"
                            @click="onClickEditDefect(item)"
                            :style="{
                              backgroundColor: '#E1F5FE',
                              color: '#2196F3',
                            }"
                          >
                            mdi-pencil
                          </v-icon>
                        </v-col>
                      </v-row>
                    </template>
                    <template v-slot:item.time_card_date="{ item }">
                      <v-menu
                        v-model="item.menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            :value="formatDisplayDate(item)"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="item.time_card_date"
                          @input="item.menu = false"
                        ></v-date-picker>
                      </v-menu>
                    </template>
                    <template v-slot:item.time_start="{ item }">
                      <!-- <vue-timepicker manual-input hide-dropdown @focus="focusState = 'focused'"
                        @blur="focusState = 'blurred'" format="HH:mm" @change="getValidEndTime(item)" height="100px"
                        v-model="item.time_start" close-on-complete append-to-body>
                      </vue-timepicker> -->
                      <v-text-field
                        v-model="item.time_start"
                        hide-details
                        dense
                        @blur="validateTime(item)"
                        :rules="timeRule"
                        place-holder="HH:mm"
                        maxlength="5"
                        @input="handleInput($event, item)"
                        @change="handleChange(item)"
                        ref="timeField"
                      ></v-text-field>
                    </template>
                    <template v-slot:item.time_end="{ item }">
                      <v-text-field
                        v-model="item.time_end"
                        hide-details
                        dense
                        @blur="validateEndTime(item)"
                        :rules="timeRule"
                        place-holder="HH:mm"
                        maxlength="5"
                        @input="handleInputEndTime($event, item)"
                        @change="handleChangeEndTime(item)"
                        ref="endTimeField"
                      ></v-text-field>
                      <!-- <vue-timepicker manual-input hide-dropdown format="HH:mm" v-model="item.time_end"
                        :hour-range="item.validEndTime" :minute-range="item.validEndMinute"
                        :disabled="!validateTimeStart(item)" close-on-complete append-to-body>
                      </vue-timepicker> -->
                    </template>
                    <template v-slot:item.work_hours="{ item }">
                      <v-text-field
                        :value="getTimeDifference(item)"
                        @change="(e) => handleChangeWorkHours(e, item)"
                        hide-details
                        min="0"
                        step="0.5"
                        type="number"
                        dense
                      ></v-text-field>
                    </template>
                    <template
                      v-slot:item.action="{ item }"
                      v-if="isPost !== true"
                    >
                      <v-icon
                        small
                        class="mr-2"
                        @click="() => onDeleteLog(item)"
                        :style="{
                          backgroundColor: '#FFEBEE',
                          color: '#F44336',
                        }"
                      >
                        mdi-delete
                      </v-icon>
                    </template>
                  </v-data-table>
                </div>
                <div v-if="activetab === 2" class="tabcontent">
                  <UDefine
                    :udmodulename="udmodule_name"
                    :dataudefine="itemaddudefine"
                    @dataOnUdefine="getdataOnUdefine"
                  >
                  </UDefine>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-row justify="center" class="mt-3">
            <v-btn
              depressed
              width="100"
              class="mr-3 buttonblue"
              @click="postTimecard"
              v-if="isPost !== true"
            >
              Post
            </v-btn>
            <v-btn
              depressed
              width="100"
              class="mr-3 buttonblue"
              @click="savedata()"
              v-if="isPost !== true"
            >
              Save
            </v-btn>
            <v-btn
              depressed
              outlined
              width="100"
              @click="$router.push('/time-card')"
            >
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
              Preview Image</v-card-title
            >

            <v-img
              disabled
              :src="previewimage"
              class="grey lighten-2 mt-3 mb-5"
              aspect-ratio="1"
              contain
            >
            </v-img>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closepreviewimage"
                >Cancel</v-btn
              >

              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDeleteimage" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this image?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDeleteimage"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirmimage"
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
        <SuccessDialogPush
          :status="dialogAdd"
          :text_color="text_color"
          :title="title"
          :message="message"
          :link="link"
        />
      </v-card>
    </v-container>
  </v-card-title>
</template>

<script>
import SuccessDialog from "@/components/cards/SuccessDialog";
import SuccessDialogPush from "@/components/cards/SuccessDialogPush";
import api from "@/services/api";
import UDefine from "@/views/u-define/UDefine";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import { server, udgroup } from "@/services/constants";
import dayjs from "dayjs";
export default {
  components: {
    SuccessDialog,
    SuccessDialogPush,
    UDefine,
    VueTimepicker,
  },
  computed: {
    computedAvailableLog() {
      return this.logs.filter((l) => l?.isDeleted !== true);
    },
    computedAvailableDefect() {
      return this.defects.filter((d) => d?.isDeleted !== true);
    },
    getSelectedDefectId(v) {
      return this.defects.map((defect) => defect.defect_cause_id);
    },
    getDefectOptions() {
      const usedDefectIdList = this.defects.map(
        (defect) => defect.defect_cause_id
      );
      return this.defectOptions.map((option) => {
        if (usedDefectIdList.includes(option.id)) {
          return {
            ...option,
            disabled: true,
          };
        } else {
          return {
            ...option,
            disabled: false,
          };
        }
      });
    },
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
    selectedRadio(val) {
      this.selectedWorkCenter = null;
      this.selectedMachine = null;
      this.selectedWorkOrder = null;
      this.selectedWorker = null;
      this.selectedOperation = null;
    },
  },
  data: (vm) => ({
    focusState: "blurred",
    doc_running_no: null,
    isPost: false,
    isSaveTimecardType: false,
    timeRule: [
      (v) => !!v || "Time is required",
      (v) => /^\d{2}:\d{2}$/.test(v) || "Invalid time format (HH:mm)",
      (v) => {
        if (!v) return true;
        const [hour, minute] = v.split(":").map(Number);
        return (
          (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) ||
          "Invalid time range"
        );
      },
    ],
    logs: [],
    downtimes: [],
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defects: [],
    defectDialog: false,
    defectHeaders: [
      { text: "qty", value: "qty" },
      { text: "Defect", value: "defect_cause_id" },
      { text: "Name", value: "defect_cause_name" },
      { text: "Action", value: "action" },
    ],
    items: [],
    headers: [
      { text: "ORD", value: "opn_ord_id", width: "150px" },
      { text: "WC", value: "wc_id", width: "120px" },
      { text: "MCH", value: "mch_id", width: "150px" },
      { text: "WO", value: "wo_running_no", width: "150px" },
      { text: "OPN DESC", value: "opn_desc", width: "150px" },
      { text: "BATCH", value: "batch", width: "120px" },
      { text: "ITEM ID", value: "item_id", width: "120px" },
      { text: "ITEM NAME", value: "item_name", width: "200px" },
      { text: "WORKER", value: "worker_id", width: "150px" },
      { text: "SETUP TIME", value: "setup_time", width: "110px" },
      { text: "QTY", value: "qty", width: "100px" },
      { text: "DATE", value: "time_card_date", width: "150px" },
      { text: "START", value: "time_start", width: "100px" },
      { text: "END", value: "time_end", width: "100px" },
      { text: "WORK HR.", value: "work_hours", width: "100px" },
      { text: "DOWNTIME", value: "downtime_id", width: "120px" },
      { text: "DEFECT", value: "defect", width: "120px" },
      { text: "ACTION", value: "action", width: "100px" },
    ],
    fixed_operation_order: null,
    fixed_batch: null,
    fixed_work_center: null,
    fixed_machine: null,
    fixed_work_order: null,
    fixed_operation: null,
    fixed_item: null,
    fixed_worker: null,
    fixed_item: null,
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
      },
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
    machineNames: [],
    selectedMachine: null,
    workOrders: [],
    selectedWorkOrder: null,
    workers: [],
    selectedWorker: null,
    operations: [],
    operation_ids: ["100", "200", "300", "400"],
    selectedOperation: null,
    editingLogId: null,

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
    authorize: [],
    department_list: [],
    position_list: [],
    division_list: [],
    section_list: [],
    signature: "",
    initial_dataimage: "",
    isShowPassword: false,
    showbuttonsavesigimage: false,
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
    desserts: [],
    imagename: "",
    previewimage: null,
    checkimageadd: false,
    previewimage: null,
    dialogDeleteimage: false,
    image: null,
    timecardType: null,
    dialogpreviewimage: false,
    statusall: ["ACTIVE", "INACTIVE"],
    userId: 0,
    activetab: 1,
    callsoopentab: true,
    udmodule_name: "",
    default_date: null,
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

    await this.onLoadUdefineIDByCompanyAndModuleName(
      udgroup.TIMECARD,
      localStorage.getItem(server.COMPANYID)
    );
    this.loadWorkCenter();
    this.loadMachine();
    this.loadWorker();
    this.loadItem();
    this.loadWorkOrder();
    this.loadDefect();
    this.loadDowntimeCause();
    await this.loadOpn();
    await this.getTimecardWithUDefined();
    await this.loadTimeCardLog();
    this.udmodule_name = udgroup.TIMECARD;
    await this.loadAuthorize();
    this.$hideLoader();
  },
  methods: {
    async loadWorkCenter() {
      const response = await api.getWorkCenterMaster(
        localStorage.getItem(server.COMPANYID)
      );
      this.workCenters = response.data.map((data) => ({
        ...data,
        label: `${data.wc_id}:${data.wc_name}`,
      }));
    },
    handleInputEndTime(input, item) {
      input = input.replace(/\D/g, "");
      if (input.length > 2) {
        input = input.slice(0, 2) + ":" + input.slice(2);
      }
      item.time_end = input;
    },
    handleInput(input, item) {
      // Remove non-numeric characters
      input = input.replace(/\D/g, "");

      // Format HH:mm
      if (input.length > 2) {
        input = input.slice(0, 2) + ":" + input.slice(2);
      }

      item.time_start = input;
    },
    validateEndTime(item) {
      if (!item.time_start) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please fill start date first",
          "text-h5 red--text text-center"
        );
        item.time_end = "";
        return;
      }
      const [startHour, startMinute] = item.time_start.split(":");
      if (!startHour || !startMinute) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please fill start date first",
          "text-h5 red--text text-center"
        );
        item.time_end = "";
        return;
      }
      const [hour, minute] = item.time_end.split(":");
      if (!hour || !minute) {
        item.time_start = "";
      }

      if (hour < startHour) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Time end must be gather than Time start",
          "text-h5 red--text text-center"
        );
        item.time_end = "";
        return;
      } else if (hour === startHour && minute <= startMinute) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Time end must be gather than Time start",
          "text-h5 red--text text-center"
        );
        item.time_end = "";
        return;
      }
    },
    validateTime(item) {
      const [hour, minute] = item.time_start.split(":");
      if (!hour || !minute) {
        item.time_start = "";
      }
    },
    handleChangeEndTime(item) {
      if (!this.$refs.endTimeField.valid) {
        // Input does not meet validation rules
        // Perform your action here, such as displaying an alert
        item.end_time = "";
        alert("Input does not meet validation rules!");
      }
    },
    handleChange(item) {
      if (!this.$refs.timeField.valid) {
        // Input does not meet validation rules
        // Perform your action here, such as displaying an alert
        item.time_start = "";
        alert("Input does not meet validation rules!");
      }
    },
    async loadDefect() {
      const response = await api.getDefectCauseByCompanyID(
        localStorage.getItem(server.COMPANYID)
      );
      this.defectOptions = response.data;
    },
    async loadItem() {
      const response = await api.getItemMasterByCompanyID(
        localStorage.getItem(server.COMPANYID)
      );
      this.items = response.data;
    },
    async loadMachine() {
      const response = await api.listMachineByCompany(
        localStorage.getItem(server.COMPANYID)
      );
      this.machines = response.data.map((data) => ({
        ...data,
        label: `${data.machine_id}:${data.name}`,
      }));
      this.machineNames = this.machines.map((m) => m.label);
    },
    async loadWorker() {
      const response = await api.getWorkerByCompany();
      this.workers = response.data.map((worker) => ({
        ...worker,
        label: `${worker.emp_id} ${worker.firstname}`,
      }));
    },
    onClickNewLog() {
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const initialLog = {
        id: timestamp,
        opn_ord_id: this.fixed_operation_order,
        wc_id: this.fixed_work_center,
        mch_id: this.fixed_machine,
        wo_running_no: this.fixed_work_order,
        opn_id: this.fixed_operation,
        item_id: this.fixed_item,
        opn_desc: this.default_opn_desc,
        item_name: null,
        worker_id: this.fixed_worker,
        batch: this.fixed_batch,
        wo_type: "N",
        downtime_id: null,
        setup_time: "",
        qty: 0,
        defect: 0,
        time_card_date: this.default_date,
        time_start: null,
        time_end: null,
        work_hours: 0,
        isNew: true,
        validEndTime: [[0, 24]],
        tbl_time_card_defects: [],
        menu: false,
        isDeleted: false,
      };
      this.logs.push(initialLog);
    },
    async loadTimeCardLog() {
      const response = await api.getTimecardById(this.$route.params.id);
      this.default_date = dayjs(response.data.doc_date).format("YYYY-MM-DD");
      this.isPost = response.data.status === "post";
      this.timecardType = response.data.time_card_type;
      const { tbl_time_card_details } = response.data;
      if (tbl_time_card_details.length > 0) {
        this.logs = response.data.tbl_time_card_details.map((log) => {
          let ordDesc = "";
          if (log.opn_desc) {
            ordDesc = log.opn_desc;
          } else {
            const foundOption = this.operations.find(
              (option) => option.id === log?.opn_ord_id
            );
            ordDesc = foundOption && foundOption.opn_desc;
          }
          return {
            ...log,
            time_card_date: dayjs(log.time_card_date).format("YYYY-MM-DD"),
            opn_desc: ordDesc,
          };
        });
      } else {
        this.onClickNewLog();
      }
    },
    async loadWorkOrder() {
      const response = await api.getWorkOrderOption();
      this.workOrders = response.data;
    },
    async loadOpn() {
      const response = await api.getOpnOrdOption(
        localStorage.getItem(server.COMPANYID)
      );
      this.operations = response.data;
    },
    async postTimecard() {
      try {
        // ตรวจสอบข้อมูลก่อนทำการ Post
        const activeLogs = this.logs.filter((log) => log?.isDeleted !== true);

        // เช็คว่ามีข้อมูล log หรือไม่
        if (activeLogs.length === 0) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "ไม่มีข้อมูลสำหรับ Post",
            "text-h5 red--text text-center"
          );
          return;
        }

        // เช็คเงื่อนไข Worker และ QTY
        for (const log of activeLogs) {
          // เช็ค Worker (ต้องมี worker_id)
          if (!log.worker_id) {
            this.$store.state.global_dialog = true;
            this.setupAlertDialog(
              true,
              "Failed!!!",
              "กรุณาเลือก Worker ให้ครบถ้วน",
              "text-h5 red--text text-center"
            );
            return;
          }

          // เช็ค QTY (ต้องมากกว่า 0)
          if (!log.qty || Number(log.qty) === 0) {
            this.$store.state.global_dialog = true;
            this.setupAlertDialog(
              true,
              "Failed!!!",
              "กรุณาใส่ QTY ให้มากกว่า 0",
              "text-h5 red--text text-center"
            );
            return;
          }
        }

        // ถ้าผ่านการตรวจสอบแล้ว ทำการ Post
        const response = await api.postTimecardV2(this.$route.params.id);
        this.$store.state.global_dialog_push = true;

        if (response.data.error) {
          this.setupAlertDialog(
            true,
            "Failed!!!",
            response.data.error,
            "text-h5 red--text text-center"
          );
        } else {
          this.setupAlertDialogPush(
            true,
            "Success!!!",
            "Post data success",
            "text-h5 green--text text-center",
            "/time-card"
          );
        }

        this.loadTimeCardLog();
      } catch (error) {
        this.$store.state.global_dialog_push = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          error.message,
          "text-h5 red--text text-center"
        );
      }
    },
    onSelectedDowntime(item) {
      item.qty = 0;
    },
    onClickNewDefect() {
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const initialDefect = {
        id: timestamp,
        qty: 0,
        defect_cause_id: null,
        isNew: true,
      };

      this.defects = [...this.defects, initialDefect];
    },
    defectCount(log_id) {
      const foundLog = this.logs.find((log) => log.id === log_id);
      return foundLog.defects;
    },
    onClickEditDefect(item) {
      this.editingLogId = item.id;
      this.defectDialog = true;
      this.defects = item.tbl_time_card_defects;
    },
    handleChangeWorkHours(e, item) {
      item.time_start = "";
      item.time_end = "";
      item.work_hours = e;
      item = { ...item };
    },
    close() {
      this.defectDialog = false;
    },
    save() {
      const foundLog = this.logs.find((log) => log.id === this.editingLogId);
      foundLog.tbl_time_card_defects = this.defects;
      this.editingLogId = null;
      this.defectDialog = false;
    },
    onChangeDefect(id) {
      const defect = this.defectOptions.find((defect) => defect.id === id);
      defect.disabled = true;
    },
    onRemoveDefect(item) {
      const foundDefect = this.defects.find((defect) => defect.id === item.id);
      foundDefect.isDeleted = true;
      this.defects = [...this.defects];
      // this.defects = this.defects.filter(defect => defect.id !== item.id)
    },
    getDefectCount(id) {
      const found = this.logs.find((log) => log.id === id);
      return found.tbl_time_card_defects.reduce((acc, cur) => {
        if (cur?.isDeleted) {
          return acc;
        }
        return (acc += Number(cur.qty));
      }, 0);
    },
    generateRange(start, end) {
      return Array.from(
        { length: end - start + 1 },
        (_, index) => start + index
      );
    },
    // validateEndTime(item) {
    //   const { time_start, time_end } = item
    //   if (!time_start || !time_end) {
    //     return
    //   }
    //   const { HH: hours1, mm: minutes1 } = time_start
    //   const { HH: hours2, mm: minutes2 } = time_end
    //   if (!hours1 || !minutes1 || !hours2 || !minutes2) {
    //     return
    //   }

    //   if (hours2 > hours1) {
    //     item.time_end = null
    //   } else if (hours2 === hours2) {
    //     if (minutes2 >= minutes1) {
    //       item.validEndMinute = this.generateRange(Number(minutes1) + 1, 60)
    //       item.time_end = null
    //     }
    //   }
    // },
    onDeleteLog(item) {
      const log = this.logs.find((l) => l.id === item.id);
      log.isDeleted = true;
      this.logs = [...this.logs];
    },
    getItemLabel(id) {
      const mch = this.machines.find((m) => m.id === id);
      return mch.label;
    },
    async getTimecardWithUDefined() {
      const response = await api.getTimecardWithUDefined(
        this.$route.params.id,
        this.main_u_define_module_id
      );
      const timecard = response.data;
      this.doc_running_no = timecard.doc_running_no;
      // this.fixed_machine = 19
      if (timecard.time_card_type === "work_center") {
        this.fixed_work_center = timecard.wc_id;
      } else if (timecard.time_card_type === "machine") {
        this.fixed_work_center = timecard.tbl_mch.work_center_id;
        this.fixed_machine = timecard.mch_id;
      } else if (timecard.time_card_type === "work_order") {
        this.fixed_work_order = timecard.wo_running_no;
      } else if (timecard.time_card_type === "worker") {
        this.fixed_worker = timecard.worker_id;
      } else if (
        timecard.time_card_type === "operation_order" &&
        timecard.tbl_opn_ord
      ) {
        this.fixed_operation_order = timecard.opn_ord_id;
        this.fixed_work_order = timecard.wo_running_no;
        this.fixed_machine = timecard.mch_id;
        this.fixed_work_center = timecard.tbl_mch.work_center_id;
        this.fixed_operation = timecard.tbl_opn_ord.opn_id;
        this.fixed_item = timecard.tbl_opn_ord.item_master_id;
        this.fixed_batch = timecard.tbl_opn_ord.batch_count;
        const foundOption = this.operations.find(
          (option) => option.id === timecard.opn_ord_id
        );
        this.default_opn_desc = foundOption.opn_desc;
      }
      const { u_define_master } = timecard;

      this.itemaddudefine.u_define_module_id =
        u_define_master.u_define_module_id;
      this.itemaddudefine.numeric1 = u_define_master.numeric1;
      this.itemaddudefine.numeric2 = u_define_master.numeric2;
      this.itemaddudefine.date1 = this.formatDate(u_define_master.date1);
      this.itemaddudefine.date2 = this.formatDate(u_define_master.date2);
      this.itemaddudefine.boolean1 = u_define_master.boolean1 == true ? 1 : 0;
      this.itemaddudefine.boolean2 = u_define_master.boolean2 == true ? 1 : 0;
      this.itemaddudefine.char1 = u_define_master.char1;
      this.itemaddudefine.char2 = u_define_master.char2;
      this.itemaddudefine.text1 = u_define_master.text1;
      this.itemaddudefine.text2 = u_define_master.text2;
    },
    async loadWorkCenterGroup() {
      const res_get = await api.getWorkCenterGroupMaster(
        localStorage.getItem(server.COMPANYID)
      );
      this.work_center_group_list = res_get.data.map((data) => ({
        ...data,
        label: `${data.work_center_group_id}: ${data.work_center_group_name}`,
      }));
    },
    async loadDowntimeCause() {
      const response = await api.getDownTimeCauseCompanyID(
        localStorage.getItem(server.COMPANYID)
      );
      this.downtimes = response.data;
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
    previewImage: function(event) {
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
    async onOpnOrdIdChange(e, item) {
      const response = await api.getOpnOrd(e);
      const { data } = response;
      const foundOption = this.operations.find(
        (option) => option.id === data.id
      );
      if (foundOption) {
        item.opn_desc = foundOption && foundOption.opn_desc;
        item.opn_ord_id = data.id;
      }
      if (!this.fixed_work_order) {
        item.wo_running_no = data.doc_running_no;
      }
      if (!this.fixed_machine) {
        item.mch_id = data.machine_id;
      }
      if (!this.fixed_work_center) {
        item.wc_id = data.tbl_mch.work_center_id;
      }
      if (!this.fixed_operation) {
        item.opn_id = data.opn_id;
      }
      if (!this.fixed_item) {
        item.item_id = data.item_master_id;
      }
      if (!this.fixed_batch) {
        item.batch = data.batch_count;
      }
    },
    async onMchIdChange(val, item) {
      const response = await api.getMachineWithWCById(val);
      item.wc_id = response.data.tbl_work_center.id;
    },
    formatDisplayDate(item) {
      const { time_card_date } = item;
      if (!time_card_date) {
        return;
      }
      if (time_card_date === "Invalid Date") {
        item.time_card_date = null;
        return "";
      }
      return dayjs(time_card_date).format("DD/MM/YYYY");
    },
    getTimeDifference(item) {
      const { time_start, time_end } = item;
      if (!time_start || !time_end) {
        return Number(item.work_hours).toFixed(2);
      }
      const [hours1, minutes1] = time_start.split(":");
      const [hours2, minutes2] = time_end.split(":");
      if (!hours1 || !minutes1 || !hours2 || !minutes2) {
        return Number(item.work_hours).toFixed(2);
      }

      if (
        hours1 === "null" ||
        minutes1 === "null" ||
        hours2 === "null" ||
        minutes2 === "null"
      ) {
        return Number(item.work_hours).toFixed(2);
      }
      const totalMinutes1 = Number(hours1) * 60 + Number(minutes1);
      const totalMinutes2 = Number(hours2) * 60 + Number(minutes2);
      let difference = Math.abs(totalMinutes2 - totalMinutes1);
      return (difference / 60).toFixed(2);
      // const hoursDifference = Math.floor(difference / 60);
      // const minutesDifference = difference % 60;
      return `${hoursDifference}Hrs ${minutesDifference}mins`;
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
      this.itemadd.wcg_id = this.select_work_center_group;
      this.itemadd.date_from = this.date1;
      this.itemadd.holiday_type = this.select_holiday_type;
      this.itemadd.company_id = localStorage.getItem(server.COMPANYID);
      this.itemadd.user_create = localStorage.getItem(server.USER_ID);
      const updateLogs = this.logs.filter((log) => log?.isDeleted !== true);
      const deletedLogs = this.logs.filter(
        (log) => log?.isDeleted && log.isNew !== true
      );
      let isFail = false;
      await Promise.all(
        updateLogs.map(async (log) => {
          const isDowntime = log.downtime_id !== null;
          const isSetupTime = !!log.setup_time && log.setup_time !== "";
          const isDefects =
            log.tbl_time_card_defects && log.tbl_time_card_defects.length > 0;
          log.work_hours =
            log.work_hours > 0 ? log.work_hours : this.getTimeDifference(log);
          if (isDowntime) {
            console.log({ log });
            if (Number(log.work_hours) === 0) {
              isFail = true;
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Failed!!!",
                "Please fill work hours",
                "text-h5 red--text text-center"
              );
              return;
            }
            if (!log.time_card_date) {
              isFail = true;
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Failed!!!",
                "Please fill date",
                "text-h5 red--text text-center"
              );
              return;
            }
            if (!log.mch_id) {
              isFail = true;
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Failed!!!",
                "Please fill machine",
                "text-h5 red--text text-center"
              );
              return;
            }
          } else if (isSetupTime) {
            if (!log.opn_ord_id) {
              isFail = true;
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Failed!!!",
                "Please fill opn ord",
                "text-h5 red--text text-center"
              );
              return;
            }
            if (!log.wc_id) {
              isFail = true;
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Failed!!!",
                "Please fill wc",
                "text-h5 red--text text-center"
              );
              return;
            }
            if (!log.mch_id) {
              isFail = true;
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Failed!!!",
                "Please fill machine",
                "text-h5 red--text text-center"
              );
              return;
            }
            if (!log.wo_running_no) {
              isFail = true;
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Failed!!!",
                "Please fill WO",
                "text-h5 red--text text-center"
              );
              return;
            }
            if (!log.item_id) {
              isFail = true;
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Failed!!!",
                "Please fill Item",
                "text-h5 red--text text-center"
              );
              return;
            }
          } else if (isDefects) {
            if (!log.opn_ord_id) {
              isFail = true;
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Failed!!!",
                "Please fill opn ord",
                "text-h5 red--text text-center"
              );
              return;
            }
            if (!log.wc_id) {
              isFail = true;
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Failed!!!",
                "Please fill wc",
                "text-h5 red--text text-center"
              );
              return;
            }
            if (!log.mch_id) {
              isFail = true;
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Failed!!!",
                "Please fill machine",
                "text-h5 red--text text-center"
              );
              return;
            }
            if (!log.wo_running_no) {
              isFail = true;
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Failed!!!",
                "Please fill WO",
                "text-h5 red--text text-center"
              );
              return;
            }
            if (!log.item_id) {
              isFail = true;
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Failed!!!",
                "Please fill Item",
                "text-h5 red--text text-center"
              );
              return;
            }
          } else {
            if (Number(log.work_hours) === 0) {
              isFail = true;
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Failed!!!",
                "Please fill work hours",
                "text-h5 red--text text-center"
              );
              return;
            }
            console.log({ type: this.timecardType });
            if (log.qty === 0) {
              isFail = true;
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Failed!!!",
                "Please fill qty more than 0",
                "text-h5 red--text text-center"
              );
              return;
            }
            if (!log.time_card_date) {
              isFail = true;
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Failed!!!",
                "Please fill date",
                "text-h5 red--text text-center"
              );
              return;
            }
            if (!log.opn_ord_id) {
              isFail = true;
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Failed!!!",
                "Please fill opn ord",
                "text-h5 red--text text-center"
              );
              return;
            }
            if (!log.wc_id) {
              isFail = true;
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Failed!!!",
                "Please fill wc",
                "text-h5 red--text text-center"
              );
              return;
            }
            if (!log.mch_id) {
              isFail = true;
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Failed!!!",
                "Please fill machine",
                "text-h5 red--text text-center"
              );
              return;
            }
            if (!log.wo_running_no) {
              isFail = true;
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Failed!!!",
                "Please fill WO",
                "text-h5 red--text text-center"
              );
              return;
            }
            if (!log.item_id) {
              isFail = true;
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Failed!!!",
                "Please fill Item",
                "text-h5 red--text text-center"
              );
              return;
            }
          }

          const updateDefects = log.tbl_time_card_defects.filter(
            (defect) => defect?.isDeleted !== true
          );
          const deletedDefects = log.tbl_time_card_defects.filter(
            (defect) => defect?.isDeleted && defect.isNew !== true
          );
          return await api.upsertTimecardLog({
            ...log,
            id: log.isNew ? null : log.id,
            time_card_id: this.$route.params.id,
            qty: `${log.qty}`,
            tbl_time_card_defects: updateDefects.map((defect) => ({
              ...defect,
              id: defect.isNew ? null : defect.id,
            })),
            defect_delete_id_list: deletedDefects.map((defect) => defect.id),
          });
        })
      );
      await Promise.all(
        deletedLogs.map(async (log) => {
          return api.deleteTimecardLog(this.$route.params.id, log.id);
        })
      );
      if (isFail) {
        return;
      }
      this.$hideLoader();
      this.itemaddudefine.module_master_id = this.$route.params.id;
      this.itemaddudefine.date1 = this.parseDate(this.itemaddudefine.date1);
      this.itemaddudefine.date2 = this.parseDate(this.itemaddudefine.date2);

      this.itemaddudefine.u_define_module_id = this.main_u_define_module_id;
      await api.updateByModuleMasterIdANDUdefineModuleId(
        this.$route.params.id,
        this.main_u_define_module_id,
        {
          ...this.itemaddudefine,
          date1: this.parseDate(this.itemaddudefine.date1),
          date2: this.parseDate(this.itemaddudefine.date2),
        }
      );
      this.$hideLoader();
      this.$store.state.global_dialog_push = true;
      this.setupAlertDialogPush(
        true,
        "Success!!!",
        "Add data success",
        "text-h5 green--text text-center",
        "/time-card"
      );
      return;
    },
    async loadItemGroupList(id) {
      const result = await api.getGroupItemByCompanyID(id);
      this.itemgrouplist = result.data;
    },
    validateSetupTime(item) {
      if (item.setup_time) {
        item.setup_time = Number(item.setup_time).toFixed(2);
      }
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

    validateTimeStart(item) {
      let isValid = false;
      const { time_start } = item;
      if (!time_start) {
        return isValid;
      }
      const { HH: hour, mm: min } = time_start;
      if (hour && min) {
        isValid = true;
      }
      return isValid;
    },

    getValidEndTime(item) {
      const { time_start } = item;
      const { HH: hour } = time_start;
      if (!hour) {
        return [];
      } else {
        item.work_hours = 0;
      }
      item.validEndTime = [[hour, 23]];
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
<style>
.dropdown .drop-down .vue__time-picker-dropdown {
  width: 10%;
}
</style>
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

.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active),
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-icon,
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-btn,
.theme--light.v-tabs > .v-tabs-bar .v-tab--disabled {
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
  margin-top: 0px;
}

.v-input__slot {
  margin-bottom: 0px;
}

.v-data-table {
  /* width: 100%; */
  overflow-x: scroll;
}
</style>
