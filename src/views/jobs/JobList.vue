<template>
  <v-container fluid>
    <v-card class="ma-3">
      <v-row class="mt-5 ml-5 mr-5">
        <v-col cols="12" md="10">
          <v-row>
            <v-toolbar flat>
              <v-toolbar-title>Start Job : </v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-autocomplete
                class="mx-2"
                label="Work Center"
                v-model="selectedWorkCenterId"
                hide-details
                outlined
                dense
                :items="workCenters"
                item-text="label"
                item-value="id"
                clearable
              ></v-autocomplete>
              <v-autocomplete
                class="mx-2"
                label="Machine"
                v-model="selectedMachineId"
                hide-details
                outlined
                dense
                :items="machines"
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
            </v-toolbar>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" justify="center">
          <div id="tabs" class="containertab">
            <div class="tabs">
              <div
                v-on:click="activetab = 1"
                v-bind:class="[activetab === 1 ? 'active' : '']"
              >
                Not start
              </div>
              <div
                class="ml-1"
                v-on:click="activetab = 2"
                v-bind:class="[activetab === 2 ? 'active' : '']"
              >
                Starting
              </div>
              <div
                class="ml-1"
                v-on:click="activetab = 3"
                v-bind:class="[activetab === 3 ? 'active' : '']"
              >
                End
              </div>
            </div>

            <div class="content">
              <div
                v-if="activetab === 1 && callsoopentab == true"
                class="tabcontent"
              >
                <v-data-table
                  :headers="headers"
                  :items="computedFilteredJobs"
                  :search="search"
                  sort-by="fullname"
                  class="elevation-1"
                  :footer-props="{
                    showFirstLastPage: true,
                    firstIcon: 'mdi-arrow-collapse-left',
                    lastIcon: 'mdi-arrow-collapse-right',
                    prevIcon: 'mdi-minus',
                    nextIcon: 'mdi-plus',
                  }"
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                  </template>
                  <template v-slot:item.mch_id="{ item }">
                    <v-autocomplete
                      v-model="item.mch_id"
                      @change="(e) => onOpnOrdIdChange(e, item)"
                      hide-details
                      :items="machines"
                      item-text="label"
                      item-value="id"
                      dense
                    ></v-autocomplete>
                  </template>
                  <template v-slot:item.wo_running_no="{ item }">
                    <v-autocomplete
                      v-model="item.wo_running_no"
                      hide-details
                      :items="workOrders"
                      dense
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
                    ></v-autocomplete>
                  </template>
                  <template v-slot:item.item_name="{ item }">
                    {{ getItemLabel(item.item_id) }}
                  </template>
                  <template v-slot:item.start_at="{ item }">
                    <v-menu
                      v-model="item.start_at_menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :value="formatDisplayDate(item.start_at)"
                          hide-details
                          prepend-icon="mdi-calendar"
                          readonly
                          dense
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="item.start_at"
                        @input="item.start_at_menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </template>
                  <template v-slot:item.start_time="{ item }">
                    <vue-timepicker
                      close-on-complete
                      format="HH:mm"
                      append-to-body
                      fixed-dropdown-button
                      auto-scroll
                      hide-clear-button
                      width="100%"
                      v-model="item.start_time"
                    >
                    </vue-timepicker>
                  </template>
                  <template v-slot:item.end_at="{ item }">
                    <v-menu
                      v-model="item.end_at_menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :value="formatDisplayDate(item.end_at)"
                          hide-details
                          prepend-icon="mdi-calendar"
                          readonly
                          dense
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="item.end_at"
                        @input="item.end_at_menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </template>
                  <template v-slot:item.end_time="{ item }">
                    <vue-timepicker
                      close-on-complete
                      format="HH:mm"
                      append-to-body
                      fixed-dropdown-button
                      auto-scroll
                      hide-clear-button
                      width="100%"
                      v-model="item.end_time"
                    >
                    </vue-timepicker>
                  </template>
                  <template v-slot:item.worker_id="{ item }">
                    <v-autocomplete
                      v-model="item.worker_id_list"
                      hide-details
                      multiple
                      :items="workers"
                      item-value="id"
                      item-text="label"
                      dense
                    ></v-autocomplete>
                  </template>
                  <template v-slot:[`item.action`]="{ item }">
                    <v-icon
                      color="green"
                      x-large
                      class="mr-2"
                      @click="onClickStartJobButton(item)"
                    >
                      mdi-play-circle
                    </v-icon>
                    <v-icon
                      x-large
                      class="mr-2"
                      @click="onClickDeleteButton(item)"
                      :style="{
                        color: '#F44336',
                      }"
                    >
                      mdi-delete
                    </v-icon>
                  </template>
                </v-data-table>
              </div>
              <div v-if="activetab === 2" class="tabcontent">
                <v-data-table
                  :headers="headers"
                  :items="computedFilteredJobs"
                  :search="search"
                  sort-by="fullname"
                  class="elevation-1"
                  :footer-props="{
                    showFirstLastPage: true,
                    firstIcon: 'mdi-arrow-collapse-left',
                    lastIcon: 'mdi-arrow-collapse-right',
                    prevIcon: 'mdi-minus',
                    nextIcon: 'mdi-plus',
                  }"
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                  </template>
                  <template v-slot:item.mch_id="{ item }">
                    <v-autocomplete
                      v-model="item.mch_id"
                      @change="(e) => onOpnOrdIdChange(e, item)"
                      hide-details
                      :items="machines"
                      item-text="label"
                      item-value="id"
                      dense
                    ></v-autocomplete>
                  </template>
                  <template v-slot:item.wo_running_no="{ item }">
                    <v-autocomplete
                      v-model="item.wo_running_no"
                      hide-details
                      :items="workOrders"
                      dense
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
                    ></v-autocomplete>
                  </template>
                  <template v-slot:item.item_name="{ item }">
                    {{ getItemLabel(item.item_id) }}
                  </template>
                  <template v-slot:item.start_at="{ item }">
                    <v-menu
                      v-model="item.start_at_menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :value="formatDisplayDate(item.start_at)"
                          hide-details
                          prepend-icon="mdi-calendar"
                          readonly
                          dense
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="item.start_at"
                        @input="item.start_at_menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </template>
                  <template v-slot:item.start_time="{ item }">
                    <vue-timepicker
                      close-on-complete
                      format="HH:mm"
                      append-to-body
                      fixed-dropdown-button
                      auto-scroll
                      hide-clear-button
                      width="100%"
                      v-model="item.start_time"
                    >
                    </vue-timepicker>
                  </template>
                  <template v-slot:item.end_at="{ item }">
                    <v-menu
                      v-model="item.end_at_menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :value="formatDisplayDate(item.end_at)"
                          hide-details
                          prepend-icon="mdi-calendar"
                          readonly
                          dense
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="item.end_at"
                        @input="item.end_at_menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </template>
                  <template v-slot:item.end_time="{ item }">
                    <vue-timepicker
                      close-on-complete
                      format="HH:mm"
                      append-to-body
                      fixed-dropdown-button
                      auto-scroll
                      hide-clear-button
                      width="100%"
                      v-model="item.end_time"
                    >
                    </vue-timepicker>
                  </template>
                  <template v-slot:item.worker_id="{ item }">
                    <v-autocomplete
                      v-model="item.worker_id_list"
                      hide-details
                      multiple
                      :items="workers"
                      item-value="id"
                      item-text="label"
                      dense
                    ></v-autocomplete>
                  </template>
                  <template v-slot:item.action="{ item }">
                    <v-icon
                      color="red"
                      x-large
                      class="mr-2"
                      @click="onClickEndJobButton(item)"
                    >
                      mdi-stop-circle
                    </v-icon>
                  </template>
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-icon
                      small
                      class="mr-2"
                      @click="$router.push(`/kpi-master-edit/${item.id}`)"
                      v-if="authorize_edit"
                      :style="{
                        backgroundColor: '#E1F5FE',
                        color: '#2196F3',
                      }"
                    >
                      mdi-pencil
                    </v-icon>
                  </template>
                </v-data-table>
              </div>
              <div v-if="activetab === 3" class="tabcontent">
                <v-data-table
                  :headers="headers"
                  :items="computedFilteredJobs"
                  :search="search"
                  sort-by="fullname"
                  class="elevation-1"
                  :footer-props="{
                    showFirstLastPage: true,
                    firstIcon: 'mdi-arrow-collapse-left',
                    lastIcon: 'mdi-arrow-collapse-right',
                    prevIcon: 'mdi-minus',
                    nextIcon: 'mdi-plus',
                  }"
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                  </template>
                  <template v-slot:item.mch_id="{ item }">
                    {{ getMachineLabel(item.mch_id) }}
                  </template>
                  <template v-slot:item.item_id="{ item }">
                    {{ getItemId(item.item_id) }}
                  </template>
                  <template v-slot:item.item_name="{ item }">
                    {{ getItemLabel(item.item_id) }}
                  </template>
                  <template v-slot:item.start_at="{ item }">
                    {{ formatDisplayDate(item.start_at) }}
                  </template>
                  <template v-slot:item.end_at="{ item }">
                    {{ formatDisplayDate(item.end_at) }}
                  </template>
                  <template v-slot:item.worker_id="{ item }">
                    {{ getWorkerNames(item.worker_id_list) }}
                  </template>
                  <template v-slot:item.action="{ item }"> </template>
                </v-data-table>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

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
      <v-dialog v-model="confirmDialog" max-width="290">
        <v-card>
          <v-card-title primary-title>
            Confirm Start Job
          </v-card-title>

          <v-card-text class="body">
            Are you sure to start job this job?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="confirmDialog = false">
              Cancel
            </v-btn>

            <v-btn color="success" text @click="confirmStartJob">
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="confirmEndJobDialog" max-width="290">
        <v-card>
          <v-card-title primary-title>
            Confirm End Job
          </v-card-title>

          <v-card-text class="body">
            Are you sure to end this job?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="confirmEndJobDialog = false">
              Cancel
            </v-btn>

            <v-btn color="success" text @click="confirmEndJob">
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="confirmDeleteJobDialog" max-width="290">
        <v-card>
          <v-card-title primary-title>
            Confirm Delete
          </v-card-title>

          <v-card-text class="body">
            Are you sure to delete this job?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="confirmDeleteJobDialog = false">
              Cancel
            </v-btn>

            <v-btn color="error" text @click="confirmDeleteJob">
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
    jobs: [],
    search: "",
    startDate: null,
    endDate: null,
    workOrders: [],
    workers: [],
    workCenters: [],
    activetab: 1,
    selectedWorkCenterId: null,
    machines: [],
    items: [],
    selectedMachineId: null,
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
  }),
  computed: {
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
      return filteredData;
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
  },
  methods: {
    onStartDateChange(val) {
      if (val === null) {
        this.startDate = null;
      }
    },
    onEndDateChange(val) {
      if (val === null) {
        this.endDate = null;
      }
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
    async loadAuthorize() {
      const res_get = await api.getSettingGroupMenu();
      this.authorize = res_get.data;
    },
    async loadData() {
      this.jobs = [];
      const mapping = {
        1: "pending",
        2: "start",
        3: "end",
      };
      const response = await api.listJobByStatus(mapping[this.activetab]);
      const formatDate = "YYYY-MM-DD";
      const formatTime = "HH:mm";
      if (["start", "end"].includes(mapping[this.activetab])) {
        this.jobs = response.data.reduce((acc, data) => {
          const found = this.operations.find((opnOrd) => opnOrd.id === data.id);
          const startedJobs = data.tbl_jobs.map((tbl_job) => {
            return {
              opn_ord_id: data.id,
              mch_id: tbl_job?.mch_id || data.machine_id,
              wo_running_no: tbl_job?.wo_running_no || data.doc_running_no,
              opn_desc: tbl_job?.opn_desc || found.opn_desc,
              item_id: tbl_job?.item_id || data.item_master_id,
              start_at: tbl_job?.start_at
                ? dayjs(tbl_job.start_at).format(formatDate)
                : dayjs(data.opn_start_date_time).format(formatDate),
              start_time: tbl_job?.start_at
                ? dayjs(tbl_job.start_at).format(formatTime)
                : dayjs(data.opn_start_date_time).format(formatTime),
              end_at: tbl_job?.end_at
                ? dayjs(tbl_job.end_at).format(formatDate)
                : dayjs(data.opn_end_date_time).format(formatDate),
              end_time: tbl_job?.end_at
                ? dayjs(tbl_job.end_at).format(formatTime)
                : dayjs(data.opn_end_date_time).format(formatTime),
              wc_id:
                tbl_job?.tbl_mch?.work_center_id ||
                data?.tbl_mch?.work_center_id,
              id: tbl_job?.id || null,
              worker_id_list: tbl_job?.tbl_job_workers?.length
                ? tbl_job?.tbl_job_workers.map(
                    (jobWorker) => jobWorker.worker_id
                  )
                : [],
              tbl_job_workers: tbl_job?.tbl_job_workers,
            };
          });
          return [...acc, ...startedJobs];
        }, []);
        console.log({ jobs: this.jobs });
      } else {
        this.jobs = response.data.map((data) => {
          const { tbl_jobs } = data;
          const found = this.operations.find((opnOrd) => opnOrd.id === data.id);
          return {
            opn_ord_id: data.id,
            mch_id: tbl_jobs?.mch_id || data.machine_id,
            wo_running_no: tbl_jobs?.wo_running_no || data.doc_running_no,
            opn_desc: tbl_jobs?.opn_desc || found.opn_desc,
            item_id: tbl_jobs?.item_id || data.item_master_id,
            // item_name,
            // worker_id: tbl_jobs?.worker_id || data?.worker_id,
            // start_at: tbl_jobs?.start_at || data?.opn_start_date_time,
            start_at: tbl_jobs?.start_at
              ? dayjs(tbl_job.start_at).format(formatDate)
              : dayjs(data.opn_start_date_time).format(formatDate),
            start_time: tbl_jobs?.start_at
              ? dayjs(tbl_job.start_at).format(formatTime)
              : dayjs(data.opn_start_date_time).format(formatTime),
            end_at: tbl_jobs?.end_at
              ? dayjs(tbl_job.end_at).format(formatDate)
              : dayjs(data.opn_end_date_time).format(formatDate),
            end_time: tbl_jobs?.end_at
              ? dayjs(tbl_job.end_at).format(formatTime)
              : dayjs(data.opn_end_date_time).format(formatTime),
            wc_id:
              tbl_jobs?.tbl_mch?.work_center_id ||
              data?.tbl_mch?.work_center_id,
            id: tbl_jobs?.id || null,
            worker_id_list: tbl_jobs?.tbl_job_workers?.length
              ? tbl_jobs?.tbl_job_workers.map(
                  (jobWorker) => jobWorker.worker_id
                )
              : [],
            tbl_job_workers: tbl_jobs?.tbl_job_workers,
          };
        });
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
    async loadItem() {
      const response = await api.getItemMasterByCompanyID(
        localStorage.getItem(server.COMPANYID)
      );
      this.items = response.data;
    },
    async loadWorker() {
      const response = await api.getWorker();
      this.workers = response.data.map((worker) => ({
        ...worker,
        label: `${worker.emp_id} ${worker.firstname}`,
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
      const startDate = this.selectedItem.start_at;
      let startDateTime = dayjs(`${startDate} ${startTime}:00`);
      if ("Invalid Date" === startDate || "Invalid Date" === startTime) {
        startDateTime = null;
      }

      const endTime = this.selectedItem.end_time;
      const endDate = this.selectedItem.end_at;
      let endDateTime = dayjs(`${endDate} ${endTime}:00`);
      if ("Invalid Date" === endTime || "Invalid Date" === endDate) {
        endDateTime = null;
      }
      const updateData = {
        ...this.selectedItem,
        start_at: startDateTime,
        end_at: endDateTime,
      };
      const oldWorkerIdList = this.selectedItem.tbl_job_workers.map(
        (jobWorker) => jobWorker.worker_id
      );
      const removeWorkerIdList = oldWorkerIdList.filter(
        (jobWorkerId) => !this.selectedItem.worker_id_list.includes(jobWorkerId)
      );
      await Promise.all([
        api.updateJob(updateData),
        ...removeWorkerIdList.map((jobWorkerId) =>
          api.removeJobWorker(updateData.id, jobWorkerId)
        ),
      ]);
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

    await this.loadAuthorize();
    await this.loadOpn();
    this.loadData();
    await this.loadWorkCenter();
    await this.loadMachine();
    this.loadItem();
    this.loadWorker();
    this.loadWorkOrder();
    this.loadLatestJob();

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
</style>
