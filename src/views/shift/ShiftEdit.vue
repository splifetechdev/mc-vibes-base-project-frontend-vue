<template>
  <v-card-title>
    <v-container class="pa-1" fluid>
      <v-card class="pa-12">
        <v-card-title>
          <v-row>
            <v-col cols="12" md="12" justify="center" class="mt-n6">
              <h3>แก้ไข กะ</h3>
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

                  <!-- เพิ่มส่วนนี้หลังจาก Summary Time และก่อน </div> ปิด tabcontent ใน Shift Edit -->
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

                      <!-- แก้ไขตารางแสดงข้อมูล OT ให้รองรับการแก้ไข -->
                      <v-card
                        outlined
                        v-if="shiftOTList.length > 0"
                        class="ot-table-container"
                      >
                        <v-card-title class="py-2">
                          <h5>OT List</h5>
                        </v-card-title>
                        <v-data-table
                          :headers="otHeaders"
                          :items="shiftOTList"
                          class="elevation-0 ot-data-table"
                          hide-default-footer
                          disable-pagination
                          :item-class="getRowClass"
                        >
                          <!-- แสดง/แก้ไข OT Start Time -->
                          <template v-slot:item.ot_start_time="{ item, index }">
                            <div class="table-cell-content">
                              <div
                                v-if="item.isEditing"
                                class="edit-time-picker"
                              >
                                <vue-timepicker
                                  close-on-complete
                                  format="HH:mm"
                                  fixed-dropdown-button
                                  auto-scroll
                                  hide-clear-button
                                  width="100%"
                                  :append-to-body="true"
                                  v-model="item.ot_start_time"
                                >
                                </vue-timepicker>
                              </div>
                              <div v-else class="display-text">
                                {{ formatTimeDisplay(item.ot_start_time) }}
                              </div>
                            </div>
                          </template>

                          <!-- แสดง/แก้ไข OT End Time -->
                          <template v-slot:item.ot_end_time="{ item, index }">
                            <div class="table-cell-content">
                              <div
                                v-if="item.isEditing"
                                class="edit-time-picker"
                              >
                                <vue-timepicker
                                  close-on-complete
                                  format="HH:mm"
                                  fixed-dropdown-button
                                  auto-scroll
                                  hide-clear-button
                                  width="100%"
                                  :append-to-body="true"
                                  v-model="item.ot_end_time"
                                >
                                </vue-timepicker>
                              </div>
                              <div v-else class="display-text">
                                {{ formatTimeDisplay(item.ot_end_time) }}
                              </div>
                            </div>
                          </template>

                          <!-- แสดง/แก้ไข OT Rate -->
                          <template v-slot:item.ot_rate="{ item, index }">
                            <div class="table-cell-content">
                              <div
                                v-if="item.isEditing"
                                class="edit-rate-input"
                              >
                                <v-text-field
                                  v-model="item.ot_rate"
                                  type="number"
                                  step="0.25"
                                  min="0"
                                  dense
                                  outlined
                                  hide-details
                                  class="rate-input"
                                >
                                </v-text-field>
                              </div>
                              <div v-else class="display-text">
                                {{ item.ot_rate }}x
                              </div>
                            </div>
                          </template>

                          <!-- ปุ่ม Actions -->
                          <template v-slot:item.actions="{ item, index }">
                            <div class="action-buttons">
                              <!-- ปุ่มแก้ไข/บันทึก/ยกเลิก -->
                              <div v-if="item.isEditing" class="edit-actions">
                                <v-btn
                                  icon
                                  color="green"
                                  small
                                  @click="saveOTEdit(index)"
                                  :disabled="!isValidOTEdit(item)"
                                  class="action-btn"
                                >
                                  <v-icon small>mdi-check</v-icon>
                                </v-btn>
                                <v-btn
                                  icon
                                  color="grey"
                                  small
                                  @click="cancelOTEdit(index)"
                                  class="action-btn ml-1"
                                >
                                  <v-icon small>mdi-close</v-icon>
                                </v-btn>
                              </div>
                              <!-- ปุ่มแก้ไข/ลบ (โหมดปกติ) -->
                              <div v-else class="normal-actions">
                                <v-btn
                                  icon
                                  color="blue"
                                  small
                                  @click="editOTRecord(index)"
                                  class="action-btn"
                                >
                                  <v-icon small>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn
                                  icon
                                  color="red"
                                  small
                                  @click="removeOTRecord(index)"
                                  class="action-btn ml-1"
                                >
                                  <v-icon small>mdi-delete</v-icon>
                                </v-btn>
                              </div>
                            </div>
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
      // ตรวจสอบว่าไม่มีรายการที่กำลังแก้ไขอยู่
      const hasEditingItem = this.shiftOTList.some((item) => item.isEditing);

      return (
        this.otForm.ot_start_time !== "" &&
        this.otForm.ot_end_time !== "" &&
        this.otForm.ot_rate > 0 &&
        !hasEditingItem
      ); // ไม่ให้เพิ่มใหม่ถ้ามีรายการที่กำลังแก้ไข
    },
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  data: (vm) => ({
    // เพิ่มข้อมูลสำหรับ OT
    otForm: {
      ot_start_time: "",
      ot_end_time: "",
      ot_rate: 1.5,
    },
    shiftOTList: [],
    otHeaders: [
      {
        text: "OT Start Time",
        value: "ot_start_time",
        align: "center",
        width: "150",
      },
      {
        text: "OT End Time",
        value: "ot_end_time",
        align: "center",
        width: "150",
      },
      { text: "OT Rate", value: "ot_rate", align: "center", width: "100" },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "center",
        width: "120",
      },
    ],

    deletedOTList: [], // เก็บรายการ OT ที่ถูกลบ (สำหรับลบจาก database)

    tab: null,
    itemadd: {
      shift_id: "",
      shift_name: "",
      start_time: null,
      end_time: null,
      break_start: null,
      break_end: null,
      summary_time: null,
      company_id: localStorage.getItem(server.COMPANYID),
      user_update: localStorage.getItem(server.USER_ID),
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
    await this.loaddataEdit();

    await this.loadAuthorize();

    // เพิ่ม event listener สำหรับ resize
    window.addEventListener("resize", this.handleResize);
    this.handleResize(); // เรียกครั้งแรก

    this.$hideLoader();
  },
  methods: {
    // ฟังก์ชันสำหรับ class ของแถว
    getRowClass(item) {
      return item.isEditing ? "editing-row" : "";
    },

    // แก้ไขฟังก์ชัน editOTRecord - ลบการจัดการ overflow ออก
    editOTRecord(index) {
      // ยกเลิกการแก้ไขรายการอื่นก่อน
      this.cancelAllOTEdits();

      const otRecord = this.shiftOTList[index];

      // เก็บข้อมูลเดิมไว้สำหรับยกเลิก
      otRecord.originalData = {
        ot_start_time: otRecord.ot_start_time,
        ot_end_time: otRecord.ot_end_time,
        ot_rate: otRecord.ot_rate,
      };

      // เปิดโหมดแก้ไข
      this.$set(otRecord, "isEditing", true);

      // ให้ Vue render ก่อนแล้วค่อย focus
      this.$nextTick(() => {
        // หา timepicker input แล้วให้ได้รับ focus
        const editingRow = document.querySelector(".editing-row");
        if (editingRow) {
          const firstTimePicker = editingRow.querySelector(
            ".vue__time-picker input"
          );
          if (firstTimePicker) {
            setTimeout(() => {
              firstTimePicker.focus();
            }, 100);
          }
        }
      });
    },

    // แก้ไขฟังก์ชัน saveOTEdit - ลบการจัดการ overflow ออก
    saveOTEdit(index) {
      const otRecord = this.shiftOTList[index];

      // ตรวจสอบความถูกต้องของข้อมูล
      if (!this.isValidOTEdit(otRecord)) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please fill all OT fields correctly",
          "text-h5 red--text text-center"
        );
        return;
      }

      // ตรวจสอบว่าเวลาไม่ซ้ำกับรายการอื่น
      const isDuplicate = this.shiftOTList.some(
        (ot, idx) =>
          idx !== index && // ไม่ใช่รายการที่กำลังแก้ไข
          ot.ot_start_time === otRecord.ot_start_time &&
          ot.ot_end_time === otRecord.ot_end_time
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

      // แปลง ot_rate เป็น number
      otRecord.ot_rate = parseFloat(otRecord.ot_rate);

      // ถ้าเป็นข้อมูลเดิมที่แก้ไข ให้ระบุว่ามีการเปลี่ยนแปลง
      if (otRecord.isExisting) {
        otRecord.isModified = true;
      }

      // ลบข้อมูลสำรองและปิดโหมดแก้ไข
      delete otRecord.originalData;
      otRecord.isEditing = false;
    },

    // แก้ไขฟังก์ชัน cancelOTEdit - ลบการจัดการ overflow ออก
    cancelOTEdit(index) {
      const otRecord = this.shiftOTList[index];

      // คืนค่าข้อมูลเดิม
      if (otRecord.originalData) {
        otRecord.ot_start_time = otRecord.originalData.ot_start_time;
        otRecord.ot_end_time = otRecord.originalData.ot_end_time;
        otRecord.ot_rate = otRecord.originalData.ot_rate;
        delete otRecord.originalData;
      }

      // ปิดโหมดแก้ไข
      otRecord.isEditing = false;
    },

    // ฟังก์ชันรีเซ็ต overflow ของตาราง
    resetTableOverflow() {
      const tableContainer = document.querySelector(".ot-table-container");
      if (tableContainer) {
        tableContainer.style.overflow = "";
        tableContainer.style.zIndex = "";
      }

      const dataTable = document.querySelector(".ot-data-table");
      if (dataTable) {
        dataTable.style.overflow = "";
        const wrapper = dataTable.querySelector(".v-data-table__wrapper");
        if (wrapper) {
          wrapper.style.overflow = "";
        }
      }
    },

    // แก้ไขฟังก์ชัน cancelAllOTEdits - ลบการจัดการ overflow ออก
    cancelAllOTEdits() {
      this.shiftOTList.forEach((otRecord, index) => {
        if (otRecord.isEditing) {
          this.cancelOTEdit(index);
        }
      });
    },

    // เพิ่มฟังก์ชันสำหรับจัดการ dropdown timepicker
    handleTimepickerFocus(event) {
      // ป้องกันไม่ให้ dropdown ถูกซ่อนโดย CSS อื่น
      const timepicker = event.target.closest(".vue__time-picker");
      if (timepicker) {
        timepicker.style.zIndex = "9999";
      }
    },

    handleTimepickerBlur(event) {
      // รีเซ็ต z-index เมื่อไม่ focus แล้ว
      setTimeout(() => {
        const timepicker = event.target.closest(".vue__time-picker");
        if (timepicker && !timepicker.classList.contains("active")) {
          timepicker.style.zIndex = "";
        }
      }, 200);
    },

    // เพิ่มฟังก์ชันสำหรับจัดการ responsive
    handleResize() {
      // ปรับขนาดตารางตาม viewport
      this.$nextTick(() => {
        const table = document.querySelector(".ot-data-table table");
        if (table && window.innerWidth < 768) {
          // จัดการสำหรับหน้าจอเล็ก
          table.style.fontSize = "12px";
        } else if (table) {
          table.style.fontSize = "14px";
        }
      });
    },

    // ตรวจสอบความถูกต้องของข้อมูลที่แก้ไข
    isValidOTEdit(otRecord) {
      return (
        otRecord.ot_start_time !== "" &&
        otRecord.ot_end_time !== "" &&
        otRecord.ot_rate > 0
      );
    },

    // แก้ไขฟังก์ชัน removeOTRecord
    removeOTRecord(index) {
      const otRecord = this.shiftOTList[index];

      // ถ้ากำลังแก้ไขอยู่ ให้ยกเลิกก่อน
      if (otRecord.isEditing) {
        this.cancelOTEdit(index);
      }

      // ถ้าเป็นข้อมูลเดิมที่มี ID ให้เก็บไว้ในรายการลบ
      if (otRecord.isExisting && otRecord.id) {
        this.deletedOTList.push(otRecord.id);
      }

      // ลบออกจากรายการแสดงผล
      this.shiftOTList.splice(index, 1);
    },

    // แก้ไขฟังก์ชัน addOTRecord เพื่อป้องกันการเพิ่มขณะแก้ไข
    addOTRecord() {
      // ตรวจสอบว่าไม่มีรายการที่กำลังแก้ไขอยู่
      const hasEditingItem = this.shiftOTList.some((item) => item.isEditing);

      if (hasEditingItem) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please finish editing current OT record first",
          "text-h5 red--text text-center"
        );
        return;
      }

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

      // เพิ่มข้อมูล OT ลงในรายการ (ข้อมูลใหม่)
      this.shiftOTList.push({
        ot_start_time: this.otForm.ot_start_time,
        ot_end_time: this.otForm.ot_end_time,
        ot_rate: parseFloat(this.otForm.ot_rate),
        isExisting: false, // ระบุว่าเป็นข้อมูลใหม่
        isEditing: false, // ไม่อยู่ในโหมดแก้ไข
      });

      // เคลียร์ฟอร์ม
      this.clearOTForm();
    },

    // แก้ไข loaddataEdit() เพื่อโหลดข้อมูล OT
    async loaddataEdit() {
      this.main_id = this.$route.params.id;
      const result = await api.getShiftByID(
        this.main_id,
        this.main_u_define_module_id
      );
      if (result.data[0]) {
        //item
        this.itemadd.shift_id = result.data[0].shift_id;
        this.itemadd.shift_name = result.data[0].shift_name;
        this.itemadd.start_time = result.data[0].start_time;
        this.itemadd.end_time = result.data[0].end_time;
        this.itemadd.break_start = result.data[0].break_start
          ? result.data[0].break_start
          : "";
        this.itemadd.break_end = result.data[0].break_end
          ? result.data[0].break_end
          : "";
        this.itemadd.summary_time = result.data[0].summary_time;

        //itemdfine
        this.itemaddudefine.u_define_module_id = this.main_u_define_module_id;
        this.itemaddudefine.numeric1 = result.data[0].numeric1;
        this.itemaddudefine.numeric2 = result.data[0].numeric2;
        this.itemaddudefine.date1 = this.formatDate(result.data[0].date1);
        this.itemaddudefine.date2 = this.formatDate(result.data[0].date2);
        this.itemaddudefine.boolean1 = result.data[0].boolean1;
        this.itemaddudefine.boolean2 = result.data[0].boolean2;
        this.itemaddudefine.char1 = result.data[0].char1;
        this.itemaddudefine.char2 = result.data[0].char2;
        this.itemaddudefine.text1 = result.data[0].text1;
        this.itemaddudefine.text2 = result.data[0].text2;
      }

      // โหลดข้อมูล OT
      await this.loadShiftOTData();
    },

    // แก้ไขฟังก์ชัน loadShiftOTData
    async loadShiftOTData() {
      try {
        const result = await api.getShiftOTByShiftID(this.main_id);
        console.log("Shift OT Data:", JSON.stringify(result.data, null, 2));

        if (result.data && result.data.length > 0) {
          this.shiftOTList = result.data.map((ot) => ({
            id: ot.id,
            ot_start_time: this.extractTimeFromISO(ot.ot_start_time),
            ot_end_time: this.extractTimeFromISO(ot.ot_end_time),
            ot_rate: parseFloat(ot.ot_rate),
            isExisting: true,
            isEditing: false, // เริ่มต้นไม่อยู่ในโหมดแก้ไข
            isModified: false, // ยังไม่ได้แก้ไข
          }));
        }
      } catch (error) {
        console.log("Error loading OT data:", error);
      }
    },

    // ปรับปรุงฟังก์ชัน extractTimeFromISO
    extractTimeFromISO(isoString) {
      if (!isoString) return "";

      // ถ้าเป็น ISO Date string
      if (isoString.includes("T")) {
        const date = new Date(isoString);
        const hours = date
          .getUTCHours()
          .toString()
          .padStart(2, "0");
        const minutes = date
          .getUTCMinutes()
          .toString()
          .padStart(2, "0");
        return `${hours}:${minutes}`;
      }

      // ถ้าเป็นรูปแบบอื่น
      return this.formatTimeDisplay(isoString);
    },

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

      // เพิ่มข้อมูล OT ลงในรายการ (ข้อมูลใหม่)
      this.shiftOTList.push({
        ot_start_time: this.otForm.ot_start_time,
        ot_end_time: this.otForm.ot_end_time,
        ot_rate: parseFloat(this.otForm.ot_rate),
        isExisting: false, // ระบุว่าเป็นข้อมูลใหม่
      });

      // เคลียร์ฟอร์ม
      this.clearOTForm();
    },

    // ลบ OT Record
    removeOTRecord(index) {
      const otRecord = this.shiftOTList[index];

      // ถ้าเป็นข้อมูลเดิมที่มี ID ให้เก็บไว้ในรายการลบ
      if (otRecord.isExisting && otRecord.id) {
        this.deletedOTList.push(otRecord.id);
      }

      // ลบออกจากรายการแสดงผล
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

    // ปรับปรุง formatTimeDisplay สำหรับแก้ปัญหา ISO time
    formatTimeDisplay(time) {
      if (!time) return "";

      // ถ้าเป็น ISO Date string (เช่น "1970-01-01T17:00:00.000Z")
      if (time.includes("T")) {
        const date = new Date(time);
        const hours = date
          .getUTCHours()
          .toString()
          .padStart(2, "0");
        const minutes = date
          .getUTCMinutes()
          .toString()
          .padStart(2, "0");
        return `${hours}:${minutes}`;
      }

      // ถ้าเป็น HH:mm:ss ให้ตัดส่วน :ss ออก
      if (time.includes(":") && time.split(":").length === 3) {
        return time.substring(0, 5); // เอาแค่ HH:mm
      }

      // ถ้าเป็น HH:mm อยู่แล้ว
      return time;
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

      // Update Shift หลัก
      const res_add = await api.updateShift(
        this.$route.params.id,
        this.itemadd
      );
      if (res_add.status == 200 || res_add.status == 201) {
        const shiftId = this.$route.params.id;

        // ลบ OT Records ที่ถูกลบ
        if (this.deletedOTList.length > 0) {
          for (let otId of this.deletedOTList) {
            await api.deleteShiftOT(otId);
          }
        }

        // จัดการข้อมูล OT
        for (let otRecord of this.shiftOTList) {
          const otData = {
            shift_id: shiftId,
            ot_start_time: otRecord.ot_start_time + ":00",
            ot_end_time: otRecord.ot_end_time + ":00",
            ot_rate: otRecord.ot_rate,
          };

          if (otRecord.isExisting && otRecord.id) {
            // อัปเดตข้อมูลเดิม (ทั้งที่แก้ไขและไม่แก้ไข)
            await api.updateShiftOT(otRecord.id, otData);
          } else {
            // เพิ่มข้อมูลใหม่
            await api.addShiftOT(otData);
          }
        }

        this.$hideLoader();

        // Update U-define
        this.itemaddudefine.module_master_id = shiftId;
        this.itemaddudefine.date1 = this.parseDate(this.itemaddudefine.date1);
        this.itemaddudefine.date2 = this.parseDate(this.itemaddudefine.date2);
        const res_addudefine = await api.updateByModuleMasterIdANDUdefineModuleId(
          this.$route.params.id,
          this.main_u_define_module_id,
          this.itemaddudefine
        );

        if (res_addudefine.status == 200 || res_addudefine.status == 201) {
          this.$hideLoader();
          this.$store.state.global_dialog_push = true;
          this.setupAlertDialogPush(
            true,
            "Success!!!",
            "Edit data success",
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
            "Edit data Failed",
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

  // เพิ่มใน beforeDestroy()
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
/* แทนที่ CSS เดิมด้วยโค้ดนี้ - แก้ไขปัญหา Timepicker */

/* Container สำหรับตาราง OT */
.ot-table-container {
  position: relative;
  z-index: 1;
}

/* ตาราง OT */
.ot-data-table {
  position: relative;
}

/* แถวที่กำลังแก้ไข */
.ot-data-table tbody tr.editing-row {
  background-color: #f8f9fa !important;
  border: 2px solid #1f51ff !important;
  position: relative;
  z-index: 10;
}

/* เซลล์ในตาราง */
.table-cell-content {
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
}

/* ข้อความแสดงผลปกติ */
.display-text {
  text-align: center;
  font-weight: 500;
}

/* Time picker ในโหมดแก้ไข */
.edit-time-picker {
  width: 120px;
  min-width: 120px;
  position: relative;
  z-index: 1000;
}

/* ปรับ vue-timepicker */
.edit-time-picker .vue__time-picker {
  width: 100% !important;
  font-size: 14px !important;
  position: relative !important;
}

.edit-time-picker .vue__time-picker input {
  text-align: center !important;
  padding: 8px !important;
  border: 1px solid #ccc !important;
  border-radius: 4px !important;
  background: white !important;
  cursor: pointer !important;
}

/* ปรับ Dropdown ของ timepicker ให้ทำงานได้ถูกต้อง */
.vue__time-picker .dropdown {
  position: absolute !important;
  top: 100% !important;
  left: 0 !important;
  right: 0 !important;
  z-index: 9999 !important;
  background: white !important;
  border: 1px solid #ddd !important;
  border-radius: 4px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  max-height: 200px !important;
  overflow: hidden !important;
  display: flex !important;
}

/* ปรับ scrollable area ใน dropdown */
.vue__time-picker .dropdown .select-list {
  flex: 1 !important;
  max-height: 200px !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
}

/* ปรับ scrollbar */
.vue__time-picker .dropdown .select-list::-webkit-scrollbar {
  width: 6px !important;
}

.vue__time-picker .dropdown .select-list::-webkit-scrollbar-track {
  background: #f1f1f1 !important;
}

.vue__time-picker .dropdown .select-list::-webkit-scrollbar-thumb {
  background: #888 !important;
  border-radius: 3px !important;
}

.vue__time-picker .dropdown .select-list::-webkit-scrollbar-thumb:hover {
  background: #555 !important;
}

/* ปรับรายการในดรอปดาวน์ */
.vue__time-picker .dropdown .select-list ul {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
  max-height: none !important;
}

.vue__time-picker .dropdown .select-list ul li {
  padding: 8px 12px !important;
  cursor: pointer !important;
  transition: background-color 0.2s ease !important;
  text-align: center !important;
  border-bottom: 1px solid #f0f0f0 !important;
}

.vue__time-picker .dropdown .select-list ul li:hover {
  background-color: #f5f5f5 !important;
}

.vue__time-picker .dropdown .select-list ul li.active,
.vue__time-picker .dropdown .select-list ul li.selected {
  background-color: #1f51ff !important;
  color: white !important;
}

/* ป้องกัน pointer events ที่อาจรบกวน */
.vue__time-picker .dropdown * {
  pointer-events: auto !important;
}

/* Rate input ในโหมดแก้ไข */
.edit-rate-input {
  width: 80px;
  min-width: 80px;
}

.rate-input {
  text-align: center;
}

.rate-input input {
  text-align: center !important;
}

.rate-input .v-input__control {
  min-height: 32px !important;
}

.rate-input .v-text-field__details {
  display: none !important;
}

/* ปุ่ม Actions */
.action-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  min-height: 48px;
}

.edit-actions,
.normal-actions {
  display: flex;
  gap: 4px;
}

.action-btn {
  min-width: 32px !important;
  width: 32px !important;
  height: 32px !important;
}

/* ปรับ header ของตาราง */
.ot-data-table .v-data-table-header th {
  text-align: center !important;
  font-weight: bold !important;
  background-color: #1f51ff !important;
  color: white !important;
  border-right: 1px solid rgba(255, 255, 255, 0.2) !important;
  position: relative !important;
  z-index: 1 !important;
}

/* ปรับเซลล์ของตาราง */
.ot-data-table tbody td {
  text-align: center !important;
  vertical-align: middle !important;
  padding: 8px 16px !important;
  border-right: 1px solid #e0e0e0 !important;
  position: relative !important;
}

.ot-data-table tbody td:last-child {
  border-right: none !important;
}

/* ปรับแถวของตาราง */
.ot-data-table tbody tr {
  transition: all 0.3s ease !important;
  position: relative !important;
}

.ot-data-table tbody tr:hover:not(.editing-row) {
  background-color: #f5f5f5 !important;
}

/* ปรับขนาดตาราง */
.ot-data-table .v-data-table__wrapper table {
  table-layout: fixed !important;
  width: 100% !important;
}

.ot-data-table .v-data-table__wrapper table th:nth-child(1),
.ot-data-table .v-data-table__wrapper table td:nth-child(1) {
  width: 25% !important;
}

.ot-data-table .v-data-table__wrapper table th:nth-child(2),
.ot-data-table .v-data-table__wrapper table td:nth-child(2) {
  width: 25% !important;
}

.ot-data-table .v-data-table__wrapper table th:nth-child(3),
.ot-data-table .v-data-table__wrapper table td:nth-child(3) {
  width: 20% !important;
}

.ot-data-table .v-data-table__wrapper table th:nth-child(4),
.ot-data-table .v-data-table__wrapper table td:nth-child(4) {
  width: 30% !important;
}

/* เพิ่ม overlay สำหรับป้องกัน interaction ข้างนอก dropdown */
.vue__time-picker.active::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  pointer-events: none;
}

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
