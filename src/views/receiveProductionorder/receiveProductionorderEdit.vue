<template>
  <v-container class="pa-1" fluid>
    <v-card class="pa-12">
      <v-card-title>
        <v-row no-gutters>
          <v-col cols="12" md="6" justify="center" class="mt-n6">
            <h3>
              Receive Production Order # {{ main_item_data.doc_running_no }}
            </h3>
          </v-col>
          <!-- <v-col cols="12" md="6" justify="center" align="end">
            <h3>{{ main_item_data.doc_running_no }}</h3>
          </v-col> -->
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
                  <!-- <v-col class="d-flex" cols="12" sm="3">
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
                  </v-col> -->

                  <v-col class="d-flex" cols="12" sm="12" md="3">
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
                      disabled
                    ></v-select>
                  </v-col>

                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                      v-model="item_master_name"
                      label="Item Name"
                      outlined
                      dense
                      readonly
                      disabled
                      class="mr-2"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12" md="1">
                    <v-text-field
                      v-model="item_master_unit"
                      label="Unit Name"
                      outlined
                      dense
                      readonly
                      class="mr-2"
                      disabled
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12" md="2">
                    <v-text-field
                      v-model="itemadd.order_qty"
                      label="Order QTY"
                      outlined
                      dense
                      type="number"
                      class="mr-2"
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col cols="12" sm="12" md="2">
                    <v-text-field
                      v-model="itemadd.old_qty_receive"
                      label="QTY Receive"
                      outlined
                      dense
                      type="number"
                      class="mr-2"
                      disabled
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12" md="2">
                    <v-text-field
                      v-model="itemadd.qty_remain"
                      label="QTY Remain"
                      outlined
                      dense
                      type="number"
                      class="mr-2"
                      disabled
                    ></v-text-field>
                  </v-col>

                  <v-col class="d-flex" cols="12" sm="12" md="2">
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
                  <v-col class="d-flex" cols="12" sm="12" md="2">
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
                          :disabled="!rd_due_status"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date1"
                        no-title
                        @input="menu1 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col class="d-flex pl-2 pt-1" cols="12" sm="12" md="1">
                    <p class="pt-1">Due Time :</p></v-col
                  >
                  <v-col class="pl-2 pt-1" cols="12" sm="12" md="2">
                    <vue-timepicker
                      v-model="tmp_due_time"
                      close-on-complete
                      format="HH:mm"
                      fixed-dropdown-button
                      auto-scroll
                      hide-clear-button
                      width="100%"
                      :disabled="!rd_due_status"
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
      <v-row no-gutters>
        <v-col cols="12" md="12" justify="center">
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row no-gutters justify="center" class="mt-3">
        <v-col cols="12" md="3" justify="center">
          <v-text-field
            type="number"
            min="0"
            v-model="itemadd.qty_receive"
            label="Receive Now"
            outlined
            dense
            class="pl-2"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" justify="center">
          <v-menu
            ref="menudate_receive"
            v-model="menudate_receive"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="itemadd.date_receive"
                label="Receive Date"
                persistent-hint
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
                outlined
                dense
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date_receive"
              @input="menudate_receive = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col class="pl-2" cols="12" md="6" justify="center">
          <v-btn
            depressed
            width="150"
            class="mr-3 buttongreen"
            outlined
            @click="ReceiveItemConfirm()"
          >
            Recieve
          </v-btn>

          <v-btn depressed class="mr-3 buttonred" width="100" @click="onGoBack">
            Back
          </v-btn>
        </v-col>
      </v-row>

      <v-row class="pt-3" no-gutters>
        <v-col cols="12" md="12" justify="center">
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-card-actions> </v-card-actions>

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

      <v-dialog v-model="dialogDeleteReceive" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Are you sure you want to delete this item</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDeleteReceive"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="confirmDeleteReceive"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <br />

      <div class="pa-2 div-iterator" v-if="doc_running">
        <v-data-table :headers="headers" :items="items" class="elevation-1">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="onClickeDeleteReceive(item)"
              :style="{
                backgroundColor: '#E1F5FE',
                color: '#F44336',
              }"
            >
              mdi-delete
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
</template>
<script>
import SuccessDialog from "@/components/cards/SuccessDialog";
import SuccessDialogPush from "@/components/cards/SuccessDialogPush";
import api from "@/services/api";
import UDefine from "@/views/u-define/UDefine";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";

import { server, udgroup } from "@/services/constants";

