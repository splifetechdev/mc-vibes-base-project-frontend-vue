<template>
  <div class="chart-container">
    <div class="chart-header">Availability machine by period</div>
    <!-- {{ filter }} -->
    <apexchart ref="apexChart" :options="chartOptions" :series="chartSeries" type="bar" :height="chartHeight"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  name: "ProductivityChart",
  props: ["machineAvailability", "start", "end", "downtime", "workCenterGroup", "workCenter", "machine"],
  components: {
    apexchart: VueApexCharts,
  },
  computed: {
    filter() {
      return `${this.start}:${this.end}:${this.downtime}:${this.workCenterGroup}:${this.workCenter}:${this.machine}`
    },
  },
  watch: {
    machineAvailability(machineAvailability) {
      if (!machineAvailability) {
        return
      }
      this.$refs.apexChart.updateOptions({
        series: [{ data: machineAvailability.availability }],
        xaxis: {
          categories: machineAvailability.machines,
        }
      });
    }
  },
  data() {
    return {
      chartOptions: {
        title: {
          align: 'center'
        },
        plotOptions: {
          bar: {
            distributed: true, // this line is mandatory
            barHeight: '85%',
          },
        },
        colors: [ // this array contains different color code for each data
          "#f9a3a4",
          "#90ee7e",
          "#f48024",
          "#69d2e7",
          "#546E7A",
          "#d4526e",
          "#13d8aa",
          "#A5978B",
          "#2b908f",
          "#f48024",
          "#69d2e7",
          "#546E7A",
          "#d4526e",
          "#13d8aa",
          "#A5978B",
          "#2b908f",
          "#f48024",
          "#69d2e7",
          "#546E7A",
          "#d4526e",
          "#13d8aa",
          "#A5978B",
          "#2b908f",
          "#f48024",
          "#69d2e7",
          "#546E7A",
          "#d4526e",
          "#13d8aa",
          "#A5978B",
          "#2b908f",
        ],
        chart: {
          type: 'bar',
          height: 300, // Set default height,
          toolbar: {
            show: false // Disable the toolbar
          }
        },
        xaxis: {
          categories: []
        },
        yaxis: {
          // min: 100, // Set the maximum value for the y-axis
        },
        legend: {
          show: false, // Initially show legend
        },
      },
      chartSeries: [{
        name: '%A',
        data: []
      }],
      chartHeight: '300px' // Set default height
    };
  }
}
</script>

<style scoped>
.chart-container {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px
}

.chart-header {
  text-align: center;
  background-color: #2a4bc1;
  font-weight: bold;
  color: white;
}

/* Add styles if needed */
</style>