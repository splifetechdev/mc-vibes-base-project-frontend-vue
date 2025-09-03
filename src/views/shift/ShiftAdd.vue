<template>
  <v-card-title>
    <v-container class="pa-1" fluid>
      <v-card class="pa-12">
        <v-card-title>
          <v-row>
            <v-col cols="12" md="12" justify="center" class="mt-n6">
              <h3>เพิ่ม กะ</h3>
            </v-col>
          </v-row>
        </v-card-title>
        <v-row>
          <v-col cols="12" md="12" justify="center">
            <div id="tabs" class="containertab">
              <div class="tabs">
                <div
                  v-on:click="activetab = 1"
                  v-bind:class="[activetab === 1 ? 'active' : '']"
                >
                  General
                </div>
                <div
                  class="ml-1"
                  v-on:click="activetab = 2"
                  v-bind:class="[activetab === 2 ? 'active' : '']"
                >
                  U-define
                </div>
              </div>

              <div class="content">
                <div
                  v-if="activetab === 1 && callsoopentab == true"
                  class="tabcontent"
                >
                  <v-row class="mb-n10">
                    <v-col cols="12" sm="12" md="5">
                      <h4 class="black--text">Shift ID</h4>
                      <v-text-field
                        autofocus
                        v-model="itemadd.shift_id"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12" md="5">
                      <h4 class="black--text">Shift Name</h4>
                      <v-text-field
                        v-model="itemadd.shift_name"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="mb-n6">
                    <!-- Start Time -->
                    <v-col cols="12" sm="12" md="5">
                      <h4 class="black--text">Start Time</h4>
                      <!-- placeholder="Start Time" -->
                      <vue-timepicker
                        close-on-complete
                        format="HH:mm"
                        fixed-dropdown-button
                        auto-scroll
                        hide-clear-button
                        width="100%"
                        v-model="itemadd.start_time"
                      >
                      </vue-timepicker>

                      <!-- <v-dialog ref="dialog1" color="#1F51FF" v-model="modalstarttime"
                        :return-value.sync="itemadd.start_time" persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field color="#1F51FF" v-model="itemadd.start_time" label="Start Time"
                            prepend-inner-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on" outlined
                            dense></v-text-field>
                        </template>
                        <v-time-picker color="#1F51FF" v-if="modalstarttime" v-model="itemadd.start_time" full-width>
                          <v-spacer></v-spacer>
                          <v-btn text color="#1F51FF" @click="modalstarttime = false">
                            Cancel
                          </v-btn>
                          <v-btn text color="#1F51FF" @click="$refs.dialog1.save(itemadd.start_time)">
                            OK
                          </v-btn>
                        </v-time-picker>
                      </v-dialog> -->
                    </v-col>

                    <!-- End Time -->
                    <v-col cols="12" sm="12" md="5">
                      <h4 class="black--text">End Time</h4>
                      <vue-timepicker
                        close-on-complete
                        format="HH:mm"
                        fixed-dropdown-button
                        auto-scroll
                        hide-clear-button
                        width="100%"
                        v-model="itemadd.end_time"
                      >
                      </vue-timepicker>
                      <!-- <v-dialog ref="dialog2" color="#1F51FF" v-model="modalendtime" :return-value.sync="itemadd.end_time"
                        persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field color="#1F51FF" v-model="itemadd.end_time" label="End Time"
                            prepend-inner-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on" outlined
                            dense></v-text-field>
                        </template>
                        <v-time-picker color="#1F51FF" v-if="modalendtime" v-model="itemadd.end_time" full-width>
                          <v-spacer></v-spacer>
                          <v-btn text color="#1F51FF" @click="modalendtime = false">
                            Cancel
                          </v-btn>
                          <v-btn text color="#1F51FF" @click="$refs.dialog2.save(itemadd.end_time)">
                            OK
                          </v-btn>
                        </v-time-picker>
                      </v-dialog> -->
                    </v-col>
                  </v-row>

                  <v-row class="mb-n6">
                    <!-- Break Start -->
                    <v-col cols="12" sm="12" md="5">
                      <h4 class="black--text">Break Start</h4>
                      <vue-timepicker
                        close-on-complete
                        format="HH:mm"
                        fixed-dropdown-button
                        auto-scroll
                        width="100%"
                        v-model="itemadd.break_start"
                      >
                      </vue-timepicker>

                      <!-- <v-dialog ref="dialog3" color="#1F51FF" v-model="modalbreakstart"
                        :return-value.sync="itemadd.break_start" persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field color="#1F51FF" v-model="itemadd.break_start" label="Break Start"
                            prepend-inner-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on" outlined
                            dense></v-text-field>
                        </template>
                        <v-time-picker color="#1F51FF" v-if="modalbreakstart" v-model="itemadd.break_start" full-width>
                          <v-spacer></v-spacer>
                          <v-btn text color="#1F51FF" @click="modalbreakstart = false">
                            Cancel
                          </v-btn>
                          <v-btn text color="#1F51FF" @click="$refs.dialog3.save(itemadd.break_start)">
                            OK
                          </v-btn>
                        </v-time-picker>
                      </v-dialog> -->
                    </v-col>

                    <!-- Break End -->
                    <v-col cols="12" sm="12" md="5">
                      <h4 class="black--text">Break End</h4>
                      <vue-timepicker
                        close-on-complete
                        format="HH:mm"
                        fixed-dropdown-button
                        auto-scroll
                        width="100%"
                        v-model="itemadd.break_end"
                      >
                      </vue-timepicker>

                      <!-- <v-dialog ref="dialog4" color="#1F51FF" v-model="modalbreakend"
                        :return-value.sync="itemadd.break_end" persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field color="#1F51FF" v-model="itemadd.break_end" label="Break End"
                            prepend-inner-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on" outlined
                            dense></v-text-field>
                        </template>
                        <v-time-picker color="#1F51FF" v-if="modalbreakend" v-model="itemadd.break_end" full-width>
                          <v-spacer></v-spacer>
                          <v-btn text color="#1F51FF" @click="modalbreakend = false">
                            Cancel
                          </v-btn>
                          <v-btn text color="#1F51FF" @click="$refs.dialog4.save(itemadd.break_end)">
                            OK
                          </v-btn>
                        </v-time-picker>
                      </v-dialog> -->
                    </v-col>
                  </v-row>

                  <v-row class="mb-4">
                    <!-- Summary Time -->
                    <v-col cols="12" sm="12" md="5">
                      <h4 class="black--text">Summary Time</h4>
                      <vue-timepicker
                        close-on-complete
                        format="HH:mm"
                        fixed-dropdown-button
                        auto-scroll
                        hide-clear-button
                        width="100%"
                        v-model="itemadd.summary_time"
                      >
                      </vue-timepicker>

                      <!-- <v-dialog ref="dialog5" color="#1F51FF" v-model="modalsummarytime"
                        :return-value.sync="itemadd.summary_time" persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field color="#1F51FF" v-model="itemadd.summary_time" label="Summary Time"
                            prepend-inner-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on" outlined
                            dense></v-text-field>
                        </template>
                        <v-time-picker color="#1F51FF" v-if="modalsummarytime" v-model="itemadd.summary_time" full-width>
                          <v-spacer></v-spacer>
                          <v-btn text color="#1F51FF" @click="modalsummarytime = false">
                            Cancel
                          </v-btn>
                          <v-btn text color="#1F51FF" @click="$refs.dialog5.save(itemadd.summary_time)">
                            OK
                          </v-btn>
                        </v-time-picker>
                      </v-dialog> -->
                    </v-col>
                  </v-row>

                  <!-- เพิ่มส่วนนี้หลังจาก Summary Time และก่อน </div> ปิด tabcontent -->
                  <v-row class="mb-4">
                    <v-col cols="12">
                      <h4 class="black--text mb-3">Shift OT</h4>

                      <!-- ส่วนเพิ่มข้อมูล OT -->
                      <v-card outlined class="pa-3 mb-3">
                        <v-row>
                          <!-- OT Start Time -->
                          <v-col cols="12" sm="12" md="3">
                            <h5 class="black--text">OT Start Time</h5>
                            <vue-timepicker
                              close-on-complete
                              format="HH:mm"
                              fixed-dropdown-button
                              auto-scroll
                              hide-clear-button
                              width="100%"
                              v-model="otForm.ot_start_time"
                            >
                            </vue-timepicker>
                          </v-col>

                          <!-- OT End Time -->
                          <v-col cols="12" sm="12" md="3">
                            <h5 class="black--text">OT End Time</h5>
                            <vue-timepicker
                              close-on-complete
                              format="HH:mm"
                              fixed-dropdown-button
                              auto-scroll
                              hide-clear-button
                              width="100%"
                              v-model="otForm.ot_end_time"
                            >
                            </vue-timepicker>
                          </v-col>

                          <!-- OT Rate -->
                          <v-col cols="12" sm="12" md="3">
                            <h5 class="black--text">OT Rate</h5>
                            <v-text-field
                              v-model="otForm.ot_rate"
                              type="number"
                              step="0.25"
                              min="0"
                              outlined
                              dense
                              placeholder="1.5"
                            >
                            </v-text-field>
                          </v-col>

                          <!-- ปุ่มเพิ่ม -->
                          <v-col
                            cols="12"
                            sm="12"
                            md="3"
                            class="d-flex align-end"
                          >
                            <v-btn
                              color="green"
                              dark
                              @click="addOTRecord()"
                              :disabled="!canAddOT"
                              class="mb-2"
                            >
                              <v-icon left>mdi-plus</v-icon>
                              Add OT
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card>

                      <!-- ตารางแสดงข้อมูล OT -->
                      <v-card outlined v-if="shiftOTList.length > 0">
                        <v-card-title class="py-2">
                          <h5>OT List</h5>
                        </v-card-title>
                        <v-data-table
                          :headers="otHeaders"
                          :items="shiftOTList"
                          class="elevation-0"
                          hide-default-footer
                          disable-pagination
                        >
                          <template v-slot:item.ot_start_time="{ item }">
                            {{ formatTimeDisplay(item.ot_start_time) }}
                          </template>

                          <template v-slot:item.ot_end_time="{ item }">
                            {{ formatTimeDisplay(item.ot_end_time) }}
                          </template>

                          <template v-slot:item.ot_rate="{ item }">
                            {{ item.ot_rate }}x
                          </template>

                          <template v-slot:item.actions="{ item, index }">
                            <v-btn
                              icon
                              color="red"
                              small
                              @click="removeOTRecord(index)"
                            >
                              <v-icon small>mdi-delete</v-icon>
                            </v-btn>
                          </template>
                        </v-data-table>
                      </v-card>

                      <!-- ข้อความแสดงเมื่อไม่มีข้อมูล OT -->
                      <v-card outlined v-else class="pa-3 text-center">
                        <v-icon color="grey" large>mdi-clock-outline</v-icon>
                        <p class="grey--text mt-2 mb-0">
                          No OT records added yet
                        </p>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>
                <div v-if="activetab === 2" class="tabcontent">
                  <UDefine
                    :udmodulename="udmodule_name"
                    :dataudefine="itemaddudefine"
                    @dataOnUdefine="getdataOnUdefine"
                  >
                  </UDefine>
                </div>
              </div>
            </div>
            <!-- <template>
  <v-card>
    <v-tabs
    align-with-title
    slider-color="#1F51FF"
    background-color="#a9a2a9"
      left
    >
      <v-tab>General</v-tab>
      <v-tab>Price</v-tab>
      <v-tab>U-define</v-tab>
      <v-tab-item
        key="1"
      >
  
        <v-container fluid>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
           aaa
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>

      <v-tab-item
        key="2"
      >
        <v-container fluid>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
           bbb
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>

      <v-tab-item
        key="2"
      >
        <v-container fluid>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
           ccc
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>

    </v-tabs>
  </v-card>
