<template>
    <v-container fluid>
    <v-card class="ma-3">
      <v-row class="mt-5 ml-5 mr-5 mb-3">
            <v-col  cols="12" md="12">
              <v-row>
              <v-toolbar-title class="text-h6 mt-4">IOT Mapping : </v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-col cols="12" md="2">
                      <v-autocomplete autofocus v-model="itemsearch.work_center_group_id" hide-details :items="work_center_group_list"
                        label="Work Center Group" outlined :item-text="getwork_center_group_name"
                        item-value="work_center_group_id" dense  @change="changworkcentergrouptogetworkcenter" clearable></v-autocomplete>
                    </v-col>
              <v-col cols="12" md="2">
                        <v-autocomplete hide-details outlined dense :items="workcenterlist"  v-model="itemsearch.work_center_id"
                          item-value="id" :item-text="getgroupnameworkcenter" label="Work Center"  @change="changworkcentertogetmch" clearable>
                        </v-autocomplete>
                      </v-col>
              <v-col cols="12" md="2">
                <!-- :menu-props="{maxHeight: '80%', overflowX: true}" -->
                <v-autocomplete label="Machine" v-model="itemsearch.machine" hide-details outlined dense chips small-chips
                :items="machinelist" :item-text="getmachine_name" item-value="id" clearable multiple>
                <template v-slot:selection="data">
        <v-chip
            v-if="itemsearch.machine.length < 2"
            v-bind="data.attrs"
            small
        >
            {{`${data.item.machine_id}:${data.item.name}`}}
        </v-chip>
        <div v-else-if="data.index === 0">
            {{ `${itemsearch.machine.length} items` }}
        </div>
    </template>
              </v-autocomplete>
        </v-col>
        <v-col cols="12" md="2" justify="center">
              <v-menu
              v-model="menusearchdatefrom"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                hide-details
                  v-model="itemsearch.datefrom"
                  persistent-hint
                  @keydown.enter="
                    datefrom = parseDate(itemsearch.datefrom);
                  "
                  @blur="
                    datefrom = parseDate(itemsearch.datefrom);
                  "
                  append-icon="mdi-calendar"
                  label="Date"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                ></v-text-field>
              </template>

              <v-date-picker
              @change="changechoosedatefrom"
                v-model="datefrom"
                @input="menusearchdatefrom = false"
              ></v-date-picker>
            </v-menu>
            </v-col>
            <!-- <v-col cols="12" md="2" justify="center">
              <v-menu
              v-model="menusearchdateto"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                hide-details
                  v-model="itemsearch.dateto"
                  persistent-hint
                  @keydown.enter="
                    dateto = parseDate(itemsearch.dateto);
                  "
                  @blur="
                    dateto = parseDate(itemsearch.dateto);
                  "
                  append-icon="mdi-calendar"
                  label="Date To"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                ></v-text-field>
              </template>

              <v-date-picker
              @change="changechoosedateto"
                v-model="dateto"
                @input="menusearchdateto = false"
              ></v-date-picker>
            </v-menu>
            </v-col> -->
            <v-col cols="12" md="2" justify="center">
              <v-btn
                  color="#1f51ff"
                  dark
                  class="mb-2 mr-2"
                  @click="SearchData"
                >
                  Search
                </v-btn>
            </v-col>
      </v-row>
        </v-col>
      </v-row>
      <!-- :style="{ visibility: dataproductivity.length > 0 ? 'visible' : 'hidden' }" -->
      <v-row class="pa-6">
          <v-col cols="12" md="12" justify="center">
            <div id="tabs" class="containertab">
              <div class="tabs">
                <div v-on:click="activetab = 1" v-bind:class="[activetab === 1 ? 'active' : '']">
                  Productivity
                </div>
                <div class="ml-1" v-on:click="activetab = 2" v-bind:class="[activetab === 2 ? 'active' : '']">
                  Downtime
                </div>
              </div>

              <div class="content">
                <div v-if="activetab === 1" class="tabcontent">
                  <v-data-table
          :headers="headersproductivity"
          :items="Computeddataproductivity"
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
          <!-- <template v-slot:top>
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-btn
                  color="#254E58"
                  dark
                  class="mb-2 mr-2"
                  @click="$router.push(`/routing-add`)"
                  :disabled="!authorize_add"
                >
                  Add IOT Mapping
                </v-btn>
            </v-toolbar>
          </template> -->
                    <template v-slot:item.work_hours="{ item }">
                      <v-text-field :value="getTimeDifference(item)" @change="(e) => handleChangeWorkHours(e, item)"
                        hide-details min="0" step="0.5" type="number" dense disabled></v-text-field>
                    </template>
          <template v-slot:item.opn_ord_id="{ item }">
                      <v-autocomplete v-model="item.opn_ord_id" @change="(e) => onOpnOrdIdChange(e, item)" hide-details
                        :items="operations" item-text="label" item-value="id" 
                        dense></v-autocomplete>
                    </template>
                    <template v-slot:item.item_name="{ item }">
                      <v-autocomplete v-model="item.item_id" hide-details :items="items" item-value="id"
                        item-text="item_name" dense disabled></v-autocomplete>
                    </template>
                    <template v-slot:item.defect="{ item }">
                      <v-row>
                        <v-col>
                          <v-text-field :value="getDefectCount(item.IOTID)" hide-details type="number" dense
                            disabled></v-text-field>
                        </v-col>
                        <v-col>
                          <v-icon small class="mr-2"
                            @click="onClickEditDefect(item)" :style="{
                              backgroundColor: '#E1F5FE',
                              color: '#2196F3',
                            }">
                            mdi-pencil
                          </v-icon>
                        </v-col>
                      </v-row>
                    </template>
                    <template v-slot:item.opn_desc="{ item }">
                      <v-text-field v-model="item.opn_desc" hide-details dense></v-text-field>
                    </template>
          <template v-slot:no-data>
            <!-- <v-btn color="primary" @click="initialize">
              Reset
            </v-btn> -->
          </template>
        </v-data-table>
                </div>


                <div v-if="activetab === 2" class="tabcontent">
                  <v-data-table
          :headers="headersdowntime"
          :items="datadowntime"
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
          <!-- <template v-slot:top>
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-btn
                  color="#254E58"
                  dark
                  class="mb-2 mr-2"
                  @click="$router.push(`/routing-add`)"
                  :disabled="!authorize_add"
                >
                  Add IOT Mapping
                </v-btn>
            </v-toolbar>
          </template> -->
          
          <template v-slot:item.machine_id="{ item }">
                      {{ machinelist.find((obj) => {
            return obj.id === item.machine_id;
          }).machine_id  }}
            </template>
          <template v-slot:item.work_hours="{ item }">
                      <v-text-field :value="getTimeDifference(item)" @change="(e) => handleChangeWorkHours(e, item)"
                        hide-details min="0" step="0.5" type="number" dense disabled></v-text-field>
                    </template>
          <template v-slot:item.downtime_id="{ item }">
                        <v-autocomplete v-model="item.downtime_id" @change="onSelectedDowntime(item)" hide-details
                        item-text="description" item-value="id" :items="downtimes" dense ></v-autocomplete>
                    </template>
                    <template v-slot:item.opn_desc="{ item }">
                      <v-text-field v-model="item.opn_desc" hide-details dense></v-text-field>
                    </template>
          <template v-slot:no-data>
            <!-- <v-btn color="primary" @click="initialize">
              Reset
            </v-btn> -->
          </template>
        </v-data-table>
                </div>
              </div>
              
            </div>
            <v-card-actions>
          <v-row justify="center" class="mt-3">
            <v-btn depressed width="100" class="mr-3 buttonblue" @click="savedata()">
              Save
            </v-btn>
            <v-btn depressed outlined width="100" @click="$router.back()">
              Cancel
            </v-btn>
          </v-row>
        </v-card-actions>
          </v-col>
          
        </v-row>
    
       
     
  

        <v-dialog v-model="defectDialog" max-width="500px">
                          <v-card>
                            <v-card-text>
                              <v-container>
                                <v-data-table hide-default-footer width-full :headers="defectHeaders"
                                  :items="computedAvailableDefect" :search="search">
                                  <template v-slot:top>
                                    <v-toolbar flat>
                                      <v-spacer></v-spacer>
                                      <v-dialog max-width="500px">
                                        <template v-slot:activator="{ on, attrs }">
                                          <v-btn v-bind="attrs" @click="onClickNewDefect" depressed width="100"
                                            class="mr-3 buttonblue">
                                            Add New
                                          </v-btn>
                                        </template>
                                      </v-dialog>
                                    </v-toolbar>
                                  </template>
                                  <template v-slot:item.qty="{ item }">
                                    <v-text-field v-model="item.qty" hide-details min="0" type="number"
                                      dense></v-text-field>
                                  </template>
                                  <template v-slot:item.defect_cause_id="{ item }">
                                    <v-autocomplete v-model="item.defect_cause_id" item-disabled="disabled" hide-details
                                      item-text="waste_code" item-value="id" :items="getDefectOptions"
                                      dense></v-autocomplete>
                                  </template>
                                  <template v-slot:item.defect_cause_name="{ item }">
                                    <v-autocomplete v-model="item.defect_cause_id" hide-details item-text="description"
                                      item-value="id" :items="getDefectOptions" dense></v-autocomplete>
                                  </template>
                                  <template v-slot:item.action="{ item }">
                                    <v-icon small class="mr-2" @click="() => onRemoveDefect(item)" :style="{
                                      backgroundColor: '#FFEBEE',
                                      color: '#F44336',
                                    }">
                                      mdi-delete
                                    </v-icon>
                                  </template>
                                </v-data-table>

                              </v-container>
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="close">
                                Cancel
                              </v-btn>
                              <v-btn color="blue darken-1" text @click="save">
                                Save
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>

        <SuccessDialog :status="dialogAdd" :text_color="text_color" :title="title" :message="message" />
        <SuccessDialogPush :status="dialogAdd" :text_color="text_color" :title="title" :message="message" :link="link" />
  
      
    </v-card>
  </v-container>
  </template>
  <script>
  import SuccessDialog from "@/components/cards/SuccessDialog";
