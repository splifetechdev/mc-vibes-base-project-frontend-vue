<template fluid>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-row class="fill-height">
        <v-col cols="12" md="4" class="d-flex align-center justify-center">
          <h1>Quality</h1>
        </v-col>
        <v-col cols="12" md="8" class="d-flex flex-wrap justify-end">
          <v-col cols="12" md="3">
            <v-menu v-model="open_start_date" :close-on-content-click="false" :nudge-right="40"
              transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field hide-details outlined dense :value="formatDisplayDate(start)" prepend-icon="mdi-calendar"
                  readonly v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="start" @input="open_start_date = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="3">
            <v-menu v-model="open_end_date" :close-on-content-click="false" :nudge-right="40"
              transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field hide-details outlined dense :value="formatDisplayDate(end)" prepend-icon="mdi-calendar"
                  readonly v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="end" @input="open_end_date = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="3">
            <v-autocomplete class="mx-2" label="Work Center Group" v-model="selectedWorkCenterGroup" hide-details outlined
              dense :items="workCenterGroups" item-text="label" item-value="id" clearable></v-autocomplete>
          </v-col>
          <v-col cols="12" md="3">
            <v-autocomplete class="mx-2" label="Work Center" v-model="selectedWorkCenter" hide-details outlined dense
              :items="filteredWorkerCenter" item-text="label" item-value="id" clearable></v-autocomplete>
          </v-col>
          <v-col cols="12" md="3">
            <v-autocomplete hide-details clearable outlined dense label="Item Group" v-model="selectedItemGroup"
              item-text="group_name" item-value="id" :items="itemGroups"></v-autocomplete>
          </v-col>
          <v-col cols="12" md="3">
            <v-autocomplete outlined clearable label="Item Name" v-model="selectedItem" hide-details
              :items="filteredItems" item-value="id" item-text="item_name" dense></v-autocomplete>
          </v-col>
          <v-col cols="12" md="3">
            <v-autocomplete outlined clearable label="Production Order" v-model="selectedOperation" hide-details
              :items="operations" item-value="id" item-text="label" dense></v-autocomplete>
          </v-col>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" justify-self='center'>
          <SummaryQuality :totalQTY="summaryData.qty" :totalGoodProduct="summaryData.good_product_count"
            :totalDefect="summaryData.defect_count" :defectRate="summaryData.defect_rate" :qualityRate="summaryData.quality_rate" />
        </v-col>
      </v-row>
      <v-row class="fill-height">
        <v-col cols="12" md="6" class="fill-height">
          <DailyChartWithTarget :data="dailyChartWithTargetData" chartName="Quality Rate By Period"/>
        </v-col>
        <v-col cols="12" md="6" class="fill-height">
          <BarCharts :data="defectByWorkCenter" chartName="Defect By Work Center" category="pcs."/>
        </v-col>
      </v-row>
      <v-row class="fill-height">
        <v-col cols="12" md="4" class="fill-height">
          <BarCharts :data="qualityRateByItemGroup" chartName="Quality Rate By Item Group" category="%Q"/>
        </v-col>
        <v-col cols="12" md="4" class="fill-height">
          <BarCharts :data="qualityRateByItem" chartName="Quality Rate By Item ID" category="%Q"/>
        </v-col>
        <v-col cols="12" md="4" class="fill-height">
          <BarCharts :data="top10Defect" chartName="Top 10 Defect Cause" category="pcs."/>
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
import SummaryQuality from "../components/charts/SummaryQuality.vue";
import MonthlyPerformanceChart from "../components/charts/MonthlyPerformanceChart.vue";
import DailyChartWithTarget from "../components/charts/DailyChartWithTarget.vue";
import BarCharts from "../components/charts/BarCharts.vue";
import dayjs from "dayjs"

