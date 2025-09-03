<template fluid>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-row class="fill-height">
        <v-col cols="12" md="6" class="d-flex align-center justify-center">
          <h1>Availability</h1>
        </v-col>
        <v-col cols="12" md="6" class="d-flex flex-wrap">
          <v-col cols="12" md="4">
            <v-menu v-model="open_start_date" :close-on-content-click="false" :nudge-right="40"
              transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field hide-details outlined dense :value="formatDisplayDate(start)" prepend-icon="mdi-calendar"
                  readonly v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="start" @input="open_start_date = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="4">
            <v-menu v-model="open_end_date" :close-on-content-click="false" :nudge-right="40"
              transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field hide-details outlined dense :value="formatDisplayDate(end)" prepend-icon="mdi-calendar"
                  readonly v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="end" @input="open_end_date = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete hide-details clearable outlined dense label="Downtime" v-model="selectedDowntime"
              item-text="description" item-value="id" :items="downtimes"></v-autocomplete>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete class="mx-2" label="Work Center Group" v-model="selectedWorkCenterGroup" hide-details outlined
              dense :items="workCenterGroups" item-text="label" item-value="id" clearable></v-autocomplete>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete class="mx-2" label="Work Center" v-model="selectedWorkCenter" hide-details outlined dense
              :items="filteredWorkerCenter" item-text="label" item-value="id" clearable></v-autocomplete>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete outlined clearable label="Machine" v-model="selectedMachine" hide-details
              :items="filteredMachine" item-value="id" item-text="label" dense></v-autocomplete>
          </v-col>
        </v-col>
      </v-row>
      <v-row class="fill-height">
        <v-col cols="12" md="6">
          <ProductivityChart :machineAvailability="machineAvailability" />
        </v-col>
        <v-col cols="12" md="6" justify-self='center'>
          <SummaryAvailability :availability="availability" :totalPlanHours="totalPlanHours" :setupHours="setupHours"
            :totalRunHours="totalRunHours" :downtimeHours="downtimeHours" :machineCount="machineCount" />
        </v-col>
      </v-row>
      <v-row class="fill-height">
        <v-col cols="12" md="4" class="fill-height">
          <MonthlyChart :monthlyData="monthlyData" />
        </v-col>
        <v-col cols="12" md="4" class="fill-height">
          <TargetChart :targetData="targetData" />
        </v-col>
        <v-col cols="12" md="4" class="fill-height">
          <TopTenDownTimeChart :downtimeData="downtimeData" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" class="fill-height">
          <v-data-table :headers="headers" :items="data" :search="search" :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus',
          }" sort-by="fullname" class="elevation-1">
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import api from "@/services/api";
import { server } from "../services/constants";
import ProductivityChart from "../components/charts/ProductivityChart.vue";
import SummaryAvailability from "../components/charts/SummaryAvailability.vue";
import MonthlyChart from "../components/charts/MonthlyChart.vue";
import TopTenDownTimeChart from '../components/charts/TopTenDownTimeCauseChart.vue'
import TargetChart from "../components/charts/TargetChart.vue";
import dayjs from "dayjs"

