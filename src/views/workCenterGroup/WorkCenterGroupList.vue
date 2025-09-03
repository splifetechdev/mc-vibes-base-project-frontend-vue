<template>
  <v-container fluid>
    <v-card class="ma-3">
      <v-row class="mt-5 ml-5 mr-5">
        <v-col cols="12" md="10">
          <v-toolbar flat>
            <v-toolbar-title>Work Center Group : </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              label="Search"
              append-icon="mdi-magnify"
              hide-details
              outlined
              dense
            ></v-text-field>
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
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-btn
              color="#254E58"
              dark
              class="mb-2 mr-2"
              @click="$router.push(`/workcenter-group-add`)"
              :disabled="!authorize_add"
            >
              Add Work Center Group
            </v-btn>

            <!-- <v-btn
              color="#254E58"
              dark
              class="mb-2"
              @click="openchangeapproval()"
              :disabled="!authorize_add"
            >
              Change Approval User
            </v-btn> -->
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="$router.push(`/workcenter-group-edit/${item.id}`)"
            v-if="authorize_edit"
            :style="{
              backgroundColor: '#E1F5FE',
              color: '#2196F3',
            }"
          >
            mdi-pencil
          </v-icon>
          <!-- <v-icon small @click="deleteItem(item)" 
          v-if="authorize_del" 
          :style="{
            backgroundColor: '#FFEBEE',
            color: '#F44336',
          }">
          mdi-delete
        </v-icon> -->
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
    dialogEdit: false,
    dialogAdd: false,
    text_color: "text-h5 green--text text-center",
    title: "green",
    message: "green",
    fullPage: true,
    search: "",
    headers: [
      {
        text: "Work Center Group ID",
        align: "start",
        sortable: false,
        value: "work_center_group_id",
      },
      { text: "Work Center Group Name", value: "work_center_group_name" },
      { text: "Manager", value: "actions", sortable: false },
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

    // ----------------- Check Authorize ---------------------------
    await this.loadItemMaste();
    // await this.loadAccountsAll();
    // await this.loadAccountsActive();

    this.$hideLoader();
    // console.log("res1:" + JSON.stringify(res1.data));
    let comp_id = localStorage.getItem(server.COMPANYID);
    // console.log("comp_id:" + comp_id);
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
      console.log(department_id);
      this.department.filter((x, index) => {
        if (x.id == department_id) {
          console.log(x.id);
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
        console.log(this.img_preview);
        // console.log("onFileSelected result image body : ", this.img_preview);

        // console.log(
        //   "onFileSelected result image body : ",
        //   this.editedItem.image
        // );
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

    async loadItemMaste() {
      const result = await api.getWorkCenterGroupCompanyID(
        localStorage.getItem(server.COMPANYID)
      );
      // console.log("result:" + JSON.stringify(result.data));
      this.desserts = result.data;
      //console.log(this.approver)
      // result.data.forEach((item) => {
      //   this.approver.push(item.firstname);
      // });

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
      console.log(this.department);
      // console.log('test dapart')
      // console.log(this.department)
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
      // console.log("loadDetailAccount:", id + "//");
      const result = await api.getAccountDetail(id);

      console.log("loadDetailAccount result: ", JSON.stringify(result.data));
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

    deleteItem(item) {
      // this.editedIndex = this.desserts.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      // this.dialogDelete = true;

      this.edit_item_id = item.id;
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      // const account = this.desserts[this.editedIndex];
      // const result = await api.deleteUserAccount(account.id);
      // this.closeDelete();

      this.editedItemDel.user_update = this.userId;
      this.desserts.splice(this.editedIndex, 1);
      const res_del = await api.deleteUserAccount(
        this.edit_item_id,
        this.editedItemDel
      );
      if (res_del.status == 200) {
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Delete data success",
          "text-h5 green--text text-center"
        );
        this.initialize();
      } else {
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Delete data Failed",
          "text-h5 red--text text-center"
        );
      }

      this.closeDelete();
      await this.loadAccounts();
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
    closeReplace() {
      this.dialogApprover = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.repalceId = 0;
      });
    },

    async save() {
      // alert("save");

      if (this.editedItem.prename_th == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter pre name",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.editedItem.firstname == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter first name",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.editedItem.lastname == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter last name",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.editedItem.username == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter username",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.editedItem.password == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter password",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.editedItem.authorize_id == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select authorize",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.editedItem.company_id == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select company",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.editedItem.department_id == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select department",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.editedItem.position_id == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select position",
          "text-h5 red--text text-center"
        );
        return;
      }

      //  if (this.signature == "") {
      //   this.setupAlertDialog(
      //     true,
      //     "Failed!!!",
      //     "Please select approver",
      //     "text-h5 red--text text-center"
      //   );
      //   return;
      // }
      this.$showLoader();
      let formData = new FormData();
      formData.append("image", this.editedItem.image);
      formData.append("signature", this.initial_data1);
      formData.append("imagesignature", this.initial_dataimage);
      formData.append("seal", this.initial_data2);
      formData.append("emp_i_d", this.editedItem.emp_i_d);
      formData.append("user_role", this.editedItem.user_role);
      formData.append("username", this.editedItem.username);
      formData.append("password", this.editedItem.password);
      formData.append("email", this.editedItem.email);
      formData.append("phone", this.editedItem.phone);
      formData.append("prename_th", this.editedItem.prename_th);
      formData.append("firstname", this.editedItem.firstname);
      formData.append("lastname", this.editedItem.lastname);
      formData.append("prename_en", this.editedItem.prename_en);
      formData.append("firstname_en", this.editedItem.firstname_en);
      formData.append("lastname_en", this.editedItem.lastname_en);
      formData.append("abbname_en", this.editedItem.abbname_en);
      formData.append("company_id", this.editedItem.company_id);
      formData.append("department_id", this.editedItem.department_id);
      formData.append("position_id", this.editedItem.position_id);
      formData.append("dimension", this.editedItem.dimension);
      formData.append("sub_dimension", this.editedItem.sub_dimension);
      formData.append("level", this.editedItem.level);
      formData.append("emp_rate", this.editedItem.emp_rate);
      formData.append("emp_status", this.editedItem.emp_status);
      formData.append("authorize_id", this.editedItem.authorize_id);
      formData.append("approver_level1", this.editedItem.approver_level1);
      formData.append("approver_level2", this.editedItem.approver_level2);
      formData.append("approver_level3", this.editedItem.approver_level3);
      formData.append("approver_level4", this.editedItem.approver_level4);
      formData.append("approver_level5", this.editedItem.approver_level5);
      formData.append("approver_level6", this.editedItem.approver_level6);
      formData.append("approver_level7", this.editedItem.approver_level7);
      formData.append("approver_level8", this.editedItem.approver_level8);
      formData.append("approver_level9", this.editedItem.approver_level9);
      formData.append("approver_level10", this.editedItem.approver_level10);

      //alert(this.editedItem.approver_level1)
      //console.log("formData : ", formData);

      if (this.editedIndex > -1) {
        formData.append("user_update", this.userId);

        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        const id = this.desserts[this.editedIndex].id;
        // alert(id);
        // const payload = this.editedItem;
        const res_edit = await api.updateUserAccount(id, formData);

        if (res_edit.data.message) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            res_edit.data.message,
            "text-h5 red--text text-center"
          );
          await this.loadAccounts();
        } else {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Success!!!",
            "Edit data success",
            "text-h5 green--text text-center"
          );
          await this.loadAccounts();
        }
      } else {
        formData.append("user_create", this.userId);

        // Insert
        const res_add = await api.addUserAccount(formData);

        console.log("res_add : ", JSON.stringify(res_add.data));
        // alert(res_add.status);

        // if (res_add.status === 201 || res_add.status === 200) {
        //   this.setupAlertDialog(
        //     true,
        //     "Success!!!",
        //     "Add data success",
        //     "text-h5 green--text text-center"
        //   );
        //   // this.initialize();
        //   this.loadAccounts();
        // } else {
        //   this.setupAlertDialog(
        //     true,
        //     "Failed!!!",
        //     "Add data Failed",
        //     "text-h5 red--text text-center"
        //   );
        // }

        if (res_add.data.message) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            res_add.data.message,
            "text-h5 red--text text-center"
          );
        } else {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Success!!!",
            "Add data success",
            "text-h5 green--text text-center"
          );
          await this.loadAccounts();
        }
      }
      this.$hideLoader();
      this.close();
    },

    async saveReplace() {
      // console.log(data)
      if (this.repalceId == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "ตรวจสอบข้อมูล!!!",
          "Please enter replace employee",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.editedItem.approver_level1 == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "ตรวจสอบข้อมูล!!!",
          "Please enter approver1",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.editedItem.approver_level2 == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "ตรวจสอบข้อมูล!!!",
          "Please enter approver2",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.editedItem.approver_level3 == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "ตรวจสอบข้อมูล!!!",
          "Please enter approver3",
          "text-h5 red--text text-center"
        );
        return;
      }
      let data1 = {};
      let data2 = {};
      let data3 = {};
      // alert(this.editedItem.approver_level1)
      data1.approver_level1 = this.editedItem.approver_level1;
      data2.approver_level2 = this.editedItem.approver_level2;
      data3.approver_level3 = this.editedItem.approver_level3;

      const res_rep1 = await api.replaceUserAccount1(this.repalceId, data1);
      const res_rep2 = await api.replaceUserAccount2(this.repalceId, data2);
      const res_rep3 = await api.replaceUserAccount3(this.repalceId, data3);
      if (res_rep1.data.message) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          res_rep1.data.message,
          "text-h5 red--text text-center"
        );
        await this.loadAccounts();
      } else {
        if (res_rep2.data.message) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            res_rep1.data.message,
            "text-h5 red--text text-center"
          );
          await this.loadAccounts();
        } else {
          if (res_rep3.data.message) {
            this.$store.state.global_dialog = true;
            this.setupAlertDialog(
              true,
              "Failed!!!",
              res_rep1.data.message,
              "text-h5 red--text text-center"
            );
            await this.loadAccounts();
          } else {
            this.$store.state.global_dialog = true;
            this.setupAlertDialog(
              true,
              "Success!!!",
              "replace data success",
              "text-h5 green--text text-center"
            );
            await this.loadAccounts();
          }
        }

        // this.$store.state.global_dialog = true;
        // this.setupAlertDialog(
        //   true,
        //   "Success!!!",
        //   "replace data success",
        //   "text-h5 green--text text-center"
        // );
        // await this.loadAccounts();
      }

      this.closeReplace();
    },
    async previewimagetobasesignature(event) {
      let setimage = "";
      try {
        const reader = new FileReader();
        reader.onload = (event) => {
          // for preview image
          // this.imageURL = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);

        // for upload image
        setimage = event.target.files[0];

        const toBase64 = (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          });

        let baseimagetosignature = await await toBase64(setimage);
        console.log(baseimagetosignature);
        this.initial_data1 = baseimagetosignature;
        console.log(this.initial_data1);

        this.$refs.firstsignaturePad.resizeCanvas();
        this.$refs.firstsignaturePad.fromDataURL(this.initial_data1);
        // this.showbuttonsavesig1 = false;
        // this.$refs.firstsignaturePad.lockSignaturePad();
      } catch (error) {
        console.log("onFileSelected error:", error);
      }
    },

    async previewimagetobasesignatureimage(event) {
      let setimage = "";
      try {
        const reader = new FileReader();
        reader.onload = (event) => {
          // for preview image
          // this.imageURL = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);

        // for upload image
        setimage = event.target.files[0];

        const toBase64 = (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          });

        this.initial_dataimage = await await toBase64(setimage);
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

    async previewimagetobasesignature2(event) {
      let setimage = "";
      try {
        const reader = new FileReader();
        reader.onload = (event) => {
          // for preview image
          // this.imageURL = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);

        // for upload image
        setimage = event.target.files[0];

        const toBase64 = (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          });

        let baseimagetosignature = await await toBase64(setimage);
        console.log(baseimagetosignature);
        this.initial_data2 = baseimagetosignature;
        console.log(this.initial_data2);

        this.$refs.secondsignaturePad.resizeCanvas();
        this.$refs.secondsignaturePad.fromDataURL(this.initial_data2);
        // this.showbuttonsavesig1 = false;
        // this.$refs.firstsignaturePad.lockSignaturePad();
      } catch (error) {
        console.log("onFileSelected error:", error);
      }
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
  },
  beforeCreate() {
    console.log("beforeCreate");
    this.$store.state.navMenu = true;
  },
};
</script>
<style scoped>
.row1 {
  padding-top: 20px;
}
</style>