export default {
  name: "QualityDashboard",
  components: {
    SummaryQuality,
    MonthlyPerformanceChart,
    DailyChartWithTarget,
    BarCharts
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
        { text: "Date", value: "time_card_date" },
        { text: "Work Center", value: "wc_id" },
        { text: "PD Order", value: "wo_running_no" },
        { text: "OPN", value: "opn_name" },
        { text: "Item ID", value: "item_id" },
        { text: "Item Name", value: "item_name" },
        { text: "QTY Good", value: "good_product_count" },
        { text: "QTY Defect", value: "defect_count" },
        { text: "%Defect", value: "defect_rate" },
        { text: "%Q", value: "quality_rate" },
      ],
      mockBarChartData: {
        value: [1,2,3],
        label: ['1','2','3']
      },
      qualityRateByItemGroup: {
        value: [],
        label: []
      },
      qualityRateByItem:{
        value: [],
        label: []
      },
      defectByWorkCenter: {
        value: [],
        label: []
      },
      top10Defect: {
        value: [],
        label: []
      },
      summaryData: {
        qty:0,
        good_product_count:0,
        defect_count:0,
        quality_rate:0,
        defect_rate:0,
      },
      workCenterGroups: [],
      workCenters: [],
      itemGroups: [],
      items: [],
      operations: [],
      selectedItemGroup: null,
      selectedWorkCenter: null,
      selectedWorkCenterGroup: null,
      selectedItem: null,
      selectedOperation: null,
      workCenterPerformance: {
        wc: [],
        performance: []
      },
      targetData: { wc: [], target: [], actual: [] },
      dailyChartWithTargetData: { date: [], target: [], actual: [] },
      monthlyData: {
        month: [],
        performance: []
      },
      totalQTY: 0,
      totalGoodProduct: 0,
      totalDefect: 0,
      defectRate: 0,
      qualityRate: 0
    };
  },
  async mounted() {
    this.loadWorkCenterGroup();
    this.loadWorkCenter();
    this.loadItemGroupList();
    this.loadItem();
    this.loadQualityDashboardData();
    // loadQualityDashboardData
    this.loadOpn()
    this.$hideLoader();
    this.mockBarChartData.value = [1,2,3,4,5]
    this.mockBarChartData.label = ['1','2','3','4','5']
  },
  computed: {
    filteredWorkerCenter() {
      if (this.selectedWorkCenterGroup) {
        const foundWorkCenterGroup = this.workCenterGroups.find(wcg => wcg.id === this.selectedWorkCenterGroup)
        return this.workCenters.filter(wc => wc.wc_group === foundWorkCenterGroup.work_center_group_id)
      }
      return this.workCenters
    },
    filteredItems() {
      if (this.selectedItemGroup) {
        return this.items.filter(item => item.item_group_id === this.selectedItemGroup)
      }
      return this.items
    },
  },
  watch: {
    start() {
      this.loadQualityDashboardData()
    },
    end() {
      this.loadQualityDashboardData()
    },
    selectedItem(item_id) {
      if (item_id) {
        const foundItem = this.items.find(item => item.id === item_id)
        const foundItemGroup = this.itemGroups.find(itemGroup => itemGroup.id === foundItem.item_group_id)
        this.selectedItemGroup = foundItemGroup.id
      }
      this.loadQualityDashboardData()
    },
    selectedItemGroup(ig_id) {
      if (!ig_id) {
        this.selectedItem = null
      }
      this.loadQualityDashboardData()
    },
    selectedWorkCenter(wc_id) {
      if (!wc_id) {
        this.selectedMachine = null
      } else {
        const foundWorkCenter = this.workCenters.find(wc => wc.id === wc_id)
        const foundWorkCenterGroup = this.workCenterGroups.find(wcg => wcg.work_center_group_id === foundWorkCenter.wc_group)
        this.selectedWorkCenterGroup = foundWorkCenterGroup.id
      }
      this.loadQualityDashboardData()
    },
    selectedWorkCenterGroup(wcg_id) {
      if (!wcg_id) {
        this.selectedMachine = null
        this.selectedWorkCenter = null
      }
      this.loadQualityDashboardData()
    },
    selectedOperation() {
      this.loadQualityDashboardData()
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
    async loadItemGroupList() {
      const response = await api.getGroupItemByCompanyID(localStorage.getItem(server.COMPANYID));
      this.itemGroups = response.data;
    },
    async loadItem() {
      const response = await api.getItemMasterByCompanyID(localStorage.getItem(server.COMPANYID))
      this.items = response.data
    },
    async loadOpn() {
      const response = await api.getOpnOrdOption(localStorage.getItem(server.COMPANYID))
      this.operations = response.data
    },
    getMachineAvailability() {
      this.machineAvailability = this.data.reduce((acc, cur) => {
        acc.machines.push(cur.machine_id)
        acc.availability.push(cur.availability)
        return acc
      }, { machines: [], availability: [] })
    },
    getDashboardSummary() {
      const [totalRunHours, totalStandardPcs, totalActualPcs] = this.data.reduce((acc, cur) => {
        acc[0] += Number(cur.hours)
        acc[1] += Number(cur.standard_pcs)
        acc[2] += Number(cur.actual_pcs)
        return acc
      }, [0, 0, 0])
      this.totalRunHours = Number(totalRunHours).toFixed(2)
      this.totalStandardPcs = this.formatCurrencyWithoutSymbol(totalStandardPcs)
      this.totalActualPcs = this.formatCurrencyWithoutSymbol(totalActualPcs)
      this.performance = (Math.round(((totalActualPcs / totalStandardPcs) * 100) * 100) / 100) || 0
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
    async loadDefectByWorkCenter() {
      const response = await api.getDefectByWorkCenter({
        start: this.start,
        end: this.end
      })
      const result = response.data.reduce((acc, cur) => {
        acc.label.push(cur.wc_id)
        acc.value.push(cur.defect_count)
        return acc
      }, { label: [], value: [] })
      this.defectByWorkCenter = result
    },
    async loadAvailabilityWorkCenterData() {
      const response = await api.getWorkCenterPerformance({
        start: this.start,
        end: this.end
      })
      const result = response.data.reduce((acc, cur) => {
        acc.wc.push(cur.wc_id)
        acc.performance.push(cur.performance)
        return acc
      }, { wc: [], performance: [] })
      this.workCenterPerformance = result
    },
    async loadQualityDailyDashboard() {
      const response = await api.getQualityDailyDashboardData({
        start: this.start,
        end: this.end,
        wcg_id: this.selectedWorkCenterGroup,
        wc_id: this.selectedWorkCenter,
        ig_id: this.selectedItemGroup,
        item_id: this.selectedItem,
        opn_ord_id: this.selectedOperation
      })
      const result = response.data.reduce((acc, cur) => {
        acc.date.push(cur.date)
        acc.target.push(cur.target)
        acc.actual.push(cur.quality_rate)
        return acc
      }, { date: [], target: [], actual: [] })
      this.dailyChartWithTargetData  = result
    },
    async loadQualityRateByItemGroup() {
      const response = await api.getQualityRateByItemGroup({
        start: this.start,
        end: this.end,
        wcg_id: this.selectedWorkCenterGroup,
        wc_id: this.selectedWorkCenter,
        ig_id: this.selectedItemGroup,
        item_id: this.selectedItem,
        opn_ord_id: this.selectedOperation
      })
      const result = response.data.reduce((acc, cur) => {
        acc.label.push(cur.item_group_name)
        acc.value.push(cur.quality_rate)
        return acc
      }, { label: [], value: [] })
      this.qualityRateByItemGroup = result
    },
    async loadQualityRateByItem() {
      const response = await api.getQualityRateByItem({
        start: this.start,
        end: this.end,
        wcg_id: this.selectedWorkCenterGroup,
        wc_id: this.selectedWorkCenter,
        ig_id: this.selectedItemGroup,
        item_id: this.selectedItem,
        opn_ord_id: this.selectedOperation
      })
      const result = response.data.reduce((acc, cur) => {
        acc.label.push(cur.item_id)
        acc.value.push(cur.quality_rate)
        return acc
      }, { label: [], value: [] })
      this.qualityRateByItem = result
    },
    async loadTop10Defect () {
      const response = await api.getTop10Defect({
        start: this.start,
        end: this.end,
      })
      const result = response.data.reduce((acc, cur) => {
        acc.label.push(cur.description)
        acc.value.push(cur.defect_count)
        return acc
      }, { label: [], value: [] })
      this.top10Defect = result
    },
    async getSummaryData () {
      const result = this.data.reduce((acc, cur) => {
        acc.total_qty += Number(cur.qty)
        acc.total_good_product_count += Number(cur.good_product_count)
        acc.total_defect_count += Number(cur.defect_count)
        return acc
      }, {total_qty: 0, total_good_product_count: 0, total_defect_count: 0})
      const quality_rate =
        Math.round((result.total_good_product_count / result.total_qty) * 100 * 100) / 100 || 0;
      const defect_rate =
        Math.round((result.total_defect_count / result.total_good_product_count) * 100 * 100) / 100 || 0;
      this.summaryData = {
        qty: result.total_qty,
        good_product_count: result.total_good_product_count,
        defect_count: result.total_defect_count,
        quality_rate: quality_rate.toFixed(2),
        defect_rate: defect_rate.toFixed(2)
      }
    },
    async loadQualityDashboardData() {
      const response = await api.getQualityDashboardData({
        start: this.start,
        end: this.end,
        wcg_id: this.selectedWorkCenterGroup,
        wc_id: this.selectedWorkCenter,
        ig_id: this.selectedItemGroup,
        item_id: this.selectedItem,
        opn_ord_id: this.selectedOperation
      })
      this.data = response.data.map(data => ({
        ...data,
        time_card_date: dayjs(data.time_card_date).format('DD/MM/YYYY'),
      }))
      this.getSummaryData()
      this.loadDefectByWorkCenter()
      this.loadQualityDailyDashboard()
      this.loadQualityRateByItemGroup()
      this.loadQualityRateByItem()
      this.loadTop10Defect()
    },
  },
  beforeCreate() {
    console.log("beforeCreate");
    this.$store.state.navMenu = true;
  },
};
</script>

<style></style>
