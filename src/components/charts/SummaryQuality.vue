<template>
  <div class="availability-chart-container">
    <!-- <h2>Bar Chart</h2> -->
    <v-row justify="center" align="center">
      <v-col cols="12" md="2" fill-height>
        <v-card class="d-flex align-center justify-center summary-card">
          <p class="summary-label">QTY Productivity</p>
          <p class="summary-value">{{ totalQTY }}</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="2" fill-height>
        <v-card class="d-flex align-center justify-center summary-card">
          <p class="summary-label">Good Productivity</p>
          <p class="summary-value">{{ totalGoodProduct }}</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="2" fill-height>
        <v-card class="d-flex align-center justify-center summary-card">
          <p class="summary-label">Defect Productivity</p>
          <p class="summary-value">{{ totalDefect }}</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="2" fill-height>
        <v-card class="d-flex align-center justify-center summary-card">
          <p class="summary-label">Defect Rate</p>
          <p class="summary-value">{{ defectRate }}</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="2">
        <v-card class="d-flex align-center justify-center summary-card">
          <p class="summary-label">Quality Rate</p>
          <p class="summary-value">{{ qualityRate }}</p>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "SummaryAvailability",
  props: ["totalQTY", "totalGoodProduct", "totalDefect", "defectRate", "qualityRate"],
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