<template>
  <v-card-title>
    <v-container class="pa-1" fluid>
      <v-card class="pa-12">
        <v-card-title>
          <v-row>
            <v-col cols="12" md="12" justify="center" class="mb-6">
              <h3>Company Edit</h3>
            </v-col>
          </v-row>
        </v-card-title>

        <v-row>
          <v-col cols="12" sm="12" md="2">
            <span class="red--text">* </span>Company Code
          </v-col>
          <v-col cols="12" sm="12" md="10">
            <v-text-field v-model="itemadd.code" outlined dense></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="2">
            <span class="red--text">* </span>Company Name(TH)
          </v-col>
          <v-col cols="12" sm="12" md="10">
            <v-text-field v-model="itemadd.name_th" outlined dense></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="2">
            <span class="red--text">* </span>Company Name(EN)
          </v-col>
          <v-col cols="12" sm="12" md="10">
            <v-text-field v-model="itemadd.name_en" outlined dense></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="2">
            <span class="red--text">* </span>Address(th)
          </v-col>
          <v-col cols="12" sm="12" md="10">
            <v-text-field v-model="itemadd.address_th" outlined dense></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="2">
            <span class="red--text">* </span>Address(en)
          </v-col>
          <v-col cols="12" sm="12" md="10">
            <v-text-field v-model="itemadd.address_en" outlined dense></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="2">
            <span class="red--text">* </span>Tax ID
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-text-field v-model="itemadd.tax_id" outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="2">
            <span class="red--text">* </span> Branch ID
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-text-field v-model="itemadd.branch_id" outlined dense></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12" md="2">
            <span class="red--text">* </span>Branch Name
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-text-field v-model="itemadd.branch_name" outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="2">
            <span class="red--text">* </span>E-mail
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-text-field v-model="itemadd.email" outlined dense></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12" md="2">
            <span class="red--text">* </span>Tel
          </v-col>
          <v-col cols="12" sm="12" md="10">
            <v-text-field v-model="itemadd.tel" outlined dense></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12" md="2">
            Logo
          </v-col>
          <v-col cols="12" sm="12" md="10">
            <input type="file" accept="image/.png.jpg" @change="previewImage" class="inputsize" ref="fileimage"
              style="display: none" />
            <v-btn :style="{
              backgroundColor: '#254E58',
              color: 'white',
            }" class="widthbtnimagefile" @click="$refs.fileimage.click()" elevation="7">
              <v-icon left dark color="white"> mdi-cloud-upload </v-icon>Upload Image</v-btn>
            {{ imagename }}
            <v-col v-if="checkimageadd" class="d-flex child-flex" cols="2">
              <v-img @click="popuppreviewimage()" disabled :src="previewimage" class="grey lighten-2 mt-3 mb-5"
                aspect-ratio="1" contain>
              </v-img>
            </v-col>
            <v-col v-if="checkimageadd" class="d-flex child-flex" cols="2">
              <v-btn depressed class="buttonred mt-n7" @click="popupdeleteimage()">
                Delete !!!
              </v-btn>
            </v-col>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12" md="2">
            <span class="red--text">* </span>Status
          </v-col>
          <v-col cols="12" sm="12" md="10">

            <v-select :items="statusall" label="Status" item-text="cgm_name" item-value="id" v-model="itemadd.status"
              outlined dense required></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="2">
            <span class="red--text">* </span>Date Expire
          </v-col>
          <v-col cols="12" sm="12" md="10">
            <v-menu v-model="menu1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
              offset-y max-width="290px" min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <!--     hint="Format DD/MM/YYYY" -->
                <v-text-field disabled clearable @click:clear="
                  $nextTick(() => {
                    itemadd.expire_date = '';
                    expire_date = '';
                  })
                  " v-model="itemadd.expire_date" persistent-hint @keydown.enter="
    expire_date = parseDate(itemadd.expire_date)
    " @blur="
    expire_date = parseDate(itemadd.expire_date)
    " append-icon="mdi-calendar" v-bind="attrs" v-on="on" outlined dense></v-text-field>
              </template>

              <v-date-picker v-model="expire_date" @input="menu1 = false"></v-date-picker>
            </v-menu>




            <v-card-actions>
              <v-row justify="center">
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
import { server, companyimagemasterTMUrl } from "@/services/constants";
export default {
  components: {
    SuccessDialog,
    SuccessDialogPush,
  },
  computed: {
    computedDateFormatted() {
      return this.formatDaparseDatete(this.date);
    },
  },

  watch: {
    expire_date(val) {
      this.itemadd.expire_date = this.formatDate(this.expire_date);
    },
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  data: (vm) => ({
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
    main_id: 0,
    getcurrentimage: "",
    itemadd: {
      code: "",
      name_th: "",
      name_en: "",
      address_th: "",
      address_en: "",
      tax_id: "",
      branch_id: "",
      branch_name: "",
      email: "",
      tel: "",
      logo: "",
      status: "",
      expire_date: vm.formatDate(new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10)),
      user_update: localStorage.getItem(server.USER_ID),
    },
    expire_date: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),
    statusall: ["ACTIVE", "INACTIVE"],
  }),
  async mounted() {
    // await api.checkVersion();
    await this.loaddataEdit();
    this.$hideLoader();
  },
  methods: {
    async loaddataEdit() {
      this.main_id = this.$route.params.id;
      const result = await api.getCompanyMaster(this.main_id);
      if (result.data[0]) {
        this.itemadd.code = result.data[0].code;
        this.itemadd.name_th = result.data[0].name_th;
        this.itemadd.name_en = result.data[0].name_en;
        this.itemadd.address_th = result.data[0].address_th;
        this.itemadd.address_en = result.data[0].address_en;
        this.itemadd.tax_id = result.data[0].tax_id;
        this.itemadd.branch_id = result.data[0].branch_id;
        this.itemadd.branch_name = result.data[0].branch_name;
        this.itemadd.email = result.data[0].email;
        this.itemadd.tel = result.data[0].tel;
        this.itemadd.logo = result.data[0].logo;
        this.itemadd.status = result.data[0].status;
        this.itemadd.expire_date = atob(result.data[0].expire_date).split(
          this.txt_encode
        )[0];
        // this.getcurrentimage = result.data[0].master_images;
        this.imagename = result.data[0].logo;
        this.previewimage = `${companyimagemasterTMUrl}/${result.data[0].id}/${result.data[0].logo}`;
        if (result.data[0].logo == "" || result.data[0].logo == null) {
          this.checkimageadd = false;
        } else {
          this.checkimageadd = true;
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
      if (this.itemadd.code == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Company Code",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.name_th == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Company Name(TH)",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.name_en == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Company Name(EN)",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.address_th == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Address(th)",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.address_en == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Address(en)",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.tax_id == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Tax ID",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.branch_id == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Branch ID",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.branch_name == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Branch Name",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.email == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Email",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.tel == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter Tel",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.itemadd.status == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Status",
          "text-h5 red--text text-center"
        );
        return;
      }

      // encode expire_date


      if (this.itemadd.expire_date == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Expire Date",
          "text-h5 red--text text-center"
        );
      }
      this.itemadd.expire_date = btoa(this.itemadd.expire_date + this.txt_encode);
      this.$showLoader();
      let formData = new FormData();
      formData.append(`file`, this.image);
      formData.append("code", this.itemadd.code);
      formData.append("name_th", this.itemadd.name_th);
      formData.append("name_en", this.itemadd.name_en);
      formData.append("address_th", this.itemadd.address_th);
      formData.append("address_en", this.itemadd.address_en);
      formData.append("tax_id", this.itemadd.tax_id);
      formData.append("branch_id", this.itemadd.branch_id);
      formData.append("branch_name", this.itemadd.branch_name);
      formData.append("email", this.itemadd.email);
      formData.append("tel", this.itemadd.tel);
      formData.append("logo", this.imagename);
      formData.append("status", this.itemadd.status);
      formData.append("expire_date", this.itemadd.expire_date);
      formData.append("user_update", localStorage.getItem(server.USER_ID));


      const res_add = await api.updateCompany(this.$route.params.id, formData);
      if (res_add.status == 200) {
        this.$hideLoader();
        //   alert("debug1");
        this.$store.state.global_dialog_push = true;
        this.setupAlertDialogPush(
          true,
          "Success!!!",
          "Add data success",
          "text-h5 green--text text-center",
          "/company"
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
    // console.log("beforeCreate");
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
</style>