</template> -->
          </v-col>
        </v-row>

        <v-card-actions>
          <v-row justify="center" class="mt-3">
            <v-btn
              depressed
              width="100"
              class="mr-3  buttonblue"
              @click="savedata()"
            >
              Save
            </v-btn>
            <v-btn depressed outlined width="100" @click="$router.back()">
              Cancel
            </v-btn>
          </v-row>
        </v-card-actions>

        <v-dialog v-model="dialogpreviewimage" max-width="700px">
          <v-card>
            <v-card-title class="text-h5">
              <v-btn icon @click="closepreviewimage">
                <v-icon large>mdi-close</v-icon>
              </v-btn>
              Preview Image</v-card-title
            >

            <v-img
              disabled
              :src="previewimage"
              class="grey lighten-2 mt-3 mb-5"
              aspect-ratio="1"
              contain
            >
            </v-img>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closepreviewimage"
                >Cancel</v-btn
              >

              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDeleteimage" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this image?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDeleteimage"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirmimage"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <SuccessDialog
          :status="dialogAdd"
          :text_color="text_color"
          :title="title"
          :message="message"
        />
        <SuccessDialogPush
          :status="dialogAdd"
          :text_color="text_color"
          :title="title"
          :message="message"
          :link="link"
        />
      </v-card>
    </v-container>
  </v-card-title>
