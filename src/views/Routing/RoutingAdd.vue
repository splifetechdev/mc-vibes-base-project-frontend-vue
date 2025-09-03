<template>
  <v-card-title>
    <v-container class="pa-1" fluid>
      <v-card class="pa-12">
        <v-card-title>
          <v-row>
            <v-col cols="12" md="12" justify="center" class="mt-n6">
              <h3>Routing Add</h3>
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
                  <v-row class="mt-6">
                    <v-col cols="12" sm="12" md="3">
                      <!-- <v-select
                        autofocus
                        required
                        outlined
                        :items="itemmasterlist"
                        v-model="itemadd.item_master_id"
                        item-value="id"
                        :item-text="getgroupnameitemmaster"
                        label="Item ID *"
                        dense
                        @change="changeitemmaster"
                      ></v-select> -->

                      <v-autocomplete
                        v-model="itemadd.item_master_id"
                        :items="itemmasterlist"
                        :search-input.sync="itemIdSearch"
                        item-value="id"
                        :item-text="getgroupnameitemmaster"
                        label="Item ID *"
                        autofocus
                        required
                        outlined
                        dense
                        @change="changeitemmaster"
                      ></v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="12" md="3">
                      <v-text-field
                        background-color="#F5F5F5"
                        disabled
                        v-model="show_itemmaster_name"
                        label="Item Name"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12" md="2">
                      <v-text-field
                        v-model="itemadd.rtg_id"
                        label="RTG ID *"
                        outlined
                        dense
                        @keyup="searchrouting"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12" md="2">
                      <!-- :disabled="!disablepredecessor" -->
                      <v-checkbox
                        class="mt-1"
                        color="blue"
                        v-model="itemadd.std_cost"
                        :label="`STD Cost`"
                        :disabled="checkdefaultstd_cost"
                      ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="12" md="2">
                      <v-text-field
                        type="number"
                        min="0"
                        v-model="itemadd.operation_cost"
                        label="Operation Cost"
                        outlined
                        dense
                        disabled
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-card class="pa-4">
                    <v-row class="mb-n10 mt-6">
                      <v-col cols="12" sm="12" md="2">
                        <v-text-field
                          v-model="itemadd.opn_id"
                          label="OPN ID *"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12" md="5">
                        <v-text-field
                          v-model="itemadd.opn_name"
                          label="OPN Name *"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12" md="5">
                        <v-select
                          required
                          outlined
                          :items="workcenterlist"
                          v-model="itemadd.work_center_id"
                          item-value="id"
                          :item-text="getgroupnameworkcenter"
                          label="Work Center *"
                          dense
                          @change="changworkcentertogetmch"
                        ></v-select>
                      </v-col>
                    </v-row>

                    <v-row class="mb-n10 mt-6">
                      <v-col cols="12" sm="12" md="2">
                        <v-text-field
                          type="number"
                          min="0"
                          v-model="itemadd.no_of_machine"
                          label="No. of Machine *"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12" md="3">
                        <v-autocomplete
                          required
                          outlined
                          :items="machinelist"
                          v-model="datalistmachine_id"
                          item-value="id"
                          :item-text="getgroupnamemachine"
                          label="Machine *"
                          dense
                          chips
                          small-chips
                          multiple
                        ></v-autocomplete>
                      </v-col>

                      <v-col cols="12" sm="12" md="2">
                        <v-select
                          required
                          outlined
                          :items="unitlist"
                          v-model="itemadd.unit_id"
                          item-value="id"
                          :item-text="getgroupnameunit"
                          label="Operation UM *"
                          dense
                          @change="changeunitname"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="12" md="3">
                        <v-select
                          required
                          outlined
                          :items="datarouting"
                          v-model="itemadd.predecessor"
                          item-value="id"
                          :item-text="getnamerouting"
                          label="Predecessor"
                          dense
                          :disabled="disablepredecessor"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="12" md="2">
                        <v-select
                          required
                          outlined
                          :items="dependencylist"
                          v-model="itemadd.dependency"
                          item-value="id"
                          item-text="name"
                          label="Dependency"
                          dense
                          @change="changeunitname"
                        ></v-select>
                      </v-col>
                    </v-row>

                    <v-row class="mb-n10 mt-6">
                      <v-col cols="12" sm="12" md="2">
                        <v-text-field
                          type="number"
                          min="0"
                          v-model="itemadd.setup_time"
                          label="Set up Time"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="2">
                        <v-row>
                          <v-col cols="12" sm="12" md="4">
                            <h4 class="ml-md-n4">Hr./</h4>
                          </v-col>
                          <v-col cols="12" sm="12" md="8">
                            <v-select
                              class="ml-md-n10"
                              required
                              outlined
                              :items="setuptimelist"
                              v-model="itemadd.setup_timehr_per"
                              item-value="id"
                              item-text="name"
                              label=""
                              dense
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col cols="12" sm="12" md="3">
                        <v-text-field
                          type="number"
                          min="0"
                          v-model="itemadd.eoq"
                          label="EOQ"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="1">
                        <h4 class="ml-n4">{{ showunitname }}</h4>
                      </v-col>

                      <v-col cols="12" sm="12" md="3">
                        <v-text-field
                          type="number"
                          min="0"
                          v-model="itemadd.pcs_hr"
                          label="PCS/HR"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="1"> </v-col>
                    </v-row>

                    <v-row class="mb-n10 mt-6">
                      <v-col cols="12" sm="12" md="3">
                        <v-text-field
                          type="number"
                          min="0"
                          v-model="itemadd.qty_per"
                          label="QTY PER"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="1"> </v-col>

                      <v-col cols="12" sm="12" md="3">
                        <v-text-field
                          type="number"
                          min="0"
                          v-model="itemadd.qty_by"
                          label="QTY BY"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="1"> </v-col>

                      <v-col cols="12" sm="12" md="3">
                        <v-text-field
                          type="number"
                          min="0"
                          v-model="itemadd.scrap"
                          label="SCRAP"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="1">
                        <h4 class="ml-n4">%</h4>
                      </v-col>
                    </v-row>

                    <v-row class="mb-n10 mt-6">
                      <v-col cols="12" sm="12" md="2">
                        <v-text-field
                          type="number"
                          min="0"
                          v-model="itemadd.batch"
                          label="BATCH"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="1">
                        <h4 class="ml-n4">{{ showunitname }}</h4>
                      </v-col>

                      <v-col cols="12" sm="12" md="2">
                        <v-text-field
                          type="number"
                          min="0"
                          v-model="itemadd.over_lap_time"
                          label="OVER LAP TIME"
                          outlined
                          dense
                          :disabled="disableoverlaptime"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="1">
                        <h4 class="ml-n4">Hr.</h4>
                      </v-col>

                      <v-col cols="12" sm="12" md="2">
                        <v-text-field
                          type="number"
                          min="0"
                          v-model="itemadd.over_lap_unit"
                          label="OVER LAP UNIT"
                          outlined
                          dense
                          :disabled="disableoverlapunit"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="1">
                        <h4 class="ml-n4">{{ showunitname }}</h4>
                      </v-col>

                      <v-col cols="12" sm="12" md="3">
                        <v-text-field
                          type="number"
                          min="0"
                          v-model="itemadd.iot_um_conv"
                          label="Convert pick to m. *"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-card-actions>
                      <v-row justify="center" class="mt-3">
                        <v-btn
                          depressed
                          width="100"
                          class="mr-3  buttonblue"
                          @click="savedatadialog()"
                        >
                          Submit
                        </v-btn>

                        <v-btn
                          depressed
                          width="120"
                          class="mr-3  buttonred"
                          @click="cleardata()"
                        >
                          Clear Data
                        </v-btn>

                        <v-btn
                          depressed
                          outlined
                          width="100"
                          @click="$router.back()"
                        >
                          Cancel
                        </v-btn>
                      </v-row>
                    </v-card-actions>
                  </v-card>

                  <div class="pa-4"></div>

                  <v-data-table
                    v-if="datarouting.length > 0"
                    :headers="headers"
                    :items="datarouting"
                    :search="search"
                    sort-by="fullname"
                    class="elevation-1"
                    :footer-props="{
                      showFirstLastPage: true,
                      firstIcon: 'mdi-arrow-collapse-left',
                      lastIcon: 'mdi-arrow-collapse-right',
                      prevIcon: 'mdi-minus',
                      nextIcon: 'mdi-plus',
                    }"
                  >
                    <template v-slot:[`item.opn_id`]="{ item }">
                      <a
                        @click="toformeditdata(item)"
                        class="text-decoration-underline"
                        >{{ item.opn_id }}</a
                      >
                    </template>

                    <template v-slot:[`item.opn_name`]="{ item }">
                      <a
                        @click="toformeditdata(item)"
                        class="text-decoration-underline"
                        >{{ item.opn_name }}</a
                      >
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                      <v-icon
                        small
                        @click="deleteItem(item)"
                        :style="{
                          backgroundColor: '#FFEBEE',
                          color: '#F44336',
                        }"
                      >
                        mdi-delete
                      </v-icon>
                    </template>
                  </v-data-table>
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
          </v-col>
        </v-row>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

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

        <v-dialog v-model="dialogSavedata" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Confirm change STD Cost to RTG ID
              {{ itemadd.rtg_id }}?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDialogSavedata"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="savedata">OK</v-btn>
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

