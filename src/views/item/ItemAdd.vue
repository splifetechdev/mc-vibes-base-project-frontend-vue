<template>
  <v-card-title>
    <v-container class="pa-1" fluid>
      <v-card class="pa-12">
        <v-card-title>
          <v-row>
            <v-col cols="12" md="12" justify="center" class="mt-n6">
              <h3>Item Add</h3>
            </v-col>
          </v-row>
        </v-card-title>
        <v-row>
          <v-col cols="12" md="12" justify="center">
            <div id="tabs" class="containertab">
              <div class="tabs">
                <div v-on:click="activetab = 1" v-bind:class="[activetab === 1 ? 'active' : '']">General</div>
                <div class="ml-1" v-on:click="activetab = 2" v-bind:class="[activetab === 2 ? 'active' : '']">Price</div>
                <div class="ml-1" v-on:click="activetab = 3" v-bind:class="[activetab === 3 ? 'active' : '']">U-define
                </div>
              </div>

              <div class="content">
                <div v-if="activetab === 1 && callsoopentab == true" class="tabcontent">
                  <v-row>
                    <v-col cols="12" sm="12" md="8">
                      <v-row class="mb-n6">
                    <v-col cols="12" sm="12" md="6">
                      <v-select autofocus required outlined :items="itemgrouplist" v-model="itemadd.item_group_id"
                        item-value="id" :item-text="getgroupname" label="Item Group ID" dense></v-select>
                    </v-col>

                    <v-col cols="12" sm="12" md="6">
                      <v-select required outlined :items="itemtypelist" v-model="itemadd.item_type" item-value="id"
                        :item-text="getgroupnameitemtype" label="Item Type" dense></v-select>
                    </v-col>
                  </v-row>

                  <v-row class="mb-n6">
                    <v-col cols="12" sm="12" md="3">
                      <v-text-field v-model="itemadd.item_id" label="Item ID" outlined dense></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                      <v-text-field v-model="itemadd.item_name" label="Item Name" outlined dense></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="3">
                      <v-select required outlined :items="unitgrouplist" v-model="itemadd.unit_id" item-value="id"
                        item-text="unit_name" label="Unit" dense></v-select>
                    </v-col>
                  </v-row>

                  <v-row class="mb-n6">
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="itemadd.alias_name" label="Alias Name" outlined dense></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="6">
                      <v-select required outlined :items="dimgrouplist" v-model="itemadd.dim_group_id" item-value="id"
                        :item-text="getgroupnamedimgroup" label="Dim Group" dense></v-select>
                    </v-col>

                    <v-col cols="12" sm="12" md="6">
                      <v-select required outlined :items="modelgrouplist" v-model="itemadd.model_group_id" item-value="id"
                        :item-text="getgroupnamemodelgroup" label="Model Group" dense></v-select>
                    </v-col>
                  </v-row>

                  </v-col>
               
                  <v-col cols="12" sm="12" md="4" class="div222">
                    <v-row >
                <v-col cols="12" sm="12" md="12">
                  <v-select
                    v-validate="'required'"
                    :items="warehouseAll"
                    label="Warehouse"
                    item-text="fwh_name"
                    item-value="id"
                    v-model="itemadd.wh_id"
                    outlined
                    required
                    dense
                    v-on:change="loadLocationByWH"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-select
                    v-validate="'required'"
                    :items="locationList"
                    label="Location"
                    item-text="flc_name"
                    item-value="id"
                    v-model="itemadd.lc_id"
                    outlined
                    required
                    dense
                     v-on:change="loadSheftByLocation"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-select
                  label="Shelf"
                  v-model="itemadd.sheft_id"
                  outlined
                  dense
                  :items="sheftList"
                  item-text="fsf_name"
                  item-value="id"
                ></v-select>
                </v-col>
              </v-row>
              
                  </v-col>
                  </v-row>


                  

                 
                </div>
                <div v-if="activetab === 2" class="tabcontent">
                  <v-row>
                    <v-col cols="12" sm="12" md="4">
                      <v-row>
                        <h3 class="black--text">Last Purchase Price</h3>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="12" md="10">
                          <v-text-field type="number" v-model="itemadd.last_purchase_price" label="Price" outlined
                            dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="12" md="10">
                          <v-menu v-model="menu1" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" offset-y max-width="290px" min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field clearable @click:clear="
                                $nextTick(() => {
                                  itemadd.last_purchase_price_date = '';
                                  last_purchase_price_date = '';
                                })
                                " v-model="itemadd.last_purchase_price_date" persistent-hint @keydown.enter="
    last_purchase_price_date = parseDate(itemadd.last_purchase_price_date)
    " @blur="
    last_purchase_price_date = parseDate(itemadd.last_purchase_price_date)
    " append-icon="mdi-calendar" label="Date of Price" v-bind="attrs" v-on="on" outlined
                                dense></v-text-field>
                            </template>

                            <v-date-picker v-model="last_purchase_price_date" @input="menu1 = false"></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col cols="12" sm="12" md="4">
                      <v-row>
                        <h3 class="black--text">Cost Price</h3>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="12" md="10">
                          <v-text-field type="number" v-model="itemadd.cost_price" label="Price" outlined
                            dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="12" md="10">
                          <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" offset-y max-width="290px" min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field clearable @click:clear="
                                $nextTick(() => {
                                  itemadd.cost_price_date = '';
                                  cost_price_date = '';
                                })
                                " v-model="itemadd.cost_price_date" persistent-hint @keydown.enter="
    cost_price_date = parseDate(itemadd.cost_price_date)
    " @blur="
    cost_price_date = parseDate(itemadd.cost_price_date)
    " append-icon="mdi-calendar" label="Date of Price" v-bind="attrs" v-on="on" outlined
                                dense></v-text-field>
                            </template>

                            <v-date-picker v-model="cost_price_date" @input="menu2 = false"></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" md="4">
                      <v-row>
                        <h3 class="black--text">Sales Price</h3>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="12" md="10">
                          <v-text-field type="number" v-model="itemadd.sales_price" label="Price" outlined
                            dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="12" md="10">
                          <v-menu v-model="menu3" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" offset-y max-width="290px" min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field clearable @click:clear="
                                $nextTick(() => {
                                  itemadd.sales_price_date = '';
                                  sales_price_date = '';
                                })
                                " v-model="itemadd.sales_price_date" persistent-hint @keydown.enter="
    sales_price_date = parseDate(itemadd.sales_price_date)
    " @blur="
    sales_price_date = parseDate(itemadd.sales_price_date)
    " append-icon="mdi-calendar" label="Date of Price" v-bind="attrs" v-on="on" outlined
                                dense></v-text-field>
                            </template>

                            <v-date-picker v-model="sales_price_date" @input="menu3 = false"></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="2">
                        <v-text-field type="number" min="0" v-model="itemadd.raw_material" label="Raw Material" outlined
                          dense></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="2">
                        <v-text-field type="number" min="0" v-model="itemadd.std_dl" label="STD DL" outlined
                          dense></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="2">
                        <v-text-field type="number" min="0" v-model="itemadd.std_foh" label="STD FOH" outlined
                          dense></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="2">
                        <v-text-field type="number" min="0" v-model="itemadd.std_voh" label="STD VOH" outlined
                          dense></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="2">
                        <v-text-field type="number" min="0" v-model="itemadd.std_setup_time_pc" label="Setup" outlined
                          dense></v-text-field>
                      </v-col>
                  </v-row>
                </div>
                <div v-if="activetab === 3" class="tabcontent">
                  <UDefine :udmodulename="udmodule_name" :dataudefine="itemaddudefine" @dataOnUdefine="getdataOnUdefine">
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
            <v-btn depressed width="100" class="mr-3  buttonblue" @click="savedata()">
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
              Preview Image</v-card-title>

            <v-img disabled :src="previewimage" class="grey lighten-2 mt-3 mb-5" aspect-ratio="1" contain>
            </v-img>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closepreviewimage">Cancel</v-btn>

              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDeleteimage" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this image?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDeleteimage">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirmimage">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <SuccessDialog :status="dialogAdd" :text_color="text_color" :title="title" :message="message" />
        <SuccessDialogPush :status="dialogAdd" :text_color="text_color" :title="title" :message="message" :link="link" />
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
      this.itemadd.last_purchase_price_date = this.formatDate(this.last_purchase_price_date);
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
    warehouseAll: [],
    locationList: [],
    sheftList:[],
    tab: null,
    itemadd: {
      item_group_id: 0,
      item_type: 0,
      item_id: "",
      item_name: "",
      unit_id: 0,
      alias_name: "",
      wh_id:0,
      lc_id:0,
      sheft_id:0,
      dim_group_id: 0,
      model_group_id: 0,
      last_purchase_price: "",
      last_purchase_price_date: "",
      cost_price: "",
      cost_price_date: "",
      sales_price: "",
      sales_price_date: "",
      raw_material:0,
      std_dl:0,
      std_foh:0,
      std_voh:0,
      std_setup_time_pc:0,
      company_id: localStorage.getItem(server.COMPANYID),
      user_create: localStorage.getItem(server.USER_ID),
    },
    last_purchase_price_date: "",
    cost_price_date: "",
    sales_price_date: "",

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
    await this.onLoadUdefineIDByCompanyAndModuleName(udgroup.ITEM, localStorage.getItem(server.COMPANYID));
    await this.loadWarehouse();
    this.udmodule_name = udgroup.ITEM;

    await this.loadAuthorize();
    this.$hideLoader();
  },
  methods: {
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
    previewImage: function (event) {
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

      if (this.itemadd.item_group_id == "" || this.itemadd.item_group_id == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Item Group ID",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.item_type == "" || this.itemadd.item_type == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Item Type",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.item_id == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Item ID",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.item_name == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Item Name",
          "text-h5 red--text text-center"
        );
        return;
      }


      if (this.itemadd.unit_id == "" || this.itemadd.unit_id == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Unit ID",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.alias_name == "" || this.itemadd.alias_name == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Alias Name",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.dim_group_id == "" || this.itemadd.dim_group_id == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Dim Group",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.model_group_id == "" || this.itemadd.model_group_id == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Model Group",
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
      this.itemadd.last_purchase_price_date = this.parseDate(this.itemadd.last_purchase_price_date);
      this.itemadd.cost_price_date = this.parseDate(this.itemadd.cost_price_date);
      this.itemadd.sales_price_date = this.parseDate(this.itemadd.sales_price_date);


      const res_add = await api.addItemMaster(this.itemadd);
      if (res_add.status == 200) {
        this.$hideLoader();
        this.itemaddudefine.module_master_id = res_add.data.id;
        this.itemaddudefine.date1 = this.parseDate(this.itemaddudefine.date1)
        this.itemaddudefine.date2 = this.parseDate(this.itemaddudefine.date2)
        const res_addudefine = await api.addu_define_master(this.itemaddudefine);

        if (res_addudefine.status == 200) {
          this.$hideLoader();
          this.$store.state.global_dialog_push = true;
          this.setupAlertDialogPush(
            true,
            "Success!!!",
            "Add data success",
            "text-h5 green--text text-center",
            "/item-master"
          );
          return;
        } else {
          this.itemaddudefine.date1 = this.formatDate(this.itemaddudefine.date1);
          this.itemaddudefine.date2 = this.formatDate(this.itemaddudefine.date2);
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
      }
      else {
        this.itemadd.last_purchase_price_date = this.formatDate(this.itemaddudefine.last_purchase_price_date);
        this.itemadd.cost_price_date = this.formatDate(this.itemaddudefine.cost_price_date);
        this.itemadd.sales_price_date = this.formatDate(this.itemaddudefine.sales_price_date);
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
    async loadWarehouse(id) {
      const result = await api.getAllWarehouse();
      this.warehouseAll = result.data;
    },
    async loadLocationByWH() {
      const result = await api.getLocationMaster(this.itemadd.wh_id);
      this.itemadd.lc_id = 0;
      this.itemadd.sheft_id = 0;
      this.locationList = result.data;
    },
    async loadSheftByLocation() {
      const result = await api.getSheftMaster(this.itemadd.lc_id);
      this.itemadd.sheft_id = 0;
      this.sheftList = result.data;
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
      return `${item.group_item}:${item.group_name}`;
    },
    getgroupnameitemtype(item) {
      return `${item.item_type}:${item.type_name}`;
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
  background-color: #1F51FF;
  color: white;
}

.v-btn:not(.v-btn--round).v-size--default.buttonred {
  width: 100%;
  background-color: #9e3b1b;
  color: white;
}

.v-tab.v-tab--active {
  background-color: #1F51FF;
  color: white;
}

.v-slide-group__content {
  border: solid;
}

.theme--light.v-tabs>.v-tabs-bar .v-tab:not(.v-tab--active),
.theme--light.v-tabs>.v-tabs-bar .v-tab:not(.v-tab--active)>.v-icon,
.theme--light.v-tabs>.v-tabs-bar .v-tab:not(.v-tab--active)>.v-btn,
.theme--light.v-tabs>.v-tabs-bar .v-tab--disabled {
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
  background-color: #1F51FF;
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
.div222 {
  /* border-style: dashed; */
  border-left: dashed;
  border-color: #a8a8a8;
}
</style>