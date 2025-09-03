<template>
  <div class="chart-container">
    <div class="chart-header">Top 10 Downtime Cause</div>
    <apexchart ref="apexChart" :options="chartOptions" :series="chartSeries" type="bar"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  name: "TopTenDownTimeChart",
  props: ["downtimeData"],
  components: {
    apexchart: VueApexCharts,
  },
  watch: {
    downtimeData(downtime) {
      if (!downtime) {
        return
      }
      this.$refs.apexChart.updateOptions({
        series: [{ data: downtime.downtimeHours }],
        xaxis: {
          categories: downtime.downtimeDesc,
        }
      });
    }
  },
  data() {
    return {
      chartOptions: {
        plotOptions: {
          bar: {
            distributed: true, // this line is mandatory
            barHeight: '85%',
          },
        },
        colors: [ // this array contains different color code for each data
          "#546E7A",
          "#d4526e",
          "#13d8aa",
          "#A5978B",
          "#2b908f",
          "#f9a3a4",
          "#90ee7e",
          "#f48024",
          "#69d2e7"
        ],
        chart: {
          type: 'bar',
          toolbar: {
            show: false // Disable the toolbar
          }
        },
        xaxis: {
          categories: []
        },
        legend: {
          show: false, // Initially show legend
        },
      },

      chartSeries: [{
        name: 'hours',
        data: []
      }],
      // Set default height
    };
  },
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