</template>
<script>
import SuccessDialog from "@/components/cards/SuccessDialog";
import SuccessDialogPush from "@/components/cards/SuccessDialogPush";
import api from "@/services/api";
import UDefine from "@/views/u-define/UDefine";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";

import { server, udgroup } from "@/services/constants";
export default {
  components: {
    SuccessDialog,
    SuccessDialogPush,
    UDefine,
    VueTimepicker,
  },
  computed: {
    computedDateFormatted() {
      return this.formatDaparseDatete(this.date);
    },
    canAddOT() {
      return (
        this.otForm.ot_start_time !== "" &&
        this.otForm.ot_end_time !== "" &&
        this.otForm.ot_rate > 0
      );
    },
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  data: (vm) => ({
    otForm: {
      ot_start_time: "",
      ot_end_time: "",
      ot_rate: 1.5,
    },
    shiftOTList: [],
    otHeaders: [
      { text: "OT Start Time", value: "ot_start_time", align: "center" },
      { text: "OT End Time", value: "ot_end_time", align: "center" },
      { text: "OT Rate", value: "ot_rate", align: "center" },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "center",
        width: "100",
      },
    ],

    tab: null,
    itemadd: {
      shift_id: "",
      shift_name: "",
      start_time: "",
      end_time: "",
      break_start: "",
      break_end: "",
      summary_time: "",
      company_id: localStorage.getItem(server.COMPANYID),
      user_create: localStorage.getItem(server.USER_ID),
    },
    itemaddudefine: {
      module_master_id: 0,
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
    approver_show: [],
    itemgrouplist: [],
    unitgrouplist: [],
    companyshow: [],
    itemtypelist: [],
    dimgrouplist: [],
    modelgrouplist: [],
    prename_th: ["นาย", "นาง", "นางสาว"],
    prename_en: ["Mr", "Miss", "Mrs."],
    user_role_show: [
      { id: "ADMIN", status_name: "ADMIN" },
      { id: "APPROVAL", status_name: "APPROVAL" },
      { id: "EMPLOYEE", status_name: "EMPLOYEE" },
    ],
    emp_status: [
      { id: "A", status_name: "Active" },
      { id: "D", status_name: "Inactive" },
    ],
    authorize: [],
    department_list: [],
    position_list: [],
    division_list: [],
    section_list: [],
    signature: "",
    initial_dataimage: "",
    isShowPassword: false,
    showbuttonsavesigimage: false,
    txt_encode: "@spkitztech",
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu1: false,
    menu2: false,
    menu3: false,
    dialogAdd: false,
    text_color: "text-h5 green--text text-center",
    title: "green",
    message: "green",
    link: "",
    search: "",
    dialogadd: false,
    dialogedit: false,
    headers: [
      { text: "id", value: "id" },
      { text: "code", value: "code" },
      { text: "name", value: "name" },
      // { text: "address", value: "address" },
      // { text: "provice", value: "provice" },
      // { text: "zipcode", value: "zipcode" },
      { text: "status", value: "status" },
      { text: "action", value: "actions" },
    ],
    desserts: [],
    imagename: "",
    previewimage: null,
    checkimageadd: false,
    previewimage: null,
    dialogDeleteimage: false,
    image: null,
    dialogpreviewimage: false,
    statusall: ["ACTIVE", "INACTIVE"],
    userId: 0,
    activetab: 1,
    callsoopentab: true,
    main_u_define_module_id: 0,
    udmodule_name: "",
    timestarttime: null,
    timeendtime: null,
    timebreakstart: null,
    timebreakend: null,
    timesummarytime: null,
    modalstarttime: false,
    modalendtime: false,
    modalbreakstart: false,
    modalbreakend: false,
    modalsummarytime: false,
  }),
  async mounted() {
    this.userId = localStorage.getItem(server.USER_ID);
    // await api.checkVersion();
    await this.loadAccounts();
    await this.loadCompanyMaster(localStorage.getItem(server.COMPANYID));
    await this.loadItemGroupList(localStorage.getItem(server.COMPANYID));
    await this.loadItemTypeMaster(localStorage.getItem(server.COMPANYID));
    await this.loadUnitGroupList(localStorage.getItem(server.COMPANYID));
    await this.loadDimGroupList(localStorage.getItem(server.COMPANYID));
    await this.loadModelGroupList(localStorage.getItem(server.COMPANYID));
    await this.onLoadUdefineIDByCompanyAndModuleName(
      udgroup.SHIFT,
      localStorage.getItem(server.COMPANYID)
    );
    this.udmodule_name = udgroup.SHIFT;

    await this.loadAuthorize();
    this.$hideLoader();
  },
  methods: {
    // เพิ่ม OT Record
    addOTRecord() {
      if (!this.canAddOT) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please fill all OT fields correctly",
          "text-h5 red--text text-center"
        );
        return;
      }

      // ตรวจสอบว่าเวลาไม่ซ้ำกัน
      const isDuplicate = this.shiftOTList.some(
        (ot) =>
          ot.ot_start_time === this.otForm.ot_start_time &&
          ot.ot_end_time === this.otForm.ot_end_time
      );

      if (isDuplicate) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "This OT time period already exists",
          "text-h5 red--text text-center"
        );
        return;
      }

      // เพิ่มข้อมูล OT ลงในรายการ
      this.shiftOTList.push({
        ot_start_time: this.otForm.ot_start_time,
        ot_end_time: this.otForm.ot_end_time,
        ot_rate: parseFloat(this.otForm.ot_rate),
      });

      // เคลียร์ฟอร์ม
      this.clearOTForm();
    },

    // ลบ OT Record
    removeOTRecord(index) {
      this.shiftOTList.splice(index, 1);
    },

    // เคลียร์ฟอร์ม OT
    clearOTForm() {
      this.otForm = {
        ot_start_time: "",
        ot_end_time: "",
        ot_rate: 1.5,
      };
    },

    // แปลงเวลาให้แสดงผลสวย
    formatTimeDisplay(time) {
      if (!time) return "";
      return time;
    },

    // แปลงเวลาเป็น DateTime สำหรับ database
    convertTimeToDateTime(timeString) {
      if (!timeString) return null;
      const today = new Date().toISOString().split("T")[0];
      return `${today} ${timeString}:00`;
    },

    async onLoadUdefineIDByCompanyAndModuleName(module_name, company_id) {
      const res_get = await api.getu_define_module_UdefineIDByCompanyAndModuleName(
        module_name,
        company_id
      );
      this.main_u_define_module_id = res_get.data[0].id;
      this.itemaddudefine.u_define_module_id = this.main_u_define_module_id;
    },
    async getdataOnUdefine(dataudefine) {
      this.itemaddudefine = dataudefine;
    },
    setupAlertDialog(status, title, message, text_color) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
    },
    setupAlertDialogPush(status, title, message, text_color, link) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
      this.link = link;
    },
    previewImage: function(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.previewimage = e.target.result;
          this.checkimageadd = true;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }

      this.imagename = this.image.name;
    },

    async popupdeleteimage() {
      this.dialogDeleteimage = true;
    },
    async closeDeleteimage() {
      this.dialogDeleteimage = false;
    },
    async deleteItemConfirmimage() {
      this.checkimageadd = false;
      this.image = null;
      this.previewimage = "";
      this.imagename = "";
      this.dialogDeleteimage = false;
    },
    async popuppreviewimage() {
      this.dialogpreviewimage = true;
    },
    async closepreviewimage() {
      this.dialogpreviewimage = false;
    },
    async savedata() {
      // console.log(this.itemadd);
      // console.log(this.itemaddudefine);
      // return;

      if (this.itemadd.shift_id == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Shift ID",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.shift_name == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Shift Name",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.start_time == "" || this.itemadd.start_time == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Start Time",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.end_time == "" || this.itemadd.end_time == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter End Time",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.break_start == "" || this.itemadd.break_start == null) {
        this.itemadd.break_start = null;
        // this.$store.state.global_dialog = true;
        // this.setupAlertDialog(
        //   true,
        //   "Failed!!!",
        //   "Please enter Break Start",
        //   "text-h5 red--text text-center"
        // );
        // return;
      }

      if (this.itemadd.break_end == "" || this.itemadd.break_end == null) {
        this.itemadd.break_end = null;
        // this.$store.state.global_dialog = true;
        // this.setupAlertDialog(
        //   true,
        //   "Failed!!!",
        //   "Please enter Break End",
        //   "text-h5 red--text text-center"
        // );
        // return;
      }

      if (
        this.itemadd.summary_time == "" ||
        this.itemadd.summary_time == null
      ) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Summary Time",
          "text-h5 red--text text-center"
        );
        return;
      }

      // this.$showLoader();
      // let formData = new FormData();
      // formData.append("emp_id", this.itemadd.emp_id);
      // formData.append("image", this.itemadd.image);
      // formData.append("emp_i_d", this.itemadd.emp_i_d);
      // formData.append("user_role", this.itemadd.user_role);

      // Insert

      // Insert Shift หลัก
      const res_add = await api.addShift(this.itemadd);

      if (res_add.status == 200) {
        const shiftId = res_add.data.id;

        // Insert OT Records ถ้ามีข้อมูล
        if (this.shiftOTList.length > 0) {
          for (let otRecord of this.shiftOTList) {
            const otData = {
              shift_id: shiftId,
              ot_start_time: otRecord.ot_start_time + ":00", // แปลงเป็น HH:mm:ss
              ot_end_time: otRecord.ot_end_time + ":00", // แปลงเป็น HH:mm:ss
              ot_rate: otRecord.ot_rate,
            };

            // เรียก API สำหรับบันทึก OT
            await api.addShiftOT(otData);
          }
        }

        // Insert U-define
        this.itemaddudefine.module_master_id = res_add.data.id;
        this.itemaddudefine.date1 = this.parseDate(this.itemaddudefine.date1);
        this.itemaddudefine.date2 = this.parseDate(this.itemaddudefine.date2);
        const res_addudefine = await api.addu_define_master(
          this.itemaddudefine
        );

        this.$hideLoader();

        if (res_addudefine.status == 200) {
          this.$hideLoader();
          this.$store.state.global_dialog_push = true;
          this.setupAlertDialogPush(
            true,
            "Success!!!",
            "Add data success",
            "text-h5 green--text text-center",
            "/shift"
          );
          return;
        } else {
          this.itemaddudefine.date1 = this.formatDate(
            this.itemaddudefine.date1
          );
          this.itemaddudefine.date2 = this.formatDate(
            this.itemaddudefine.date2
          );
          this.$hideLoader();
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Add data Failed",
            "text-h5 red--text text-center"
          );
          return;
        }
        return;
      } else if (res_add.status == 204) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Add data Item ID Duplicate",
          "text-h5 red--text text-center"
        );
        return;
      } else {
        this.itemadd.last_purchase_price_date = this.formatDate(
          this.itemaddudefine.last_purchase_price_date
        );
        this.itemadd.cost_price_date = this.formatDate(
          this.itemaddudefine.cost_price_date
        );
        this.itemadd.sales_price_date = this.formatDate(
          this.itemaddudefine.sales_price_date
        );
        this.$hideLoader();
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Add data Failed",
          "text-h5 red--text text-center"
        );
        return;
      }
    },
    async loadItemGroupList(id) {
      const result = await api.getGroupItemByCompanyID(id);
      this.itemgrouplist = result.data;
    },
    async loadUnitGroupList(id) {
      const result = await api.getUnitByCompanyID(id);
      this.unitgrouplist = result.data;
    },
    async loadDimGroupList(id) {
      const result = await api.getDimGroupByCompanyID(id);
      this.dimgrouplist = result.data;
      // this.dimgrouplist = [{id:1,name:"dim group fixed"}]
    },
    async loadModelGroupList(id) {
      const result = await api.getModelGroupByCompanyID(id);
      this.modelgrouplist = result.data;
      // this.modelgrouplist = [{id:1,name:"model group fixed"}]
    },

    async loadCompanyMaster(id) {
      const result = await api.getAllCompany();
      this.companyshow = result.data;
    },
    async loadItemTypeMaster(id) {
      const result = await api.getItemTypeByCompanyID(id);
      this.itemtypelist = result.data;
      // this.itemtypelist = [{id:1,name:"item type fixed"}]
    },

    async changeCompany(com_id) {
      await this.loadDepartmentMaster(com_id);
      await this.loadPositionMaster(com_id);
    },

    async loadDepartmentMaster(id) {
      const result = await api.getDepartmentMaster(id);
      this.department_list = result.data;
    },

    async loadPositionMaster(id) {
      const result = await api.getPositionMaster(id);
      this.position_list = result.data;
    },
    async changeDepartment(department_id) {
      const result = await api.getDivisionByDepartment(department_id);
      this.division_list = result.data;
    },
    async changeDivision(division_id) {
      const result = await api.getSectionByCompanyID(division_id);
      this.section_list = result.data;
    },
    async loadAuthorize() {
      const res_get = await api.getSettingGroupMenu();
      this.authorize = res_get.data;
    },
    async loadAccounts() {
      const result = await api.getAccounts();
      this.desserts = result.data;
      const resultList = await api.getAccountslistActive();
      this.approver_show = resultList.data;

      // this.$showLoader();
      this.$hideLoader();
    },
    async previewimagetobasesignatureimage(event) {
      let setimage = "";
      try {
        var input = event.target;
        const reader = new FileReader();
        reader.onload = (event) => {
          // for preview image
          // this.imageURL = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);

        // for upload image
        setimage = event.target.files[0];
        this.itemadd.image = event.target.files[0];

        const toBase64 = (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          });

        this.initial_dataimage = await await toBase64(setimage);
        this.itemadd.imagesignature = input.files[0].name;
        // console.log(baseimagetosignature);
        // this.initial_dataimage = baseimagetosignature;
        // console.log(this.initial_dataimage);

        // this.$refs.imagesignaturePad.resizeCanvas();
        // this.$refs.imagesignaturePad.fromDataURL(this.initial_dataimage);

        // this.savesigimage();
        // this.showbuttonsavesigimage = true;
        // this.showbuttonsavesig1 = false;
        // this.$refs.firstsignaturePad.lockSignaturePad();
      } catch (error) {
        // console.log("onFileSelected error:", error);
      }
    },
    getgroupname(item) {
      return `${item.group_name} (${item.group_item})`;
    },
    getgroupnameitemtype(item) {
      return `${item.type_name} (${item.item_type})`;
    },
    getgroupnamedimgroup(item) {
      return `${item.dimgroup_name}`;
    },
    getgroupnamemodelgroup(item) {
      return `${item.model_group_name}`;
    },
    // getunitname(item){
    //   return `${item.unit_name} (${item.unit_item})`;
    // },

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
  beforeCreate() {
    this.$store.state.navMenu = true;
  },
};
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--default.buttonblue {
  background-color: #1f51ff;
  color: white;
}

