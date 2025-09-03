<template>
  <v-container fluid class="pa-5">
    <v-card>
      <v-card-title primary-title>
        <h3>My Job</h3>
      </v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12" lg="4" md="4" sm="4">
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateFormatted1"
                  label="Date"
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                  dense
                  outlined
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date1"
                no-title
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <SuccessDialog
      :status="dialogAdd"
      :text_color="text_color"
      :title="title"
      :message="message"
    />
  </v-container>
</template>

<script>
import SuccessDialog from "@/components/cards/SuccessDialog";
import api from "@/services/api";
import { server } from "@/services/constants";

export default {
  name: "MyJobList",
  components: {
    SuccessDialog,
  },
  data: (vm) => ({
    dialogAdd: false,
    text_color: "text-h5 green--text text-center",
    title: "green",
    message: "green",
    date1: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted1: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu1: false,
    menu2: false,
    date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted2: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
  }),

  computed: {
    computedDateFormatted1() {
      return this.formatDate(this.date1);
    },
    computedDateFormatted2() {
      return this.formatDate(this.date2);
    },
  },

  watch: {
    date1(val) {
      this.dateFormatted1 = this.formatDate(this.date1);
    },
    date2(val) {
      this.dateFormatted2 = this.formatDate(this.date2);
    },
  },

  mounted() {
    this.$hideLoader();
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    setupAlertDialog(status, title, message, text_color) {
      this.dialogAdd = status;
      this.title = title;
      this.message = message;
      this.text_color = text_color;
    },
  },
};
</script>