const aj_status = {
  adjust_start_date_time: "adjust_start_date_time",
  adjust_due_date_time: "adjust_due_date_time",
  adjust_between_date_time: "adjust_between_date_time",
  close: "close",
};

export default {
  components: {
    SuccessDialog,
    SuccessDialogPush,
    UDefine,
    VueTimepicker,
  },
  computed: {
    computedDateFormatted2() {
      return this.formatDate(this.date2);
    },
    computedDateFormatted1() {
      return this.formatDate(this.date1);
    },
    computedDateFormatted() {
      return this.formatDaparseDatete(this.date);
    },
  },

  watch: {
    date_receive(val) {
      this.itemadd.date_receive = this.formatDate(this.date_receive);
    },
    date2(val) {
      this.dateFormatted2 = this.formatDate(this.date2);
    },
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
    doc_status: false,
    approve_status: false,
    adjust_message: "",
    dialogPreview: false,
    dialogDeleteReceive: false,
    dialogApprove: false,
    rd_aj_status: false,
    rd_due_status: false,
    radios: null,
    main_item_data: null,
    doc_running: null,
    itemsPerPage: 5,
    items: [],
    itemsPreview: [],
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

    tmp_due_time2: null,
    date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted2: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu2: false,

    date1: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted1: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu1: false,
    menudate_receive: false,

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
      start_date: null,
      start_time: null,
      company_id: localStorage.getItem(server.COMPANYID),
      user_update: localStorage.getItem(server.USER_ID),
      updated_at: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      qty_remain: 0,
      old_qty_receive: 0,
      qty_receive: 0,
      date_receive: vm.formatDate(
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      ),
    },
    date_receive: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
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
      { text: "Recieve Data", value: "date_receive_show" },
      { text: "QTY", value: "qty_receive" },
      { text: "User", value: "tbl_user.fullname" },
      { text: "Manage", value: "actions" },
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
    itemdelete: {},
  }),
  async mounted() {
    this.userId = localStorage.getItem(server.USER_ID);

    await this.onLoadUdefineIDByCompanyAndModuleName(
      udgroup.PRODUCTION_ORDER,
      localStorage.getItem(server.COMPANYID)
    );
    this.udmodule_name = udgroup.PRODUCTION_ORDER;
    await this.loadDocRunning();
    await this.loadItemMaster();
    await this.onloadDataEdit();

    this.$hideLoader();
  },
  methods: {
    onGoBack() {
      // go to production order list
      this.$router.push("/receive-production-order-list");
      // this.$router.back();
    },

    async closeApproveUpdateWO() {
      this.dialogApprove = false;
    },

    onApproveUpdateWO() {
      this.dialogApprove = true;
    },

    async closeDeleteReceive() {
      this.itemdelete = {};
      this.dialogDeleteReceive = false;
    },
    async confirmDeleteReceive() {
      this.$showLoader();
      const res = await api.updateOrder(this.$route.params.id, {
        qty_remain:
          parseInt(this.itemadd.qty_remain) +
          parseInt(this.itemdelete.qty_receive),
        qty_receive:
          parseInt(this.itemadd.old_qty_receive) -
          parseInt(this.itemdelete.qty_receive),
      });

      if (res.status == 200 || res.status == 201) {
        await api.DeleteORD_Recieve(this.itemdelete.id);
        await this.onloadDataEdit();
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Delete data success",
          "text-h5 green--text text-center"
        );
        this.dialogDeleteReceive = false;
        this.$hideLoader();
        return;
      } else if (res.status == 204) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          res.data.message,
          "text-h5 red--text text-center"
        );
        this.dialogDeleteReceive = false;
        this.$hideLoader();
        return;
      } else {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Delete data Failed",
          "text-h5 red--text text-center"
        );
        this.dialogDeleteReceive = false;
        this.$hideLoader();
        return;
      }
    },

    async onClickeDeleteReceive(item) {
      this.dialogDeleteReceive = true;
      this.itemdelete = item;
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

    async onloadDataEdit() {
      // this.main_item_data = JSON.parse(
      //   localStorage.getItem(server.WO_EDIT_ITEM)
      // );
      const resultorder = await api.getAllOrderByOrdID(this.$route.params.id);
      if (resultorder.data[0]) {
        this.main_item_data = resultorder.data[0];

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
        this.itemadd.qty_remain = this.main_item_data.qty_remain;
        this.itemadd.old_qty_receive = this.main_item_data.qty_receive;
        this.itemadd.qty_receive = 0;

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
      }

      const res_pod = await api.getAllORD_RecieveByOrdID(this.$route.params.id);
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

    async ReceiveItemConfirm() {
      if (this.itemadd.qty_receive == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Receive Now",
          "text-h5 red--text text-center"
        );
        return;
      }
      const res = await api.updateOrder(this.$route.params.id, {
        qty_remain:
          parseInt(this.itemadd.order_qty) -
          (parseInt(this.itemadd.old_qty_receive) +
            parseInt(this.itemadd.qty_receive)),
        qty_receive:
          parseInt(this.itemadd.old_qty_receive) +
          parseInt(this.itemadd.qty_receive),
      });
      if (res.status == 200 || res.status == 201) {
        this.dialogReceive = false;
        await api.addORD_Recieve({
          ord_id: this.$route.params.id,
          date_receive: this.date_receive,
          qty_receive: parseInt(this.itemadd.qty_receive),
          user_id: this.userId,
        });
        await this.loadItemMaster();
        this.$store.state.global_dialog_push = true;
        this.setupAlertDialogPush(
          true,
          "Success!!!",
          "Receive Work Order success",
          "text-h5 green--text text-center",
          "/receive-production-order-list"
        );
        return;
      } else if (res.status == 204) {
        this.dialogReceive = false;
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          res.data.message,
          "text-h5 red--text text-center"
        );
        return;
      } else {
        this.dialogReceive = false;
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Close Work Order Failed",
          "text-h5 red--text text-center"
        );
        return;
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
    async adjustPlanAndPreview() {
      this.itemadd.doc_module_name = this.select_doc_running;
      this.itemadd.item_master_id = this.item_master_id;
      this.itemadd.rtg_id = this.select_routing;
      this.itemadd.order_date = this.date0;
      this.itemadd.due_date = this.date1;
      this.itemadd.start_date = this.date2;

      if (this.radios == aj_status.adjust_start_date_time) {
        if (this.tmp_due_time2 == null) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Please select Start Time",
            "text-h5 red--text text-center"
          );
          return;
        }
        this.itemadd.start_time = `${this.tmp_due_time2.HH}:${this.tmp_due_time2.mm}:00`;

        if (this.itemadd.start_date == null) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Please select Start Date",
            "text-h5 red--text text-center"
          );
          return;
        }
      }

      if (this.radios == aj_status.adjust_due_date_time) {
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
      }

      this.itemadd.company_id = localStorage.getItem(server.COMPANYID);
      this.itemadd.user_create = localStorage.getItem(server.USER_ID);

      // if (this.radios == aj_status.adjust_start_date_time) {

      // } else if (this.radios == aj_status.adjust_due_date_time) {

      // } else if (this.radios == aj_status.close){

      // }

      this.$showLoader();
      let res_add = null;
      if (this.radios == aj_status.adjust_start_date_time) {
        try {
          res_add = await api.adjustProductionOrderByStartDateDraft(
            this.$route.params.id,
            this.itemadd
          );
        } catch (error) {
          console.log("error", error);
        }
        // res_add = await api.adjustProductionOrderByStartDateDraft(
        //   this.$route.params.id,
        //   this.itemadd
        // );
      } else if (this.radios == aj_status.adjust_due_date_time) {
        res_add = await api.adjustProductionOrderByDueDateDraft(
          this.$route.params.id,
          this.itemadd
        );
      }

      // this.$hideLoader();
      //{ message: "success", doc_running: doc_running, cpd_res: cpd_res }
      // console.log("res_add: ", JSON.stringify(res_add.data));
      if (res_add.data.message == "success") {
        this.adjust_message = res_add.data.cpd_res;
        this.itemsPreview = [];
        this.doc_running = res_add.data.doc_running;

        // doc_running,
        // rtg_id,
        // item_master_id
        const res_pod = await api.getTempOpnOrderPlanDraftByID(
          this.doc_running,
          this.itemadd.rtg_id,
          this.itemadd.item_master_id
        );

        // console.log("res_pod: ", JSON.stringify(res_pod.data));
        this.itemsPreview = res_pod.data;
        this.dialogPreview = true;
        // console.log("this.items: ", JSON.stringify(this.items));
        this.$hideLoader();
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
.v-btn:not(.v-btn--round).v-size--default.buttongreen {
  background-color: #068719;
  color: white;
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
</style>
