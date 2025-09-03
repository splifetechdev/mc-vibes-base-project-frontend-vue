<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-row class="mb-n6">
          <v-col cols="12" sm="12" md="10">
            <v-text-field
              v-model="itemadd.numeric1"
              :label="`${udefinelist.define_numeric1}`"
              outlined
              dense
              @keyup="onChangedataform()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n6">
          <v-col cols="12" sm="12" md="10">
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  clearable
                  @click:clear="
                    $nextTick(() => {
                      itemadd.date1 = '';
                      date1 = '';
                    })
                  "
                  v-model="itemadd.date1"
                  persistent-hint
                  @keydown.enter="
                    onChangedataform();
                    date1 = parseDate(itemadd.date1);
                  "
                  @blur="
                    onChangedataform();
                    date1 = parseDate(itemadd.date1);
                  "
                  append-icon="mdi-calendar"
                  :label="`${udefinelist.define_date1}`"
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="date1"
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-row class="mb-n6">
          <v-col cols="12" sm="12" md="10">
            <v-radio-group
              v-model="itemadd.boolean1"
              row
              v-on:change="onChangedataform()"
            >
              <h4 class="black--text mr-2">
                {{ udefinelist.define_boolean1 }}
              </h4>
              <v-radio color="#1F51FF" label="Yes" value="1"></v-radio>
              <v-radio color="#1F51FF" label="No" value="0"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row class="mb-n6">
          <v-col cols="12" sm="12" md="10">
            <v-text-field
              v-model="itemadd.char1"
              :label="`${udefinelist.define_char1}`"
              outlined
              dense
              @keyup="onChangedataform()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n6">
          <v-col cols="12" sm="12" md="10">
            <v-textarea
              v-model="itemadd.text1"
              :label="`${udefinelist.define_text1}`"
              outlined
              dense
              rows="3"
              @keyup="onChangedataform()"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" sm="12" md="6">
        <v-row class="mb-n6">
          <v-col cols="12" sm="12" md="10">
            <v-text-field
              v-model="itemadd.numeric2"
              :label="`${udefinelist.define_numeric2}`"
              outlined
              dense
              @keyup="onChangedataform()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n6">
          <v-col cols="12" sm="12" md="10">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  clearable
                  @click:clear="
                    $nextTick(() => {
                      itemadd.date2 = '';
                      date2 = '';
                    })
                  "
                  v-model="itemadd.date2"
                  persistent-hint
                  @keydown.enter="
                    onChangedataform();
                    date2 = parseDate(itemadd.date2);
                  "
                  @blur="
                    onChangedataform();
                    date2 = parseDate(itemadd.date2);
                  "
                  append-icon="mdi-calendar"
                  :label="`${udefinelist.define_date2}`"
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="date2"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-row class="mb-n6">
          <v-col cols="12" sm="12" md="10">
            <v-radio-group
              v-model="itemadd.boolean2"
              row
              v-on:change="onChangedataform()"
            >
              <h4 class="black--text mr-2">
                {{ udefinelist.define_boolean2 }}
              </h4>
              <v-radio color="#1F51FF" label="Yes" value="1"></v-radio>
              <v-radio color="#1F51FF" label="No" value="0"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row class="mb-n6">
          <v-col cols="12" sm="12" md="10">
            <v-text-field
              v-model="itemadd.char2"
              :label="`${udefinelist.define_char1}`"
              outlined
              dense
              @keyup="onChangedataform()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="10">
            <v-textarea
              v-model="itemadd.text2"
              :label="`${udefinelist.define_text1}`"
              outlined
              dense
              rows="3"
              @keyup="onChangedataform()"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";
import { server } from "@/services/constants";

export default {
  name: "UDefine",
  props: ["dataudefine","udmodulename"],
  async beforeMount() {
    console.log(this.udmodulename)
    await this.loadUDefineModel(this.udmodulename,localStorage.getItem(server.COMPANYID));
  },
  async mounted() {
    this.itemadd = this.dataudefine;
    this.itemadd.boolean1 = this.itemadd.boolean1.toString();
    this.itemadd.boolean2 = this.itemadd.boolean2.toString();
    this.date1 = this.parseDate(this.itemadd.date1);
    this.date2 = this.parseDate(this.itemadd.date2);
    

    this.$hideLoader();
  },
  watch: {
    date1(val) {
      this.itemadd.date1 = this.formatDate(this.date1);
    },
    date2(val) {
      this.itemadd.date2 = this.formatDate(this.date2);
    },
  },
  data: (vm) => ({
    udefinelist: [],
    menu1: false,
    menu2: false,
    itemadd: {
      module_master_id: 0,
      // u_define_module_id =1 คือ Item
      u_define_module_id: 0,
      numeric1: "",
      numeric2: "",
      company_id: localStorage.getItem(server.COMPANYID),
      date1: "",
      date2: "",
      boolean1: false,
      boolean2: false,
      char1: "",
      char2: "",
      text1: "",
      text2: "",
    },
    date1: "",
    date2: "",
  }),
  methods: {
    async loadUDefineModel(udmodule,id) {
      console.log(udmodule)
      console.log(id)
      const result = await api.getu_define_module_UdefineIDByCompanyAndModuleName(udmodule,id);
      if (result.data[0]) {
        this.udefinelist = result.data[0];
        this.itemadd.u_define_module_id = this.udefinelist.id;
      } else {
      }
    },
    async onChangedataform() {
      this.$emit("dataOnUdefine", this.itemadd);
      // alert(this.payment_term)
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("/");
      return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
    },
  },
};
</script>

<style scoped>
.heightsize60 {
  height: 60px;
}

.heightsize40 {
  height: 40px;
}
</style>
