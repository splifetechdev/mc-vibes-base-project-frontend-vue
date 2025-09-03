<template>
  <div class="availability-chart-container">
    <!-- <h2>Bar Chart</h2> -->
    <v-row justify="center" align="center">
      <v-col cols="12" md="3" fill-height>
        <v-card class="d-flex align-center justify-center summary-card">
          <p class="summary-label">Availability %</p>
          <p class="summary-value">{{ availabilityRate }}</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" fill-height>
        <v-card class="d-flex align-center justify-center summary-card">
          <p class="summary-label">Performance %</p>
          <p class="summary-value">{{ performanceRate  }}</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" fill-height>
        <v-card class="d-flex align-center justify-center summary-card">
          <p class="summary-label">Quality %</p>
          <p class="summary-value">{{ qualityRate }}</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" fill-height>
        <v-card class="d-flex align-center justify-center summary-card">
          <p class="summary-label">OEE %</p>
          <p class="summary-value">{{ oeeRate }}</p>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "SummaryAvailability",
  props: ["availabilityRate", "performanceRate", "qualityRate", "oeeRate"],
  mounted() {
  },
  methods: {

  }
}
</script>

<style scoped>
.availability-chart-container {
  height: 100%;
  width: 100%;
}

.availability-chart-header {
  background-color: #2a4bc1;
  color: white;
  text-align: center;
}

.summary-label {
  margin: 0;
}

.summary-value {
  margin: 0;
  font-size: 24px;
  font-weight: bolder;
}

.summary-card {
  flex-direction: column;
  background-color: #2a4bc1;
  align-self: center;
  color: white;
  min-height: 120px;
}
</style>