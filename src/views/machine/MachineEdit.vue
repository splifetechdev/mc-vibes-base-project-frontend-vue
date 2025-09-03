<template>
  <v-card-title>
    <v-container class="pa-1" fluid>
      <v-card class="pa-12">
        <v-card-title>
          <v-row>
            <v-col cols="12" md="12" justify="center" class="mb-6">
              <h3>Machine Edit</h3>
            </v-col>
          </v-row>
        </v-card-title>
        <v-row>
          <v-col cols="12" md="12" justify="center">
            <div id="tabs" class="containertab">
              <div class="tabs">
                <div v-on:click="activetab = 1" v-bind:class="[activetab === 1 ? 'active' : '']">General</div>
                <div v-on:click="activetab = 2" v-bind:class="[activetab === 2 ? 'active' : '']">Shift</div>
                <div class="ml-1" v-on:click="activetab = 3" v-bind:class="[activetab === 3 ? 'active' : '']">U-define
                </div>
              </div>

              <div class="content">
                <div v-if="activetab === 1 && callsoopentab == true" class="tabcontent">
                  <v-row class="mb-n6">
                    <v-col cols="12" sm="12" md="5">
                      <v-text-field v-model="itemadd.machine_id" label="Machine ID" outlined dense></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="5">
                      <v-text-field v-model="itemadd.machine_name" label="Machine Name" outlined dense></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="mb-n6">
                    <v-col cols="12" sm="12" md="5">
                      <v-select :items="workCenterList" :item-text="getwc_name" item-value="id"
                        v-model="itemadd.work_center_id" label="Work Center" outlined dense></v-select>
                    </v-col>
                    <v-col cols="12" sm="12" md="5">
                      <v-select :items="status_options" v-model="itemadd.status" label="Status" outlined dense />
                    </v-col>
                  </v-row>
                </div>
                <div v-if="activetab === 2" class="tabcontent">
                  <v-row class="add-shift-container mb-5" align="center" justify="center">
                    <v-col cols="6" sm="6" md="2">
                      <v-select hide-details :items="shiftList" item-text="label" item-value="id" v-model="selectedShift"
                        label="Shift" outlined dense />
                    </v-col>
                    <v-col cols="6" sm="6" md="3" align="center" justify="center">
                      {{ this.displayShiftTime(this.selectedShift) }}
                    </v-col>
                    <v-col cols="6" sm="6" md="4">
                      <v-select hide-details :items="supervisorList" item-text="name" item-value="id"
                        v-model="selectedSupervisor" label="Supervisor" outlined dense />
                    </v-col>
                    <v-col cols="12" sm="12" md="1">
                      <v-btn depressed width="100" class="mr-3 buttonblue" @click="addMachineShift()">
                        +
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-data-table :headers="headers" :items="machine_shift_list" :search="search" :footer-props="{
                    showFirstLastPage: true,
                    firstIcon: 'mdi-arrow-collapse-left',
                    lastIcon: 'mdi-arrow-collapse-right',
                    prevIcon: 'mdi-minus',
                    nextIcon: 'mdi-plus',
                  }" sort-by="fullname" class="elevation-1">
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-icon small class="mr-2" @click="onRemoveMachineShift(item.id)" :style="{
                        backgroundColor: '#E1F5FE',
                        color: '#2196F3',
                      }">
                        mdi-delete
                      </v-icon>
                    </template>
                  </v-data-table>
                </div>
                <div v-if="activetab === 3" class="tabcontent">
                  <UDefine :udmodulename="udmodule_name" :dataudefine="itemaddudefine" @dataOnUdefine="getdataOnUdefine">
                  </UDefine>
                </div>

              </div>
            </div>
          </v-col>
        </v-row>

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
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },

  data: (vm) => ({
    tab: null,
    selectedShift: null,
    selectedSupervisor: null,
    machine_id: null,
    machine_shift_list: [],
    workCenterList: [],
    itemadd: {
      machine_id: "",
      machine_name: "",
      work_center_id: null,
      status: null,
      company_id: localStorage.getItem(server.COMPANYID),
      created_by: localStorage.getItem(server.USER_ID),
      updated_by: localStorage.getItem(server.USER_ID),
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
    supervisorOptions: [],
    prename_th: ["นาย", "นาง", "นางสาว"],
    prename_en: ["Mr", "Miss", "Mrs."],
    status_options: ["Active", "Deactive"],
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
      { text: "Shift", value: "shift_code" },
      { text: "Time", value: "period" },
      { text: "Supervisor", value: "supervisor_name" },
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
    await this.onLoadUdefineIDByCompanyAndModuleName(udgroup.MACHINE, localStorage.getItem(server.COMPANYID));
    await this.loadSupervisorList(localStorage.getItem(server.COMPANYID))
    await this.loadShift(localStorage.getItem(server.COMPANYID))
    await this.loadMachine(this.$route.params.id)
    this.udmodule_name = udgroup.MACHINE;
    await this.loadWorkCenterList();
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
    doTimePeriodsOverlap(timeString1, timeString2) {
      const parseTimeString = (timeString) => {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
      };
      const [startTime1, endTime1] = timeString1.split('-').map(parseTimeString);
      const [startTime2, endTime2] = timeString2.split('-').map(parseTimeString);
      return !(endTime1 < startTime2 || startTime1 > endTime2);
    },
    async addMachineShift() {
      const foundedShift = this.shiftList.find(shift => shift.id === this.selectedShift)
      const foundedSupervisor = this.supervisorList.find(supervisor => supervisor.id === this.selectedSupervisor)
      const isOverlap = this.machine_shift_list.some((shift) => this.doTimePeriodsOverlap(`${foundedShift.start_time}-${foundedShift.end_time}`, `${shift.start_time}-${shift.end_time}`))
      if (isOverlap) {
        this.$store.state.global_dialog_push = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "this shift period is overlap some existing shift",
          "text-h5 red--text text-center"
        );
        return
      }
      this.machine_shift_list = [...this.machine_shift_list, { ...foundedShift, supervisor_id: foundedSupervisor.id, supervisor_name: foundedSupervisor.name, shift_id: this.selectedShift, id: undefined, shift_code: foundedShift.shift_id }]
      this.selectedShift = null
      this.selectedSupervisor = null
    },
    async savedata() {
      // console.log(this.itemaddudefine);
      // return;
      // return
      if (this.itemadd.machine_id == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Machine ID",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.machine_name == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Machine Name",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.work_center_id == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Work center",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.status == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Status",
          "text-h5 red--text text-center"
        );
        return;
      }

      this.itemadd.is_active = this.itemadd.status === "Active"
      this.itemadd.name = this.itemadd.machine_name
      this.$showLoader();
      const res = await api.updateMachine(this.$route.params.id, this.itemadd);
      if (res.status == 200 || res.status == 201) {
        this.$hideLoader();
        this.itemaddudefine.module_master_id = res.data.id;
        this.itemaddudefine.date1 = this.parseDate(this.itemaddudefine.date1);
        this.itemaddudefine.date2 = this.parseDate(this.itemaddudefine.date2);
        await api.updateByModuleMasterIdANDUdefineModuleId(this.$route.params.id, this.main_u_define_module_id, this.itemaddudefine);
        if (this.machine_shift_list.length > 0) {
          await Promise.all(
            this.machine_shift_list.map(machineShift => {
              if (machineShift.id) {
                return
              }
              return api.addMachineShift(this.machine_id, {
                machine_id: this.machine_id,
                shift_id: machineShift.shift_id,
                supervisor_id: machineShift.supervisor_id,
                created_by: localStorage.getItem(server.USER_ID),
                updated_by: localStorage.getItem(server.USER_ID),
              })
            })
          )
        }
        this.$hideLoader();
        this.$store.state.global_dialog_push = true;
        this.setupAlertDialogPush(
          true,
          "Success!!!",
          "Edit data success",
          "text-h5 green--text text-center",
          "/machine"
        );
      } else {
        this.itemadd.last_purchase_price_date = this.formatDate(this.itemaddudefine.last_purchase_price_date);
        this.itemadd.cost_price_date = this.formatDate(this.itemaddudefine.cost_price_date);
        this.itemadd.sales_price_date = this.formatDate(this.itemaddudefine.sales_price_date);
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
    async loadSupervisorList(id) {
      const result = await api.getAccountsByCompany(id)
      this.supervisorList = result.data || []
      this.supervisorOptions = result.data.map(d => d.id)
    },
    async loadModelGroupList(id) {
      const result = await api.getModelGroupByCompanyID(id);
      this.modelgrouplist = result.data;
      // this.modelgrouplist = [{id:1,name:"model group fixed"}]
    },
    async loadWorkCenterList() {
      const result = await api.getWorkCenterCompanyID(
        localStorage.getItem(server.COMPANYID)
      );
      this.workCenterList = result.data || []
    },
    async loadMachineShift(machine_id) {
      const result = await api.listMachineShift(machine_id)
      this.machine_shift_list = result.data.map(machineShift => ({
        id: machineShift.id,
        shift_id: machineShift.shift_id,
        shift_code: machineShift.tbl_shift.shift_id,
        supervisor_id: machineShift.tbl_user.id,
        supervisor_name: `${machineShift.tbl_user.firstname} ${machineShift.tbl_user.lastname}`,
        start_time: machineShift.tbl_shift.start_time,
        end_time: machineShift.tbl_shift.end_time,
        period: `${machineShift.tbl_shift.start_time}-${machineShift.tbl_shift.end_time}`,
      }))
    },
    async onRemoveMachineShift(machineShiftId) {
      await api.deleteMachineShift(this.machine_id, machineShiftId)
      await this.loadMachineShift(this.machine_id, this.main_u_define_module_id)
    },
    async loadMachine(machine_id) {
      const result = await api.getMachineById(machine_id, this.main_u_define_module_id)
      const machineData = result.data
      this.machine_id = machineData.id
      this.loadMachineShift(machine_id)
      this.itemadd.machine_id = machineData.machine_id
      this.itemadd.machine_name = machineData.name
      this.itemadd.work_center_id = machineData.work_center_id
      this.itemadd.status = machineData ? "Active" : "Deactive"

      this.itemaddudefine.u_define_module_id = machineData.u_define_master.u_define_module_id;
      this.itemaddudefine.numeric1 = machineData.u_define_master.numeric1
      this.itemaddudefine.numeric2 = machineData.u_define_master.numeric2
      this.itemaddudefine.date1 = this.formatDate(machineData.u_define_master.date1);
      this.itemaddudefine.date2 = this.formatDate(machineData.u_define_master.date2);
      this.itemaddudefine.boolean1 = machineData.u_define_master.boolean1 == true ? 1 : 0;
      this.itemaddudefine.boolean2 = machineData.u_define_master.boolean2 == true ? 1 : 0;
      this.itemaddudefine.char1 = machineData.u_define_master.char1
      this.itemaddudefine.char2 = machineData.u_define_master.char2
      this.itemaddudefine.text1 = machineData.u_define_master.text1
      this.itemaddudefine.text2 = machineData.u_define_master.text2
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
    displayShiftTime(id) {
      const shift = this.shiftList.find(sh => sh.id === id)
      if (!shift) {
        return ""
      }
      return `${shift.start_time}-${shift.end_time} น.`
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
    async loadShift() {
      const result = await api.getShiftByCompanyID(localStorage.getItem(server.COMPANYID));
      this.shiftList = result.data.map(shift => ({
        period: `${shift.start_time}-${shift.end_time}`,
        label: `${shift.shift_id}-${shift.shift_name}`,
        ...shift
      }));
      this.shiftOptions = result.data.map(shift => shift.shift_id)
      //console.log(this.approver)
      // result.data.forEach((item) => {
      //   this.approver.push(item.firstname);
      // });

      // this.$showLoader();
      this.$hideLoader();
    },
    // getunitname(item){
    //   return `${item.unit_name} (${item.unit_item})`;
    // },

    getwc_name(item) {
      return `${item.wc_id}:${item.wc_name}`;
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

.add-shift-container {
  border: thin solid #CCCCCC;
}
</style>