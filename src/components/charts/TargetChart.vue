<template>
  <div class="chart-container">
    <div class="chart-header">Target</div>
    <apexchart ref="apexChart" :options="chartOptions" :series="chartSeries"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'TargetChart',
  props: ["targetData"],
  components: {
    apexchart: VueApexCharts,
  },
  watch: {
    targetData(data) {
      this.$refs.apexChart.updateOptions({
        series: [{ name: 'Target', data: data.target }, { name: '%A', data: data.actual }],
        xaxis: {
          categories: data.dates,
        }
      });
    }
  },
  data() {
    return {
      chartOptions: {
        chart: {
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
        yaxis: {
          // min: 100, // Set the maximum value for the y-axis
        },
        stroke: {
          width: [2, 0], // Sets the line series to have a thicker stroke
        },
      },
      chartSeries: [{
        name: 'Target',
        type: 'line',
        data: []
      },
      {
        name: 'Actual',
        type: 'bar',
        data: []
      }]
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