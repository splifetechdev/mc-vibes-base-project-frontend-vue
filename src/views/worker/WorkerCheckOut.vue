<template>
  <v-container fluid>
    <v-card>
      <v-form class="pl-5 pr-5 pt-5">
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-card-title>Worker Check-out</v-card-title>
            </v-col>
            <v-col cols="2.5" style="align-content: center;">
              <v-autocomplete
                clearable
                placeholder="Search Machine"
                v-model="selectedMachine"
                item-disabled="disabled"
                hide-details
                item-text="label"
                item-value="id"
                :items="machines"
                dense
              ></v-autocomplete>
            </v-col>
            <v-col cols="2.5" style="align-content: center;">
              <v-autocomplete
                clearable
                placeholder="Search Worker"
                v-model="selectedWorker"
                item-disabled="disabled"
                hide-details
                item-text="label"
                item-value="id"
                :items="workers"
                dense
              ></v-autocomplete>
            </v-col>
            <v-col cols="1" style="align-content: center;">
              <v-btn
                small
                depressed
                style="background-color: #1f51ff;color: white;"
                @click="filterData"
              >
                Search
              </v-btn>
            </v-col>
            <v-col cols="2" style="align-content: center;">
              <v-btn
                small
                depressed
                style="background-color: #1f51ff;color: white;"
                @click="confirmCheckoutAllModal = true"
              >
                Checkout All
              </v-btn>
            </v-col>
          </v-row>
          <v-row
            style="width: 100%; overflow-y: auto; flex-wrap: nowrap;"
            v-for="timecard in timecards"
          >
            <v-col cols="12">
              <v-card>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h5">
                      <div
                        style="display: flex; align-items: center; flex-wrap: wrap; justify-content: space-between;"
                      >
                        <div>{{ timecard.doc_running_no }}</div>
                        <div style="font-size: large;">
                          พนักงาน: {{ timecard.workers.join(", ") }}
                        </div>
                        <div style="font-size: large;">
                          {{ formatDate(timecard.doc_date) }} Shift
                          {{ timecard.tbl_shift.shift_id }}
                          {{ timecard.tbl_shift.shift_name }}
                          {{ formatTime(timecard.tbl_shift.start_time) }}-{{
                            formatTime(timecard.tbl_shift.end_time)
                          }}
                        </div>
                      </div>
                    </v-list-item-title>
                    <!-- <v-list-item-subtitle>{{
                      time_card.tbl_time_card_details[0]?.tbl_time_card_detail_workers.map(
                        (worker) => worker.tbl_worker.name
                      )
                    }}</v-list-item-subtitle> -->
                  </v-list-item-content>
                </v-list-item>
                <div
                  style="padding: 10px;height: 300px; overflow-y: auto; width: 100%;"
                >
                  <v-row style="width: 100%;background:gainsboro">
                    <v-col cols="1.5">Production Order</v-col>
                    <v-col cols="1.5">Machine</v-col>
                    <v-col cols="1.5">Item ID</v-col>
                    <v-col cols="0.5">OPN ID</v-col>
                    <v-col cols="1">Desc.</v-col>
                    <v-col cols="1">Batch</v-col>
                    <v-col cols="1">QTY</v-col>
                    <v-col cols="1">Defect</v-col>
                    <v-col cols="2">Working Time</v-col>
                    <v-col cols="1"> </v-col>
                  </v-row>
                  <v-row
                    style="width: 100%;"
                    v-for="time_card_detail in timecard.tbl_time_card_details"
                    :key="time_card_detail.id"
                  >
                    <v-col cols="1.5">{{
                      time_card_detail.wo_running_no
                    }}</v-col>
                    <v-col cols="1.5">{{
                      time_card_detail.tbl_mch.name
                    }}</v-col>
                    <v-col cols="1.5">{{
                      time_card_detail.item_master.item_id
                    }}</v-col>
                    <v-col cols="0.5">{{ time_card_detail.opn_ord_id }}</v-col>
                    <v-col cols="1">{{ time_card_detail.opn_desc }}</v-col>
                    <v-col cols="1">{{
                      time_card_detail.tbl_opn_ord.batch_count
                    }}</v-col>
                    <v-col cols="1">{{ detailQty[time_card_detail.id] }}</v-col>
                    <v-col cols="1">
                      {{
                        time_card_detail.tbl_time_card_defects.reduce(
                          (acc, cur) => acc + cur.qty,
                          0
                        )
                      }}</v-col
                    >
                    <v-col cols="3">{{
                      `${time_card_detail.time_start} - ${time_card_detail.time_end}`
                    }}</v-col>
                    <!-- <v-col cols="1"> </v-col> -->
                  </v-row>
                </div>
                <v-divider></v-divider>
                <div style="padding: 10px; width: 100%;">
                  <v-row style="width: 100%;">
                    <v-col cols="1.5">Total</v-col>
                    <v-col cols="1.5"></v-col>
                    <v-col cols="1.5"></v-col>
                    <v-col cols="0.5"></v-col>
                    <v-col cols="1"></v-col>
                    <v-col cols="1"></v-col>

                    <v-col cols="1">{{
                      timecard.tbl_time_card_details
                        .reduce((acc, cur) => {
                          return (acc += Number(detailQty[cur.id]));
                        }, 0)
                        .toFixed(2)
                    }}</v-col>
                    <v-col cols="1">{{
                      timecard.tbl_time_card_details.reduce((acc, cur) => {
                        const defectCount = cur.tbl_time_card_defects.reduce(
                          (acc, cur) => acc + cur.qty,
                          0
                        );
                        return (acc += defectCount);
                      }, 0)
                    }}</v-col>
                    <v-col cols="2">
                      <div style="display: flex;">
                        <vue-timepicker
                          style="margin-right: 3px;"
                          format="HH:mm"
                          manual-input
                          hide-dropdown
                          hide-clear-button
                          width="100%"
                          v-model="timecard.start_time"
                        >
                        </vue-timepicker>

                        <vue-timepicker
                          manual-input
                          hide-dropdown
                          format="HH:mm"
                          hide-clear-button
                          width="100%"
                          v-model="timecard.end_time"
                        >
                        </vue-timepicker>
                      </div>

                      <!-- <v-text-field
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
                      ></v-text-field> -->
                    </v-col>
                    <v-col cols="1">
                      <v-btn
                        small
                        depressed
                        style="background-color: #1f51ff;color: white;"
                        @click="onClickCheckout(timecard)"
                      >
                        Checkout
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
                <!-- <div style="padding: 10px; width: 100%">
                  <v-row style="width: 100%;">
                    <v-col cols="1.5">Total</v-col>
                    <v-col cols="1.5"></v-col>
                    <v-col cols="1.5"></v-col>
                    <v-col cols="0.5"></v-col>
                    <v-col cols="2"></v-col>
                    <v-col cols="1"></v-col>
                    <v-col cols="1">{{
                      timecard.tbl_time_card_details.reduce((acc, cur) => {
                        return (acc += detailQty[cur.id]);
                      }, 0)
                    }}</v-col>
                    <v-col cols="1">{{
                      timecard.tbl_time_card_details.reduce((acc, cur) => {
                        const defectCount = cur.tbl_time_card_defects.reduce(
                          (acc, cur) => acc + cur.qty,
                          0
                        );
                        return (acc += defectCount);
                      }, 0)
                    }}</v-col>
                    <v-col cols="2"> </v-col>
                  </v-row>
                </div> -->
              </v-card>
              <br />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    <v-dialog v-model="confirmPostTimecard" max-width="290">
      <v-card>
        <v-card-title primary-title>
          Confirm Checkout
        </v-card-title>

        <v-card-text class="body">
          Are you sure to checkout?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="confirmPostTimecard = false">
            Cancel
          </v-btn>

          <v-btn color="success" text @click="postJob">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmCheckoutAllModal" max-width="290">
      <v-card>
        <v-card-title primary-title>
          Confirm Checkout All
        </v-card-title>

        <v-card-text class="body">
          Are you sure to checkout all?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="confirmCheckoutAllModal = false">
            Cancel
          </v-btn>

          <v-btn color="success" text @click="onClickCheckoutAll">
            Confirm
          </v-btn>
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
  </v-container>
