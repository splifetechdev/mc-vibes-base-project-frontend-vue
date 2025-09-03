<template>
  <v-container fluid>
    <v-card>
      <v-form class="pl-5 pr-5 pt-5">
        <v-container>
          <v-row>
            <v-card-title>Worker Check-in</v-card-title>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-menu
                v-model="checkInDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    hide-details
                    :value="formatDisplayDate(checkInDate)"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="checkInDate"
                  @input="checkInDateMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="3">
              <v-select
                v-model="selectedShift"
                :items="shifts"
                :rules="[(v) => !!v || 'Item is required']"
                label="Shift"
                item-text="label"
                item-value="id"
                required
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-autocomplete
                v-model="selectedWorkers"
                :items="workers"
                :rules="[(v) => !!v || 'Item is required']"
                label="Worker"
                item-text="label"
                item-value="id"
                required
                multiple
              />
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="selectedWorkCenter"
                :items="workCenters"
                :rules="[(v) => !!v || 'Item is required']"
                label="Work Center"
                item-text="label"
                item-value="id"
                required
              ></v-select>
            </v-col>
          </v-row>
          <!-- <v-row>
            <v-col cols="4">Machine</v-col>
            <v-col cols="8">OPN</v-col>
          </v-row> -->
          <v-row v-if="this.selectedWorkCenter">
            <v-expansion-panels accordion style="padding: 5px">
              <v-expansion-panel>
                <v-expansion-panel-header>Machine</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col
                      cols="3"
                      v-for="machine in machines"
                      :key="machine.machine_id"
                    >
                      <v-checkbox
                        v-model="selectedMachines"
                        :label="machine.label"
                        :value="machine.id"
                        @change="
                          getOpnFormMachineAndShift(machine.id, selectedShift)
                        "
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <OpnChecker
              :machines="machines"
              :selectedMachines="selectedMachines"
              :machineOPNs="machineOPNs"
              :machineUnplanedOPNs="machineUnplanedOPNs"
              :selectedOpnIds="selectedOpnIds"
              :selectedMachineOpn="selectedMachineOpn"
              :operations="operations"
              :machineOpnRunning="machineOpnRunning"
            />
            <!-- <v-col
              cols="3"
              v-for="machine in machines"
              :key="machine.machine_id"
            >
              <v-checkbox
                v-model="selectedMachines"
                :label="machine.label"
                :value="machine.id"
                @change="getOpnFormMachineAndShift(machine.id, selectedShift)"
              ></v-checkbox>
            </v-col> -->

            <!-- <v-col cols="8">
              <v-checkbox
                v-model="selectedOpnIds"
                :disabled="!selectedMachines.includes(machine.id)"
                v-for="opn in machineOPNs[machine.id]"
                :key="opn.id"
                :label="opn.id"
                :value="opn.id"
              >
              </v-checkbox>
            </v-col> -->
          </v-row>
          <v-row justify="center">
            <v-col align="right">
              <v-btn
                @click="checkIn"
                color="blue darken-1"
                :disabled="
                  !selectedShift || !selectedWorkers || !selectedWorkCenter
                "
              >
                Check In
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                @click="
                  () => {
                    selectedShift = null;
                    selectedWorkers = [];
                    selectedWorkCenter = null;
                    selectedMachines = [];
                    machines = [];
                  }
                "
                color="secondary"
              >
                Clear
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
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
export default {
  name: "WorkerCheckIn",
  components: {
    SuccessDialog,
    SuccessDialogPush,
    OpnChecker,
  },
  data() {
    return {
      checkInDate: dayjs().format("YYYY-MM-DD"),
      checkInDateMenu: false,
      workers: [],
      selectedOpnIds: [],
      selectedMachineOpn: {
        planed: {},
        unplaned: {},
      },
      shifts: [],
      workCenters: [],
      machines: [],
      selectedWorkers: [],
      selectedShift: null,
      selectedWorkCenter: null,
      selectedMachines: [],
      dialogAdd: false,
      title: "",
      message: "",
      text_color: "",
      link: "",
      machineOPNs: {},
      machineUnplanedOPNs: {},
      operations: [],
      machineOpnRunning: {},
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
      this.loadShift(comp_id),
      this.loadWorkers(),
      this.loadWorkCenters(comp_id),
      this.loadOpn(),
    ]);
  },
  methods: {
    initialize() {
      this.$hideLoader();
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
    async getMachineOpnRunning(machineId) {
      if (`${machineId}` in this.machineOpnRunning) {
        return this.machineOpnRunning[`${machineId}`];
      }
      const response = await api.getMachineOpnRunning(machineId);
      const opnIds = response.data;
      this.machineOpnRunning = {
        ...this.machineOpnRunning,
        [`${machineId}`]: opnIds,
      };
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
    async loadWorkers() {
      this.$showLoader();
      const response = await api.getWorkerByCompany();
      this.workers = response.data.map((data) => ({
        ...data,
        label: `${data.emp_id}:${data.firstname} ${data.lastname}`,
      }));

      this.$hideLoader();
    },
    formatDisplayDate(date) {
      if (!date) {
        return;
      }
      if (date === "Invalid Date") {
        date = null;
        return "";
      }
      return dayjs(date).format("DD/MM/YYYY");
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
      const machineOpns = [...planed, ...unplaned]
        .filter((machineOpn) => machineOpn.length > 0)
        .reduce((acc, cur) => acc.concat(cur), []);
      return machineOpns.filter(([machineId, opnId]) => {
        return this.selectedMachines.some(
          (selectedMchId) => selectedMchId == machineId
        );
      });
    },
    async checkIn() {
      this.$showLoader();
      console.log({ date: this.checkInDate });
      try {
        const data = {
          shift_id: this.selectedShift,
          worker_ids: this.selectedWorkers,
          machine_opn_ids: this.getMachineOpnIds(),
          doc_date: this.checkInDate,
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
  watch: {
    selectedWorkCenter: function(val) {
      if (val) {
        this.loadMachineByWorkCenter(val);
      }
    },
    machines: function(val) {
      val.forEach((machine) => {
        this.getOpnFormMachineAndShift(machine.id, this.selectedShift);
      });
    },
    selectedMachines: function(val) {
      val.forEach((machineId) => {
        this.getMachineOpnRunning(machineId);
      });
    },
  },
  async created() {
    this.initialize();
  },
  beforeCreate() {
    this.$store.state.navMenu = true;
  },
};
</script>

<style></style>