.v-btn:not(.v-btn--round).v-size--default.buttonred {
  width: 100%;
  background-color: #9e3b1b;
  color: white;
}

.v-tab.v-tab--active {
  background-color: #1f51ff;
  color: white;
}

.v-slide-group__content {
  border: solid;
}

.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active),
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-icon,
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-btn,
.theme--light.v-tabs > .v-tabs-bar .v-tab--disabled {
  color: black;
  /* border: solid 1px; */
}

.containertab {
  max-width: 100%;
  min-width: 100%;
  margin: 40px auto;
  /* font-family: Arial, Helvetica, sans-serif; */
  font-size: 0.9em;
  color: #888;
}

.tabs {
  overflow: hidden;
  /* margin-left: 20px; */
  /* margin-bottom: -2px; */
}

.tabs ul {
  list-style-type: none;
  margin-left: 20px;
}

.tabs div {
  width: 150px;
  height: 50px;
  color: #000000;
  float: left;
  cursor: pointer;
  padding: 10px 24px;
  transition: background-color 0.2s;
  border: 1px solid #595959;
  /* border-right: none; */
  border-right: 1px solid #595959;
  background-color: #ffffff;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}

/* .tabs a:last-child {
  border-right: 1px solid #595959;
} */

/* Change background color of tabs on hover */
.tabs div:hover {
  background-color: #2f5bfc;
  color: #fff;
}

/* Styling for active tab */
.tabs div.active {
  background-color: #1f51ff;
  color: #ffffff;
  /* border-bottom: 2px solid #fff; */
  cursor: default;
}

/* Style the tab content */
.tabcontent {
  padding: 30px;
  border: 1px solid #595959;
  /* border-radius: 10px; */
  border-radius: 0px 10px 10px 10px;
  box-shadow: 3px 3px 6px #e1e1e1;
}

.border-dt-picker {
  border: 1px solid;
  border-radius: 5px;
  height: 30px;
}

.minheighttime {
  min-height: 40px;
  cursor: pointer;
  font-size: initial;
  padding-top: 7px;
  padding-left: 7px;
}
</style>
