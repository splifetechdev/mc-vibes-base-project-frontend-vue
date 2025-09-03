<template>
  <v-container class="pa-1" fluid>
    <v-card class="pa-12">
      <v-card-title>
        <v-row no-guttes>
          <v-col cols="12" md="12" justify="center">
            <h3>Production Order Add</h3>
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
                    <v-autocomplete
                      autofocus
                      v-model="select_doc_running"
                      :items="doc_running_list"
                      label="Doc. Group *"
                      outlined
                      item-text="module"
                      item-value="module"
                      dense
                      class="mr-2"
                    ></v-autocomplete>
                  </v-col>

                  <v-col class="d-flex" cols="12" sm="3">
                    <v-autocomplete
                      v-model="select_item_master"
                      :items="item_master_list"
                      label="Item ID"
                      outlined
                      item-text="item_id"
                      item-value="item_id"
                      dense
                      class="mr-2"
                      @change="changeItemMaster"
                    ></v-autocomplete>
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
                      @change="changeRouting"
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

                <v-row no-gutters>
                  <v-col cols="12" md="2" sm="2" lg="2" justify="center">
                    <v-text-field
                      v-model="no_of_mch"
                      label="No MCH"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                    sm="3"
                    lg="3"
                    justify="center"
                    class="pl-2"
                  >
                    <v-autocomplete
                      v-model="new_mch_selected"
                      :items="new_mch_list"
                      outlined
                      dense
                      chips
                      small-chips
                      label="Machine"
                      multiple
                      item-text="f_mch_name"
                      item-value="id"
                      @change="changeNewMachine"
                      clearable
                    ></v-autocomplete>
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                    sm="3"
                    lg="3"
                    justify="center"
                    class="pl-2"
                  >
                    <v-text-field
                      v-model="line_of_mch"
                      label="Line of MCH"
                      outlined
                      dense
                    ></v-text-field>
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
            class="mr-3  buttonred"
            width="100"
            @click="$router.back()"
          >
            Cancel
          </v-btn>
        </v-row>
      </v-card-actions>
      <br />

      <div class="pa-2 div-iterator" v-if="doc_running">
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
    computedDateFormatted() {
      return this.formatDaparseDatete(this.date);
    },

    computedDateFormatted1() {
      return this.formatDate(this.date1);
    },

    computedDateFormatted0() {
      return this.formatDate(this.date0);
    },
  },

  watch: {
    date1(val) {
      this.dateFormatted1 = this.formatDate(this.date1);
    },

    date0(val) {
      this.dateFormatted0 = this.formatDate(this.date0);
    },

    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  data: (vm) => ({
    line_of_mch: "",
    no_of_mch: 0,
    new_mch_selected: null,
    new_mch_list: [],
    get_routing_to_backup: null,
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
    itemadd: {
      line_of_mch: "",
      doc_module_name: null,
      item_master_id: null,
      order_qty: null,
      rtg_id: null,
      order_date: null,
      due_date: null,
      due_time: null,
      company_id: localStorage.getItem(server.COMPANYID),
      user_create: localStorage.getItem(server.USER_ID),
      created_at: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    },
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
    authorize: [],
    dialogAdd: false,
    text_color: "text-h5 green--text text-center",
    title: "green",
    message: "green",
    link: "",
    search: "",
    dialogadd: false,
    userId: 0,
    activetab: 1,
    callsoopentab: true,
    udmodule_name: "",
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
  }),
  async mounted() {
    this.userId = localStorage.getItem(server.USER_ID);
    // await api.checkVersion();

    await this.onLoadUdefineIDByCompanyAndModuleName(
      udgroup.PRODUCTION_ORDER,
      localStorage.getItem(server.COMPANYID)
    );
    this.udmodule_name = udgroup.PRODUCTION_ORDER;
    await this.loadAuthorize();
    await this.loadDocRunning();
    await this.loadItemMaster();
    await this.onLoadNewMch();
    this.$hideLoader();
  },
  methods: {
    async changeNewMachine() {
      console.log(
        "this.new_mch_selected",
        JSON.stringify(this.new_mch_selected)
      );
      this.no_of_mch = this.new_mch_selected.length;
    },
    async onLoadNewMch() {
      const res_get = await api.getPONewMachineRoutingTmp(
        localStorage.getItem(server.COMPANYID)
      );
      this.new_mch_list = res_get.data;
      // console.log("this.new_mch_list", JSON.stringify(this.new_mch_list));
    },
    async changeRouting() {
      // console.log("this.select_routing", this.select_routing);
      this.get_routing_to_backup = this.routing_data_list.filter(
        (x) => x.rtg_id == this.select_routing
      );
      // console.log(
      //   "this.get_routing_to_backup",
      //   JSON.stringify(this.get_routing_to_backup)
      // );
    },
    async onClickedPrint(item) {
      console.log("item:", JSON.stringify(item));
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
      //   "this.item_master_list",
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

    async TestSaveData() {
      this.itemadd.doc_module_name = this.select_doc_running;
      this.itemadd.item_master_id = this.item_master_id;
      this.itemadd.rtg_id = this.select_routing;
      this.itemadd.order_date = this.date0;
      this.itemadd.due_date = this.date1;
      this.itemadd.due_time = `${this.tmp_due_time.HH}:${this.tmp_due_time.mm}:00`;

      this.itemadd.company_id = localStorage.getItem(server.COMPANYID);
      this.itemadd.user_create = localStorage.getItem(server.USER_ID);

      console.log("this.itemadd : ", JSON.stringify(this.itemadd));
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
      this.itemadd.line_of_mch = this.line_of_mch;

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

      // console.log(
      //   `this.new_mch_selected: ${JSON.stringify(this.new_mch_selected)}`
      // );

      if (this.new_mch_selected != [] && this.new_mch_selected != null) {
        if (this.new_mch_selected.length > 0) {
          //this.get_routing_to_backup

          this.$showLoader();
          // // check tbl_routing_tmp_new
          // const res_check_routing_tmp_new = await api.getRoutingTmpNewByRtgMainId(
          //   this.get_routing_to_backup[0].id
          // );
          // console.log(
          //   "res_check_routing_tmp_new",
          //   JSON.stringify(res_check_routing_tmp_new.data)
          // );

          // // check tbl_routing_tmp
          // const res_check_routing_tmp = await api.getRoutingTmpById(
          //   this.get_routing_to_backup[0].id
          // );
          // console.log(
          //   "res_check_routing_tmp",
          //   JSON.stringify(res_check_routing_tmp.data)
          // );

          let str_new_mch = "";

          let c = 0;
          for (let item of this.new_mch_selected) {
            if (c == this.new_mch_selected.length - 1) {
              console.log("last item");
              str_new_mch += item.split(":")[0];
            } else {
              console.log("not last item");
              str_new_mch += item.split(":")[0] + ",";
            }
            c++;
          }

          // console.log("str_new_mch", str_new_mch);

          //save tbl_routing_tmp_new
          let body_new_mch = {
            rtg_main_id: this.get_routing_to_backup[0].id,
            no_of_machine: this.no_of_mch,
            new_machine_id: str_new_mch,
            user_create: localStorage.getItem(server.USER_ID),
          };

          // console.log("body_new_mch", JSON.stringify(body_new_mch));
          const res_save_new_mch = await api.saveRoutingTmpNew(body_new_mch);

          // console.log("res_save_new_mch", JSON.stringify(res_save_new_mch.data));

          //save tbl_routing_tmp
          const res_save_mch = await api.saveRoutingTmp(
            this.get_routing_to_backup[0]
          );

          let mrt_body_data = {
            no_of_machine: this.no_of_mch,
            machine_id: str_new_mch,
          };
          console.log(`update Main Routing ให้เป็นใหม่`);
          //update tbl_routing (main) to new machine
          const res_update_routing = await api.updateMainRouting(
            this.get_routing_to_backup[0].id,
            mrt_body_data
          );

          this.$hideLoader();
        }
      }

      console.log("this.itemadd : ", JSON.stringify(this.itemadd));
      // return;
      this.$showLoader();
      const res_add = await api.saveProductionOrderDraft(this.itemadd);
      // this.$hideLoader();
      let link_id = 0;
      // console.log("res_add: ", JSON.stringify(res_add.data));
      if (res_add.data.message == "success") {
        if (this.new_mch_selected != [] && this.new_mch_selected != null) {
          if (this.new_mch_selected.length > 0) {
            let mrt_body_data = {
              no_of_machine: this.get_routing_to_backup[0].no_of_machine,
              machine_id: this.get_routing_to_backup[0].machine_id,
            };
            //update tbl_routing (main) to new machine
            const res_update_routing = await api.updateMainRouting(
              this.get_routing_to_backup[0].id,
              mrt_body_data
            );
            console.log(`update Main Routing กลับให้เป็นตัวเดิม`);

            //delete tbl_routing_tmp_new
            const res_delete_routing_tmp_new = await api.deleteRoutingTmpNew(
              this.get_routing_to_backup[0].id
            );

            //delete tbl_routing_tmp
            const res_delete_routing_tmp = await api.deleteRoutingTmp(
              this.get_routing_to_backup[0].id
            );
          }
        }

        this.items = [];
        this.doc_running = res_add.data.doc_running;
        link_id = res_add.data.id;

        const res_link_data = await api.getAllOrderByOrdID(link_id);
        // console.log("res_link_data: ", JSON.stringify(res_link_data.data[0]));
        let json_str = JSON.stringify(res_link_data.data[0]);
        // console.log("json_str: ", json_str);
        localStorage.setItem(server.WO_EDIT_ITEM, json_str);

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
          this.$store.state.global_dialog_push = true;
          this.setupAlertDialogPush(
            true,
            "Success!!!",
            "Add data success",
            "text-h5 green--text text-center",
            `/production-order-edit/${link_id}`
          );
          // this.$store.state.global_dialog = true;
          // this.setupAlertDialog(
          //   true,
          //   "Success!!!",
          //   "Add data success",
          //   "text-h5 green--text text-center"
          // );
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
    async loadAuthorize() {
      const res_get = await api.getSettingGroupMenu();
      this.authorize = res_get.data;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
  beforeCreate() {
    this.$store.state.navMenu = true;
  },
};
</script>

<style scoped>
.div-iterator {
  border-style: solid;
  border-color: rgb(1, 1, 1);
  border-width: 1px;
  border-radius: 10px;
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
