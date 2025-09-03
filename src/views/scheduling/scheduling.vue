<template>
  <v-card-title>
    <v-container class="pa-1" fluid>
      <v-card class="pa-12">
        <v-card-title>
          <v-row>
            <v-col cols="12" md="12" justify="center" class="mt-n6">
              <h3>Scheduling</h3>
            </v-col>
          </v-row>
        </v-card-title>
        <v-row class="mb-5">
            <!-- <v-col cols="12" md="2" justify="center"> -->
              <v-col cols="12" md="2" justify="center">
              <v-select
              hide-details
                          required
                          outlined
                          :items="chooseday_monthlist"
                          v-model="chooseday_month"
                          item-value="id"
                          item-text="name"
                          label="Select"
                          dense
                          @change="changechooseday_month"
                        ></v-select>
                      </v-col>
            <!-- </v-col> -->
            <!-- <v-divider vertical></v-divider> -->
            <!-- <v-col cols="12" md="10"> -->
              <!-- <v-row justify="start"> -->
            <v-col v-if="chooseday_month == 'Month'" cols="12" md="2" justify="center">
              <v-menu
              v-model="menuselectmonth"
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
                  v-model="itemsearch.selectmonth"
                  @keydown.enter="
                    selectmonth = parseDateMonth(itemsearch.selectmonth);
                  "
                  @blur="
                    selectmonth = parseDateMonth(itemsearch.selectmonth);
                  "
                  append-icon="mdi-calendar"
                  label="Select Month"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                ></v-text-field>
              </template>

              <v-date-picker
                @change="changechooseday_month"
                v-model="selectmonth"
                @input="menuselectmonth = false"
                type="month"
              ></v-date-picker>
            </v-menu>
            </v-col>
            <v-col v-if="chooseday_month == 'Day'" cols="12" md="2" justify="center">
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
                  label="Date From"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                ></v-text-field>
              </template>

              <v-date-picker
              @change="changechooseday_month"
                v-model="datefrom"
                @input="menusearchdatefrom = false"
              ></v-date-picker>
            </v-menu>
            </v-col>
            <v-col v-if="chooseday_month == 'Day'" cols="12" md="2" justify="center">
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
              @change="changechooseday_month"
                v-model="dateto"
                @input="menusearchdateto = false"
              ></v-date-picker>
            </v-menu>
            </v-col>
            <v-col cols="12" md="2" justify="center">
            <v-autocomplete  @change="changechooseday_month"  label="Machine" v-model="itemsearch.machine" hide-details outlined dense
                :items="machinelist" :item-text="getmachine_name" item-value="id" clearable></v-autocomplete>
              </v-col>

            <v-col cols="12" md="2" justify="center">
              <v-autocomplete  @change="changechooseday_month"  label="Work Center" v-model="itemsearch.work_center" hide-details outlined dense
              :items="work_center_list" :item-text="getwork_center_name"  item-value="id" clearable>
            </v-autocomplete>
            </v-col>

            <v-col cols="12" md="2" justify="center">
              <v-autocomplete  @change="changechooseday_month"  label="Work Center Group" v-model="itemsearch.work_center_group" hide-details outlined dense
              :items="work_center_group_list" :item-text="getwork_center_group_name"  item-value="id" clearable>
            </v-autocomplete>
            </v-col>
          <!-- </v-row> -->
          <!-- </v-col> -->
         
          </v-row>

        <!-- <div>
  <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
</div> -->
<!-- v-if="seriesData.length > 0" -->
<div :style="{ visibility: seriesData.length > 0 ? 'visible' : 'hidden' }"  id="chart-timeline" >
        <apexchart type="rangeBar" width="100%"
      height="430" :options="chartOptionsData" :series="seriesData" @click="clickHandler"></apexchart>
      </div>


 <v-dialog v-model="dialogedit" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Edit Gantt Chart</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                        <v-select required outlined :items="machinelist" v-model="itemedit.machine_id"
                          item-value="id" :item-text="getgroupnamemachine" label="Machine" dense 
                          ></v-select>
                          <!-- multiple chips small-chips -->
                      </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="canceledit()"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="savedataedit()"
              >Save</v-btn
            >
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
import Vue from "vue";
import { server } from "@/services/constants";
import api from "@/services/api";
import SuccessDialog from "@/components/cards/SuccessDialog";
  import SuccessDialogPush from "@/components/cards/SuccessDialogPush";
  import VueApexCharts from 'vue-apexcharts'
  import moment from 'moment';
