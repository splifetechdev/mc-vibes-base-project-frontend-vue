<template>
  <v-container fluid>
    <v-card class="">
      <v-row class="mt-5 ml-5 mr-5">
        <v-col cols="12" md="10">
          <v-row>
            <v-toolbar flat>
              <v-toolbar-title>Report : </v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-autocomplete
                class="mx-2"
                label="Shift"
                v-model="selectedShiftId"
                hide-details
                outlined
                dense
                :items="shifts"
                item-text="label"
                item-value="id"
                clearable
              ></v-autocomplete>

              <v-menu
                v-model="startDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="Start Date"
                    clearable
                    @change="onStartDateChange"
                    :value="formatDisplayDate(startDate)"
                    hide-details
                    prepend-icon="mdi-calendar"
                    outlined
                    readonly
                    dense
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="startDate"
                  @input="startDateMenu = false"
                ></v-date-picker>
              </v-menu>
              <v-menu
                v-model="endDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="End Date"
                    clearable
                    @change="onEndDateChange"
                    outlined
                    :value="formatDisplayDate(endDate)"
                    hide-details
                    prepend-icon="mdi-calendar"
                    readonly
                    dense
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="endDate"
                  @input="endDateMenu = false"
                ></v-date-picker>
              </v-menu>
              <v-btn @click="onClickFilter" color="blue darken-1" class="mx-2"
                >Filter</v-btn
              >
              <v-btn @click="print" color="blue darken-1" class="mx-2"
                >PRINT</v-btn
              >
            </v-toolbar>
          </v-row>
        </v-col>
      </v-row>
      <div
        v-for="report in reports"
        style="border: 1px solid; margin-top: 20px;"
      >
        <v-row class="mt-5 ml-5 mr-5">
          <v-col cols="12" md="4">
            <div style="display: flex; flex-direction: column;">
              <div style="font-weight: bold;">
                {{ report.created_by }}
              </div>
              <div>
                วันที่ {{ report.date }} กะ {{ report.start_time }} -
                {{ report.end_time }}
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            รายงานผลผลิต
          </v-col>
          <v-col cols="12" md="4">
            <v-row>
              <v-col
                cols="12"
                md="6"
                style="background-color: aliceblue; font-weight: bolder;"
              >
                <div
                  style="display: flex; justify-content: center; align-items: center;"
                >
                  A={{ report.availability || 0 }}
                </div>
              </v-col>
              <v-col
                cols="12"
                md="6"
                style="background-color: aliceblue; font-weight: bolder;"
              >
                <div
                  style="display: flex; justify-content: center; align-items: center;"
                >
                  P={{ report.performance || 0 }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="6"
                style="background-color: aliceblue; font-weight: bolder;"
              >
                <div
                  style="display: flex; justify-content: center; align-items: center;"
                >
                  Q={{ report.quality || 0 }}
                </div>
              </v-col>
              <v-col
                cols="12"
                md="6"
                style="background-color: aliceblue; font-weight: bolder;"
              >
                <div
                  style="display: flex; justify-content: center; align-items: center;"
                >
                  OEE={{ report.oee || 0 }}
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <div
          v-for="workCenter in report.workCenters"
          style="margin-top: 20px; padding:20px; border: 1px solid; margin-left: 10px; margin-right: 10px"
        >
          <v-row>
            <v-col cols="12" md="8">
              <div
                style="display: flex; justify-content: start; align-items: center; font-weight: bolder;"
              >
                WC: {{ workCenter.workCenter.wc_name }}
              </div>
            </v-col>
            <v-col
              cols="12"
              md="1"
              style="background-color: aliceblue; font-weight: bolder;"
              >A={{ workCenter.availability || 0 }}</v-col
            >
            <v-col
              cols="12"
              md="1"
              style="background-color: aliceblue; font-weight: bolder;"
              >P={{ workCenter.performance || 0 }}</v-col
            >
            <v-col
              cols="12"
              md="1"
              style="background-color: aliceblue; font-weight: bolder;"
              >Q={{ workCenter.quality || 0 }}</v-col
            >
            <v-col
              cols="12"
              md="1"
              style="background-color: aliceblue; font-weight: bolder;"
              >OEE={{ workCenter.oee || 0 }}</v-col
            >
          </v-row>
          <!-- background-color: blue; -->
          <v-row style="border: 1px solid black;">
            <v-col cols="12" md="2">รหัสสินค้า</v-col>
            <v-col cols="12" md="3">ช่ือสินค้า</v-col>
            <v-col cols="12" md="1">รหัส OPN</v-col>
            <v-col cols="12" md="1">OPN Desc</v-col>
            <v-col cols="12" md="1">Batch</v-col>
            <v-col cols="12" md="1">จำนวน (m)</v-col>
            <v-col cols="12" md="1">จำนวนสะสม</v-col>
            <v-col cols="12" md="1">Defect</v-col>
            <v-col cols="12" md="1">สถานะ</v-col>
          </v-row>
          <div v-for="machine in workCenter.machines" style="margin-top: 30px;">
            <v-row>
              <v-col cols="12" md="8">
                <div
                  style="display: flex; justify-content: start; align-items: center; font-weight: bolder; "
                >
                  MCH: {{ machine.machine.name }}
                  /
                  {{ getWoRunningNo(machine.timecards) }}
                  /
                  {{ getWorkers(machine.timecards) }}
                </div>
              </v-col>
              <v-col
                cols="12"
                md="1"
                style="background-color: aliceblue; font-weight: bolder;"
                >A={{ machine.availability || 0 }}</v-col
              >
              <v-col
                cols="12"
                md="1"
                style="background-color: aliceblue; font-weight: bolder;"
                >P={{ machine.performance || 0 }}</v-col
              >
              <v-col
                cols="12"
                md="1"
                style="background-color: aliceblue; font-weight: bolder;"
                >Q={{ machine.quality || 0 }}</v-col
              >
              <v-col
                cols="12"
                md="1"
                style="background-color: aliceblue; font-weight: bolder;"
                >OEE={{ machine.oee || 0 }}</v-col
              >
            </v-row>
            <v-row v-for="tc in machine.timecards">
              <v-col cols="12" md="2">{{ tc.item_id }}</v-col>
              <v-col cols="12" md="3">{{ tc.item_name }}</v-col>
              <v-col cols="12" md="1">{{ tc.opn_ord_id }}</v-col>
              <v-col cols="12" md="1">{{ tc.opn_desc }}</v-col>
              <v-col cols="12" md="1">{{ tc.batch_count }}</v-col>
              <v-col cols="12" md="1">{{
                tc.qty
                  ? parseFloat(tc.qty).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "0.00"
              }}</v-col>
              <v-col cols="12" md="1">{{
                tc.acc_qty
                  ? parseFloat(tc.acc_qty).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "0.00"
              }}</v-col>
              <v-col cols="12" md="1">{{ tc.defect_count }}</v-col>
              <v-col cols="12" md="1">{{ tc.opn_status }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="2"></v-col>
              <v-col cols="12" md="3"></v-col>
              <v-col cols="12" md="1"></v-col>
              <v-col cols="12" md="1"></v-col>
              <v-col cols="12" md="1" style="font-weight: bolder;">รวม</v-col>
              <v-col cols="12" md="1" style="font-weight: bolder;">{{
                machine.total_qty
                  ? parseFloat(machine.total_qty).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "0.00"
              }}</v-col>
              <v-col cols="12" md="1" style="font-weight: bolder;">{{
                machine.total_acc_qty
                  ? parseFloat(machine.total_acc_qty).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "0.00"
              }}</v-col>
              <v-col cols="12" md="1" style="font-weight: bolder;">{{
                machine.total_defects
              }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="2"></v-col>
              <v-col cols="12" md="3"></v-col>
              <v-col cols="12" md="1"></v-col>
              <v-col cols="12" md="1"></v-col>
              <v-col cols="12" md="1" style="font-weight: bolder;"
                >Downtime</v-col
              >
              <v-col cols="12" md="1" style="font-weight: bolder;">{{
                machine.total_downtime.toFixed(2) || 0
              }}</v-col>
            </v-row>
          </div>
          <v-row style="border: 1px solid">
            <v-col cols="12" md="2" style="font-weight: bolder;"
              >WC: {{ workCenter.workCenter.wc_name }}</v-col
            >
            <v-col cols="12" md="3"></v-col>
            <v-col cols="12" md="1"></v-col>
            <v-col cols="12" md="1"></v-col>
            <v-col cols="12" md="1" style="font-weight: bolder;">รวม</v-col>
            <v-col cols="12" md="1" style="font-weight: bolder;">{{
              workCenter.total_qty
                ? parseFloat(workCenter.total_qty).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : "0.00"
            }}</v-col>
            <v-col cols="12" md="1" style="font-weight: bolder;">{{
              workCenter.total_acc_qty
                ? parseFloat(workCenter.total_acc_qty).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : "0.00"
            }}</v-col>
            <v-col cols="12" md="1" style="font-weight: bolder;">{{
              workCenter.total_defects
            }}</v-col>
            <v-col cols="12" md="1" style="font-weight: bolder;"></v-col>

            <v-col cols="12" md="2" style="font-weight: bolder;"></v-col>
            <v-col cols="12" md="3"></v-col>
            <v-col cols="12" md="1"></v-col>
            <v-col cols="12" md="1"></v-col>
            <v-col cols="12" md="1" style="font-weight: bolder;"
              >Downtime</v-col
            >
            <v-col cols="12" md="1" style="font-weight: bolder;">{{
              workCenter.total_downtime.toFixed(2) || 0
            }}</v-col>
          </v-row>
        </div>
        <div style="margin-top: 20px; padding:20px">
          <v-row class="" style="border: 1px solid">
            <v-col cols="12" md="2" style="font-weight: bolder;">รวม</v-col>
            <v-col cols="12" md="3"></v-col>
            <v-col cols="12" md="1"></v-col>
            <v-col cols="12" md="1"></v-col>
            <v-col cols="12" md="1" style="font-weight: bolder;"></v-col>
            <v-col cols="12" md="1" style="font-weight: bolder;">{{
              report.total_qty
                ? parseFloat(report.total_qty).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : "0.00"
            }}</v-col>
            <v-col cols="12" md="1" style="font-weight: bolder;">{{
              report.total_acc_qty
                ? parseFloat(report.total_acc_qty).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : "0.00"
            }}</v-col>
            <v-col cols="12" md="1" style="font-weight: bolder;">{{
              report.total_defects
            }}</v-col>
            <v-col cols="12" md="1" style="font-weight: bolder;"></v-col>

            <v-col cols="12" md="2" style="font-weight: bolder;"></v-col>
            <v-col cols="12" md="3"></v-col>
            <v-col cols="12" md="1"></v-col>
            <v-col cols="12" md="1"></v-col>
            <v-col cols="12" md="1" style="font-weight: bolder;"
              >Downtime</v-col
            >
            <v-col cols="12" md="1" style="font-weight: bolder;">{{
              report.total_downtime.toFixed(2) || 0
            }}</v-col>
          </v-row>
        </div>
      </div>
    </v-card>
    <v-card v-if="printing" id="print">
      <div style="text-align: center;">
        รายงานผลผลิต
      </div>
      <div v-for="report in reports" class="print-report">
        <div style="display: flex; justify-content: space-between;">
          <div>
            วันที่ {{ report.date }} กะ {{ report.start_time }} -
            {{ report.end_time }}
          </div>
          <div>
            <table class="summary-table">
              <tr>
                <th class="t-header">A={{ report.availability || 0 }}</th>
                <th class="t-header">P={{ report.performance || 0 }}</th>
                <th class="t-header">Q={{ report.quality || 0 }}</th>
                <th class="t-header">OEE={{ report.oee || 0 }}</th>
              </tr>
            </table>
          </div>
        </div>
        <table class="report-table">
          <tr class="t-header-row">
            <th class="t-header">
              รหัส-ชื่อสินค้า
            </th>
            <th class="t-header">
              Batch
            </th>
            <th class="t-header">
              จำนวน
            </th>
            <th class="t-header">
              จำนวนสะสม
            </th>
            <th class="t-header">
              Defect
            </th>
          </tr>
          <fragment v-for="workCenter in report.workCenters">
            <fragment v-for="machine in workCenter.machines">
              <tr>
                <td colspan="5" class="t-mch-detail">
                  MCH: {{ machine.machine.name }}
                  /
                  {{ getWoRunningNo(machine.timecards) }}
                  /
                  {{ getWorkers(machine.timecards) }}
                </td>
              </tr>
              <tr v-for="tc in machine.timecards">
                <td style="text-align: left;">
                  {{ tc.item_id }} - {{ tc.item_name }}
                </td>
                <td>{{ tc.batch_count }}</td>
                <td>
                  {{
                    tc.qty
                      ? parseFloat(tc.qty).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "0.00"
                  }}
                </td>
                <td>
                  {{
                    tc.acc_qty
                      ? parseFloat(tc.acc_qty).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "0.00"
                  }}
                </td>
                <td>{{ tc.defect_count }}</td>
              </tr>
            </fragment>
          </fragment>
          <tr>
            <td class="t-footer">
              Summary Downtime = {{ report.total_downtime.toFixed(2) }}
            </td>
            <td class="t-footer">รวม</td>
            <td class="t-footer">
              {{
                report.total_qty
                  ? parseFloat(report.total_qty).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "0.00"
              }}
            </td>
            <td class="t-footer">
              {{
                report.total_acc_qty
                  ? parseFloat(report.total_acc_qty).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "0.00"
              }}
            </td>
            <td class="t-footer">
              {{ report.total_defects }}
            </td>
          </tr>
        </table>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import api from "@/services/api";
import SuccessDialog from "@/components/cards/SuccessDialog";
import SuccessDialogPush from "@/components/cards/SuccessDialogPush";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import { server } from "@/services/constants";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { Fragment } from "vue-fragment";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default {
  components: {
    SuccessDialog,
    SuccessDialogPush,
    VueTimepicker,
  },
  data: (vm) => ({
    headers: [
      { text: "Machine", value: "mch_id" },
      { text: "Work Order", value: "wo_running_no" },
      { text: "OPN Desc", value: "opn_desc" },
      { text: "Item ID", value: "item_id" },
      { text: "Item Name", value: "item_name" },
      { text: "Worker", value: "worker_id" },
      { text: "Start Date", value: "start_at" },
      { text: "Start Time", value: "start_time" },
      { text: "End Date", value: "end_at" },
      { text: "End Time", value: "end_time" },
      { text: "Action", value: "action" },
    ],
    printing: false,
    jobs: [],
    search: "",
    startDate: dayjs()
      .subtract(1, "day")
      .format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    workOrders: [],
    workers: [],
    workCenters: [],
    activetab: 2,
    selectedWorkCenterId: null,
    selectedShiftId: null,
    machines: [],
    items: [],
    selectedMachineId: null,
    selectedWorkerId: null,
    title: "green",
    message: "green",
    link: "",
    text_color: "text-h5 green--text text-center",
    dialogAdd: false,
    authorize_add: false,
    jobStatus: "pending",
    callsoopentab: true,
    confirmDialog: false,
    confirmEndJobDialog: false,
    confirmDeleteJobDialog: false,
    selectedItem: null,
    deleteItem: null,
    startDateMenu: false,
    endDateMenu: false,
    defectDialog: false,
    editingDetailId: null,
    defects: [],
    shifts: [],
    defectOptions: [],
    defectHeaders: [
      { text: "qty", value: "qty" },
      { text: "Defect", value: "defect_cause_id" },
      { text: "Name", value: "defect_cause_name" },
      { text: "Action", value: "action" },
    ],
    reports: [],
    cssText: `
      .t-header {
        border: 1px solid black;
        padding: 10px;
      }
    
      .print-report {
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 5px;
        border-bottom: 2px solid black;
      }

      td {
        padding: 2px;
        align-item: center;
        text-align: center;
      }

      .summary-table {
        border-spacing: 0px;

      }

      .t-header-row {
        border: 1px solid black;
      }

      .t-mch-detail {
        font-weight: bold;
        text-align: left;
        padding: 10px;
      }

      .t-footer {
        padding: 20px;
        border: 1px solid black;
      }

      .report-table {
        margin-top: 10px;
        margin-bottom: 20px;
        width: 100%;
        border-spacing: 0px;
      }

      button {
        background-color: #f0f0f0;
        border: solid 1px #bbb;
        padding: 10px;
        font-size: 15px;
        border-radius: 5px;
      }

      pre {
        color: #c7254e;
      }
    `,
  }),
  computed: {
    computedAvailableDefect() {
      return this.defects.filter((d) => d?.isDeleted !== true);
    },
    computedFilteredJobs() {
      let filteredData = this.jobs;
      if (this.startDate) {
        filteredData = filteredData.filter((job) =>
          dayjs(job.start_at).isSameOrAfter(dayjs(this.startDate))
        );
      }
      if (this.endDate) {
        filteredData = filteredData.filter((job) =>
          dayjs(job.start_at).isSameOrBefore(dayjs(this.endDate))
        );
      }
      if (this.selectedMachineId) {
        const machine = this.machines.find(
          (m) => m.id === this.selectedMachineId
        );
        if (!machine) {
          return filteredData;
        }
        this.selectedWorkCenterId = machine.tbl_work_center.id;
        filteredData = filteredData.filter(
          (job) => job.mch_id === this.selectedMachineId
        );
      }
      if (this.selectedWorkCenterId) {
        filteredData = filteredData.filter(
          (job) => job.wc_id === this.selectedWorkCenterId
        );
      }
      if (this.selectedWorkerId) {
        filteredData = filteredData.filter((job) =>
          job.worker_id_list.includes(this.selectedWorkerId)
        );
      }
      return filteredData;
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
    activetab() {
      this.loadData();
    },
    selectedWorkCenterId(val) {
      if (val === null) {
        this.selectedMachineId = null;
      }
    },
    // selectedShiftId(val) {
    //   this.loadData();
    // },
    startDate(val) {
      if (val === null) {
        this.startDate = null;
      }
      // else {
      //   this.loadData();
      // }
    },
    endDate(val) {
      if (val === null) {
        this.endDate = null;
      }
      // else {
      //   this.loadData();
      // }
    },
  },
  methods: {
    onStartDateChange(val) {
      if (val === null) {
        this.startDate = null;
      }
    },
    onClickFilter() {
      this.loadData();
    },
    onRemoveDefect(item) {
      const foundDefect = this.defects.find((defect) => defect.id === item.id);
      foundDefect.isDeleted = true;
      this.defects = [...this.defects];
      // this.defects = this.defects.filter(defect => defect.id !== item.id)
    },
    async loadShift(comp_id) {
      const result = await api.getShiftByCompanyID(comp_id);
      this.shifts = result.data.map((shift) => ({
        period: `${shift.start_time} - ${shift.end_time}`,
        label: `${shift.shift_id}-${shift.shift_name} ${shift.start_time} - ${shift.end_time}`,
        ...shift,
      }));
      this.selectedShiftId = this.shifts[0].id;
      this.$hideLoader();
    },
    onChangeDefect(id) {
      const defect = this.defectOptions.find((defect) => defect.id === id);
      defect.disabled = true;
    },
    getWoRunningNo(timecards) {
      const woRunningNo = timecards.map(
        (tc) =>
          `${tc.wo_running_no} หน้าผ้า ${tc.tbl_opn_ord?.tbl_ord.line_of_mch ||
            0}`
      );
      return [...new Set(woRunningNo)].join(",");
    },
    getWorkers(timecards) {
      const workerIdList = timecards
        .map((tc) =>
          tc.tbl_time_card_detail_workers.map((worker) => worker.worker_id)
        )
        .flat();
      const workers = this.workers.filter((worker) =>
        workerIdList.includes(worker.id)
      );
      // console.log({ workers });
      return workers.map((worker) => worker.label).join(",");
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
    onClickAddDefect(timecardDetail) {
      this.defectDialog = true;
      this.editingDetailId = timecardDetail.id;
      this.defects = timecardDetail.defects;
    },
    async loadDefect() {
      const response = await api.getDefectCauseByCompanyID(
        localStorage.getItem(server.COMPANYID)
      );
      this.defectOptions = response.data;
    },
    onEndDateChange(val) {
      if (val === null) {
        this.endDate = null;
      }
    },
    close() {
      this.defectDialog = false;
    },
    async save() {
      const founded = this.jobs.find((log) => log.id === this.editingDetailId);
      founded.defects = this.defects;
      const response = await api.upsertDefect({
        time_card_detail_id: this.editingDetailId,
        defects: this.defects
          .filter((defect) => !defect.isDeleted)
          .map((defect) => ({
            defect_cause_id: defect.defect_cause_id,
            qty: defect.qty,
          })),
      });
      this.defects = [];
      this.editingDetailId = null;
      this.defectDialog = false;
    },
    async loadWorkCenter() {
      const response = await api.getWorkCenterMaster(
        localStorage.getItem(server.COMPANYID)
      );
      this.workCenters = response?.data?.map((data) => ({
        ...data,
        label: `${data.wc_id}:${data.wc_name}`,
      }));
      // console.log(this.workCenters)
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
    async loadAuthorize() {
      const res_get = await api.getSettingGroupMenu();
      this.authorize = res_get.data;
    },
    getReceivedQty(job) {
      return job.received_qty || 0;
    },
    async loadData() {
      this.reports = [];
      this.$showLoader();
      if (this.selectedShiftId === null) {
        const responses = await Promise.all(
          this.shifts.map(async (shift) => {
            return await api.getTimecardReport(
              shift.id,
              dayjs(this.startDate)
                .startOf("day")
                .format("YYYY-MM-DD HH:mm:ss"),
              dayjs(this.endDate)
                .endOf("day")
                .format("YYYY-MM-DD HH:mm:ss"),
              true
            );
          })
        );
        responses.forEach((response) => {
          // const allReports = this.reports.concat(
          //   response.data.filter((data) => data.workCenters.length > 0)
          // );
          // this.reports = allReports.sort((a, b) => {
          //   return dayjs(a.created_at).isBefore(dayjs(b.created_at)) ? 1 : -1;
          // });
          const result = response.data.filter(
            (data) => data.workCenters.length > 0
          );
          // console.log("aaa");
          // console.log({ result });
          this.reports = [...this.reports, ...result];
        });
        // console.log(this.reports);
        // this.reports = this.reports.sort((a, b) =>
        //   dayjs(b.date).isBefore(dayjs(a.date)) ? 1 : -1
        // );

        this.reports = this.reports.sort((a, b) =>
          dayjs(`${this.parseDate(a.date)}T${a.start_time}`).isBefore(dayjs(`${this.parseDate(b.date)}T${b.start_time}`)) ? -1 : 1
        );
   
        // console.log(this.reports);
      } else {
        const response = await api.getTimecardReport(
          this.selectedShiftId,
          dayjs(this.startDate)
            .startOf("day")
            .format("YYYY-MM-DD HH:mm:ss"),
          dayjs(this.endDate)
            .endOf("day")
            .format("YYYY-MM-DD HH:mm:ss"),
          true
        );
        this.reports = response.data.filter(
          (data) => data.workCenters.length > 0
        );
      }

      this.$hideLoader();
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
    async loadItem() {
      const response = await api.getItemMasterByCompanyID(
        localStorage.getItem(server.COMPANYID)
      );
      this.items = response.data;
    },
    async loadWorker() {
      const response = await api.getWorkerByCompany();
      this.workers = response.data.map((data) => ({
        ...data,
        label: `${data.emp_id}:${data.firstname} ${data.lastname}`,
      }));
    },
    async loadLatestJob() {
      const response = await api.getLatestJob();
      if (response.data) {
        this.selectedMachineId = response.data.mch_id;
        this.selectedWorkCenterId = response.data.tbl_mch?.work_center_id;
      }
    },
    setupAlertDialog(status, title, message, text_color) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
    },
    formatDisplayDate(date) {
      if (!date) {
        return;
      }
      return date === "Invalid Date" ? "" : dayjs(date).format("DD/MM/YYYY");
    },
    onClickDeleteButton(item) {
      this.deleteItem = item;
      this.confirmDeleteJobDialog = true;
    },
    async getTimecardDetailReceiveQty(job) {
      const response = await api.getTimecardDetailReceiveQty(job.id);
      job.received_qty = response.data.qty;
      this.jobs = [...this.jobs];
      return response.data.qty;
    },
    syncQty() {
      this.jobs.forEach((job) => {
        this.getTimecardDetailReceiveQty(job);
      });
    },
    onClickEndJobButton(item) {
      if (!item.worker_id_list.length === 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(true, "Failed!!!", "Please fill worker");
        return;
      }
      this.selectedItem = item;
      this.confirmEndJobDialog = true;
    },
    onClickStartJobButton(item) {
      if (!item.worker_id_list.length === 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(true, "Failed!!!", "Please fill worker");
        return;
      }
      this.selectedItem = item;
      this.confirmDialog = true;
    },
    getWorkerNames(worker_id_list) {
      const workers = this.workers.filter((worker) =>
        worker_id_list.includes(worker.id)
      );
      return workers.map((worker) => worker.label).join(",");
    },
    getMachineLabel(mch_id) {
      const machine = this.machines.find((machine) => machine.id === mch_id);
      return machine?.label;
    },
    getItemLabel(item_id) {
      const item = this.items.find((item) => item.id === item_id);
      return item?.item_name;
    },
    getItemId(item_id) {
      const item = this.items.find((item) => item.id === item_id);
      return item?.item_id;
    },
    setupAlertDialogPush(status, title, message, text_color, link) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
      this.link = link;
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        setTimeout(() => {
          this.countDown = 1800; // 1800 sec
          this.countDownTimer();
          if (this.activetab === 2) {
            this.syncQty();
          }
        }, 1000);
      }
    },
    reloadData() {
      this.$store.state.global_dialog_push = true;
      this.setupAlertDialogPush(
        true,
        "Success!!!",
        "success",
        "text-h5 green--text text-center",
        "/job-tfms"
      );
      this.loadData();
      this.selectedItem = null;
      this.confirmDialog = false;
      this.confirmEndJobDialog = false;
    },
    async confirmDeleteJob() {
      const { opn_ord_id } = this.deleteItem;
      if (opn_ord_id) {
        await api.deleteByOpnOrdId(opn_ord_id, false);
      }
      this.reloadData();
      this.deleteItem = null;
      this.confirmDeleteJobDialog = false;
    },
    async confirmEndJob() {
      const startTime = this.selectedItem.start_time;
      if ("Invalid Date" === startTime) {
        startDateTime = null;
      }

      const endTime = this.selectedItem.end_time;
      if ("Invalid Date" === endTime) {
        endDateTime = null;
      }

      const updateData = {
        id: this.selectedItem.id,
        opn_ord_id: this.selectedItem.opn_ord_id || "",
        mch_id: this.selectedItem.mch_id,
        wo_running_no: this.selectedItem.wo_running_no,
        opn_desc: this.selectedItem.opn_desc,
        item_id: this.selectedItem.item_id,
        time_start: this.selectedItem.start_time,
        time_end: this.selectedItem.end_time,
        worker_id: this.selectedItem.worker_id,
        qty: await this.getTimecardDetailReceiveQty(this.selectedItem),
      };
      await api.endTimecardDetail(updateData);
      // const oldWorkerIdList = this.selectedItem.tbl_job_workers.map(
      //   (jobWorker) => jobWorker.worker_id
      // );
      // const removeWorkerIdList = oldWorkerIdList.filter(
      //   (jobWorkerId) => !this.selectedItem.worker_id_list.includes(jobWorkerId)
      // );
      // await Promise.all([
      //   api.updateJob(updateData),
      //   ...removeWorkerIdList.map((jobWorkerId) =>
      //     api.removeJobWorker(updateData.id, jobWorkerId)
      //   ),
      // ]);
      this.reloadData();
    },
    async confirmStartJob() {
      const startTime = this.selectedItem.start_time;
      const startDate = this.selectedItem.start_at;
      const startDateTime = dayjs(`${startDate} ${startTime}:00`);
      const endTime = this.selectedItem.end_time;
      const endDate = this.selectedItem.end_at;
      const endDateTime = dayjs(`${endDate} ${endTime}:00`);

      const saveData = {
        ...this.selectedItem,
        start_at: startDateTime,
        end_at: endDateTime,
      };
      const result = await api.createJob(saveData);
      const jobId = result.data.id;
      if (jobId) {
        await Promise.all(
          saveData.worker_id_list.map(
            async (worker_id) =>
              await api.createJobWorker(jobId, { job_id: jobId, worker_id })
          )
        );
      }
      this.reloadData();
    },

    print() {
      this.printing = true;
      setTimeout(() => {
        this.d.print(document.getElementById("print"), [this.cssText]);
        this.printing = false;
      }, 1000);
    },

    parseDate(date) {
      if (!date) return null;
      const [day , month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
  async mounted() {
    console.log("when component is mounted!");

    const { Printd } = window.printd;

    this.d = new Printd();

    const { contentWindow } = this.d.getIFrame();

    contentWindow.addEventListener("beforeprint", () =>
      console.log("before print event!")
    );
    contentWindow.addEventListener("afterprint", () =>
      console.log("after print event!")
    );
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
      alert("You don't have permission to access this page");
      this.$router.back();
    }

    await this.loadAuthorize();
    await this.loadOpn();
    await this.loadWorkOrder();
    await this.loadWorkCenter();
    await this.loadMachine();
    await this.loadItem();
    await this.loadShift(localStorage.getItem(server.COMPANYID));
    await this.loadData();

    await Promise.all([
      this.loadWorker(),
      this.loadDefect(),
      this.loadLatestJob(),
    ]);

    this.$hideLoader();

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
  created() {
    this.countDownTimer();
  },
};
</script>
