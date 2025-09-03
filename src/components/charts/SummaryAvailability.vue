<template>
  <div class="availability-chart-container">
    <!-- <h2>Bar Chart</h2> -->
    <v-row justify="center" align="center">
      <v-col cols="12" md="4" fill-height>
        <v-card class="d-flex align-center justify-center summary-card">
          <p class="summary-label">%A</p>
          <p class="summary-value">{{ availability }}</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" fill-height>
        <v-card class="d-flex align-center justify-center summary-card">
          <p class="summary-label">Plan Hours</p>
          <p class="summary-value">{{ totalPlanHours }}</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" fill-height>
        <v-card class="d-flex align-center justify-center summary-card">
          <p class="summary-label">Setup Hours</p>
          <p class="summary-value">{{ setupHours }}</p>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="d-flex align-center justify-center summary-card">
          <p class="summary-label">Run Hours</p>
          <p class="summary-value">{{ totalRunHours }}</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="d-flex align-center justify-center summary-card">
          <p class="summary-label">Downtime Hours</p>
          <p class="summary-value">{{ downtimeHours }}</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="d-flex align-center justify-center summary-card">
          <p class="summary-label">No. of Machine</p>
          <p class="summary-value">{{ machineCount }}</p>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "SummaryAvailability",
  props: ["availability", "totalPlanHours", "setupHours", "totalRunHours", "downtimeHours", "machineCount"],
  mounted() {
  },
  methods: {

  }
}
</script>

<style scoped>
.availability-chart-container {
  height: 100%;
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