// Vue.use(VueApexCharts)
// import { GanttPlugin, Selection } from "@syncfusion/ej2-vue-gantt";
// import { ClickEventArgs } from '@syncfusion/ej2-navigations';
// import { registerLicense } from '@syncfusion/ej2-base';
// registerLicense('Ngo9BigBOggjHTQxAR8/V1NAaF1cXmhKYVZpR2Nbe05yflBPal9VVAciSV9jS3pTdEVnWX1beXdQQ2hfVg==');
// Vue.use(GanttPlugin);
export default {
  components: {
    SuccessDialog,
    SuccessDialogPush,
    apexchart: VueApexCharts
  },
data: function() {
   return{
    seriesData:[],
    chartOptionsData:{},
    

    work_center_group_list: [],
    work_center_list:[],
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
      selectmonth:this.formatDateMonth(new Date().toISOString().substr(0, 7)),
      work_center_group:0,
      machine:0,
    },
    menusearchdatefrom:false,
    datefrom:new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    menusearchdateto:false,
    dateto:new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
        menuselectmonth:false,
        selectmonth:new Date().toISOString().substr(0, 7),
        delay: 700,
        clicks: 0,
        timer: null,
        chooseday_month:"Month",
        chooseday_monthlist: [
      { id: "Month", name: "Month" },
      { id: "Day", name: "Day" },
    ],
    dataworkcenter:[],
    dialogAdd: false,
      text_color: "text-h5 green--text text-center",
      title: "green",
      message: "green",
      link:"",
    setdatasearch:null,
    dialogedit:false,
    machinelist: [],
    itemedit:{
      machine_id:0,
      opn_start_date_time:"",
      opn_end_date_time:"",
    },
    
     };
     
 },
 provide: {
   gantt: [ Selection ]
 },
 watch: {
    datefrom(val) {
      this.itemsearch.datefrom = this.formatDate(this.datefrom);
    },
    dateto(val) {
      this.itemsearch.dateto = this.formatDate(this.dateto);
    },
    selectmonth(val) {
      this.itemsearch.selectmonth = this.formatDateMonth(this.selectmonth);
    },
    
  },
  computed: {
},

 methods: {
  async clickHandler(event, chartContext, config){
    if(config.seriesIndex !== -1 && config.dataPointIndex !== -1){
      var data = config.globals.initialSeries[config.seriesIndex].data[config.dataPointIndex];
        // console.log("เข้า");
    console.log(data)
    }
   
 

  },
  async loadWorkCenterGroup() {
      const res_get = await api.getWorkCenterGroupMaster(
        localStorage.getItem(server.COMPANYID)
      );
      this.work_center_group_list = res_get.data;
    },
    async loadWorkCenter() {
      const result = await api.getWorkCenterMaster(
        localStorage.getItem(server.COMPANYID)
      );
      this.work_center_list = result.data;
    },

   async changechooseday_month(){
    // this.loadWorkcenterganttchart();
    if(this.chooseday_month == "Month"){
      this.setdatasearch = {
    "typesearch":this.chooseday_month,
    "month":this.selectmonth.split("-")[1],
    "year":this.selectmonth.split("-")[0],
    "machine":this.itemsearch.machine,
    "work_center":this.itemsearch.work_center,
    "work_center_group":this.itemsearch.work_center_group
}
      }else{
        this.setdatasearch = {
    "typesearch":this.chooseday_month,
    "datefrom":`${this.datefrom} 00:00:00`,
    "dateto":`${this.dateto} 23:59:59`,
    "machine":this.itemsearch.machine,
    "work_center":this.itemsearch.work_center,
    "work_center_group":this.itemsearch.work_center_group
}
      }
    
      await this.loadWorkcenterganttchart("change");
    },

    async loadWorkcenterganttchart(mode){
      if(mode == "loaddata"){
        this.setdatasearch = {
    "typesearch":this.chooseday_month,
    "month":this.selectmonth.split("-")[1],
    "year":this.selectmonth.split("-")[0],
    "machine":this.itemsearch.machine,
    "work_center":this.itemsearch.work_center,
    "work_center_group":this.itemsearch.work_center_group
}
      }
    
      

//  console.log(this.setdatasearch)
//  console.log(this.series)
 this.seriesData = [];
 let setdataAll = [];
 let indexseries = 0;
 let count = 1;
 let countworkcentergroup;
 let countworkcenter;
let getparentid;
let setmindate = "";
let setmaxdate= "";
let gettaskIDmachine_id;
 const resultwcg =  await api.getWorkCenterGroupGanttchartCompanyID(localStorage.getItem(server.COMPANYID),this.setdatasearch);
 console.log(resultwcg.data)
 let dataworkcentergroup = resultwcg.data;
 if(dataworkcentergroup.length > 0){
      for(let wcg=0;wcg< dataworkcentergroup.length;wcg++) {
              let setdatefromtimemonth = new Date(`${this.itemsearch.selectmonth.split("/")[1]}`,`${parseInt(this.itemsearch.selectmonth.split("/")[0])}`,1);
      let setdatetotimemonth = new Date(`${this.itemsearch.selectmonth.split("/")[1]}`,`${parseInt(this.itemsearch.selectmonth.split("/")[0]) } `,0);
      setdatetotimemonth.setHours(23);
       setdatetotimemonth.setMinutes(59);
      setdatetotimemonth.setSeconds(59);
        countworkcentergroup = count;
        count++;
        let dataworkcenter = dataworkcentergroup[wcg].tbl_work_centers;
        if(dataworkcenter.length > 0){
          for(let wc=0;wc< dataworkcenter.length;wc++) {
           
        countworkcenter = count;
        count++;
        let datamch = dataworkcenter[wc].tbl_mches;
        if(datamch.length > 0){
        for(let m=0;m< datamch.length;m++) {
          setdataAll.push({name:`${datamch[m].machine_id}:${datamch[m].name}`,data:[]});
         let opn_ords =  datamch[m].tbl_opn_ords;
         if(opn_ords.length > 0){
          for(let opn=0;opn< opn_ords.length;opn++) {
            if(opn==0 && setmindate == "" && setmaxdate == ""){
              setmindate = opn_ords[opn].opn_start_date_time;
              setmaxdate =opn_ords[opn].opn_end_date_time;
            }else{
              if(new Date(opn_ords[opn].opn_start_date_time) < new Date(setmindate)){
                setmindate = opn_ords[opn].opn_start_date_time;
              }
              if(new Date(opn_ords[opn].opn_end_date_time) > new Date(setmaxdate)){
                setmaxdate = opn_ords[opn].opn_end_date_time;
              }
            }

            // let start_date = opn_ords[opn].opn_start_date_time.split("T")[0];
            // let start_time = opn_ords[opn].opn_start_date_time.split("T")[1].split(".")[0];
            // // console.log(opn_ords[opn].opn_start_date_time);
            // // console.log(start_date,start_time)

            // let end_date = opn_ords[opn].opn_end_date_time.split("T")[0];
            // let end_time = opn_ords[opn].opn_end_date_time.split("T")[1].split(".")[0];
            // console.log(end_date,end_time)

              setdataAll[indexseries].data.push({
                ...opn_ords[opn],
                  x: `${datamch[m].machine_id}`,
                  y: [
                    new Date(opn_ords[opn].opn_start_date_time).getTime(),
                    new Date(opn_ords[opn].opn_end_date_time).getTime()
                  ],
                  progress:70,
                })
            
        gettaskIDmachine_id = count;
        count++;



        if(wcg == dataworkcentergroup.length-1 && wc== dataworkcenter.length-1 && m == datamch.length-1 && opn== opn_ords.length-1){
        // console.log(setmindate);
        // console.log(setmaxdate);
        // console.log(new Date(setmindate).setDate(new Date(setmindate).getDate() -1));
        // console.log(new Date(setmaxdate).setDate(new Date(setmaxdate).getDate() + 1));
         this.seriesData = setdataAll;
         
         this.chartOptionsData = {
            chart: {
              // stacked: false,
              height: 430,
              zoom: {
type: 'x' ,
enabled: false ,
// autoScaleYaxis: false
},
              type: 'rangeBar',
              toolbar:{
                autoSelected: 'zoom',
                show: true,
                tools: {
                download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
                },
},
            },
            plotOptions: {
              bar: {
                horizontal: true,
                rangeBarGroupRows: true,
                barHeight: '80%'
              },
              
            },
            xaxis: {
             
                tickPlacement: 'between',
              type: 'datetime',
              //  min:new Date(setmindate).setDate(new Date(setmindate).getDate() - 1),
              // max:new Date(setmaxdate).setDate(new Date(setmaxdate).getDate() + 1),
              min:new Date(setmindate).getTime(),
              max:new Date(setmaxdate).getTime(),
              

              // labels:{
              //     rotate: -15,
              //     rotateAlways: true,
              //     formatter: function(val, timestamp) {
              //       console.log()
              //       return moment(new Date(timestamp)).format("DD/MM/YYYY")
              //   },  
              // },
    // datetimeFormatter: {
    //     year: 'yyyy',
    //     month: 'MMM \'yy',
    //     day: 'dd/MM/yyyy',
    //     hour: 'HH:mm'
    //   }
    // }
            },
            yaxis: {
              // type: 'datetime',
              labels: {
    // formatter: function (val) {
    //               return val + "K"
    //             }
  },
            },
            stroke: {
              // colors: ['transparent'],
              width: 2,
            },
            fill: {
              type: 'solid',
              opacity: 0.8,
            },
            // fill: {
            //   type: 'gradient',
            //   gradient: {
            //     // shade: 'light',
            //     // type: 'horizontal',
            //     shadeIntensity: 0.25,
            //     gradientToColors: undefined,
            //     inverseColors: true,
            //     opacityFrom: 1,
            //     opacityTo: 1,
            //     stops: [50, 0, 100, 100,],
            //   }
            // },
            legend: {
              position: 'top',
              horizontalAlign: 'left',
            },


tooltip: {
  // enabled: true,
  //followCursor: true,
                
  // y: {
    custom: function({series, seriesIndex, dataPointIndex, w}) {
      var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
      // console.log(moment(new Date(data.y[0])).format("YYYY-MM-DD HH:mm:ss"))
    //  return `${data.x} : ${new Date(data.y[0]).toLocaleString("en-US", {timeZone: "Asia/Bangkok"})} - ${new Date(data.y[1]).toLocaleString("en-US", {timeZone: "Asia/Bangkok"})} `;

    return `${data.x} : ${moment(new Date(data.y[0])).format("DD/MM/YYYY HH:mm:ss")} - ${moment(new Date(data.y[1])).format("DD/MM/YYYY HH:mm:ss")} `;
                }
            // },
},
dataLabels: {
              enabled: true,
              formatter: function(val, opts) {
               
                var data = opts.globals.initialSeries[opts.seriesIndex].data[opts.dataPointIndex];
                let delta = (new Date(moment(new Date(data.y[1])).format("YYYY-MM-DD HH:mm:ss"))- new Date(moment(new Date(data.y[0])).format("YYYY-MM-DD HH:mm:ss"))) / 1000;
                var days = Math.floor(delta / 86400);
delta -= days * 86400;
var hours = Math.floor(delta / 3600) % 24;
delta -= hours * 3600;

var minutes = Math.floor(delta / 60) % 60;
delta -= minutes * 60;

var seconds = delta % 60;

  return `${days != 0 ? days+"D":""}${hours != 0?":"+hours.toString().padStart(2, "0")+"H":""}${minutes != 0?":"+minutes.toString().padStart(2, "0")+"M":""}`;
  // return `100%`;
              },
              style: {
                colors: ['#f3f4f5', '#fff']
              }
            },
            colors: [
              "#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0",
              "#3F51B5", "#546E7A", "#D4526E", "#8D5B4C", "#F86624",
              "#D7263D", "#1B998B", "#2E294E", "#F46036", "#E2C044"
            ],
  
          }
        //  var chart = new ApexCharts(document.querySelector("#chart-timeline"), options);
        //  chart.zoomX(
        //   new Date(setmindate).getTime(),
        //   new Date(setmaxdate).getTime()
        // );
        // chart.render();
        }



          }
         }
         indexseries++;
          }
        }


          }
        }
         }
     
    }else{
      this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "No Information",
            "text-h5 red--text text-center"
          );
          return;
    }

    },
    canceledit() {
      this.dialogedit = false;
    },
    savedataedit() {
      this.dialogedit = false;
    },

    async loadMachine() {
      const result = await api.listMachineByCompany(localStorage.getItem(server.COMPANYID));
      this.machinelist = result.data;
    },
    getgroupnamemachine(item) {
      return `${item.machine_id}:${item.name}`;
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

    getwork_center_group_name(item) {
      return `${item.work_center_group_id}:${item.work_center_group_name}`;
    },
    getwork_center_name(item) {
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
    
  },
 async mounted() {
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
    await this.loadWorkCenterGroup();
    await this.loadWorkCenter();
    await this.loadMachine();
    await this.loadWorkcenterganttchart("loaddata");
    this.$hideLoader();
    window.dispatchEvent(new Event('resize'));
    // var chart = new ApexCharts(document.querySelector("#chart"), options);
    //     chart.render();
  },
  beforeCreate() {
    this.$store.state.navMenu = true;
  },
 

 
};


</script>

<style>
</style>