import { server, udgroup } from "@/services/constants";
export default {
  components: {
    SuccessDialog,
    SuccessDialogPush,
    UDefine,
  },
  computed: {
    computedDateFormatted() {
      return this.formatDaparseDatete(this.date);
    },
  },

  watch: {
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
    checkdefaultstd_cost: false,
    dialogSavedata: false,
    disablepredecessor: false,
    disableoverlaptime: false,
    disableoverlapunit: false,
    tab: null,
    itemadd: {
      rtg_id: "",
      company_id: localStorage.getItem(server.COMPANYID),
      item_master_id: 0,
      opn_id: "",
      opn_name: "",
      work_center_id: 0,
      no_of_machine: "",
      machine_id: "",
      unit_id: 0,
      predecessor: 0,
      dependency: "FS",
      setup_time: 0,
      setup_timehr_per: "O",
      eoq: null,
      pcs_hr: null,
      qty_per: 1,
      qty_by: 1,
      scrap: null,
      batch: 0,
      over_lap_time: null,
      over_lap_unit: null,
      iot_um_conv:1,
      std_cost: false,
      std_dl: 0,
      std_foh: 0,
      std_voh: 0,
      std_setup_time_pc: 0,
      operation_cost: 0,
      user_create: localStorage.getItem(server.USER_ID),
      user_update: 0,
    },
    defaultitemadd: {
      rtg_id: "",
      company_id: localStorage.getItem(server.COMPANYID),
      item_master_id: 0,
      opn_id: "",
      opn_name: "",
      work_center_id: 0,
      no_of_machine: "",
      machine_id: "",
      unit_id: 0,
      predecessor: 0,
      dependency: "FS",
      setup_time: 0,
      setup_timehr_per: "O",
      eoq: null,
      pcs_hr: null,
      qty_per: 1,
      qty_by: 1,
      scrap: null,
      batch: 0,
      over_lap_time: null,
      over_lap_unit: null,
      iot_um_conv:1,
      std_cost: false,
      std_dl: 0,
      std_foh: 0,
      std_voh: 0,
      std_setup_time_pc: 0,
      operation_cost: 0,
      user_create: localStorage.getItem(server.USER_ID),
      user_update: 0,
    },
    datalistmachine_id: "",
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
    defaultitemaddudefine: {
      module_master_id: 0,
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
      { text: "OPN ID", value: "opn_id" },
      { text: "Name", value: "opn_name", width: "10%" },
      { text: "PD", value: "pdinfo", width: "7%" },
      { text: "Work Center", value: "wc_name" },
      { text: "No.of MCH", value: "no_of_machine" },
      { text: "MCH", value: "machine_name" },
      { text: "SUHR", value: "setup_time" },
      { text: "EOQ", value: "eoq" },
      { text: "P/Hr", value: "pcs_hr" },
      { text: "Qty Per", value: "qty_per" },
      { text: "Qty By", value: "qty_by" },
      { text: "Scrap", value: "scrap" },
      { text: "Batch", value: "batch" },
      { text: "OverLap Time", value: "over_lap_time" },
      { text: "OverLap Unit", value: "over_lap_unit" },
      { text: "Convert pick to m.", value: "iot_um_conv" },
      { text: "action", value: "actions" },
    ],
    datarouting: [],
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
    itemmasterlist: [],
    workcenterlist: [],
    machinelist: [],
    unitlist: [],
    show_itemmaster_name: "",
    showunitname: "",
    setuptimelist: [
      { id: "B", name: "B" },
      { id: "O", name: "O" },
      { id: "Q", name: "Q" },
    ],
    delete_item_id: 0,
    dialogDelete: false,
    modedata: "add",
    ideditmode: 0,
    dependencylist: [
      { id: "FS", name: "FS" },
      { id: "SS", name: "SS" },
      { id: "FF", name: "FF" },
    ],
  }),
  async mounted() {
    this.userId = localStorage.getItem(server.USER_ID);
    // await api.checkVersion();
    await this.loadAccounts();
    await this.loadCompanyMaster(localStorage.getItem(server.COMPANYID));
    await this.loadItemMaste(localStorage.getItem(server.COMPANYID));
    await this.loadWorkCenter(localStorage.getItem(server.COMPANYID));
    // await this.loadMachine(localStorage.getItem(server.COMPANYID));
    await this.loadUnit(localStorage.getItem(server.COMPANYID));
    await this.onLoadUdefineIDByCompanyAndModuleName(
      udgroup.ROUTING,
      localStorage.getItem(server.COMPANYID)
    );
    this.udmodule_name = udgroup.ROUTING;

    await this.loadAuthorize();
    this.$hideLoader();
  },
  methods: {
    async loadItemMaste(id) {
      const result = await api.getItemMasterByCompanyID(id);
      this.itemmasterlist = result.data;
    },
    async loadWorkCenter(id) {
      const result = await api.getWorkCenterCompanyID(id);
      this.workcenterlist = result.data;
    },
    async loadMachine(id) {
      const result = await api.listMachineByCompany(id);
      this.machinelist = result.data;
    },
    async loadUnit(id) {
      const result = await api.getUnitByCompanyID(id);
      this.unitlist = result.data;
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

    async changeitemmaster(itemid) {
      this.itemmasterlist.filter((x) => {
        if (x.id == itemid) {
          this.show_itemmaster_name = x.item_name;
          this.itemadd.unit_id = x.unit_id;
        }
      });

      await this.searchrouting();
    },

    async changeunitname(unitid) {
      this.unitlist.filter((x) => {
        if (x.id == unitid) {
          this.showunitname = x.unit_name;
        }
      });
    },

    async changworkcentertogetmch(work_center_id) {
      const result = await api.listMachineByWorkcenterID(work_center_id);
      this.datalistmachine_id = "";
      this.machinelist = result.data;
    },

    async searchrouting() {
      this.datarouting = [];
      this.modedata = "add";
      this.ideditmode = 0;
      this.itemaddudefine = Object.assign({}, this.defaultitemaddudefine);
      this.itemaddudefine.u_define_module_id = this.main_u_define_module_id;

      if (this.itemadd.item_master_id && this.itemadd.rtg_id) {
        const result = await api.getRoutingSearchByitem_rtg({
          item_master_id: this.itemadd.item_master_id,
          rtg_id: this.itemadd.rtg_id,
          company_id: this.itemadd.company_id,
          u_define_module_id: this.main_u_define_module_id,
        });

        if (result.data.length > 0) {
          this.datarouting = result.data.map((machineData) => ({
            ...machineData?.company,
            ...machineData?.item_master,
            ...machineData?.tbl_work_center,
            ...machineData,
          }));
          this.itemadd.predecessor = this.datarouting[
            this.datarouting.length - 1
          ].id;
          this.disablepredecessor = false;
          this.disableoverlaptime = false;
          this.disableoverlapunit = false;
          this.itemadd.std_cost = this.datarouting[
            this.datarouting.length - 1
          ].std_cost;
          this.checkdefaultstd_cost = this.datarouting[
            this.datarouting.length - 1
          ].std_cost;
          this.itemadd.operation_cost = this.datarouting[
            this.datarouting.length - 1
          ].operation_cost;
          // this.itemadd.std_cost = false;
        } else {
          const resultitemhavecost = await api.getRoutingItemhavestdCost(
            this.itemadd.item_master_id,
            this.itemadd.company_id,
          );
          if (resultitemhavecost.data.length > 0) {
            this.itemadd.std_cost = false;
            this.checkdefaultstd_cost = false;
          } else {
            this.itemadd.std_cost = true;
            this.checkdefaultstd_cost = true;
          }

          this.itemadd.predecessor = 0;
          this.itemadd.opn_id = "";
          this.itemadd.opn_name = "";
          this.itemadd.work_center_id = 0;
          this.itemadd.no_of_machine = "";
          this.itemadd.machine_id = "";
          this.itemadd.unit_id = 0;
          this.itemadd.predecessor = 0;
          this.itemadd.dependency = "FS";
          this.itemadd.setup_time = 0;
          this.itemadd.setup_timehr_per = "O";
          this.itemadd.eoq = null;
          this.itemadd.pcs_hr = null;
          this.itemadd.qty_per = 1;
          this.itemadd.qty_by = 1;
          this.itemadd.scrap = null;
          this.itemadd.batch = 0;
          this.itemadd.over_lap_time = null;
          this.itemadd.over_lap_unit = null;
          this.itemadd.iot_um_conv = 1;
          

          this.datalistmachine_id = "";

          this.disablepredecessor = true;
          this.disableoverlaptime = true;
          this.disableoverlapunit = true;
        }
      }
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
    async deleteItemConfirm() {
      const res_del = await api.DeleteRouting(
        this.delete_item_id,
        this.main_u_define_module_id
      );
      if (res_del.status == 200) {
        this.delete_item_id = 0;
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Delete data success",
          "text-h5 green--text text-center"
        );
        await this.searchrouting();
        // this.initialize();
      } else {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Delete data Failed",
          "text-h5 red--text text-center"
        );
      }
      this.closeDelete();
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
    async closeDialogSavedata() {
      this.dialogSavedata = false;
    },
    async savedatadialog() {
      let parsemachine_id = "";
      if (
        this.itemadd.item_master_id == "" ||
        this.itemadd.item_master_id == 0
      ) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Master ID",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.rtg_id.trim() == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter RTG ID",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.opn_id == "" || this.itemadd.opn_id == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter OPN ID",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.opn_name == "" || this.itemadd.opn_name == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter OPN Name",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (
        this.itemadd.work_center_id == "" ||
        this.itemadd.work_center_id == 0
      ) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Work Center",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.no_of_machine == "" || this.itemadd.no_of_machine == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter No. of Machine",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.unit_id == "" || this.itemadd.unit_id == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Operation UM",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.pcs_hr == null|| this.itemadd.pcs_hr == 0 || this.itemadd.pcs_hr == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter PCS/HR",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (
        this.itemadd.setup_timehr_per == "O" ||
        this.itemadd.setup_timehr_per == "Q"
      ) {
        if (
          this.itemadd.eoq == "" ||
          this.itemadd.eoq == 0 ||
          this.itemadd.eoq == null
        ) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Please enter EOQ",
            "text-h5 red--text text-center"
          );
          return;
        }
      }

      if (this.itemadd.setup_timehr_per == "B") {
        if (
          this.itemadd.batch == "" ||
          this.itemadd.batch == 0 ||
          this.itemadd.batch == null
        ) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Please enter Batch",
            "text-h5 red--text text-center"
          );
          return;
        }
      }

      if (this.itemadd.over_lap_time && this.itemadd.over_lap_unit) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Cannot enter data OVER LAP TIME and OVER LAP UNIT at the same time.",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.iot_um_conv == null || this.itemadd.iot_um_conv == "" || this.itemadd.iot_um_conv == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
         "Please enter Convert pick to m.",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.datalistmachine_id != "") {
        this.datalistmachine_id.forEach((x, index) => {
          if (index == 0) {
            parsemachine_id += `${x}`;
          } else {
            parsemachine_id += `,${x}`;
          }
          this.itemadd.machine_id = parsemachine_id;
        });
      }else{
        this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Please enter Machine",
            "text-h5 red--text text-center"
          );
          return;
      }

      if (this.itemadd.std_cost) {
        this.dialogSavedata = true;
      } else {
        this.savedata();
      }
    },
    async savedata() {
      this.dialogSavedata = false;

      let dataworkcenter = this.workcenterlist.find(
        (item) => item.id == this.itemadd.work_center_id
      );

      this.itemadd.eoq = this.itemadd.eoq ? this.itemadd.eoq : null;
      this.itemadd.pcs_hr = this.itemadd.pcs_hr ? this.itemadd.pcs_hr : null;
      this.itemadd.scrap = this.itemadd.scrap ? this.itemadd.scrap : null;
      this.itemadd.over_lap_time = this.itemadd.over_lap_time
        ? this.itemadd.over_lap_time
        : null;
      this.itemadd.over_lap_unit = this.itemadd.over_lap_unit
        ? this.itemadd.over_lap_unit
        : null;
      this.itemadd.std_dl = dataworkcenter.labor_rate / this.itemadd.pcs_hr;
      this.itemadd.std_foh = dataworkcenter.foh_rate / this.itemadd.pcs_hr;
      this.itemadd.std_voh = dataworkcenter.voh_rate / this.itemadd.pcs_hr;
      if (
        this.itemadd.setup_timehr_per == "O" ||
        this.itemadd.setup_timehr_per == "Q"
      ) {
        this.itemadd.std_setup_time_pc =
          dataworkcenter.labor_rate /
          (this.itemadd.eoq / this.itemadd.setup_time);
      } else {
        this.itemadd.std_setup_time_pc =
          dataworkcenter.labor_rate /
          (this.itemadd.batch / this.itemadd.setup_time);
      }
      this.itemadd.operation_cost =
        this.itemadd.std_dl +
        this.itemadd.std_foh +
        this.itemadd.std_voh +
        this.itemadd.std_setup_time_pc;
      // this.$showLoader();
      // let formData = new FormData();
      // formData.append("emp_id", this.itemadd.emp_id);
      // formData.append("image", this.itemadd.image);
      // formData.append("emp_i_d", this.itemadd.emp_i_d);
      // formData.append("user_role", this.itemadd.user_role);

      // Insert
      if (this.modedata == "edit" && this.ideditmode != 0) {
        const res_add = await api.updateRouting(this.ideditmode, this.itemadd);
        if (res_add.status == 200 || res_add.status == 201) {
          this.$hideLoader();
          this.itemaddudefine.module_master_id = res_add.data.id;
          this.itemaddudefine.date1 = this.parseDate(this.itemaddudefine.date1);
          this.itemaddudefine.date2 = this.parseDate(this.itemaddudefine.date2);
          const res_addudefine = await api.updateByModuleMasterIdANDUdefineModuleId(
            this.ideditmode,
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
              `/routing-edit/${this.itemadd.rtg_id}/${this.itemadd.item_master_id}`
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
            "Edit data Duplicate",
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
      } else {
        const res_add = await api.addRouting(this.itemadd);
        if (res_add.status == 200 || res_add.status == 201) {
          this.$hideLoader();
          this.itemaddudefine.module_master_id = res_add.data.id;
          this.itemaddudefine.date1 = this.parseDate(this.itemaddudefine.date1);
          this.itemaddudefine.date2 = this.parseDate(this.itemaddudefine.date2);
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
              `/routing-edit/${this.itemadd.rtg_id}/${this.itemadd.item_master_id}`
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
            "Add data Duplicate",
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
      }
    },

    async cleardata() {
      this.itemadd = Object.assign({}, this.defaultitemadd);
      this.itemaddudefine = Object.assign({}, this.defaultitemaddudefine);
      this.itemaddudefine.u_define_module_id = this.main_u_define_module_id;
      this.datarouting = [];
      this.modedata = "add";
      this.ideditmode = 0;
      this.showunitname = "";
      this.show_itemmaster_name = "";
      this.datalistmachine_id = "";
    },
    async toformeditdata(item) {
      this.itemadd = Object.assign({}, this.defaultitemadd);
      this.itemadd = item;

      // this.itemadd.item_master_id= item.item_master_id;
      // this.itemadd.rtg_id= item.rtg_id;
      this.itemadd.opn_id = item.opn_id;
      this.itemadd.opn_name = item.opn_name;
      this.itemadd.work_center_id = item.work_center_id;
      await this.changworkcentertogetmch(this.itemadd.work_center_id);
      this.itemadd.no_of_machine = item.no_of_machine;
      this.datalistmachine_id = item.machine_id.split(",");
      if (this.datalistmachine_id.length > 0 && this.datalistmachine_id[0]) {
        this.datalistmachine_id.forEach((x, index) => {
          this.datalistmachine_id[index] = parseInt(x);
        });
      } else {
        this.datalistmachine_id = "";
      }

      if (
        this.itemadd.predecessor == 0 &&
        !this.itemadd.over_lap_time &&
        !this.itemadd.over_lap_unit
      ) {
        this.disablepredecessor = true;
        this.disableoverlaptime = true;
        this.disableoverlapunit = true;
      } else {
        this.disablepredecessor = false;
        this.disableoverlaptime = false;
        this.disableoverlapunit = false;
      }

      // this.itemadd.machine_id= item.machine_id;
      this.itemadd.unit_id = item.unit_id;
      this.itemadd.predecessor = Number(item.predecessor);
      this.itemadd.dependency = item.dependency;
      if (this.itemadd.unit_id) {
        this.changeunitname(this.itemadd.unit_id);
      }
      this.itemadd.setup_time = item.setup_time;
      this.itemadd.setup_timehr_per = item.setup_timehr_per;
      this.itemadd.eoq = item.eoq;
      this.itemadd.pcs_hr = item.pcs_hr;
      this.itemadd.qty_per = item.qty_per;
      this.itemadd.qty_by = item.qty_by;
      this.itemadd.scrap = item.scrap;
      this.itemadd.batch = item.batch;
      this.itemadd.over_lap_time = item.over_lap_time;
      this.itemadd.over_lap_unit = item.over_lap_unit;
      this.itemadd.iot_um_conv = item.iot_um_conv;

      if (item.u_define_master) {
        this.itemaddudefine.numeric1 = item.u_define_master.numeric1
          ? item.u_define_master.numeric1
          : "";
        this.itemaddudefine.numeric2 = item.u_define_master.numeric2
          ? item.u_define_master.numeric2
          : "";
        this.itemaddudefine.date1 = item.u_define_master.date1
          ? this.formatDate(item.u_define_master.date1)
          : "";
        this.itemaddudefine.date2 = item.u_define_master.date2
          ? this.formatDate(item.u_define_master.date2)
          : "";
        this.itemaddudefine.boolean1 =
          item.u_define_master.boolean1 == true ? 1 : 0;
        this.itemaddudefine.boolean2 =
          item.u_define_master.boolean2 == true ? 1 : 0;
        this.itemaddudefine.char1 = item.u_define_master.char1
          ? item.u_define_master.char1
          : "";
        this.itemaddudefine.char2 = item.u_define_master.char2
          ? item.u_define_master.char2
          : "";
        this.itemaddudefine.text1 = item.u_define_master.text1
          ? item.u_define_master.text1
          : "";
        this.itemaddudefine.text2 = item.u_define_master.text2
          ? item.u_define_master.text2
          : "";
      } else {
        this.itemaddudefine = Object.assign({}, this.defaultitemaddudefine);
        this.itemaddudefine.u_define_module_id = this.main_u_define_module_id;
      }

      this.modedata = "edit";
      this.ideditmode = item.id;
    },
    deleteItem(item) {
      this.delete_item_id = item.id;
      this.dialogDelete = true;
    },
    closeDelete() {
      this.delete_item_id = 0;
      this.dialogDelete = false;
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
      // this.$hideLoader();
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
        // this.initial_dataimage = baseimagetosignature;

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
    getgroupnameitemmaster(item) {
      return `${item.item_id}`;
    },
    getgroupnameworkcenter(item) {
      return `${item.wc_id}:${item.wc_name}`;
    },
    getgroupnamemachine(item) {
      return `${item.machine_id}:${item.name}`;
    },
    getgroupnameunit(item) {
      return `${item.unit_name}`;
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
    getnamerouting(item) {
      return `${item.opn_id}:${item.opn_name}`;
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

.v-application a {
  color: #1f51ff;
}
</style>
