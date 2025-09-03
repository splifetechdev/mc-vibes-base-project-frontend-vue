<template>
  <v-card-title>
    <v-container class="pa-1" fluid>
      <v-card class="pa-12">
        <v-card-title>
          <v-row no-gutters>
            <v-col cols="12" md="12" justify="center" class="mb-6">
              <h3>Production Order Edit</h3>
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
                <!-- <div
                  class="ml-1"
                  v-on:click="activetab = 3"
                  v-bind:class="[activetab === 3 ? 'active' : '']"
                >
                  U-define
                </div> -->
              </div>

              <div class="content">
                <div
                  v-if="activetab === 1 && callsoopentab == true"
                  class="tabcontent"
                >
                  <v-row no-gutters>
                    <v-col class="d-flex" cols="12" sm="3">
                      <v-select
                        autofocus
                        v-model="select_doc_running"
                        :items="doc_running_list"
                        label="Doc. Group *"
                        outlined
                        item-text="module"
                        item-value="module"
                        dense
                        class="mr-2"
                        disabled
                      ></v-select>
                    </v-col>

                    <v-col class="d-flex" cols="12" sm="3">
                      <v-select
                        v-model="select_item_master"
                        :items="item_master_list"
                        label="Item ID"
                        outlined
                        item-text="item_id"
                        item-value="item_id"
                        dense
                        class="mr-2"
                        @change="changeItemMaster"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" sm="12" md="6">
                      <v-text-field
                        v-model="item_master_name"
                        label="Item Name"
                        outlined
                        dense
                        readonly
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row no-gutters>
                    <v-col cols="12" sm="12" md="2">
                      <v-text-field
                        v-model="itemadd.order_qty"
                        label="Order QTY"
                        outlined
                        dense
                        type="number"
                        class="mr-2"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="2" md="1">
                      <v-text-field
                        v-model="item_master_unit"
                        label="Unit Name"
                        outlined
                        dense
                        readonly
                        class="mr-2"
                      ></v-text-field>
                    </v-col>

                    <v-col class="d-flex" cols="12" sm="2">
                      <v-select
                        v-model="select_routing"
                        :items="routing_data_list"
                        label="RTG ID"
                        outlined
                        item-text="rtg_id"
                        item-value="rtg_id"
                        dense
                        class="mr-2"
                      ></v-select>
                    </v-col>

                    <v-col class="d-flex" cols="12" sm="2">
                      <v-menu
                        ref="menu0"
                        v-model="menu0"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="dateFormatted0"
                            label="Order Date"
                            persistent-hint
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                            disabled
                            outlined
                            dense
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date0"
                          no-title
                          @input="menu0 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="2">
                      <v-menu
                        ref="menu1"
                        v-model="menu1"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="dateFormatted1"
                            label="Due Date"
                            persistent-hint
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            dense
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date1"
                          no-title
                          @input="menu1 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col class="d-flex pl-2" cols="12" sm="1"
                      ><p class="pt-1">Due Time :</p></v-col
                    >
                    <v-col class="d-flex pl-2" cols="12" sm="2">
                      <vue-timepicker
                        v-model="tmp_due_time"
                        close-on-complete
                        format="HH:mm"
                        fixed-dropdown-button
                        auto-scroll
                        hide-clear-button
                        width="100%"
                      ></vue-timepicker>
                    </v-col>
                  </v-row>
                </div>
                <div v-if="activetab === 3" class="tabcontent">
                  <UDefine
                    :udmodulename="udmodule_name"
                    :dataudefine="itemaddudefine"
                    @dataOnUdefine="getdataOnUdefine"
                  >
                  </UDefine>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-row justify="center" class="mt-3">
            <v-btn
              depressed
              width="100"
              class="mr-3"
              outlined
              @click="savePlanDraft()"
            >
              Save
            </v-btn>

            <v-btn
              depressed
              width="100"
              class="mr-3  buttonblue"
              @click="TestSaveData()"
            >
              Submit
            </v-btn>

            <v-btn
              depressed
              class="mr-3  buttonred"
              width="100"
              @click="$router.back()"
            >
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

        <br />

        <div class="pa-2 div-iterator" v-if="doc_running">
          <!-- <v-data-iterator :items="items" :items-per-page.sync="itemsPerPage">
            <template v-slot:header>
              <v-toolbar class="mb-2" color="indigo darken-5" dark flat>
                <v-toolbar-title>Production Order Plan (Draft)</v-toolbar-title>
              </v-toolbar>
            </template>

            <template v-slot:default="props">
              <v-row>
                <v-col
                  v-for="item in props.items"
                  :key="item.name"
                  cols="12"
                  sm="12"
                  md="12"
                  lg="12"
                >
                  <v-card>
                    <v-card-title>
                      OPN{{ item.opn_id }} เครื่องจักร {{ item.mch_name }} Batch
                      {{ item.batch_count }}
                    </v-card-title>

                    <v-divider></v-divider>

                    <div class="pa-5">
                      <v-row no-gutters>
                        <v-col cols="12" md="8" lg="8">
                          <v-row no-gutters>
                            <div>
                              <p>
                                จำนวน
                                {{ item.real_qty_order_scrap_by_opn }} ชิ้น
                              </p>
                            </div>
                          </v-row>
                          <v-row no-gutters>
                            <div>
                              <p>
                                วันที่เริ่ม
                                {{ item.fopn_start_date_time }} เสร็จ
                                {{ item.fopn_end_date_time }} น.
                              </p>
                            </div>
                          </v-row>
                          <v-row no-gutters>
                            <div>
                              <p>เวลาติดตั้ง {{ item.fsetup_time }} ชั่วโมง</p>
                            </div>
                          </v-row>
                          <v-row no-gutters>
                            <div>
                              <p>ชิ้น / ช.ม. {{ item.pcs_hr }}</p>
                            </div>
                          </v-row>
                          <v-row no-gutters>
                            <div>
                              <p>เวลาผลิต {{ item.time_process_by_opn }} ชม.</p>
                            </div>
                          </v-row>
                        </v-col>
                        <v-col cols="12" md="4" lg="4">

                          <v-row class="h-100 flex-column pt-10">
                            <v-spacer></v-spacer>
                            <v-col cols="auto" class="align-items-center">
                              <v-btn color="green" dark block>Edit</v-btn>
                            </v-col>
                            <v-col cols="auto"
                              ><v-btn color="orange" dark block
                                >Split</v-btn
                              ></v-col
                            >

                            <v-col cols="auto"
                              ><v-btn color="red" dark block
                                >Delete</v-btn
                              ></v-col
                            >
                            <v-spacer></v-spacer>
                          </v-row>
                        </v-col>
                      </v-row>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator> -->

          <v-data-table :headers="headers" :items="items" class="elevation-1">
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="onClickedPrint(item)"
                :style="{
                  backgroundColor: '#E1F5FE',
                  color: '#2196F3',
                }"
              >
                mdi-printer-outline
              </v-icon>
            </template>
          </v-data-table>
        </div>

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
    computedDateFormatted1() {
      return this.formatDate(this.date1);
    },
    computedDateFormatted() {
      return this.formatDaparseDatete(this.date);
    },
  },

  watch: {
    date1(val) {
      this.dateFormatted1 = this.formatDate(this.date1);
    },
    // udmodule_name(){}
    // ,
    last_purchase_price_date(val) {
      this.itemadd.last_purchase_price_date = this.formatDate(
        this.last_purchase_price_date
      );
    },
    cost_price_date(val) {
      this.itemadd.cost_price_date = this.formatDate(this.cost_price_date);
    },
    sales_price_date(val) {
      this.itemadd.sales_price_date = this.formatDate(this.sales_price_date);
    },

    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  data: (vm) => ({
    main_item_data: null,
    doc_running: null,
    itemsPerPage: 5,
    items: [],
    tmp_due_time: null,
    routing_data_list: [],
    select_routing: null,
    item_master_id: null,
    item_master_name: "",
    item_master_unit: "",
    item_master_list: [],
    select_item_master: [],
    doc_running_list: [],
    select_doc_running: null,

    date1: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted1: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu1: false,

    date0: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted0: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu0: false,

    tab: null,
    work_center_group_list: [],
    select_work_center_group: null,
    itemadd: {
      doc_running: null,
      doc_module_name: null,
      item_master_id: null,
      order_qty: null,
      rtg_id: null,
      order_date: null,
      due_date: null,
      due_time: null,
      company_id: localStorage.getItem(server.COMPANYID),
      user_update: localStorage.getItem(server.USER_ID),
      updated_at: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    },
    last_purchase_price_date: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),
    cost_price_date: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),
    sales_price_date: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),
    main_u_define_module_id: 0,
    itemaddudefine: {
      module_master_id: 0,
      // u_define_module_id =1 คือ Item
      u_define_module_id: 1,
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
      { text: "OPN ID", value: "id" },
      { text: "OPN Desc", value: "opn_name" },
      { text: "Work Center", value: "wc_name" },
      { text: "Machine", value: "machine_id" },
      { text: "Batch", value: "batch_count" },
      { text: "QTY", value: "freal_qty_order_scrap_by_opn" },
      { text: "Um", value: "unit_name" },
      { text: "Start Date Time", value: "fopn_start_date_time" },
      { text: "End Date Time", value: "fopn_end_date_time" },
      { text: "Set up Hrs", value: "fsetup_time" },
      { text: "Peach/Hrs", value: "pcs_hr" },
      { text: "Plan Run Hrs", value: "ftime_process_by_opn" },
      { text: "Print", value: "actions" },
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
    main_id: 0,
    udmodule_name: "",
  }),
  async mounted() {
    this.userId = localStorage.getItem(server.USER_ID);
    // await api.checkVersion();
    // await this.loadAuthorize();
    // await this.loadAccounts();
    // await this.loadCompanyMaster(localStorage.getItem(server.COMPANYID));
    // await this.loadItemGroupList(localStorage.getItem(server.COMPANYID));
    // await this.loadItemTypeMaster(localStorage.getItem(server.COMPANYID));
    // await this.loadUnitGroupList(localStorage.getItem(server.COMPANYID));
    // await this.loadDimGroupList(localStorage.getItem(server.COMPANYID));
    // await this.loadModelGroupList(localStorage.getItem(server.COMPANYID));

    await this.onLoadUdefineIDByCompanyAndModuleName(
      udgroup.PRODUCTION_ORDER,
      localStorage.getItem(server.COMPANYID)
    );
    this.udmodule_name = udgroup.PRODUCTION_ORDER;
    // console.log(this.udmodule_name)
    // this.main_item_data = this.$store.state.work_order_edit_item;
    // console.log("this.main_item_data:", JSON.stringify(this.main_item_data));

    // await this.loadWorkCenterGroup();
    // await this.loaddataEdit();

    await this.loadDocRunning();
    await this.loadItemMaster();

    await this.onloadWODataEdit();

    this.$hideLoader();
  },
  methods: {
    async onClickedPrint(item) {
      console.log("item:", JSON.stringify(item));
    },
    async changeItemMaster() {
      // console.log("this.select_item_master", this.select_item_master);
      let tmp = null;
      tmp = this.item_master_list.filter(
        (x) => x.item_id == this.select_item_master
      );
      // console.log("tmp", JSON.stringify(tmp));
      this.item_master_name = tmp[0].item_name;
      this.item_master_unit = tmp[0].unit_name;
      this.item_master_id = tmp[0].id;

      await this.getRoutingDataByItemID(this.item_master_id);
    },
    async getRoutingDataByItemID(item_id) {
      const res_get = await api.getRoutingWorkOrder(
        item_id,
        localStorage.getItem(server.COMPANYID)
      );
      this.routing_data_list = res_get.data;
      // console.log(
      //   "this.routing_data_list",
      //   JSON.stringify(this.routing_data_list)
      // );
    },
    async loadItemMaster() {
      const res_get = await api.getItemMasterByCompanyID(
        localStorage.getItem(server.COMPANYID)
      );
      this.item_master_list = res_get.data;
      // console.log(
      //   "this.item_master_list:",
      //   JSON.stringify(this.item_master_list)
      // );
    },
    async loadDocRunning() {
      const res_get = await api.getAllByGroupPD();
      this.doc_running_list = res_get.data;
      // console.log(
      //   "this.doc_running_list",
      //   JSON.stringify(this.doc_running_list)
      // );
    },

    async onloadWODataEdit() {
      this.main_item_data = this.$store.state.work_order_edit_item;
      // console.log("this.main_item_data:", JSON.stringify(this.main_item_data));

      // {
      //   "doc_running_no": "PDCM-240276",
      //   "item_master_id": 10,
      //   "order_qty": 1000,
      //   "rtg_id": 1,
      //   "due_date_time": "29/02/2024 16:00",
      //   "item_id": "FG-ZZ-BH03WAP-AAAA",
      //   "item_name": "โต๊ะไม้สตูสูงยาว L1500*W500*THN19 เมลามีน สีขาว",
      //   "status": "D",
      //   "doc_module_name": "PD ceramic",
      //   "due_date": "2024-02-29",
      //   "due_time": "16:00:00",
      //   "order_date": "2024-02-15"
      // }

      this.itemadd.doc_running = this.main_item_data.doc_running_no;
      this.itemadd.doc_module_name = this.main_item_data.doc_module_name;
      this.itemadd.item_master_id = this.main_item_data.item_master_id;
      this.itemadd.order_qty = this.main_item_data.order_qty;
      this.itemadd.rtg_id = this.main_item_data.rtg_id;
      this.itemadd.order_date = this.main_item_data.order_date;
      this.itemadd.due_date = this.main_item_data.due_date;
      this.itemadd.due_time = this.main_item_data.due_time;
      this.itemadd.company_id = localStorage.getItem(server.COMPANYID);
      this.itemadd.user_update = localStorage.getItem(server.USER_ID);
      this.itemadd.updated_at = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);

      // this.tmp_due_time = this.main_item_data.due_time;
      let split_due_time = this.main_item_data.due_time.split(":");
      this.tmp_due_time = {
        HH: split_due_time[0],
        mm: split_due_time[1],
      };
      this.date1 = this.main_item_data.due_date;
      this.date0 = this.main_item_data.order_date;
      this.select_doc_running = this.main_item_data.doc_module_name;
      this.select_item_master = this.main_item_data.item_id;
      this.item_master_name = this.main_item_data.item_name;
      this.select_routing = this.main_item_data.rtg_id;
      await this.changeItemMaster();

      this.items = [];
      this.doc_running = this.main_item_data.doc_running_no;

      const res_pod = await api.getProdOrderPlanDraftByID(
        this.doc_running,
        this.main_item_data.rtg_id,
        this.main_item_data.item_master_id
      );
      this.items = res_pod.data;
    },
    async onHoursChange() {
      if (this.select_holiday_type == "D") {
        this.itemadd.hours = null;

        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Type of holiday is  D, Cannot input Hours",
          "text-h5 red--text text-center"
        );
        return;
      }
    },
    async changeHolidayType() {
      if (this.select_holiday_type == "D") {
        this.itemadd.hours = null;
      }
    },
    async loadWorkCenterGroup() {
      const res_get = await api.getWorkCenterGroupMaster(
        localStorage.getItem(server.COMPANYID)
      );
      this.work_center_group_list = res_get.data;
      // console.log(
      //   "this.work_center_group_list",
      //   JSON.stringify(this.work_center_group_list)
      // );
    },
    async onLoadUdefineIDByCompanyAndModuleName(module_name, company_id) {
      const res_get = await api.getu_define_module_UdefineIDByCompanyAndModuleName(
        module_name,
        company_id
      );

      // console.log("res_get", JSON.stringify(res_get.data));
      this.main_u_define_module_id = res_get.data[0].id;
      this.itemaddudefine.u_define_module_id = this.main_u_define_module_id;
      // console.log("this.main_u_define_module_id:", this.main_u_define_module_id);
    },
    async loaddataEdit() {
      this.main_id = this.$route.params.id;
      const result = await api.getHolidayByID(
        this.main_id,
        this.main_u_define_module_id
      );

      // console.log("result:", JSON.stringify(result.data));
      if (result.data[0]) {
        //item
        this.itemadd.wcg_id = result.data[0].wcg_id;
        this.select_work_center_group = result.data[0].wcg_id;
        // this.itemadd.date_from = this.formatDate(result.data[0].date_from);
        this.date1 = result.data[0].fdate_from;
        this.itemadd.holiday_type = result.data[0].holiday_type;
        this.select_holiday_type = result.data[0].holiday_type;
        this.itemadd.hours = result.data[0].hours;
        this.itemadd.company_id = result.data[0].company_id;

        //itemdfine
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
    async savePlanDraft() {
      // let doc_running = null;
      console.log("savePlanDraft");
      // console.log(this.itemadd);
      // console.log(this.itemaddudefine);
      // return;

      // doc_module_name: null,
      // item_master_id: null,
      // order_qty: null,
      // rtg_id: null,
      // order_date: null,
      // due_date: null,

      this.itemadd.doc_module_name = this.select_doc_running;
      this.itemadd.item_master_id = this.item_master_id;
      this.itemadd.rtg_id = this.select_routing;
      this.itemadd.order_date = this.date0;
      this.itemadd.due_date = this.date1;

      if (this.tmp_due_time == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Due Time",
          "text-h5 red--text text-center"
        );
        return;
      }
      this.itemadd.due_time = `${this.tmp_due_time.HH}:${this.tmp_due_time.mm}:00`;

      this.itemadd.company_id = localStorage.getItem(server.COMPANYID);
      this.itemadd.user_create = localStorage.getItem(server.USER_ID);

      // console.log("this.itemadd : ", JSON.stringify(this.itemadd));

      if (this.itemadd.doc_module_name == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Doc. Group",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.item_master_id == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Item ID",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.order_qty == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please input Order QTY",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.rtg_id == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select RTG ID",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.order_date == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Order Date",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.due_date == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Due Date",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.due_time == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Due Time",
          "text-h5 red--text text-center"
        );
        return;
      }

      console.log("this.itemadd : ", JSON.stringify(this.itemadd));

      this.$showLoader();
      const res_add = await api.updateProductionOrderDraft(
        this.$route.params.id,
        this.itemadd
      );
      // this.$hideLoader();

      // console.log("res_add: ", JSON.stringify(res_add.data));
      if (res_add.data.message == "success") {
        this.items = [];
        this.doc_running = res_add.data.doc_running;

        // doc_running,
        // rtg_id,
        // item_master_id
        const res_pod = await api.getProdOrderPlanDraftByID(
          this.doc_running,
          this.itemadd.rtg_id,
          this.itemadd.item_master_id
        );
        this.items = res_pod.data;
        // console.log("this.items: ", JSON.stringify(this.items));
        // this.$hideLoader();
        this.itemaddudefine.module_master_id = res_add.data.id;
        this.itemaddudefine.date1 = this.parseDate(this.itemaddudefine.date1);
        this.itemaddudefine.date2 = this.parseDate(this.itemaddudefine.date2);

        // console.log(
        //   "this.itemaddudefine : ",
        //   JSON.stringify(this.itemaddudefine)
        // );
        this.itemaddudefine.u_define_module_id = this.main_u_define_module_id;
        const res_addudefine = await api.addu_define_master(
          this.itemaddudefine
        );

        if (res_addudefine.status == 200) {
          this.$hideLoader();
          // this.$store.state.global_dialog_push = true;
          // this.setupAlertDialogPush(
          //   true,
          //   "Success!!!",
          //   "Add data success",
          //   "text-h5 green--text text-center",
          //   "/production-order-list"
          // );
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Success!!!",
            "Add data success",
            "text-h5 green--text text-center"
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
      } else if (res_add.status == 204) {
        this.$hideLoader();
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          res_add.data.message,
          "text-h5 red--text text-center"
        );
        return;
      } else {
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
        console.log("onFileSelected error:", error);
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
</style>
