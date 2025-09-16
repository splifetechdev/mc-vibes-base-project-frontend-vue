<template>
 <v-container fluid>
    <v-row justify="center">
    <v-col cols="12" md="8">
        <h2 class="text-center font-weight-bold mb-6">File Import System</h2>
        <!-- Employee -->
       <v-card class="mb-4 pa-6">
          <h3 class="mb-2">Employee</h3>
         <v-row align="center" >
            <v-col cols="12" xs="12" sm="4" md="3">
         <v-btn style="color:#0730e9;" color="#EFF6FF" @click="$refs.fileInputemployee.click()">
          Choose File
         </v-btn>
             <input
          ref="fileInputemployee"
          type="file"
          accept=".xlsx"
          style="display: none"
          @change="handleFileChangeemployee"
        />
                 
            </v-col>
              <v-col cols="12" xs="12" sm="8" md="3">{{ this.fileNameemployee || 'No file chosen' }}</v-col>
               <v-col cols="12" xs="12" sm="12" md="3" class="text-right">
                         <v-btn color="green" rounded  class="white--text" @click="loadTemplete('employeeimport.xlsx')">
              <span>Download Template</span>
            </v-btn>
               </v-col>
            <v-col cols="12" xs="12" sm="12" md="3" class="text-right">
              <v-btn :disabled="fileNameemployee == ''" color="#0730e9" @click="onclickImportExcel(`employee`)" class="white--text">Upload</v-btn>
            </v-col>
          </v-row>
        </v-card>

         <!-- Woker -->
       <v-card class="mb-4 pa-6">
          <h3 class="mb-2">Worker</h3>
         <v-row align="center" >
            <v-col cols="12" xs="12" sm="4" md="3">
         <v-btn style="color:#0730e9;" color="#EFF6FF" @click="$refs.fileInputworker.click()">
          Choose File
         </v-btn>
             <input
          ref="fileInputworker"
          type="file"
          accept=".xlsx"
          style="display: none"
          @change="handleFileChangeworker"
        />
                 
            </v-col>
              <v-col cols="12" xs="12" sm="8" md="3">{{ this.fileNameworker || 'No file chosen' }}</v-col>
               <v-col cols="12" xs="12" sm="12" md="3" class="text-right">
                         <v-btn color="green" rounded  class="white--text" @click="loadTemplete('workerimport.xlsx')">
              <span>Download Template</span>
            </v-btn>
               </v-col>
            <v-col cols="12" xs="12" sm="12" md="3" class="text-right">
              <v-btn :disabled="fileNameworker == ''" color="#0730e9" @click="onclickImportExcel(`worker`)" class="white--text">Upload</v-btn>
            </v-col>
          </v-row>
        </v-card>

         <!-- Item Master -->
       <v-card class="mb-4 pa-6">
          <h3 class="mb-2">Item Master</h3>
         <v-row align="center" >
            <v-col cols="12" xs="12" sm="4" md="3">
         <v-btn style="color:#0730e9;" color="#EFF6FF" @click="$refs.fileInputitemmaster.click()">
          Choose File
         </v-btn>
             <input
          ref="fileInputitemmaster"
          type="file"
          accept=".xlsx"
          style="display: none"
          @change="handleFileChangeitemmaster"
        />
                 
            </v-col>
              <v-col cols="12" xs="12" sm="8" md="3">{{ this.fileNameitemmaster || 'No file chosen' }}</v-col>
               <v-col cols="12" xs="12" sm="12" md="3" class="text-right">
                         <v-btn color="green" rounded  class="white--text" @click="loadTemplete('itemmasterimport.xlsx')">
              <span>Download Template</span>
            </v-btn>
               </v-col>
            <v-col cols="12" xs="12" sm="12" md="3" class="text-right">
              <v-btn :disabled="fileNameitemmaster == ''" color="#0730e9" @click="onclickImportExcel(`itemmaster`)" class="white--text">Upload</v-btn>
            </v-col>
          </v-row>
        </v-card>

        <!-- Work Center Group -->
       <v-card class="mb-4 pa-6">
          <h3 class="mb-2">Work Center Group</h3>
         <v-row align="center" >
            <v-col cols="12" xs="12" sm="4" md="3">
         <v-btn style="color:#0730e9;" color="#EFF6FF" @click="$refs.fileInputworkcentergroup.click()">
          Choose File
         </v-btn>
             <input
          ref="fileInputworkcentergroup"
          type="file"
          accept=".xlsx"
          style="display: none"
          @change="handleFileChangeworkcentergroup"
        />
                 
            </v-col>
              <v-col cols="12" xs="12" sm="8" md="3">{{ this.fileNameworkcentergroup || 'No file chosen' }}</v-col>
               <v-col cols="12" xs="12" sm="12" md="3" class="text-right">
                         <v-btn color="green" rounded  class="white--text" @click="loadTemplete('workcentergroupimport.xlsx')">
              <span>Download Template</span>
            </v-btn>
               </v-col>
            <v-col cols="12" xs="12" sm="12" md="3" class="text-right">
              <v-btn :disabled="fileNameworkcentergroup == ''" color="#0730e9" @click="onclickImportExcel(`workcentergroup`)" class="white--text">Upload</v-btn>
            </v-col>
          </v-row>
        </v-card>

         <!-- Work Center -->
       <v-card class="mb-4 pa-6">
          <h3 class="mb-2">Work Center</h3>
         <v-row align="center" >
            <v-col cols="12" xs="12" sm="4" md="3">
         <v-btn style="color:#0730e9;" color="#EFF6FF" @click="$refs.fileInputworkcenter.click()">
          Choose File
         </v-btn>
             <input
          ref="fileInputworkcenter"
          type="file"
          accept=".xlsx"
          style="display: none"
          @change="handleFileChangeworkcenter"
        />
                 
            </v-col>
              <v-col cols="12" xs="12" sm="8" md="3">{{ this.fileNameworkcenter || 'No file chosen' }}</v-col>
               <v-col cols="12" xs="12" sm="12" md="3" class="text-right">
                         <v-btn color="green" rounded  class="white--text" @click="loadTemplete('workcenterimport.xlsx')">
              <span>Download Template</span>
            </v-btn>
               </v-col>
            <v-col cols="12" xs="12" sm="12" md="3" class="text-right">
              <v-btn :disabled="fileNameworkcenter == ''" color="#0730e9" @click="onclickImportExcel(`workcenter`)" class="white--text">Upload</v-btn>
            </v-col>
          </v-row>
        </v-card>
        
      <!-- Machine -->
       <v-card class="mb-4 pa-6">
          <h3 class="mb-2">Machine</h3>
         <v-row align="center" >
            <v-col cols="12" xs="12" sm="4" md="3">
         <v-btn style="color:#0730e9;" color="#EFF6FF" @click="$refs.fileInputmachine.click()">
          Choose File
         </v-btn>
             <input
          ref="fileInputmachine"
          type="file"
          accept=".xlsx"
          style="display: none"
          @change="handleFileChangemachine"
        />
                 
            </v-col>
              <v-col cols="12" xs="12" sm="8" md="3">{{ this.fileNamemachine || 'No file chosen' }}</v-col>
               <v-col cols="12" xs="12" sm="12" md="3" class="text-right">
                         <v-btn color="green" rounded  class="white--text" @click="loadTemplete('machineimport.xlsx')">
              <span>Download Template</span>
            </v-btn>
               </v-col>
            <v-col cols="12" xs="12" sm="12" md="3" class="text-right">
              <v-btn :disabled="fileNamemachine == ''" color="#0730e9" @click="onclickImportExcel(`machine`)" class="white--text">Upload</v-btn>
            </v-col>
          </v-row>
        </v-card>   


      <!-- Defect Cause -->
       <v-card class="mb-4 pa-6">
          <h3 class="mb-2">Defect Cause</h3>
         <v-row align="center" >
            <v-col cols="12" xs="12" sm="4" md="3">
         <v-btn style="color:#0730e9;" color="#EFF6FF" @click="$refs.fileInputdefect_cause.click()">
          Choose File
         </v-btn>
             <input
          ref="fileInputdefect_cause"
          type="file"
          accept=".xlsx"
          style="display: none"
          @change="handleFileChangedefect_cause"
        />
                 
            </v-col>
              <v-col cols="12" xs="12" sm="8" md="3">{{ this.fileNamedefect_cause || 'No file chosen' }}</v-col>
               <v-col cols="12" xs="12" sm="12" md="3" class="text-right">
                         <v-btn color="green" rounded  class="white--text" @click="loadTemplete('defect_causeimport.xlsx')">
              <span>Download Template</span>
            </v-btn>
               </v-col>
            <v-col cols="12" xs="12" sm="12" md="3" class="text-right">
              <v-btn :disabled="fileNamedefect_cause == ''" color="#0730e9" @click="onclickImportExcel(`defect_cause`)" class="white--text">Upload</v-btn>
            </v-col>
          </v-row>
        </v-card>  
        
         <!-- DownTime Cause -->
       <v-card class="mb-4 pa-6">
          <h3 class="mb-2">DownTime Cause</h3>
         <v-row align="center" >
            <v-col cols="12" xs="12" sm="4" md="3">
         <v-btn style="color:#0730e9;" color="#EFF6FF" @click="$refs.fileInputdowntime_cause.click()">
          Choose File
         </v-btn>
             <input
          ref="fileInputdowntime_cause"
          type="file"
          accept=".xlsx"
          style="display: none"
          @change="handleFileChangedowntime_cause"
        />
                 
            </v-col>
              <v-col cols="12" xs="12" sm="8" md="3">{{ this.fileNamedowntime_cause || 'No file chosen' }}</v-col>
               <v-col cols="12" xs="12" sm="12" md="3" class="text-right">
                         <v-btn color="green" rounded  class="white--text" @click="loadTemplete('downtime_causeimport.xlsx')">
              <span>Download Template</span>
            </v-btn>
               </v-col>
            <v-col cols="12" xs="12" sm="12" md="3" class="text-right">
              <v-btn :disabled="fileNamedowntime_cause == ''" color="#0730e9" @click="onclickImportExcel(`downtime_cause`)" class="white--text">Upload</v-btn>
            </v-col>
          </v-row>
        </v-card>  

            <!-- Routing -->
       <v-card class="mb-4 pa-6">
          <h3 class="mb-2">Routing</h3>
         <v-row align="center" >
            <v-col cols="12" xs="12" sm="4" md="3">
         <v-btn style="color:#0730e9;" color="#EFF6FF" @click="$refs.fileInputrouting.click()">
          Choose File
         </v-btn>
             <input
          ref="fileInputrouting"
          type="file"
          accept=".xlsx"
          style="display: none"
          @change="handleFileChangerouting"
        />
                 
            </v-col>
              <v-col cols="12" xs="12" sm="8" md="3">{{ this.fileNamerouting || 'No file chosen' }}</v-col>
               <v-col cols="12" xs="12" sm="12" md="3" class="text-right">
                         <v-btn color="green" rounded  class="white--text" @click="loadTemplete('routingimport.xlsx')">
              <span>Download Template</span>
            </v-btn>
               </v-col>
            <v-col cols="12" xs="12" sm="12" md="3" class="text-right">
              <v-btn :disabled="fileNamerouting == ''" color="#0730e9" @click="onclickImportExcel(`routing`)" class="white--text">Upload</v-btn>
            </v-col>
          </v-row>
        </v-card>  


      </v-col>
    </v-row>

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
  </v-container>
  