export default {
  name: "AvailabilityDashboard",
  components: {
    ProductivityChart,
    SummaryAvailability,
    MonthlyChart,
    TopTenDownTimeChart,
    TargetChart
  },
  data() {
    return {
      search: "",
      selectedProductId: "",
      confirmDeleteDlg: false,
      mDataArray: [],
      fullPage: true,
      start: dayjs().subtract(7, 'days').format("YYYY-MM-DD"),
      end: dayjs().format("YYYY-MM-DD"),
      open_start_date: false,
      open_end_date: false,
      data: [],
      headers: [
        { text: "WC Group", value: "work_center_group" },
        { text: "Work Center", value: "work_center" },
        { text: "Machine", value: "machine" },
        { text: "Plan Hrs.", value: "plan_hours" },
        { text: "Run Hrs.", value: "run_hours" },
        { text: "Downtime Hrs.", value: "downtime_hours" },
        { text: "%A", value: "availability" },
      ],
      workCenterGroups: [],
      machines: [],
      workCenters: [],
      downtimes: [],
      selectedDowntime: null,
      selectedWorkCenter: null,
      selectedMachine: null,
      selectedWorkCenterGroup: null,
      machineAvailability: {
        machines: [],
        availability: []
      },
      downtimeData: {
        downtimeDesc: [],
        downtimeHours: []
      },
      targetData: { wc: [], target: [], actual: [] },
      monthlyData: {
        month: [],
        availability: []
      },
      totalPlanHours: 0,
      totalRunHours: 0,
      setupHours: 0,
      downtimeHours: 0,
      machineCount: 0,
      availability: 0
    };
  },
  async mounted() {
    this.loadWorkCenterGroup();
    this.loadWorkCenter();
    this.loadMachine()
    this.loadDowntimeCause()
    this.loadAvailableData()
    this.$hideLoader();

  },
  computed: {
    filteredWorkerCenter() {
      if (this.selectedWorkCenterGroup) {
        const foundWorkCenterGroup = this.workCenterGroups.find(wcg => wcg.id === this.selectedWorkCenterGroup)
        return this.workCenters.filter(wc => wc.wc_group === foundWorkCenterGroup.work_center_group_id)
      }
      return this.workCenters
    },
    filteredMachine() {
      if (this.selectedWorkCenter) {
        return this.machines.filter(mch => mch.work_center_id === this.selectedWorkCenter)
      }
      if (this.selectedWorkCenterGroup) {
        const workCenterGroup = this.workCenterGroups.find(wcg => wcg.id === this.selectedWorkCenterGroup)
        const workCenters = this.workCenters.filter(wc => wc.wc_group === workCenterGroup.work_center_group_id)
        const workCenterIds = workCenters.map(wc => wc.id)
        return this.machines.filter(mch => workCenterIds.includes(mch.work_center_id))
      }
      return this.machines
    }
  },
  watch: {
    start() {
      this.loadAvailableData()
    },
    end() {
      this.loadAvailableData()
    },
    selectedMachine(mch_id) {
      if (mch_id) {
        const machine = this.machines.find(mch => mch.id === mch_id)
        const foundWorkCenter = this.workCenters.find(wc => wc.id === machine.work_center_id)
        this.selectedWorkCenter = foundWorkCenter.id
        const foundWorkCenterGroup = this.workCenterGroups.find(wcg => wcg.work_center_group_id === foundWorkCenter.wc_group)
        this.selectedWorkCenterGroup = foundWorkCenterGroup.id
      }
      this.loadAvailableData()
    },
    selectedWorkCenter(wc_id) {
      if (!wc_id) {
        this.selectedMachine = null
      } else {
        const foundWorkCenter = this.workCenters.find(wc => wc.id === wc_id)
        const foundWorkCenterGroup = this.workCenterGroups.find(wcg => wcg.work_center_group_id === foundWorkCenter.wc_group)
        this.selectedWorkCenterGroup = foundWorkCenterGroup.id
      }
      this.loadAvailableData()
    },
    selectedWorkCenterGroup(wcg_id) {
      if (!wcg_id) {
        this.selectedMachine = null
        this.selectedWorkCenter = null
      }
      this.loadAvailableData()
    },
    selectedDowntime() {
      this.loadDowntime()
    }
  },
  methods: {
    formatCurrencyWithoutSymbol(number, locale = 'en-US') {
      return new Intl.NumberFormat(locale, {
        style: 'decimal'
      }).format(number);
    },
    formatDisplayDate(date) {
      if (!date) {
        return
      }
      if (date === 'Invalid Date') {
        date = null
        return ""
      }
      return dayjs(date).format('DD/MM/YYYY')
    },
    async loadMachine() {
      const response = await api.listMachineByCompany(
        localStorage.getItem(server.COMPANYID)
      )
      this.machines = response.data.map(data => ({ ...data, label: `${data.machine_id}:${data.name}` }))
      this.machineNames = this.machines.map(m => m.label)
    },
    async loadWorkCenter() {
      const response = await api.getWorkCenterMaster(
        localStorage.getItem(server.COMPANYID)
      )
      this.workCenters = response.data.map(data => ({ ...data, label: `${data.wc_id}:${data.wc_name}` }))
    },
    async loadDowntimeCause() {
      const response = await api.getDownTimeCauseCompanyID(
        localStorage.getItem(server.COMPANYID)
      );
      this.downtimes = response.data
    },
    async loadWorkCenterGroup() {
      const response = await api.getWorkCenterGroupMaster(
        localStorage.getItem(server.COMPANYID)
      );
      this.workCenterGroups = response.data.map(data => ({ ...data, label: `${data.work_center_group_id}: ${data.work_center_group_name}` }));
    },
    getMachineAvailability() {
      this.machineAvailability = this.data.reduce((acc, cur) => {
        acc.machines.push(cur.machine_id)
        acc.availability.push(cur.availability)
        return acc
      }, { machines: [], availability: [] })
    },
    getDashboardSummary() {
      const [totalPlanHours, totalRunHours, setupHours, downtimeHours, mchCount] = this.data.reduce((acc, cur) => {
        acc[0] += Number(cur.plan_hours)
        acc[1] += Number(cur.run_hours)
        acc[2] += Number(cur.setup_hours)
        acc[3] += Number(cur.downtime_hours)
        acc[4] += 1
        return acc
      }, [0, 0, 0, 0, 0])
      this.totalPlanHours = this.formatCurrencyWithoutSymbol(totalPlanHours)
      this.totalRunHours = this.formatCurrencyWithoutSymbol(Math.round(totalRunHours * 100) / 100)
      this.setupHours = this.formatCurrencyWithoutSymbol(setupHours)
      this.downtimeHours = this.formatCurrencyWithoutSymbol(downtimeHours)
      this.machineCount = this.formatCurrencyWithoutSymbol(mchCount)
      this.availability = Math.round(((totalRunHours / totalPlanHours) * 100) * 100) / 100
    },
    async loadDowntime() {
      const response = await api.getDowntimeDashboard({
        start: this.start,
        end: this.end,
        downtime_id: this.selectedDowntime
      })
      const result = response.data.reduce((acc, cur) => {
        acc.downtimeDesc.push(cur.description)
        acc.downtimeHours.push(cur.downtime_hours)
        return acc
      }, { downtimeDesc: [], downtimeHours: [] })

      this.downtimeData = result
    },
    async loadTargetData() {
      const response = await api.getTargetDashboard({
        start: this.start,
        end: this.end
      })
      const result = response.data.reduce((acc, cur) => {
        acc.dates.push(cur.date)
        acc.target.push(cur.target)
        acc.actual.push(cur.availability)
        return acc
      }, { dates: [], target: [], actual: [] })
      this.targetData = result
    },
    async loadAvailabilityMonthlyData() {
      const response = await api.getMonthlyDashboard({
        start: this.start,
        end: this.end
      })
      const result = response.data.reduce((acc, cur) => {
        acc.month.push(cur.month)
        acc.availability.push(cur.availability)
        return acc
      }, { month: [], availability: [] })
      this.monthlyData = result
    },
    async loadAvailableData() {
      const response = await api.getMachineAvailabilityData({
        start: this.start,
        end: this.end,
        downtime_id: this.selectedDowntime,
        wcg_id: this.selectedWorkCenterGroup,
        wc_id: this.selectedWorkCenter,
        mch_id: this.selectedMachine
      })
      this.data = response.data
      this.getMachineAvailability()
      this.getDashboardSummary()
      this.loadDowntime()
      this.loadTargetData()
      this.loadAvailabilityMonthlyData()
    },
  },
  beforeCreate() {
    console.log("beforeCreate");
    this.$store.state.navMenu = true;
  },
};
</script>

<style></style>
