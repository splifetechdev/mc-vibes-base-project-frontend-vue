<template>
  <v-container fluid>
    <v-card class="ma-3">
      <v-row class="mt-5 ml-5 mr-5">
        <v-col cols="12" md="12">
          <v-toolbar flat>
            <v-toolbar-title>Receive Production Order : </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              label="Search"
              append-icon="mdi-magnify"
              hide-details
              outlined
              dense
            ></v-text-field>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="desserts"
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
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            class="ml-1"
            :style="{
              color: '#2196F3',
            }"
            @click="onClickedEdit(item)"
          >
            mdi-pencil
          </v-icon>

          <v-icon
            class="ml-1"
            :style="{
              color: '#777714c9',
            }"
            @click="ReceiveItem(item)"
          >
          mdi-file-check
          </v-icon>

          <v-icon
            class="ml-1"
            :style="{
              color: '#F44336',
            }"
            @click="deleteItem(item)"
          >
          <!--  v-if="!item.wo_running_no" -->
           mdi-close-circle
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">
            Reset
          </v-btn>
        </template>
      </v-data-table>

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

      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h6"
            >Are you sure you want to Close Work Order
            {{ edit_item_doc_no }} ?</v-card-title
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

      <v-dialog v-model="dialogReceive" max-width="500px">
        <v-card>
          <v-card-title class="text-h6" >
            {{ edit_item_doc_no }}</v-card-title
          >
          <v-card-text>
            <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="7">
                    <v-text-field
                      type="number"
                      min="0"
                      v-model="dataeditrecieve.qty_receive"
                      label="Receive Now"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="5">
                    <v-btn  color="success" dark @click="ReceiveItemConfirm"
              >Receive</v-btn
            >
                  </v-col>
          </v-row>
        </v-container>
          </v-card-text>
          <!-- <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeReceive"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="ReceiveItemConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions> -->
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogchangeapproval" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Change Approval User</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12"> </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <!-- v-validate="'required'"  :rules="commonRules" -->
                  <v-select
                    :items="approver_all_show"
                    label="Old Approval"
                    item-text="name"
                    item-value="id"
                    v-model="itemchangeapproval.oldapproval"
                    outlined
                    required
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <!-- v-validate="'required'"  :rules="commonRules" -->
                  <v-select
                    :items="approver_active_show"
                    label="New Approval"
                    item-text="name"
                    item-value="id"
                    v-model="itemchangeapproval.newapproval"
                    outlined
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="cancelchangeapproval()"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="savechangeapproval()"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>
<script>
import SuccessDialog from "@/components/cards/SuccessDialog";
import SuccessDialogPush from "@/components/cards/SuccessDialogPush";
import api from "@/services/api";
import { server } from "@/services/constants";
import { imageUrl } from "@/services/constants";
export default {
  data: () => ({
    dialogchangeapproval: false,
    initial_data2: "",
    initial_dataimage: "",
    dialogApprover: false,
    image_preview_status: false,
    img_preview: "",
    commonRules: [(v1) => !!v1 || "This is required"],
    prename_th: ["นาย", "นาง", "นางสาว"],
    prename_en: ["Mr", "Miss", "Mrs."],
    approver_role: [
      { id: "ADMIN", status_name: "ADMIN" },
      { id: "APPROVAL", status_name: "APPROVAL" },
      { id: "EMPLOYEE", status_name: "EMPLOYEE" },
    ],
    emp_status: [
      { id: "A", status_name: "Active" },
      { id: "D", status_name: "Inactive" },
    ],
    signature: "",
    defaultwordbuttonsig1: "Signature Pad",
    defaultwordbuttonsig2: "seal",
    defaultwordbuttonsigimage: "image",
    showsig1: false,
    showsig2: false,
    showsigimage: false,
    showbuttonsavesig1: false,
    showbuttonsavesig2: false,
    showbuttonsavesigimage: false,
    options: {
      penColor: "#000000",
      backgroundColor: "rgb(255,255,255)",
    },
    status_list: ["Active", "Inactive"],
    dialog: false,
    dialogDelete: false,
    dialogReceive:false,
    dialogEdit: false,
    dialogAdd: false,
    text_color: "text-h5 green--text text-center",
    title: "green",
    message: "green",
    link:"",
    fullPage: true,
    search: "",
    headers: [
      {
        text: "PD Order",
        align: "start",
        sortable: false,
        value: "doc_running_no",
      },
      { text: "Item ID", value: "item_id" },
      { text: "Item Name", value: "item_name" },
      { text: "QTY Order", value: "order_qty" },
      { text: "QTY Receive", value: "qty_receive" },
      { text: "QTY Remain", value: "qty_remain" },
      // { text: "Due Date", value: "due_date_time" },
      // { text: "Status", value: "fstatus" },
      { text: "Manage", value: "actions", sortable: false },
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
    editedItem: {
      prename_th: "",
      firstname: "",
      lastname: "",
      phone: "",
      username: "",
      emp_i_d: "",
      prename_en: "",
      firstname_en: "",
      lastname_en: "",
      abbname_en: "",
      company_id: 0,
      department_id: 0,
      position_id: 0,
      dimension: "",
      sub_dimension: "",
      level: "",
      authorize_id: 0,
      emp_rate: 0.0,
      emp_status: "A",
      email: "",
      password: "",
      image: null,
      user_role: "",
      filename: "demo.png",
      approver_level1: 0,
      approver_level2: 0,
      approver_level3: 0,
      approver_level4: 0,
      approver_level5: 0,
      approver_level6: 0,
      approver_level7: 0,
      approver_level8: 0,
      approver_level9: 0,
      approver_level10: 0,
    },
    defaultItem: {
      prename_th: "",
      firstname: "",
      lastname: "",
      phone: "",
      username: "",
      user_role: "",
      emp_i_d: "",
      prename_en: "",
      firstname_en: "",
      lastname_en: "",
      abbname_en: "",
      company_id: 0,
      department_id: 0,
      position_id: 0,
      dimension: "",
      sub_dimension: "",
      level: "",
      emp_rate: 0.0,
      emp_status: "",
      email: "",
      password: "",
      image: "",
      approver_level1: 0,
      approver_level2: 0,
      approver_level3: 0,
      approver_level4: 0,
      approver_level5: 0,
      approver_level6: 0,
      approver_level7: 0,
      approver_level8: 0,
      approver_level9: 0,
      approver_level10: 0,
    },
    imageURL: null,
    toggleDisable: true,
    edit_item_id: 0,
    edit_item_doc_no: "",
    userId: 0,
    authorize: [],
    authorize_view: false,
    authorize_add: false,
    authorize_edit: false,
    authorize_del: false,
    authorize_id: 0,
    initial_data1: "",
    itemchangeapproval: {
      oldapproval: 0,
      newapproval: 0,
    },
    approver_all_show: [],
    approver_active_show: [],
    dataeditrecieve:{
      id:-1,
      order_qty:0,
      old_qty_receive:0,
      qty_receive:0
    },
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
    dialogReceive(val) {
      val || this.closeReceive();
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


    this.authorize_view = res_auth.data[0].smd_view >= 1 ? true : false;
    this.authorize_add = res_auth.data[0].smd_add >= 1 ? true : false;
    this.authorize_edit = res_auth.data[0].smd_edit >= 1 ? true : false;
    this.authorize_del = res_auth.data[0].smd_del >= 1 ? true : false;

    // this.$router.back();

    if (!this.authorize_view) {
      this.$router.back();
    }

    // ----------------- Check Authorize ---------------------------
    await this.loadItemMaster();
    // await this.loadAccountsAll();
    // await this.loadAccountsActive();

    this.$hideLoader();
    let comp_id = localStorage.getItem(server.COMPANYID);
    // await this.loadCompanyMaster(comp_id);
    // await this.loadDepartmentMaster(comp_id);
    // await this.loadDivisionMaster(comp_id);
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
    chkBtnPreviewStatus(item) {
      //item.status != 'C' || !authorize_edit
      // console.log("Preview item.status : ", item.status);
      let br = false;
      // console.log("Preview item.status : ", item.status);
      if (item.status == "C") {
        br = true;
      } else {
        br = false;
      }

      // console.log("Preview br : ", br);
      return br;
    },
    chkBtnDelStatus(item) {
      // (item.status != "C" && !item.wo_running_no) || !authorize_del;
      let br = false;
      if (!this.authorize_del) {
        br = false;
      } else if (item.status != "C" && !item.wo_running_no) {
        br = true;
      } else {
        br = false;
      }
      return br;
    },
    chkBtnEditStatus(item) {
      //item.status != 'C' || !authorize_edit
      let br = false;
      if (!this.authorize_edit) {
        br = false;
      } else if (item.status != "C") {
        br = true;
      } else {
        br = false;
      }

      // console.log("Edit br : ", br);

      return br;
    },
    async onClickedEdit(item) {
     // localStorage.setItem(server.WO_EDIT_ITEM, JSON.stringify(item));
      this.$router.push(`/receive-production-order-edit/${item.id}`);
    },
    async onClickedBack() {
      // alert("onClickedBack");
      this.$router.back();
    },
    async loadAccountsAll() {
      const resultList = await api.getAccountslist();
      this.approver_all_show = resultList.data;
    },
    async loadAccountsActive() {
      const resultList = await api.getAccountslistActive();
      this.approver_active_show = resultList.data;
    },
    async loadAccounts() {
      const result = await api.getAccounts();
      this.desserts = result.data;
    },
    async changeCompany(selectObj) {
      // console.log(selectObj)
      // alert(selectObj);
      await this.loadDepartmentMaster(selectObj);
      await this.loadPositionMaster(selectObj);
    },
    async changeDepartment(department_id) {
      this.department.filter((x, index) => {
        if (x.id == department_id) {
          this.editedItem.dimension = x.dimension;
          this.editedItem.sub_dimension = x.sub_dimension;
          return;
        }
      });
    },
    addEmp() {
      // alert("addEmp");
      this.initial_data1 = "";
      this.initial_dataimage = "";
      this.initial_data2 = "";
      this.image = null;
      this.toggleDisable = true;
    },
    getImage() {
      // console.log(`url_img : ${imageUrl}/${this.editedItem.image}`);
      this.img_preview = `${imageUrl}/${this.editedItem.image}`;
      return `${imageUrl}/${this.editedItem.image}`;
    },
    async onFileSelected(event) {
      // console.log("onFileSelected");
      try {
        const reader = new FileReader();
        reader.onload = (event) => {
          // for preview image
          this.imageURL = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);

        // for upload image
        this.editedItem.image = event.target.files[0];

        const toBase64 = (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          });

        this.img_preview = await await toBase64(this.editedItem.image);
      } catch (error) {
        console.log("onFileSelected error:", error);
      }
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },

    async loadItemMaster() {
      // const result = await api.getProdOrderPlanDraftList(
      //   localStorage.getItem(server.COMPANYID)
      // );

      const result = await api.getOrderByCompanyID(
        localStorage.getItem(server.COMPANYID)
      );
      if(result.data.length > 0) {
        this.desserts = result.data.filter(item=>item.fstatus != "Close");
      }
      
   

      // this.$showLoader();
      this.$hideLoader();
    },

    async loadCompanyMaster(id) {
      // console.log("result3:" + id);
      const result = await api.getCompanyMaster(id);
      // console.log("result3:" + JSON.stringify(result.data));
      this.company = result.data;
    },

    async loadDepartmentMaster(id) {
      const result = await api.getDepartmentByCompanyID(id);
      // console.log("result.data : ", JSON.stringify(result.data));
      this.department = result.data;
      result.data.forEach((item) => {
        this.department_list.push(item.name);
      });
    },
    async loadAuthorize() {
      const res_get = await api.getSettingGroupMenu();
      // console.log("res loadAuthorize : ", JSON.stringify(res_get));
      this.authorize = res_get.data;
    },

    async loadDivisionMaster(id) {
      const result = await api.getDivisionByCompanyID(id);
      // console.log("result.data : ", JSON.stringify(result.data));
      this.position = result.data;

      result.data.forEach((item) => {
        this.position_list.push(item.name);
      });
    },

    async loadDetailAccount(id) {
      this.showsig1 = true;
      const result = await api.getAccountDetail(id);

      this.initial_data1 = result.data.signature;
      this.editedItem.user_role = result.data.user_role;
      // alert(this.editedItem.user_role);
      this.editedItem = Object.assign({}, result.data);
      this.showsig1 = true;
      this.showbuttonsavesig1 = true;
    },

    initialize() {
      this.desserts = [
        {
          prename_th: "prename_th",
          firstname: "firstname",
          lastname: "lastname",
          emp_i_d: "emp_i_d",
          prename_en: "prename_en",
          firstname_en: "firstname_en",
          lastname_en: "lastname_en",
          abbname_en: "abbname_en",
          company_id: "company_id",
          department_id: "department_id",
          position_id: "position_id",
          emp_rate: "emp_rate",
          emp_status: "emp_status",
          user_role: "user_role",
        },
      ];
    },

    ReceiveItem(item) {
      this.edit_item_doc_no = item.doc_running_no;
      this.dataeditrecieve.id = item.id;
      this.dataeditrecieve.order_qty = item.order_qty;
      this.dataeditrecieve.old_qty_receive = item.qty_receive;
      this.dataeditrecieve.qty_receive = 0;
      this.dialogReceive = true;
    },

    deleteItem(item) {
      // this.editedIndex = this.desserts.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      // this.dialogDelete = true;

      this.edit_item_doc_no = item.doc_running_no;
      // this.editedIndex = this.desserts.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      // alert("deleteItem:" + item.doc_running_no);
    },

    async deleteItemConfirm() {
      const res = await api.closeWorkOrder(this.edit_item_doc_no, {
        status: "C",
      });
      if (res.status == 200 || res.status == 201) {
        this.dialogDelete = false;
        await this.loadItemMaster();
        this.$store.state.global_dialog = true;
        this.setupAlertDialogPush(
          true,
          "Success!!!",
          "Close Work Order success",
          "text-h5 green--text text-center",
        );
        return;
      } else if (res.status == 204) {
        this.dialogDelete = false;
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          res.data.message,
          "text-h5 red--text text-center"
        );
        return;
      } else {
        this.dialogDelete = false;
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Close Work Order Failed",
          "text-h5 red--text text-center"
        );
        return;
      }

      this.closeDelete();
    },

    async ReceiveItemConfirm() {
      if(this.dataeditrecieve.qty_receive == 0){
      this.$store.state.global_dialog = true;
      this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Receive Now",
          "text-h5 red--text text-center"
        );
        return;
    }
      const res = await api.updateOrder(this.dataeditrecieve.id, {
        qty_remain:parseInt(this.dataeditrecieve.order_qty) - (parseInt(this.dataeditrecieve.old_qty_receive)+parseInt(this.dataeditrecieve.qty_receive)),
        qty_receive:parseInt(this.dataeditrecieve.old_qty_receive)+parseInt(this.dataeditrecieve.qty_receive)
      });
      if (res.status == 200 || res.status == 201) {
        this.dialogReceive = false;
        await api.addORD_Recieve({ord_id:this.dataeditrecieve.id,date_receive:new Date(),qty_receive:parseInt(this.dataeditrecieve.qty_receive),user_id:this.userId});
        await this.loadItemMaster();
        this.$store.state.global_dialog = true;
        this.setupAlertDialogPush(
          true,
          "Success!!!",
          "Receive Work Order success",
          "text-h5 green--text text-center",
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
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeReceive() {
      this.dataeditrecieve.id = -1;
      this.dialogReceive = false;
    },
    
    closeReplace() {
      this.dialogApprover = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.repalceId = 0;
      });
    },


   

    openchangeapproval() {
      this.dialogchangeapproval = true;
    },
    async savechangeapproval() {
      if (this.itemchangeapproval.oldapproval == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Old Approval",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemchangeapproval.newapproval == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter New Approval",
          "text-h5 red--text text-center"
        );
        return;
      }

      const result = await api.ChangeapprovalUserAccount(
        this.itemchangeapproval
      );
      this.dialogchangeapproval = false;
      if (result.status == 200 || result.status == 201) {
        this.itemchangeapproval = {
          oldapproval: 0,
          newapproval: 0,
        };
        this.$hideLoader();
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Update data success",
          "text-h5 green--text text-center"
        );
        return;
      } else {
        this.$hideLoader();
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Update data Failed",
          "text-h5 red--text text-center"
        );
        return;
      }
    },
    cancelchangeapproval() {
      this.dialogchangeapproval = false;
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
    this.$store.state.navMenu = true;
  },
};
</script>
<style scoped>
.row1 {
  padding-top: 20px;
}
</style>