import SuccessDialogPush from "@/components/cards/SuccessDialogPush";
  import api from "@/services/api";
  import { server, udgroup } from "@/services/constants";
  import { imageUrl } from "@/services/constants";
  import moment from 'moment';
  export default {
    data: function() {
   return{
      itemsearch:{
      datefrom:this.formatDate(
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      ),
      dateto:this.formatDate(
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      ),
      work_center_group_id:0,
      work_center_id:0,
      machine:[],
    },
    machinelist: [],
    docGroups:[],
    dataproductivity:[],
    getolddataproductivity:[],
    getoldDataAll:[],
    jobAll:[],
      datadowntime:[],
      getolddatadowntime:[],
      operations:[],
      items: [],
      defectOptions:[],
      main_u_define_module_id: 0,
      defectHeaders: [
      { text: 'qty', value: 'qty' },
      { text: 'Defect', value: 'defect_cause_id' },
      { text: 'Name', value: 'defect_cause_name' },
      { text: 'Action', value: 'action' }
    ],
    defects: [],
    logs: [],
    downtimes:[],
    defectDialog:false,
    menusearchdatefrom:false,
    datefrom:new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    menusearchdateto:false,
    dateto:new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
        activetab: 1,
      dialog: false,
      dialogDelete: false,
      dialogEdit: false,
      dialogAdd: false,
      text_color: "text-h5 green--text text-center",
      title: "green",
      message: "green",
      link: "",
      fullPage: true,
      search: "",
      headersproductivity: [
        // { text: "Date", sortable: false, value: "fulldate", },
        { text: "DateTime Start", value: "timehourstart" },
        { text: "DateTime End", value: "timehourend" },
        { text: "Act.QTY", value: "Qty" },
        { text: "WORK HR.", value: "work_hours" },
        { text: "ORD", value: "opn_ord_id", sortable: false },
        { text: "Item Name", value: "item_name" },
        { text: 'Defect', value: 'defect' },
        { text: 'Remark', value: 'opn_desc' },
      ],
      headersdowntime: [
        // {text: "Date", sortable: false,value: "fulldate", },
        { text: "Machine ID", value: "machine_id" },
        { text: "DateTime Start", value: "timehourstart" },
        { text: "DateTime End", value: "timehourend" },
        { text: "Downtime HR.", value: "work_hours" },
        { text: "Downtime Cause", value: "downtime_id", sortable: false },
        { text: 'Remark', value: 'opn_desc' },
      ],
      repalceId: 0,
      desserts: [],
      
      replaceId: "",
      position: [],
      approver: [],
      department: [],
      department_list: [],
      position_list: [],
      company: [],
      editedIndex: -1,
      editedItemDel: {
        emp_status: "D",
        user_update: 0,
      },
      imageURL: null,
      toggleDisable: true,
      edit_item_id: 0,
      userId: 0,
      authorize: [],
      authorize_view: false,
      authorize_add: false,
      authorize_edit: false,
      authorize_del: false,
      authorize_id: 0,
      initial_data1: "",
      itemchangeapproval:{
  oldapproval:0,
  newapproval:0,
      },
      approver_all_show:[],
  approver_active_show:[],
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
    workcenterlist: [],
    work_center_group_list: [],
};
     
    },
  
    computed: {
      Computeddataproductivity() {
      return this.dataproductivity.filter(p => p?.isDeleted !== true)
    },
      computedAvailableDefect() {
      return this.defects.filter(d => d?.isDeleted !== true)
    },
    getSelectedDefectId(v) {
      return this.defects.map(defect => defect.defect_cause_id)
    },
    getDefectOptions() {
      const usedDefectIdList = this.defects.map(defect => defect.defect_cause_id)
      return this.defectOptions.map(option => {
        if (usedDefectIdList.includes(option.id)) {
          return {
            ...option,
            disabled: true
          }
        } else {
          return {
            ...option,
            disabled: false
          }
        }
      })
    }
    },
    components: {
      SuccessDialog,
      SuccessDialogPush
    },
  
    watch: {
      datefrom(val) {
      this.itemsearch.datefrom = this.formatDate(this.datefrom);
    },
    dateto(val) {
      this.itemsearch.dateto = this.formatDate(this.dateto);
    },
    },
  
    async created() {
      // this.initialize();
    },
  
    async mounted() {
      // ----------------- Check Authorize ---------------------------
      this.userId = localStorage.getItem(server.USER_ID);
      let yourUrlString = window.location;
      // alert(yourUrlString);
  
      let parser = document.createElement("a");
      parser.href = yourUrlString;
  
      this.authorize_id = localStorage.getItem(server.AUTHORIZE_ID);
      // alert("authorize_id:" + this.authorize_id);
      if (this.authorize_id == null || this.authorize_id == 0) {
        // this.$router.push("/login");
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Authorize Failed!!!",
          "Please Logout And Login Again!!!",
          "text-h5 red--text text-center"
        );
        this.$router.back();
      }
  
      const router_path = parser.pathname.replace("/", "");
  
      const res_auth = await api.getAuthorize(this.userId, router_path);
  
      this.authorize_view = res_auth.data[0].smd_view >= 1 ? true : false;
      this.authorize_add = res_auth.data[0].smd_add >= 1 ? true : false;
      this.authorize_edit = res_auth.data[0].smd_edit >= 1 ? true : false;
      this.authorize_del = res_auth.data[0].smd_del >= 1 ? true : false;
      // this.$router.back();
  
      if (!this.authorize_view) {
        this.$router.back();
      }
  
      // ----------------- Check Authorize ---------------------------
      await this.loadWorkCenterGroup();
      await this.loadWorkCenter();
      await this.loadMachine();
      await this.loadOpn();
      await this.loadItem();
      await this.loadDowntimeCause();
      await this.loadDocGroup();
      await this.loadDefect();
      await this.onLoadUdefineIDByCompanyAndModuleName(
      udgroup.TIMECARD,
      localStorage.getItem(server.COMPANYID)
    );

      this.$hideLoader();
      let comp_id = localStorage.getItem(server.COMPANYID);
      await this.loadAuthorize();
  
      // this.userId = localStorage.getItem(server.USER_ID);
      if (this.userId && api.isLoggedIn()) {
        // this.$router.push("/");
      } else {
        this.$store.state.isLogged = false;
        this.$router.push("/login");
      }
    },
  
    methods: {
      async SearchData(){
        // console.log(this.itemsearch);
        // return;
        if(this.itemsearch.machine == 0 || !this.itemsearch.machine || this.itemsearch.machine == null || this.itemsearch.machine.length == 0){
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Please enter Machine",
            "text-h5 red--text text-center"
          );
          return;
        }
        this.$showLoader();
        
  
this.getolddataproductivity = [];
this.dataproductivity = [];
this.datadowntime = [];
this.getoldDataAll = [];
this.jobAll = [];

this.itemsearch.machine.forEach(async(x,mchi)=>{
let setupdatasearch = {
    "start_at":`${this.datefrom} 00:00:00`,
    "end_at":`${this.datefrom} 23:59:59`,
    "mch_id":x
}
      // const resultjob =  await api.getJobByMchandDatetime(setupdatasearch);
      // console.log(resultjob)
      // return;
      // if(resultjob.data && resultjob.data.length > 0){
        // this.jobAll = resultjob.data;
        // resultjob.data.forEach(async(job,i)=>{
       const resultproductivity =  await api.getMapProductByProductivity(setupdatasearch);
      //  console.log(resultproductivity)
      //  return;
       if(resultproductivity.data.length > 0){
this.getolddataproductivity= resultproductivity.data;
// this.getoldDataAll = [...this.getoldDataAll,...resultproductivity.data];

let setupdataproductivity = [];
let setupdatadowntime = [];
let setcurrentname = "";
        // this.dataproductivity = resultproductivity.data;
        this.getolddataproductivity.forEach(async(item,index)=>{
          // item.job_id = job.id;
          item.tbl_time_card_defects = [];
          
          if(index == 0){
            if(item.TimeOFF > 5){
              setupdatadowntime.push({...item,Qty:0,timehourstart:item.datetimehour,timehourend:moment(new Date(`${item.datetimehournomal}:00`)).add(item.TimeOFF, 'm').format("DD/MM/YYYY HH:mm"),timehourendnomal:moment(new Date(`${item.datetimehournomal}:00`)).add(item.TimeOFF, 'm').format("YYYY-MM-DD HH:mm"),downtime_id:null,opn_desc:null});
              item.iotindexdowntime = setupdatadowntime.length-1;
              setcurrentname = "downtime";
        }else{
          setupdataproductivity.push({...item,timehourstart:item.datetimehour,timehourend:item.datetimehour,opn_ord_id:item.tbl_job?item.tbl_job.opn_ord_id:null,item_id:item.tbl_job?item.tbl_job.item_id:null,opn_desc:null});
          item.iotindexproductivity = setupdataproductivity.length-1;
          setcurrentname = "productivity";
          }



if(index == this.getolddataproductivity.length-1){
  this.dataproductivity = [...this.dataproductivity,...setupdataproductivity];
  this.datadowntime =  [...this.datadowntime,...setupdatadowntime];
  this.getoldDataAll = [...this.getoldDataAll,...this.getolddataproductivity];
  this.$hideLoader();
  // console.log(this.datadowntime)
}
          }else{
            if(item.TimeOFF >= 5){
              if(setupdatadowntime.length == 0){
                if(setupdataproductivity.length > 0){
                  setupdataproductivity[setupdataproductivity.length-1].timehourend = item.datetimehour;
                  setupdataproductivity[setupdataproductivity.length-1].timehourendnomal = item.datetimehournomal;
                  setupdataproductivity[setupdataproductivity.length-1].Qty += item.Qty;
                }
                 setupdatadowntime.push({...item,Qty:0,timehourstart:item.datetimehour,timehourend:moment(new Date(`${item.datetimehournomal}:00`)).add(item.TimeOFF, 'm').format("DD/MM/YYYY HH:mm"),timehourendnomal:moment(new Date(`${item.datetimehournomal}:00`)).add(item.TimeOFF, 'm').format("YYYY-MM-DD HH:mm"),downtime_id:null,opn_desc:null});
                item.iotindexdowntime = setupdatadowntime.length-1;
                setcurrentname = "downtime";
              }else{
                if(setcurrentname == "productivity"){
                  setupdataproductivity[setupdataproductivity.length-1].timehourend = item.datetimehour;
                  setupdataproductivity[setupdataproductivity.length-1].timehourendnomal = item.datetimehournomal;
                  setupdataproductivity[setupdataproductivity.length-1].Qty += item.Qty;
                  
                  setupdatadowntime.push({...item,Qty:0,timehourstart:item.datetimehour,timehourend:moment(new Date(`${item.datetimehournomal}:00`)).add(item.TimeOFF, 'm').format("DD/MM/YYYY HH:mm"),timehourendnomal:moment(new Date(`${item.datetimehournomal}:00`)).add(item.TimeOFF, 'm').format("YYYY-MM-DD HH:mm"),downtime_id:null,opn_desc:null});
                  item.iotindexdowntime = setupdatadowntime.length-1;
                  setcurrentname = "downtime";
                }else{
                  if(setupdataproductivity.length > 0){
                  setupdataproductivity[setupdataproductivity.length-1].Qty += item.Qty;
                  // setupdatadowntime[setupdatadowntime.length-1].timehourend = item.datetimehour;
                }
                if(setupdatadowntime[setupdatadowntime.length-1].fulldate!== item.fulldate){
                  setupdatadowntime.push({...item,Qty:0,timehourstart:item.datetimehour,timehourend:moment(new Date(`${item.datetimehournomal}:00`)).add(item.TimeOFF, 'm').format("DD/MM/YYYY HH:mm"),timehourendnomal:moment(new Date(`${item.datetimehournomal}:00`)).add(item.TimeOFF, 'm').format("YYYY-MM-DD HH:mm"),downtime_id:null,opn_desc:null});
                  item.iotindexdowntime = setupdatadowntime.length-1;
                  setcurrentname = "downtime";
                }else{
                  setupdatadowntime[setupdatadowntime.length-1].timehourend = moment(new Date(`${setupdatadowntime[setupdatadowntime.length-1].timehourendnomal}:00`)).add(item.TimeOFF, 'm').format("DD/MM/YYYY HH:mm");
                  setupdatadowntime[setupdatadowntime.length-1].timehourendnomal = moment(new Date(`${setupdatadowntime[setupdatadowntime.length-1].timehourendnomal}:00`)).add(item.TimeOFF, 'm').format("YYYY-MM-DD HH:mm");
                //  setupdatadowntime[setupdatadowntime.length-1].Qty += item.Qty;
                  item.iotindexdowntime = setupdatadowntime.length-1;
                  setcurrentname = "downtime";
              }
                }
               
              }

              }else{
                if(setupdataproductivity.length == 0){
                  setupdataproductivity.push({...item,timehourstart:item.datetimehour,timehourend:item.datetimehour,opn_ord_id:item.tbl_job?item.tbl_job.opn_ord_id:null,item_id:item.tbl_job?item.tbl_job.item_id:null,opn_desc:null});
                  item.iotindexproductivity = setupdataproductivity.length-1;
                  setcurrentname = "productivity";
              }else{
                if(setcurrentname == "downtime"){
                 // setupdatadowntime[setupdatadowntime.length-1].timehourend = item.datetimehour;
                //  setupdatadowntime[setupdatadowntime.length-1].timehourend = moment(new Date(new Date(moment(new Date(`${setupdatadowntime[setupdatadowntime.length-1].timehourend}:00`)).format("DD/MM/YYYY HH:mm:ss")).getTime()+ item.TimeOFF*60000)).format("DD/MM/YYYY HH:mm");
                  setupdataproductivity.push({...item,timehourstart:item.datetimehour,timehourend:item.datetimehour,opn_ord_id:item.tbl_job?item.tbl_job.opn_ord_id:null,item_id:item.tbl_job?item.tbl_job.item_id:null,opn_desc:null});
                  item.iotindexproductivity = setupdataproductivity.length-1;
                  setcurrentname = "productivity";
                }else{
                  if(setupdataproductivity[setupdataproductivity.length-1].fulldate !== item.fulldate){
                    // setupdataproductivity[setupdataproductivity.length-1].timehourend = item.datetimehour;
                    // setupdataproductivity[setupdataproductivity.length-1].timehourendnomal = item.datetimehournomal;
                    setupdataproductivity.push({...item,timehourstart:item.datetimehour,timehourend:item.datetimehour,opn_ord_id:item.tbl_job?item.tbl_job.opn_ord_id:null,item_id:item.tbl_job?item.tbl_job.item_id:null,opn_desc:null});
                  item.iotindexproductivity = setupdataproductivity.length-1;
                  setcurrentname = "productivity";
                  }else{
                  setupdataproductivity[setupdataproductivity.length-1].timehourend = item.datetimehour;
                  setupdataproductivity[setupdataproductivity.length-1].timehourendnomal = item.datetimehournomal;
                setupdataproductivity[setupdataproductivity.length-1].Qty += item.Qty;
                item.iotindexproductivity = setupdataproductivity.length-1;
                  setcurrentname = "productivity";
                }
                }
               
              }
              }




              if(index == this.getolddataproductivity.length-1){
                this.dataproductivity = [...this.dataproductivity,...setupdataproductivity];
  this.datadowntime =  [...this.datadowntime,...setupdatadowntime];
  this.getoldDataAll = [...this.getoldDataAll,...this.getolddataproductivity];
  this.$hideLoader();
  // console.log(this.datadowntime)
}
          }
         
        })

       }else{
        this.$hideLoader();
        // this.$store.state.global_dialog = true;
        //   this.setupAlertDialog(
        //     true,
        //     "Failed!!!",
        //     "No Information",
        //     "text-h5 red--text text-center"
        //   );
        //   return;
       }
       
    // })
      // }else{
      //   this.$hideLoader();
      //   this.$store.state.global_dialog = true;
      //     this.setupAlertDialog(
      //       true,
      //       "Failed!!!",
      //       "No Information",
      //       "text-h5 red--text text-center"
      //     );
      //     return;
      // }
    })
      },
      async savedata(){
        this.$showLoader();
        // let checkproductivity =  this.dataproductivity.filter(item=>{
        //   if(item.opn_ord_id == 0 || item.opn_ord_id == null){
        //     return item;
        //   }
        // });

        // let checkdowntime =  this.datadowntime.filter(item=>{
        //   if(item.downtime_id == 0 || item.downtime_id == null){
        //     return item;
        //   }
        // });
        // if(checkproductivity.length > 0){
        //   this.$hideLoader();
        // this.$store.state.global_dialog = true;
        //   this.setupAlertDialog(
        //     true,
        //     "Failed!!!",
        //     "Please enter ORD",
        //     "text-h5 red--text text-center"
        //   );
        //   return;
        // }
        // if(checkdowntime.length > 0){
        //   this.$hideLoader();
        // this.$store.state.global_dialog = true;
        //   this.setupAlertDialog(
        //     true,
        //     "Failed!!!",
        //     "Please enter Downtime",
        //     "text-h5 red--text text-center"
        //   );
        //   return;
        // }

        // if(this.jobAll.length > 0){
        if(this.dataproductivity.length == 0 && this.datadowntime.length == 0){
          this.$hideLoader();
        this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "No Information",
            "text-h5 red--text text-center"
          );
          return;

        }else{
          const currentdate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10);


          // this.jobAll.forEach(async(item,index)=>{
            const addData = {
        "company_id": localStorage.getItem(server.COMPANYID),
        "doc_group_id": this.docGroups[0].id?this.docGroups[0].id:0,
        "wc_id": null,
        "mch_id": this.itemsearch.machine?this.itemsearch.machine:null,
        "wo_running_no": null,
        "worker_id": null,
        "opn_ord_id": null,
        "time_card_type":"iot",
        "doc_date": currentdate,
        "status": "save"
      }
        
      const res_add = await api.addTimecardforIOTMapping(addData);
      if (res_add.status == 200) {
        this.itemaddudefine.module_master_id = res_add.data.id;
        this.itemaddudefine.date1 = this.parseDate(this.itemaddudefine.date1);
        this.itemaddudefine.date2 = this.parseDate(this.itemaddudefine.date2);
        this.itemaddudefine.u_define_module_id = this.main_u_define_module_id;
        await api.addu_define_master(this.itemaddudefine);

        const timecarddetailproductivity = this.dataproductivity.filter(log => log?.isDeleted !== true);
        if(timecarddetailproductivity.length > 0) {
        await Promise.all(timecarddetailproductivity.map(async (x,i) => {
if(x.opn_ord_id && x.opn_ord_id != 0){
          const addDataTimeCardDetail = {
            "id":null,
            "time_card_id": res_add.data.id,
    "wo_running_no": res_add.data.wo_running_no,
    "opn_ord_id": x.opn_ord_id,
    "wc_id": res_add.data.wc_id,
    "batch": null,
    "mch_id": res_add.data.mch_id,
    "opn_desc": x.opn_desc,
    "opn_id": x.tbl_job && x.tbl_job.tbl_opn_ord?x.tbl_job.tbl_opn_ord.opn_id:null,
    "item_id": x.tbl_job?x.tbl_job.item_id:null,
    "worker_id":  res_add.data.worker_id,
    "wo_type": "N",
    "downtime_id": null,
    "setup_time": null,
    "qty": x.Qty,
    "time_card_date": this.parseDate(x.timehourstart.split(" ")[0]),
    "time_start": x.timehourstart.split(" ")[1],
    "time_end": x.timehourend.split(" ")[1],
    "work_hours":x.work_hours
          }
          // console.log({...addDataTimeCardDetail, time_card_id: res_add.data.id})

          const updateDefects =  x.tbl_time_card_defects.filter(defect => defect?.isDeleted !== true)
          const deletedDefects =x.tbl_time_card_defects.filter(defect => defect?.isDeleted && defect.isNew !== true)
        const resulttimecarddetail =  await api.upsertTimecardLog({...addDataTimeCardDetail, time_card_id:res_add.data.id,
          tbl_time_card_defects: updateDefects.map(defect => ({
            ...defect,
            id: defect.isNew ? null : defect.id
          })),
          defect_delete_id_list: deletedDefects.map(defect => defect.id)
        });
        if(resulttimecarddetail.status == 200){
          let dataupdate =  this.getoldDataAll.filter(item=>{
          if(item.iotindexproductivity == i){
            item.OEflag = 1;
            return item;
          }
        });
        if(dataupdate.length > 0){
          await api.updateAllMapProduct(dataupdate);
        }
        }
      
      }else{

      }
    }));
  }
    // end timecarddetailforproductivity



    const timecarddetaildatadowntime = this.datadowntime.filter(log => log?.isDeleted !== true);
    if(timecarddetaildatadowntime.length > 0){
        await Promise.all(timecarddetaildatadowntime.map(async (dtx,dti) => {
if(dtx.downtime_id && dtx.downtime_id != 0){
          const addDataTimeCardDetail = {
            "id":null,
            "time_card_id": res_add.data.id,
    "wo_running_no": res_add.data.wo_running_no,
    "opn_ord_id": res_add.data.opn_ord_id,
    "wc_id": res_add.data.wc_id,
    "batch": null,
    "mch_id": res_add.data.mch_id,
    "opn_desc": dtx.opn_desc,
    "opn_id": dtx.tbl_job && dtx.tbl_job.tbl_opn_ord?dtx.tbl_job.tbl_opn_ord.opn_id:null,
    "item_id": dtx.tbl_job?dtx.tbl_job.item_id:null,
    "worker_id":  res_add.data.worker_id,
    "wo_type": "N",
    "downtime_id": dtx.downtime_id,
    "setup_time": null,
    "qty": dtx.Qty,
    "time_card_date": this.parseDate(dtx.timehourstart.split(" ")[0]),
    "time_start": dtx.timehourstart.split(" ")[1],
    "time_end": dtx.timehourend.split(" ")[1],
    "work_hours":dtx.work_hours
          }

          const updateDefects =  dtx.tbl_time_card_defects.filter(defect => defect?.isDeleted !== true)
          const deletedDefects = dtx.tbl_time_card_defects.filter(defect => defect?.isDeleted && defect.isNew !== true)
        const resulttimecarddetail =  await api.upsertTimecardLog({...addDataTimeCardDetail, time_card_id:res_add.data.id,
          tbl_time_card_defects: updateDefects.map(defect => ({
            ...defect,
            id: defect.isNew ? null : defect.id
          })),
          defect_delete_id_list: deletedDefects.map(defect => defect.id)
        });
        if(resulttimecarddetail.status == 200){
          let dataupdate =  this.getoldDataAll.filter(item=>{
          if(item.iotindexdowntime == dti){
            item.DTflag = 1;
            item.OEflag = 1;
            return item;
          }
        });
        if(dataupdate.length > 0){
          await api.updateAllMapProduct(dataupdate);
        }
        }
      
      }
if(dti == timecarddetaildatadowntime.length-1){
  this.$hideLoader();
  this.$store.state.global_dialog_push = true;
            this.setupAlertDialogPush(
              true,
              "Success!!!",
              "Edit data success",
              "text-h5 green--text text-center",
              `/reloadpage`
            );
            return;
}

    }));
  }else{
    this.$hideLoader();
    this.$store.state.global_dialog_push = true;
            this.setupAlertDialogPush(
              true,
              "Success!!!",
              "Edit data success",
              "text-h5 green--text text-center",
              `/reloadpage`
            );
            return;
  }
// end timecarddetailfordowntime



      }else{
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
          // })
          
        // }
      }
        this.$hideLoader();
      },

      async loadDocGroup() {
      const res_get = await api.getDocRunningGroupByGroupName("IOT");
      this.docGroups = res_get.data;
    },
      async loadAuthorize() {
      const res_get = await api.getSettingGroupMenu();
      this.authorize = res_get.data;
    },
      async loadMachine() {
      const result = await api.listMachineByCompany(localStorage.getItem(server.COMPANYID));
      this.machinelist = result.data;
    },
    async loadItem() {
      const response = await api.getItemMasterByCompanyID(localStorage.getItem(server.COMPANYID))
      this.items = response.data
    },
    async loadDowntimeCause() {
      const response = await api.getDownTimeCauseCompanyID(
        localStorage.getItem(server.COMPANYID)
      );
      this.downtimes = response.data
    },
    async loadOpn() {
      const response = await api.getOpnOrdOption(localStorage.getItem(server.COMPANYID))
      this.operations = response.data
    },
    async loadDefect() {
      const response = await api.getDefectCauseByCompanyID(
        localStorage.getItem(server.COMPANYID)
      )
      this.defectOptions = response.data
    },
    async onLoadUdefineIDByCompanyAndModuleName(module_name, company_id) {
      const res_get = await api.getu_define_module_UdefineIDByCompanyAndModuleName(
        module_name,
        company_id
      );

      this.main_u_define_module_id = res_get.data[0].id;
      this.itemaddudefine.u_define_module_id = this.main_u_define_module_id;
    },
    async loadWorkCenterGroup() {
      const res_get = await api.getWorkCenterGroupMaster(
        localStorage.getItem(server.COMPANYID)
      );
      this.work_center_group_list = res_get.data;
    },
    async loadWorkCenter() {
      const result = await api.getWorkCenterCompanyID(localStorage.getItem(server.COMPANYID));
      this.workcenterlist = result.data;
    },
    
    async changworkcentergrouptogetworkcenter(work_center_group_id) {
      this.$showLoader();
      if(work_center_group_id == null){
        await this.loadWorkCenter();
      }else if(work_center_group_id == null && (this.itemsearch.work_center_id == 0 || this.itemsearch.work_center_id == null)){
        await this.loadWorkCenter();
        await this.loadMachine();
        
      }else{
        this.itemsearch.work_center_id = 0;
        this.itemsearch.machine = [];
      const result = await api.getbyWorkcentergroup(work_center_group_id);
      this.workcenterlist = result.data;
      if(this.workcenterlist.length > 0){
        this.workcenterlist.forEach(async(x,i)=>{
         let resultmch =  await api.listMachineByWorkcenterID(x.id);
          if(resultmch && resultmch.data.length > 0){
            resultmch.data.map((item,index)=>{
              this.itemsearch.machine.push(item.id);
            })
          }
        })
      }else{
      }
    }
    this.$hideLoader();
    },
    async changworkcentertogetmch(work_center_id) {
      this.$showLoader();
      if(work_center_id == null && this.itemsearch.work_center_group_id == null){
        await this.loadMachine();
      }else if(work_center_id == null && this.itemsearch.work_center_group_id != null){
        await this.changworkcentergrouptogetworkcenter(this.itemsearch.work_center_group_id);
        await this.loadMachine();
      }
      else{
      const result = await api.listMachineByWorkcenterID(work_center_id);
      // this.machinelist = result.data;
      this.itemsearch.machine = [];
      if(result.data.length > 0){
        result.data.map(async(x,i)=>{
              this.itemsearch.machine.push(x.id);
        })
      }else{
      }
      this.$hideLoader();
    }
    },
    async onOpnOrdIdChange(e, item) {
     
      const response = await api.getOpnOrd(e)
      const { data } = response;
      if(data) {
        item.opn_ord_id = data.id;
      item.item_id = data.item_master_id;
      }else{
        item.opn_ord_id = 0;
        item.item_id = 0;
      }
      this.dataproductivity = [...this.dataproductivity];
    },

    getDefectCount(item_id) {
      const found = this.dataproductivity.find(data => data.IOTID === item_id);
      return found.tbl_time_card_defects.reduce((acc, cur) => {
        if (cur?.isDeleted) {
          return acc
        }
        return acc += Number(cur.qty)
      }, 0)
    },
    onClickEditDefect(item) {
      this.editingLogId = item.IOTID;
      this.defects = item.tbl_time_card_defects;
      this.defectDialog = true;
    },
    close() {
      this.defectDialog = false
    },
    save() {
      const foundLog = this.dataproductivity.find(data => data.IOTID === this.editingLogId);
      foundLog.tbl_time_card_defects = this.defects;
      this.editingLogId = null;
      this.defectDialog = false;
    },
    onClickNewDefect() {
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const initialDefect = {
        id: timestamp,
        qty: 0,
        defect_cause_id: null,
        isNew: true,
      }

      this.defects = [...this.defects, initialDefect]
    },
    getTimeDifference(item) {
      // console.log(item);
      // console.log(moment(new Date(`${item.timehourendnomal}:00`)).format("YYYY-MM-DD HH:mm:ss"));
      // console.log( new Date(moment(new Date(`${item.timehourendnomal}:00`)).format("YYYY-MM-DD HH:mm:ss")) );

      // console.log(moment(new Date(`${item.datetimehournomal}:00`)).format("YYYY-MM-DD HH:mm:ss"));
      // console.log(new Date(moment(new Date(`${item.datetimehournomal}:00`)).format("YYYY-MM-DD HH:mm:ss")));
      
      let delta = (new Date(moment(new Date(`${item.timehourendnomal}:00`)).format("YYYY-MM-DD HH:mm:ss")) - new Date(moment(new Date(`${item.datetimehournomal}:00`)).format("YYYY-MM-DD HH:mm:ss"))) / 1000;
      // console.log(delta);
        let showwork_hr = 0;
          var days = Math.floor(delta / 86400);
          delta -= days * 86400;

          var hours = Math.floor(delta / 3600) % 24;
          delta -= hours * 3600;

          showwork_hr = hours;
        
          var minutes = Math.floor(delta / 60) % 60;
          delta -= minutes * 60;

          var seconds = delta % 60;

          if(days > 0){
            hours+= days*60;
            showwork_hr = hours;
          }
          showwork_hr = hours + (minutes/60);
       
          item.work_hours = Number(`${showwork_hr}`).toFixed(2);
          item = { ...item }
          return  Number(`${showwork_hr}`).toFixed(2);
    },

    handleChangeWorkHours(e, item) {
      item.work_hours = Number(`${e}`).toFixed(2);
      item = { ...item }
    },

    onRemoveDefect(item) {
      const foundDefect = this.defects.find(defect => defect.IOTID === item.IOTID)
      foundDefect.isDeleted = true
      this.defects = [...this.defects]
    },

    onSelectedDowntime(item) {
      item.qty = 0
    },

    async changechoosedatefrom(){
    const getdateto =   new Date(
          new Date(this.datefrom).setFullYear(
            new Date(this.datefrom).getFullYear(),
            new Date(this.datefrom).getMonth(),
            new Date(this.datefrom).getDate() + 7
          ) -
            new Date().getTimezoneOffset() * 60000
        ).toISOString() .substr(0, 10);

      if(this.dateto > getdateto || this.datefrom > this.dateto){
        this.dateto = getdateto;
      }
    },
    async changechoosedateto(){
      const getdatefrom =   new Date(
          new Date(this.datefrom).setFullYear(
            new Date(this.datefrom).getFullYear(),
            new Date(this.datefrom).getMonth(),
            new Date(this.datefrom).getDate() + 7
          ) -
            new Date().getTimezoneOffset() * 60000
        ).toISOString() .substr(0, 10);

      if(this.dateto > getdatefrom || this.dateto < this.datefrom){
        this.dateto = getdatefrom;
            this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Please enter Date To between 7 days",
            "text-h5 red--text text-center"
          );
          return;
      }
},
getwork_center_group_name(item) {
      return `${item.work_center_group_id}:${item.work_center_group_name}`;
    },
getgroupnameworkcenter(item) {
      return `${item.wc_id}:${item.wc_name}`;
    },
      getmachine_name(item) {
      return `${item.machine_id}:${item.name}`;
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
    formatDateMonth(date) {
      if (!date) return null;

      const [year, month] = date.split("-");
      return `${month.padStart(2, "0")}/${year}`;
    },
    parseDateMonth(date) {
      if (!date) return null;

      const [year, month] = date.split("/");
      return `${month.padStart(2, "0")}-${year}`;
    },
    parseDateTimetomonthdayyear(date) {
      if (!date) return null;

      const [year,month,day] = date.split("-");
      return `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year}`;
    },
    initialize() {

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
  
    },
    beforeCreate() {
      // console.log("beforeCreate");
      this.$store.state.navMenu = true;
    },
  };
  </script>
  <style scoped>
  .row1 {
    padding-top: 20px;
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
.v-btn:not(.v-btn--round).v-size--default.buttonblue {
  background-color: #1f51ff;
  color: white;
}

.v-btn:not(.v-btn--round).v-size--default.buttonred {
  width: 100%;
  background-color: #9e3b1b;
  color: white;
}
  </style>
  