</template>

<script>
import SuccessDialog from "@/components/cards/SuccessDialog";
import SuccessDialogPush from "@/components/cards/SuccessDialogPush";
import OpnChecker from "@/views/worker/components/OpnChecker";
import { server } from "@/services/constants";
import api from "@/services/api";
import dayjs from "dayjs";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
export default {
  name: "WorkerCheckIn",
  components: {
    SuccessDialog,
    SuccessDialogPush,
    OpnChecker,
    VueTimepicker,
  },
  data() {
    return {
      confirmCheckoutAllModal: false,
      timecards: [],
      detailQty: {},
      backups: [],
      confirmPostTimecard: false,
      dialogAdd: false,
      title: "",
      message: "",
      text_color: "",
      link: "",
      targetId: null,
      machines: [],
      workers: [],
      selectedWorker: null,
      selectedMachine: null,
    };
  },

  async mounted() {
    // this.showdefaultsignature();
    // ----------------- Check Authorize ---------------------------
    this.userId = localStorage.getItem(server.USER_ID);
    let yourUrlString = window.location;
    // alert(yourUrlString);

    let parser = document.createElement("a");
    parser.href = yourUrlString;

    this.authorize_id = localStorage.getItem(server.AUTHORIZE_ID);
    // alert("authorize_id:" + this.authorize_id);
    if (this.authorize_id == null || this.authorize_id == 0) {
      // this.$router.push("/login");
      this.$store.state.global_dialog = true;
      this.setupAlertDialog(
        true,
        "Authorize Failed!!!",
        "Please Logout And Login Again!!!",
        "text-h5 red--text text-center"
      );
      this.$router.back();
    }

    const res_auth = await api.getAuthorize(this.userId, "worker-check-in");

    this.authorize_view = res_auth.data[0].smd_view >= 1 ? true : false;
    this.authorize_add = res_auth.data[0].smd_add >= 1 ? true : false;
    this.authorize_edit = res_auth.data[0].smd_edit >= 1 ? true : false;
    this.authorize_del = res_auth.data[0].smd_del >= 1 ? true : false;
    // this.$router.back();

    if (!this.authorize_view) {
      this.$router.back();
    }

    // ----------------- Check Authorize ---------------------------
    let comp_id = localStorage.getItem(server.COMPANYID);
    if (!this.userId || !api.isLoggedIn()) {
      this.$store.state.isLogged = false;
      this.$router.push("/login");
    }
    await Promise.all([
      // this.loadShift(comp_id),
      this.loadTimecard(),
      // this.loadWorkCenters(comp_id),
      // this.loadOpn(),
    ]);
  },

  methods: {
    initialize() {
      this.$hideLoader();
    },
    filterData() {
      if (!this.selectedWorker && !this.selectedMachine) {
        this.timecards = this.backups;
        return;
      }

      if (this.selectedWorker) {
        this.timecards = this.backups.filter((timecard) => {
          return timecard.tbl_time_card_details.some((detail) => {
            return detail.tbl_time_card_detail_workers.some((worker) => {
              return worker.tbl_worker.id == this.selectedWorker;
            });
          });
        });
      }

      if (this.selectedMachine) {
        this.timecards = this.backups.filter((timecard) => {
          return timecard.tbl_time_card_details.some((detail) => {
            return detail.tbl_mch.id == this.selectedMachine;
          });
        });
      }
    },
    formatTime(time) {
      return dayjs(time)
        .subtract(7, "hour")
        .format("HH:mm");
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
    getMachineOpns(machineId) {
      return this.machineOPNs[`${machineId}`] || [];
    },
    async getOpnFormMachineAndShift(machineId, shiftId) {
      if (`${machineId}` in this.machineOPNs) {
        return this.machineOPNs[`${machineId}`];
      }
      const response = await api.getProdOrderByMachine(
        localStorage.getItem(server.COMPANYID),
        machineId
      );

      this.machineOPNs = {
        ...this.machineOPNs,
        [`${machineId}`]: response.data,
      };

      this.machineUnplanedOPNs = {
        ...this.machineUnplanedOPNs,
        [`${machineId}`]: this.operations.filter(
          (operation) =>
            !response.data.map((opn) => opn.id).includes(operation.id)
        ),
      };

      // if (response.data.length === 0) {
      //   this.selectedMachines = this.selectedMachines.filter(
      //     (id) => id !== machineId
      //   );
      // }
      return response.data;
    },
    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD");
    },
    async getTimecardDetailReceiveQty(job) {
      if (job.end_at === null) {
        const response = await api.getTimecardDetailReceiveQty(job.id);
        this.detailQty[job.id] = response.data.qty;
        this.detailQty = {
          ...this.detailQty,
          [job.id]: response.data.qty,
        };
        return response.data.qty;
      } else {
        this.detailQty[job.id] = job.qty;
        this.detailQty = {
          ...this.detailQty,
          [job.id]: job.qty,
        };
        return job.qty;
      }
    },
    async loadWorkers() {
      this.$showLoader();
      const response = await api.getWorkerByCompany();
      this.workers = response.data.map((data) => ({
        ...data,
        label: `${data.emp_id}:${data.firstname} ${data.lastname}`,
      }));

      this.$hideLoader();
    },
    onClickCheckout(timecard) {
      const now = new Date();
      const target = new Date(`${this.formatDate(timecard.doc_date)}T${timecard.end_time}:00`);
      if (now >= target) {
      this.targetId = timecard.id;
      this.confirmPostTimecard = true;
    }else{
      this.$store.state.global_dialog = true;
      this.setupAlertDialog(true, "Failed!!!", "ไม่สามารถ checkout ก่อนเวลาได้");
      return;
    }
    },
    getDiffHour(detail) {
      let [startHour, startMinute] = detail.time_start.split(":");
      let [endHour, endMinute] = detail.time_end.split(":");
      if (!startHour || !startMinute || !endHour || !endMinute) {
        const startTime = shift.start_time;
        const endTime = shift.end_time;
        startHour = startTime.split(":")[0];
        startMinute = startTime.split(":")[1];
        endHour = endTime.split(":")[0];
        endMinute = endTime.split(":")[1];
      }
      console.log({ startHour, endHour });
      const totalMinutes1 = Number(startHour) * 60 + Number(startMinute);

      const totalMinutes2 = Number(endHour) * 60 + Number(endMinute);
      let difference;
      if (totalMinutes2 < totalMinutes1) {
        difference = 24 * 60 - totalMinutes1 + totalMinutes2;
      } else {
        difference = totalMinutes2 - totalMinutes1;
      }
      console.log({ totalMinutes1, totalMinutes2, difference });
      // let difference = Math.abs(totalMinutes2 - totalMinutes1);
      const diffHour = difference / 60;
      console.log({ diffHour });
      return diffHour;
    },
    async loadTimecard() {
      this.$showLoader();
      const response = await api.listOwnTimecard();
      this.timecards = response.data.map((tc) => {
        let minStartTime, maxEndTime;
        const workers = tc.tbl_time_card_details.reduce((acc, cur) => {
          minStartTime = cur.time_start;
          maxEndTime = cur.time_end;
          cur.tbl_time_card_detail_workers.forEach((worker) => {
            const wk = worker.tbl_worker;
            const wkLabel = `${wk.emp_id}:${wk.firstname} ${wk.lastname}`;
            if (!acc.includes(wkLabel)) {
              acc.push(wkLabel);
            }
          });
          return acc;
        }, []);
        tc.tbl_time_card_details.forEach((detail) => {
          const date = dayjs(detail.time_card_date).format("YYYY-MM-DD");
          const timeStart = dayjs(`${date} ${detail.time_start}`);
          const timeEnd = timeStart.add(this.getDiffHour(detail), "hour");
          detail.time_start = timeStart.format("YYYY-MM-DD HH:mm");
          detail.time_end = timeEnd.format("YYYY-MM-DD HH:mm");
        });
        return {
          ...tc,
          start_time: minStartTime,
          end_time: maxEndTime,
          workers,
        };
      });

      console.log({ timecard: this.timecards });
      this.machines = this.timecards.reduce((acc, cur) => {
        cur.tbl_time_card_details.forEach((detail) => {
          const foundMachine = acc.find((m) => m.id === detail.tbl_mch.id);
          if (!foundMachine) {
            acc.push({
              ...detail.tbl_mch,
              label: `${detail.tbl_mch.machine_id}:${detail.tbl_mch.name}`,
            });
          }
        });
        return acc;
      }, []);
      console.log({ machines: this.machines });
      this.workers = this.timecards.reduce((acc, cur) => {
        cur.tbl_time_card_details.forEach((detail) => {
          detail.tbl_time_card_detail_workers.forEach((worker) => {
            const foundWorker = acc.find((w) => w.id === worker.tbl_worker.id);
            if (!foundWorker) {
              acc.push({
                ...worker.tbl_worker,
                label: `${worker.tbl_worker.emp_id}:${worker.tbl_worker.firstname} ${worker.tbl_worker.lastname}`,
              });
            }
          });
        });
        return acc;
      }, []);
      console.log({ workers: this.workers });
      this.backups = this.timecards;
      response.data.forEach((timecard) => {
        timecard.tbl_time_card_details.forEach((detail) => {
          this.getTimecardDetailReceiveQty(detail);
        });
      });
      this.$hideLoader();
    },
    async postJob() {
      this.$showLoader();
      const foundTimecard = this.timecards.find((tc) => tc.id == this.targetId);
      if (foundTimecard) {
        await api.postJobTimecard(
          this.targetId,
          foundTimecard.start_time,
          foundTimecard.end_time
        );
      }
      this.confirmPostTimecard = false;
      this.targetId = null;
      this.loadTimecard();
      this.$hideLoader();
    },
    async onClickCheckoutAll() {
      this.$showLoader();
      await Promise.all(
        this.timecards.map((timecard) => {
          return api.postJobTimecard(
            timecard.id,
            timecard.start_time,
            timecard.end_time
          );
        })
      );
      this.loadTimecard();
      this.confirmCheckoutAllModal = false;
      this.$hideLoader();
    },
    async loadShift(comp_id) {
      const result = await api.getShiftByCompanyID(comp_id);
      this.shifts = result.data.map((shift) => ({
        period: `${shift.start_time} - ${shift.end_time}`,
        label: `${shift.shift_id}-${shift.shift_name} ${shift.start_time} - ${shift.end_time}`,
        ...shift,
      }));
      this.$hideLoader();
    },
    async loadWorkCenters(comp_id) {
      this.$showLoader();
      const response = await api.getWorkCenterMaster(comp_id);
      this.workCenters = response.data.map((data) => ({
        ...data,
        label: `${data.wc_id}:${data.wc_name}`,
      }));
      this.$hideLoader();
    },
    async loadOpn() {
      const response = await api.getOpnOrdOption(
        localStorage.getItem(server.COMPANYID)
      );
      this.operations = response.data.map((data) => ({
        ...data,
        selected: false,
      }));
    },
    async loadMachineByWorkCenter(wc_id) {
      this.$showLoader();
      const response = await api.listMachineByWorkcenterID(wc_id);
      this.machineOPNs = {};
      this.selectedMachines = [];
      this.selectedMachineOpn = {
        planed: {},
        unplaned: {},
      };
      this.machines = response.data.map((data) => {
        this.selectedMachineOpn.planed[data.id] = [];
        this.selectedMachineOpn.unplaned[data.id] = [];
        return {
          ...data,
          label: `${data.machine_id}:${data.name}`,
        };
      });

      if (this.machines.length === 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "No machine found in this work center",
          "text-h5 red--text text-center"
        );
        this.selectedWorkCenter = null;
      }
      this.$hideLoader();
    },
    getMachineOpnIds() {
      // return data [[machineId, opnId], [machineId, opnId]]
      const planed = Object.entries(this.selectedMachineOpn.planed).map(
        ([machineId, opnIds]) => {
          return opnIds.map((opnId) => [machineId, opnId]);
        }
      );
      const unplaned = Object.entries(this.selectedMachineOpn.unplaned).map(
        ([machineId, opnIds]) => {
          return opnIds.map((opnId) => [machineId, opnId]);
        }
      );
      return [...planed, ...unplaned]
        .filter((machineOpn) => machineOpn.length > 0)
        .reduce((acc, cur) => acc.concat(cur), []);
    },
    async checkIn() {
      this.$showLoader();
      try {
        const data = {
          shift_id: this.selectedShift,
          worker_ids: this.selectedWorkers,
          machine_opn_ids: this.getMachineOpnIds(),
        };
        const response = await api.workerCheckIn(data);
        if (response.status === 200) {
          this.$store.state.global_dialog_push = true;
          this.selectedShift = null;
          this.selectedWorkers = [];
          this.selectedWorkCenter = null;
          this.selectedMachines = [];
          this.machines = [];
          this.setupAlertDialogPush(
            true,
            "Success!!!",
            "Worker checked in successfully",
            "text-h5 green--text text-center",
            "/job-tfms"
          );
        } else {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            response.data.message,
            "text-h5 red--text text-center"
          );
        }
      } catch (error) {
        console.error({ error });
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          error.response.data.message,
          "text-h5 red--text text-center"
        );
      } finally {
        this.$hideLoader();
      }
    },
  },
  watch: {},
  async created() {
    this.initialize();
  },
  beforeCreate() {
    this.$store.state.navMenu = true;
  },
};
</script>

<style></style>
