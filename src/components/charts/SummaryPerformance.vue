<template>
  <div class="availability-chart-container">
    <!-- <h2>Bar Chart</h2> -->
    <v-row justify="center" align="center">
      <v-col cols="12" md="3" fill-height>
        <v-card class="d-flex align-center justify-center summary-card">
          <p class="summary-label">Run Hours</p>
          <p class="summary-value">{{ totalRunHours }}</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" fill-height>
        <v-card class="d-flex align-center justify-center summary-card">
          <p class="summary-label">Standard Pcs</p>
          <p class="summary-value">{{ totalStandardPcs }}</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" fill-height>
        <v-card class="d-flex align-center justify-center summary-card">
          <p class="summary-label">Actual Pcs</p>
          <p class="summary-value">{{ totalActualPcs }}</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="d-flex align-center justify-center summary-card">
          <p class="summary-label">%Performance</p>
          <p class="summary-value">{{ performance }}</p>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "SummaryAvailability",
  props: ["totalRunHours", "totalStandardPcs", "totalActualPcs", "performance"],
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