</template>
<script>
import readXlsxFile from "read-excel-file";
import SuccessDialog from "@/components/cards/SuccessDialog";
import SuccessDialogPush from "@/components/cards/SuccessDialogPush";
import api from "@/services/api";
import { server,fileimportsystem } from "@/services/constants";
import { imageUrl } from "@/services/constants";

export default {
  data: () => ({
    maxSizeMB:10,
    selectedFileemployee: null,
    fileNameemployee:'',
    selectedFileworker: null,
    fileNameworker:'',
    selectedFileitemmaster: null,
    fileNameitemmaster:'',
    selectedFileworkcentergroup: null,
    fileNameworkcentergroup:'',
    selectedFileworkcenter: null,
    fileNameworkcenter:'',
    selectedFilemachine: null,
    fileNamemachine:'',
    selectedFiledefect_cause: null,
    fileNamedefect_cause:'',
    selectedFiledowntime_cause: null,
    fileNamedowntime_cause:'',
    selectedFilerouting: null,
    fileNamerouting:'',
    fileRecords: [],
    dialog: false,
    dialogDelete: false,
    dialogEdit: false,
    dialogAdd: false,
    link:"",
    text_color: "text-h5 green--text text-center",
    title: "green",
    message: "green",
    fullPage: true,
    search: "",
    desserts: [],
    company: [],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มพนักงาน" : "แก้ไขข้อมูลพนักงาน";
    },

    filteredData() {
      return this.desserts.filter((row) => {
        const name = row.firstname?.toLowerCase();
        const lastname = row.lastname?.toLowerCase();
        const username = row.username?.toLowerCase();
        const keyword = this.search.toLowerCase();

        return (
          name.includes(keyword) ||
          lastname.includes(keyword) ||
          username.includes(keyword)
        );
      });
    },
  },
  components: {
    SuccessDialog,
    SuccessDialogPush,
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogApprover(val) {
      val || this.closeReplace();
    },
  },

  async created() {
    this.initialize();
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

    // console.log("res_auth:" + JSON.stringify(res_auth.data));

    this.authorize_view = res_auth.data[0].smd_view >= 1 ? true : false;
    this.authorize_add = res_auth.data[0].smd_add >= 1 ? true : false;
    this.authorize_edit = res_auth.data[0].smd_edit >= 1 ? true : false;
    this.authorize_del = res_auth.data[0].smd_del >= 1 ? true : false;

    // console.log("res_auth:" + JSON.stringify(res_auth.data));
    // console.log("authorize_view:" + this.authorize_view);
    // console.log("authorize_add:" + this.authorize_add);
    // console.log("authorize_edit:" + this.authorize_edit);
    // console.log("authorize_del:" + this.authorize_del);
    // this.$router.back();

    if (!this.authorize_view) {
      this.$router.back();
    }

    // console.log("res1:" + JSON.stringify(res1.data));
    let comp_id = localStorage.getItem(server.COMPANYID);

    // this.userId = localStorage.getItem(server.USER_ID);
    if (this.userId && api.isLoggedIn()) {
      // this.$router.push("/");
    } else {
      this.$store.state.isLogged = false;
      this.$router.push("/login");
    }
  },

  methods: {
    async onclickImportExcel(import_type) {
      if(import_type == "employee"){
         readXlsxFile(this.selectedFileemployee).then(async(rows) => {
        // console.log(rows)
          if (
              rows[0][0] != "emp_id" ||
              rows[0][1] != "username" ||
              rows[0][2] != "email" ||
              rows[0][3] != "prename_th" ||
              rows[0][4] != "firstname" ||
              rows[0][5] != "lastname" ||
              rows[0][6] != "prename_en" ||
              rows[0][7] != "firstname_en" ||
              rows[0][8] != "lastname_en" ||
              rows[0][9] != "abbname_en" ||
              rows[0][10] != "department" ||
              rows[0][11] != "position" ||
              rows[0][12] != "division"||
              rows[0][13] != "section"||
              rows[0][14] != "level"||
              rows[0][15] != "entry_date"
            ) {
              this.selectedFileemployee = null;
              this.fileNameemployee = '';
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Error!!!",
                "File Format ไม่ถูกต้อง",
                "text-h5 red--text text-center"
              );
              await this.$hideLoader();
              return;
            }else{
            const result =  await api.import_Employee(rows);
            // console.log(result);
            if(result.status == 200 || result.status == 201){
           this.$store.state.global_dialog_push = true;
            this.setupAlertDialogPush(
              true,
              "Success!!!",
              `นำเข้าข้อมูล  <br/>
          จำนวนข้อมูลทั้งหมด ${result.data.total} รายการ <br/>
          นำเข้าสำเร็จ ${result.data.insert} รายการ  <br/>
        <span style="color:red;"> นำเข้าไม่สำเร็จ ${result.data.fail} รายการ</span> <br/>`,
              "text-h5 green--text text-center",
              "/reloadpage"
            );
             }else{
            this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Error!!!",
                "Import File Fail!!!",
                "text-h5 red--text text-center"
              );
            }
            
              await this.$hideLoader();
              return;
            }
      }).catch((err) => {
          console.error("Error reading file:", err);
        });

      }else if(import_type == "worker"){
        readXlsxFile(this.selectedFileworker).then(async(rows) => {
        // console.log(rows)
          if (
              rows[0][0] != "emp_id" ||
              rows[0][1] != "prename_th" ||
              rows[0][2] != "firstname" ||
              rows[0][3] != "lastname" ||
              rows[0][4] != "prename_en" ||
              rows[0][5] != "firstname_en" ||
              rows[0][6] != "lastname_en" ||
              rows[0][7] != "abbname_en" ||
              rows[0][8] != "department" ||
              rows[0][9] != "position" ||
              rows[0][10] != "division"||
              rows[0][11] != "section"||
              rows[0][12] != "level"||
              rows[0][13] != "entry_date"||
              rows[0][14] != "emp_rate"
            ) {
              this.selectedFileworker = null;
              this.fileNameworker = '';
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Error!!!",
                "File Format ไม่ถูกต้อง",
                "text-h5 red--text text-center"
              );
              await this.$hideLoader();
              return;
            }else{
             const result =  await api.import_Worker(rows);
            // console.log(result);
            if(result.status == 200 || result.status == 201){
           this.$store.state.global_dialog_push = true;
            this.setupAlertDialogPush(
              true,
              "Success!!!",
              `นำเข้าข้อมูล  <br/>
          จำนวนข้อมูลทั้งหมด ${result.data.total} รายการ <br/>
          นำเข้าสำเร็จ ${result.data.insert} รายการ  <br/>
        <span style="color:red;"> นำเข้าไม่สำเร็จ ${result.data.fail} รายการ</span> <br/>`,
              "text-h5 green--text text-center",
              "/reloadpage"
            );
             }else{
            this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Error!!!",
                "Import File Fail!!!",
                "text-h5 red--text text-center"
              );
            }
            
              await this.$hideLoader();
              return;
            }
      }).catch((err) => {
          console.error("Error reading file:", err);
        });

      }else if(import_type == "itemmaster"){
         readXlsxFile(this.selectedFileitemmaster).then(async(rows) => {
        // console.log(rows)
          if (
              rows[0][0] != "item_group_id" ||
              rows[0][1] != "item_type" ||
              rows[0][2] != "item_id" ||
              rows[0][3] != "item_name" ||
              rows[0][4] != "unit_id" ||
              rows[0][5] != "alias_name" ||
              rows[0][6] != "Warehouse ID" ||
              rows[0][7] != "Location ID" ||
              rows[0][8] != "Shelf ID" ||
              rows[0][9] != "last_purchase_price" ||
              rows[0][10] != "last_purchase_price_date" ||
              rows[0][11] != "cost_price" ||
              rows[0][12] != "cost_price_date" ||
              rows[0][13] != "sales_price" ||
              rows[0][14] != "sales_price_date"||
              rows[0][15] != "raw_material"||
              rows[0][16] != "std_dl"||
              rows[0][17] != "std_foh"||
              rows[0][18] != "std_voh"||
              rows[0][19] != "std_setup_time_pc"
            ) {
              this.selectedFileitemmaster = null;
              this.fileNameitemmaster = '';
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Error!!!",
                "File Format ไม่ถูกต้อง",
                "text-h5 red--text text-center"
              );
              await this.$hideLoader();
              return;
            }else{
            const result =  await api.import_Item_Master(rows);
            // console.log(result);
            if(result.status == 200 || result.status == 201){
           this.$store.state.global_dialog_push = true;
            this.setupAlertDialogPush(
              true,
              "Success!!!",
              `นำเข้าข้อมูล  <br/>
          จำนวนข้อมูลทั้งหมด ${result.data.total} รายการ <br/>
          นำเข้าสำเร็จ ${result.data.insert} รายการ  <br/>
        <span style="color:red;"> นำเข้าไม่สำเร็จ ${result.data.fail} รายการ</span> <br/>`,
              "text-h5 green--text text-center",
              "/reloadpage"
            );
             }else{
            this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Error!!!",
                "Import File Fail!!!",
                "text-h5 red--text text-center"
              );
            }
            
              await this.$hideLoader();
              return;
            }
      }).catch((err) => {
          console.error("Error reading file:", err);
        });

      }else if(import_type == "workcentergroup"){
         readXlsxFile(this.selectedFileworkcentergroup).then(async(rows) => {
        // console.log(rows)
          if (
              rows[0][0] != "work_center_group_id" ||
              rows[0][1] != "work_center_group_name"
            ) {
              this.selectedFileworkcentergroup = null;
              this.fileNameworkcentergroup = '';
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Error!!!",
                "File Format ไม่ถูกต้อง",
                "text-h5 red--text text-center"
              );
              await this.$hideLoader();
              return;
            }else{
            const result =  await api.import_Work_Center_Group(rows);
            // console.log(result);
            if(result.status == 200 || result.status == 201){
           this.$store.state.global_dialog_push = true;
            this.setupAlertDialogPush(
              true,
              "Success!!!",
              `นำเข้าข้อมูล  <br/>
          จำนวนข้อมูลทั้งหมด ${result.data.total} รายการ <br/>
          นำเข้าสำเร็จ ${result.data.insert} รายการ  <br/>
        <span style="color:red;"> นำเข้าไม่สำเร็จ ${result.data.fail} รายการ</span> <br/>`,
              "text-h5 green--text text-center",
              "/reloadpage"
            );
             }else{
            this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Error!!!",
                "Import File Fail!!!",
                "text-h5 red--text text-center"
              );
            }
            
              await this.$hideLoader();
              return;
            }
      }).catch((err) => {
          console.error("Error reading file:", err);
        });

      }else if(import_type == "workcenter"){
         readXlsxFile(this.selectedFileworkcenter).then(async(rows) => {
        // console.log(rows)
          if (
              rows[0][0] != "wc_id" ||
              rows[0][1] != "wc_name"||
              rows[0][2] != "wc_group"||
              rows[0][3] != "labor_rate"||
              rows[0][4] != "foh_rate"||
              rows[0][5] != "voh_rate"||
              rows[0][6] != "total_plan_hour"
            ) {
              this.selectedFileworkcenter = null;
              this.fileNameworkcenter = '';
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Error!!!",
                "File Format ไม่ถูกต้อง",
                "text-h5 red--text text-center"
              );
              await this.$hideLoader();
              return;
            }else{
            const result =  await api.import_Work_Center(rows);
            // console.log(result);
            if(result.status == 200 || result.status == 201){
           this.$store.state.global_dialog_push = true;
            this.setupAlertDialogPush(
              true,
              "Success!!!",
              `นำเข้าข้อมูล  <br/>
          จำนวนข้อมูลทั้งหมด ${result.data.total} รายการ <br/>
          นำเข้าสำเร็จ ${result.data.insert} รายการ  <br/>
        <span style="color:red;"> นำเข้าไม่สำเร็จ ${result.data.fail} รายการ</span> <br/>`,
              "text-h5 green--text text-center",
              "/reloadpage"
            );
             }else{
            this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Error!!!",
                "Import File Fail!!!",
                "text-h5 red--text text-center"
              );
            }
            
              await this.$hideLoader();
              return;
            }
      }).catch((err) => {
          console.error("Error reading file:", err);
        });

      }else if(import_type == "machine"){
         readXlsxFile(this.selectedFilemachine).then(async(rows) => {
        // console.log(rows)
          if (
              rows[0][0] != "machine_id" ||
              rows[0][1] != "work_center_id" ||
              rows[0][2] != "name"
            ) {
              this.selectedFilemachine = null;
              this.fileNamemachine = '';
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Error!!!",
                "File Format ไม่ถูกต้อง",
                "text-h5 red--text text-center"
              );
              await this.$hideLoader();
              return;
            }else{
            const result =  await api.import_Machine(rows);
            // console.log(result);
            if(result.status == 200 || result.status == 201){
           this.$store.state.global_dialog_push = true;
            this.setupAlertDialogPush(
              true,
              "Success!!!",
              `นำเข้าข้อมูล  <br/>
          จำนวนข้อมูลทั้งหมด ${result.data.total} รายการ <br/>
          นำเข้าสำเร็จ ${result.data.insert} รายการ  <br/>
        <span style="color:red;"> นำเข้าไม่สำเร็จ ${result.data.fail} รายการ</span> <br/>`,
              "text-h5 green--text text-center",
              "/reloadpage"
            );
             }else{
            this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Error!!!",
                "Import File Fail!!!",
                "text-h5 red--text text-center"
              );
            }
            
              await this.$hideLoader();
              return;
            }
      }).catch((err) => {
          console.error("Error reading file:", err);
        });

      }else if(import_type == "defect_cause"){
         readXlsxFile(this.selectedFiledefect_cause).then(async(rows) => {
        // console.log(rows)
          if (
              rows[0][0] != "waste_code" ||
              rows[0][1] != "description"
            ) {
              this.selectedFiledefect_cause = null;
              this.fileNamedefect_cause = '';
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Error!!!",
                "File Format ไม่ถูกต้อง",
                "text-h5 red--text text-center"
              );
              await this.$hideLoader();
              return;
            }else{
            const result =  await api.import_Defect_Cause(rows);
            // console.log(result);
            if(result.status == 200 || result.status == 201){
           this.$store.state.global_dialog_push = true;
            this.setupAlertDialogPush(
              true,
              "Success!!!",
              `นำเข้าข้อมูล  <br/>
          จำนวนข้อมูลทั้งหมด ${result.data.total} รายการ <br/>
          นำเข้าสำเร็จ ${result.data.insert} รายการ  <br/>
        <span style="color:red;"> นำเข้าไม่สำเร็จ ${result.data.fail} รายการ</span> <br/>`,
              "text-h5 green--text text-center",
              "/reloadpage"
            );
             }else{
            this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Error!!!",
                "Import File Fail!!!",
                "text-h5 red--text text-center"
              );
            }
            
              await this.$hideLoader();
              return;
            }
      }).catch((err) => {
          console.error("Error reading file:", err);
        });

      }else if(import_type == "downtime_cause"){
         readXlsxFile(this.selectedFiledowntime_cause).then(async(rows) => {
        // console.log(rows)
          if (
              rows[0][0] != "reason_code" ||
              rows[0][1] != "description"
            ) {
              this.selectedFiledowntime_cause = null;
              this.fileNamedowntime_cause = '';
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Error!!!",
                "File Format ไม่ถูกต้อง",
                "text-h5 red--text text-center"
              );
              await this.$hideLoader();
              return;
            }else{
            const result =  await api.import_DownTime_Cause(rows);
            // console.log(result);
            if(result.status == 200 || result.status == 201){
           this.$store.state.global_dialog_push = true;
            this.setupAlertDialogPush(
              true,
              "Success!!!",
              `นำเข้าข้อมูล  <br/>
          จำนวนข้อมูลทั้งหมด ${result.data.total} รายการ <br/>
          นำเข้าสำเร็จ ${result.data.insert} รายการ  <br/>
        <span style="color:red;"> นำเข้าไม่สำเร็จ ${result.data.fail} รายการ</span> <br/>`,
              "text-h5 green--text text-center",
              "/reloadpage"
            );
             }else{
            this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Error!!!",
                "Import File Fail!!!",
                "text-h5 red--text text-center"
              );
            }
            
              await this.$hideLoader();
              return;
            }
      }).catch((err) => {
          console.error("Error reading file:", err);
        });

      }else if(import_type == "routing"){
         readXlsxFile(this.selectedFilerouting).then(async(rows) => {
        // console.log(rows)
          if (
              rows[0][0] != "rtg_id" ||
              rows[0][1] != "item_master_id"||
              rows[0][2] != "opn_id"||
              rows[0][3] != "opn_name"||
              rows[0][4] != "work_center_id"||
              rows[0][5] != "no_of_machine"||
              rows[0][6] != "machine_id"||
              rows[0][7] != "unit_id"||
              rows[0][8] != "predecessor"||
              rows[0][9] != "dependency"||
              rows[0][10] != "setup_time"||
              rows[0][11] != "setup_timehr_per"||
              rows[0][12] != "eoq"||
              rows[0][13] != "pcs_hr"||
              rows[0][14] != "hr_pcs"||
              rows[0][15] != "qty_per"||
              rows[0][16] != "qty_by"||
              rows[0][17] != "scrap"||
              rows[0][18] != "batch"||
              rows[0][19] != "over_lap_time"||
              rows[0][20] != "over_lap_unit"||
              rows[0][21] != "std_cost"||
              rows[0][22] != "iot_um_conv"
            ) {
              this.selectedFilerouting = null;
              this.fileNamerouting = '';
              this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Error!!!",
                "File Format ไม่ถูกต้อง",
                "text-h5 red--text text-center"
              );
              await this.$hideLoader();
              return;
            }else{
            const result =  await api.import_Routing(rows);
            // console.log(result);
            if(result.status == 200 || result.status == 201){
           this.$store.state.global_dialog_push = true;
            this.setupAlertDialogPush(
              true,
              "Success!!!",
              `นำเข้าข้อมูล  <br/>
          จำนวนข้อมูลทั้งหมด ${result.data.total} รายการ <br/>
          นำเข้าสำเร็จ ${result.data.insert} รายการ  <br/>
        <span style="color:red;"> นำเข้าไม่สำเร็จ ${result.data.fail} รายการ</span> <br/>`,
              "text-h5 green--text text-center",
              "/reloadpage"
            );
             }else{
            this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Error!!!",
                "Import File Fail!!!",
                "text-h5 red--text text-center"
              );
            }
            
              await this.$hideLoader();
              return;
            }
      }).catch((err) => {
          console.error("Error reading file:", err);
        });

      }else{
         this.$store.state.global_dialog = true;
              this.setupAlertDialog(
                true,
                "Error!!!",
                "Upload Fail!!!",
                "text-h5 red--text text-center"
              );
              await this.$hideLoader();
              return;
      }
    
      this.log_insert_count = 0;
      this.log_insert_list = [];
      this.log_insert_str = "";

      this.$showLoader();

 

      // console.log("log_insert_count:", this.log_insert_count);
      // console.log("log_insert_list:", JSON.stringify(this.log_insert_list));

      this.import_status = true;

      await this.$hideLoader();
    },
   deleteUploadedFile: function(fileRecord) {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord
      );
    },
    filesSelected: function(fileRecordsNewlySelected) {
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error
      );
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
        validFileRecords
      );
    },
    onBeforeDelete: function(fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        if (confirm("Are you sure you want to delete?")) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
        }
      }
    },
    fileDeleted: function(fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },
    setupAlertDialogPush(status, title, message, text_color, link) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
      this.link = link;
    },
    setupAlertDialog(status, title, message, text_color) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
    },
    // triggerFileSelectemployee() {
    //   this.$refs.fileInputemployee.click();
    // },
    handleFileChangeemployee(event) {
      // console.log(event)
      const file = event.target.files[0];
      if (!file) return;
      // ตรวจนามสกุล
      if (!file.name.endsWith(".xlsx")) {
        alert("Invalid file type. Only .xlsx allowed.");
        return;
      }
      // ตรวจขนาดไฟล์
      if (file.size > this.maxSizeMB * 1024 * 1024) {
        // alert(`File should not exceed ${this.maxSizeMB}MB.`);
        return;
      }
      this.selectedFileemployee = file;
      this.fileNameemployee = file.name;
      // console.log(this.selectedFileemployee)
      // console.log(this.fileNameemployee)
    },

        handleFileChangeworker(event) {
      // console.log(event)
      const file = event.target.files[0];
      if (!file) return;

      // ตรวจนามสกุล
      if (!file.name.endsWith(".xlsx")) {
        alert("Invalid file type. Only .xlsx allowed.");
        return;
      }

      // ตรวจขนาดไฟล์
      if (file.size > this.maxSizeMB * 1024 * 1024) {
        // alert(`File should not exceed ${this.maxSizeMB}MB.`);
        return;
      }

      this.selectedFileworker = file;
      this.fileNameworker = file.name;
      // console.log(this.selectedFileworker)
      // console.log(this.fileNameworker)
    },

      handleFileChangeitemmaster(event) {
      // console.log(event)
      const file = event.target.files[0];
      if (!file) return;

      // ตรวจนามสกุล
      if (!file.name.endsWith(".xlsx")) {
        alert("Invalid file type. Only .xlsx allowed.");
        return;
      }

      // ตรวจขนาดไฟล์
      if (file.size > this.maxSizeMB * 1024 * 1024) {
        // alert(`File should not exceed ${this.maxSizeMB}MB.`);
        return;
      }

      this.selectedFileitemmaster = file;
      this.fileNameitemmaster = file.name;
      // console.log(this.selectedFileitemmaster)
      // console.log(this.fileNameitemmaster)
    },

    handleFileChangeworkcentergroup(event) {
      // console.log(event)
      const file = event.target.files[0];
      if (!file) return;

      // ตรวจนามสกุล
      if (!file.name.endsWith(".xlsx")) {
        alert("Invalid file type. Only .xlsx allowed.");
        return;
      }

      // ตรวจขนาดไฟล์
      if (file.size > this.maxSizeMB * 1024 * 1024) {
        // alert(`File should not exceed ${this.maxSizeMB}MB.`);
        return;
      }

      this.selectedFileworkcentergroup = file;
      this.fileNameworkcentergroup = file.name;
    },

     handleFileChangeitemmaster(event) {
      // console.log(event)
      const file = event.target.files[0];
      if (!file) return;

      // ตรวจนามสกุล
      if (!file.name.endsWith(".xlsx")) {
        alert("Invalid file type. Only .xlsx allowed.");
        return;
      }

      // ตรวจขนาดไฟล์
      if (file.size > this.maxSizeMB * 1024 * 1024) {
        // alert(`File should not exceed ${this.maxSizeMB}MB.`);
        return;
      }

      this.selectedFileitemmaster = file;
      this.fileNameitemmaster = file.name;
      // console.log(this.selectedFileitemmaster)
      // console.log(this.fileNameitemmaster)
    },

      handleFileChangeworkcenter(event) {
      // console.log(event)
      const file = event.target.files[0];
      if (!file) return;

      // ตรวจนามสกุล
      if (!file.name.endsWith(".xlsx")) {
        alert("Invalid file type. Only .xlsx allowed.");
        return;
      }

      // ตรวจขนาดไฟล์
      if (file.size > this.maxSizeMB * 1024 * 1024) {
        // alert(`File should not exceed ${this.maxSizeMB}MB.`);
        return;
      }

      this.selectedFileworkcenter = file;
      this.fileNameworkcenter = file.name;
    },

      handleFileChangemachine(event) {
      // console.log(event)
      const file = event.target.files[0];
      if (!file) return;

      // ตรวจนามสกุล
      if (!file.name.endsWith(".xlsx")) {
        alert("Invalid file type. Only .xlsx allowed.");
        return;
      }

      // ตรวจขนาดไฟล์
      if (file.size > this.maxSizeMB * 1024 * 1024) {
        // alert(`File should not exceed ${this.maxSizeMB}MB.`);
        return;
      }

      this.selectedFilemachine = file;
      this.fileNamemachine = file.name;
    },

      handleFileChangedefect_cause(event) {
      // console.log(event)
      const file = event.target.files[0];
      if (!file) return;

      // ตรวจนามสกุล
      if (!file.name.endsWith(".xlsx")) {
        alert("Invalid file type. Only .xlsx allowed.");
        return;
      }

      // ตรวจขนาดไฟล์
      if (file.size > this.maxSizeMB * 1024 * 1024) {
        // alert(`File should not exceed ${this.maxSizeMB}MB.`);
        return;
      }

      this.selectedFiledefect_cause = file;
      this.fileNamedefect_cause = file.name;
    },

      handleFileChangedowntime_cause(event) {
      // console.log(event)
      const file = event.target.files[0];
      if (!file) return;

      // ตรวจนามสกุล
      if (!file.name.endsWith(".xlsx")) {
        alert("Invalid file type. Only .xlsx allowed.");
        return;
      }

      // ตรวจขนาดไฟล์
      if (file.size > this.maxSizeMB * 1024 * 1024) {
        // alert(`File should not exceed ${this.maxSizeMB}MB.`);
        return;
      }

      this.selectedFiledowntime_cause = file;
      this.fileNamedowntime_cause = file.name;
    },

       handleFileChangerouting(event) {
      // console.log(event)
      const file = event.target.files[0];
      if (!file) return;

      // ตรวจนามสกุล
      if (!file.name.endsWith(".xlsx")) {
        alert("Invalid file type. Only .xlsx allowed.");
        return;
      }

      // ตรวจขนาดไฟล์
      if (file.size > this.maxSizeMB * 1024 * 1024) {
        // alert(`File should not exceed ${this.maxSizeMB}MB.`);
        return;
      }

      this.selectedFilerouting = file;
      this.fileNamerouting = file.name;
    },
    initialize() {
      this.$hideLoader();
    },
     async loadTemplete(xlsxname) {
        try {
          const delay = (delayInms) => {
            return new Promise(resolve => setTimeout(resolve, delayInms));
          };

          const downloaddata = async () => {
            this.$showLoader();
            // await delay(2000);
            window.open(`${fileimportsystem}/${xlsxname}`, `_blank`); // เปิดแท็บใหม่
            this.$hideLoader();
            // await delay(2000);
            
          };

         await downloaddata();

      } catch (error) {
        console.error("An error occurred while loading template:", error);
      }
    },
  },
  beforeCreate() {
    this.$store.state.navMenu = true;
  },
};
</script>
<style scoped>
.row1 {
  padding-top: 20px;
}
</style>
