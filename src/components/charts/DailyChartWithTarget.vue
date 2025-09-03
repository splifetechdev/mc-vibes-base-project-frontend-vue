<template>
  <div class="chart-container">
    <div class="chart-header">{{ chartName }}</div>
    <apexchart ref="apexChart" :options="chartOptions" :series="chartSeries"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  name: "MonthlyChart",
  props: ["data", 'chartName', 'category'],
  components: {
    apexchart: VueApexCharts,
  },
  watch: {
    data(value) {

      if (!value) {
        return
      }
      this.$refs.apexChart.updateOptions({
        series: [{ name: 'Target', data: value.target }, { name: this.category, data: value.actual }],
        xaxis: {
          categories: value.date,
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
        chart: {
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