<template>
  <v-card class="ma-1 pa-3" elevation="8">
    <v-card-title primary-title>
      Inventory Receive PD Order # {{ json_item.doc_running_no }}
    </v-card-title>
    <v-card-text class="pa-5 my-card-gray">
      <v-row no-gutters>
        <v-col cols="12" md="1" sm="1">
          <v-text-field
            v-model="json_item.opn_id"
            label="OPN ID"
            dense
            outlined
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2" sm="2" class="pl-2">
          <v-text-field
            v-model="json_item.opn_name"
            label="OPN Desc"
            dense
            outlined
            readonly
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="2" sm="2" class="pl-2">
          <v-text-field
            v-model="json_item.wc_name"
            label="Work Center"
            dense
            outlined
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2" sm="2" class="pl-2">
          <v-text-field
            v-model="json_item.mch_name"
            label="Machine"
            dense
            outlined
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2" sm="2" class="pl-2">
          <v-text-field
            v-model="json_item.batch_count"
            label="Batch"
            dense
            outlined
            readonly
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12" md="3" sm="3">
          <v-text-field
            v-model="json_item.item_id"
            label="Item ID"
            dense
            outlined
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="4" class="pl-2">
          <v-text-field
            v-model="json_item.item_name"
            label="Item Name"
            dense
            outlined
            readonly
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="2" sm="2" class="pl-2">
          <v-text-field
            v-model="json_item.unit_name"
            label="Unit Name"
            dense
            outlined
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" sm="3" class="pl-2">
          <v-text-field
            v-model="json_item.order_qty"
            label="Order QTY"
            dense
            outlined
            readonly
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12" md="2" sm="2">
          <v-text-field
            v-model="json_item.receive_qty"
            label="QTY Receive"
            dense
            outlined
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2" sm="2" class="pl-2">
          <v-text-field
            v-model="str_qty_remain"
            label="QTY Remain"
            dense
            outlined
            readonly
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="2" sm="2" class="pl-2">
          <v-text-field
            v-model="str_order_date"
            label="Order Date"
            dense
            outlined
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2" sm="2" class="pl-2">
          <v-text-field
            v-model="str_due_date"
            label="Due Date"
            dense
            outlined
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2" sm="2" class="pl-2">
          <v-text-field
            v-model="str_due_time"
            label="Due Time"
            dense
            outlined
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider class="pt-8"></v-divider>
    <v-divider></v-divider>
    <v-row no-gutters class="pt-8">
      <v-col cols="12" md="2" sm="2">
        <v-text-field
          v-model="itemadd.qty_receive"
          label="Receive Now"
          dense
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3" sm="3" class="pl-2">
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateFormatted1"
              label="Date"
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
              dense
              outlined
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date1"
            no-title
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" md="2" sm="2" class="pl-2">
        <v-btn
          color="#2c983a"
          block
          dark
          @click="savedata(`D`)"
          :disabled="json_item.status == 'C'"
          >Receive</v-btn
        >
      </v-col>
      <v-col cols="12" md="2" sm="2" class="pl-2">
        <v-btn
          color="#2c983a"
          block
          dark
          @click="openadd()"
          :disabled="json_item.status == 'C'"
          >Close OPN</v-btn
        >
      </v-col>
      <v-col cols="12" md="2" sm="2" class="pl-2">
        <v-btn color="#d90534" block dark @click="onClickBack">Back</v-btn>
      </v-col>
    </v-row>

    <v-divider class="pt-8"></v-divider>
    <v-divider></v-divider>

    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      :items-per-page="20"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <!-- <v-icon class="mr-2" @click="openeditItem(item)" v-if="authorize_edit">
          mdi-pencil
        </v-icon> -->
        <v-icon @click="deleteItem(item)" v-if="json_item.status != 'C'">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary">
          Reset
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogadd" max-width="80%">
      <v-card>
        <!-- <v-card-title class="text-h5">Close OPN</v-card-title> -->
        <v-card-text class="pt-6">
          <v-container>
            <v-row no-gutters>
              <v-col cols="12" sm="3" md="3">
                <v-text-field
                  v-model="json_item.order_qty"
                  label="QTY Order"
                  outlined
                  dense
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" md="2" class="pl-2">
                <v-text-field
                  v-model="itemadd.qty_receive"
                  label="QTY Receive"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="2" md="2" class="pl-2">
                <v-text-field
                  v-model="itemadd.qty_kg"
                  label="QTY KG"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="2" md="2" class="pl-2">
                <v-text-field
                  v-model="json_item.batch_count"
                  label="Batch"
                  outlined
                  dense
                  readonly
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="3" md="3" class="pl-2">
                <v-text-field
                  v-model="itemadd.lot"
                  label="Lot"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="3" md="3">
                <v-autocomplete
                  label="Warehouse"
                  v-model="itemadd.wh_id"
                  outlined
                  dense
                  :items="warehouseAll"
                  item-text="fwh_name"
                  item-value="id"
                  clearable
                  v-on:change="loadLocationByWH"
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" sm="3" md="3" class="pl-2">
                <v-autocomplete
                  label="Location"
                  v-model="itemadd.lc_id"
                  outlined
                  dense
                  :items="locationList"
                  item-text="flc_name"
                  item-value="id"
                  clearable
                  v-on:change="loadSheftByLocation"
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" sm="3" md="3" class="pl-2">
                <v-autocomplete
                  label="Shelf"
                  v-model="itemadd.shf_id"
                  outlined
                  dense
                  :items="sheftList"
                  item-text="fsf_name"
                  item-value="id"
                  clearable
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" sm="3" md="3" class="pl-2">
                <v-menu
                  ref="menu5"
                  v-model="menu5"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateFormatted"
                      label="Date Receive"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      @blur="date = parseDate(dateFormatted)"
                      v-on="on"
                      dense
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    @input="menu5 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-spacer></v-spacer>
            </v-row>

            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-col cols="12" md="2" sm="2">
                <v-btn color="blue darken-1" block dark @click="savedata(`CD`)">
                  Save
                </v-btn>
              </v-col>
              <v-col cols="12" md="2" sm="2" class="pl-2">
                <v-btn color="blue darken-1" block dark @click="savedata(`C`)">
                  Save and Close
                </v-btn>
              </v-col>
              <v-col cols="12" md="2" sm="2" class="pl-2">
                <v-btn color="#cd0028" block dark @click="canceladd()"
                  >Cancel</v-btn
                >
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-container>
        </v-card-text>

        <!-- <v-card-actions>
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-col cols="12" md="2" sm="2">
              <v-btn color="blue darken-1" block dark @click="savedata()">
                Save
              </v-btn>
            </v-col>
            <v-col cols="12" md="2" sm="2" class="pl-2">
              <v-btn color="#cd0028" block dark @click="canceladd()"
                >Cancel</v-btn
              >
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-card-actions> -->
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >Are you sure you want to delete this item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm"
            >OK</v-btn
          >
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
</template>

<script>
import SuccessDialog from "@/components/cards/SuccessDialog";
import SuccessDialogPush from "@/components/cards/SuccessDialogPush";
import api from "@/services/api";
import { server } from "@/services/constants";
import Sheft from "../administrator/Sheft.vue";

export default {
  name: "ReceiveFromProductionEdit",
  props: ["json_item"],
  components: {
    SuccessDialog,
    SuccessDialogPush,
  },
  data: (vm) => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu5: false,

    new_del_receive_qty: 0,
    del_time_card_id: 0,
    delete_item_id: "",
    dialogDelete: false,
    warehouseAll: [],
    locationList: [],
    sheftList: [],
    str_qty_remain: 0,
    str_due_date: "",
    str_order_date: "",
    str_due_time: "",
    dialogAdd: false,
    text_color: "text-h5 green--text text-center",
    title: "green",
    message: "green",
    link: "",
    itemadd: {
      qty_receive: 0,
      wh_id: "",
      lc_id: "",
      shf_id: "",
      batch: 0,
      lot: "",
      user_create: localStorage.getItem(server.USER_ID),
      qty_kg: 0,
    },
    dialogadd: false,
    desserts: [],
    headers: [
      {
        text: "Receive Date",
        value: "receive_date",
      },
      { text: "QTY", value: "qty" },
      { text: "User", value: "user_name" },
      { text: "Manage", value: "actions" },
    ],
    date1: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted1: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted2: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu1: false,
    menu2: false,
  }),
  computed: {
    computedDateFormatted1() {
      return this.formatDate(this.date1);
    },
    computedDateFormatted2() {
      return this.formatDate(this.date2);
    },

    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    date1(val) {
      this.dateFormatted1 = this.formatDate(this.date1);
    },
    date2(val) {
      this.dateFormatted2 = this.formatDate(this.date2);
    },

    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  methods: {
    deleteItem(item) {
      // console.log(`deleteItem:`, JSON.stringify(item));
      // console.log(`deleteItem json_item:`, JSON.stringify(this.json_item));

      this.delete_item_id = item.id;

      this.del_time_card_id = item.time_card_id;
      this.new_del_receive_qty =
        Number(this.json_item.receive_qty) - Number(item.qty);

      this.dialogDelete = true;
    },
    closeDelete() {
      this.delete_item_id = 0;
      this.dialogDelete = false;
    },
    async deleteItemConfirm() {
      //this.new_del_receive_qty
      this.dialogDelete = false;
      this.$showLoader();
      const res_del = await api.deleteTimCardItem(
        this.delete_item_id,
        this.new_del_receive_qty,
        this.del_time_card_id,
        this.json_item.id
      );
      this.$hideLoader();
      console.log(`deleteItemConfirm res_del:`, JSON.stringify(res_del));

      if (res_del.status == 200) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Delete data success",
          "text-h5 green--text text-center"
        );
        await this.loadGetReceiveAllByCompanyIdAndId();
        await this.loadGetTimeCardReceiveAllById();
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
    async loadSheftByLocation() {
      //  getDepartmentByCompanyID
      const result = await api.getSheftMaster(this.itemadd.lc_id);
      this.sheftList = result.data;
    },
    async loadLocationByWH() {
      //  getDepartmentByCompanyID
      const result = await api.getLocationMaster(this.itemadd.wh_id);
      this.locationList = result.data;
    },
    async loadWarehouse() {
      const result = await api.getAllWarehouse();
      // const result = await api.getAllWarehouse(id);
      this.warehouseAll = result.data;
      // console.log(`warehouseAll:`, JSON.stringify(this.warehouseAll));
    },
    onClickBack() {
      this.$router.back();
    },
    async loadGetReceiveAllByCompanyIdAndId() {
      this.$showLoader();
      const res = await api.getReceiveAllByCompanyIdAndId(
        localStorage.getItem(server.COMPANYID),
        this.json_item.id
      );
      this.$hideLoader();
      // console.log(
      //   `loadGetReceiveAllByCompanyIdAndId res:`,
      //   JSON.stringify(res.data)
      // );

      this.$nextTick(() => {
        // โค้ดที่ต้องการให้ทำงานหลังจาก DOM อัปเดตเสร็จแล้ว
        this.json_item = res.data[0];

        this.str_qty_remain =
          this.json_item.order_qty - this.json_item.receive_qty;

        this.str_due_time = this.convertDueTime(this.json_item.due_time);
        this.str_order_date = this.formatDate(this.json_item.order_date);
        this.str_due_date = this.formatDate(this.json_item.due_date);
      });
      // if (res.status == 200) {
      //   this.json_item = res.data;
      // }
    },
    async loadGetTimeCardReceiveAllById() {
      this.$showLoader();
      const res = await api.getTimeCardReceiveAllById(this.json_item.id);
      this.$hideLoader();
      // console.log(`loadGetTimeCardReceiveAllById res:`, JSON.stringify(res));
      // if (res.status == 200) {
      //   this.desserts = res.data;
      // }
      this.$nextTick(() => {
        // โค้ดที่ต้องการให้ทำงานหลังจาก DOM อัปเดตเสร็จแล้ว
        this.desserts = res.data;
      });
    },
    convertDueTime(str_due_time) {
      //1970-01-01T16:00:00.000Z to HH:mm
      return str_due_time.substr(11, 5);
    },
    async openadd() {
      let all_id_prefix = [];
      let res_get = await api.getReceivePODocIdPrefix();
      let tmp_doc_running_no = this.json_item.doc_running_no;

      all_id_prefix = res_get.data;
      // console.log(`json_item`, JSON.stringify(this.json_item));
      // console.log(`all_id_prefix`, JSON.stringify(all_id_prefix));

      // console.log(`tmp_doc_running_no:`, tmp_doc_running_no);

      for (const item of all_id_prefix) {
        // console.log(`id_prefix item:`, item.id_prefix);
        tmp_doc_running_no = tmp_doc_running_no.replace(item.id_prefix, "");
      }

      // console.log(`json_item`, JSON.stringify(this.json_item));

      this.itemadd.lot = tmp_doc_running_no + "-" + this.json_item.batch_count;

      if (this.json_item.routing_shf_id != null) {
        this.itemadd.shf_id = this.json_item.routing_shf_id;
        this.itemadd.lc_id = this.json_item.shf_lc_id;
        this.itemadd.wh_id = this.json_item.shf_wh_id;

        await this.loadLocationByWH();
        await this.loadSheftByLocation();
      }
      this.dialogadd = true;
    },
    canceladd() {
      this.dialogadd = false;
    },
    async savedata(insert_status) {
      let new_qty_receive = 0;

      if (this.itemadd.qty_kg == "" || this.itemadd.qty_kg == null) {
        this.itemadd.qty_kg = 0;
      }

      if (insert_status == "C" || insert_status == "CD") {
        if (
          this.itemadd.wh_id == "" ||
          this.itemadd.lc_id == "" ||
          this.itemadd.shf_id == ""
        ) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Please select Warehouse, Location and Shelf",
            "text-h5 red--text text-center"
          );
          return;
        }
        // new_qty_receive =
        //   Number(this.itemadd.qty_receive) - Number(this.json_item.receive_qty);

        new_qty_receive = this.itemadd.qty_receive;
      } else {
        new_qty_receive = this.itemadd.qty_receive;
      }

      let post_data = {
        id: this.json_item.id,
        status: insert_status,
        company_id: localStorage.getItem(server.COMPANYID),
        wc_id: this.json_item.work_center_id,
        mch_id: this.json_item.machine_id,
        opn_ord_id: this.json_item.id,
        created_by: localStorage.getItem(server.USER_ID),
        doc_running_no: this.json_item.doc_running_no,
        opn_desc: this.json_item.opn_name,
        opn_id: this.json_item.opn_id,
        item_id: this.json_item.item_master_id,
        item_id_str: this.json_item.item_id,
        qty: new_qty_receive,
        qty_kg: this.itemadd.qty_kg,
        batch: this.json_item.batch,
        created_at: this.date1,
        wh_id: this.itemadd.wh_id,
        lc_id: this.itemadd.lc_id,
        shf_id: this.itemadd.shf_id,
        costamount: this.json_item.sum_cost,
        lot: this.itemadd.lot,
        routing_id: this.json_item.routing_id,
        batch_count: this.json_item.batch_count,
        date_receive: this.date,
      };

      // console.log(`post_data`, JSON.stringify(post_data));
      // return;

      this.dialogadd = false;
      this.$showLoader();
      const res_add = await api.saveReceiveFromPO(post_data);
      this.$hideLoader();

      // console.log(`res_add`, JSON.stringify(res_add.data));

      if (res_add.data.save_sta == true) {
        //   alert("debug1");
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Add data success",
          "text-h5 green--text text-center"
        );

        // this.json_item.status = "C";

        // this.$store.state.global_dialog_push = true;
        // this.setupAlertDialogPush(
        //   true,
        //   "Success!!!",
        //   "Add data success",
        //   "text-h5 green--text text-center",
        //   "/receive-from-production-list"
        // );

        await this.loadGetReceiveAllByCompanyIdAndId();
        await this.loadGetTimeCardReceiveAllById();
        // this.canceladd();
      } else {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          res_add.data.save_msg,
          "text-h5 red--text text-center"
        );
      }
      this.dialogadd = false;
    },
    setupAlertDialog(status, title, message, text_color) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
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
  async mounted() {
    // console.log(
    //   "ReceiveFromProductionEdit mounted: ",
    //   JSON.stringify(this.json_item)
    // );

    this.str_qty_remain = this.json_item.order_qty - this.json_item.receive_qty;

    this.str_due_time = this.convertDueTime(this.json_item.due_time);
    this.str_order_date = this.formatDate(this.json_item.order_date);
    this.str_due_date = this.formatDate(this.json_item.due_date);

    await this.loadGetTimeCardReceiveAllById();
    await this.loadWarehouse();
    this.$hideLoader();
  },
  created() {
    // console.log("ReceiveFromProductionEdit created: ", this.my_item);
  },
};
</script>

<style scoped>
.my-card-blue {
  border: 2px solid #7f91ad; /* Blue border */
  border-radius: 8px;
}

.my-card-gray {
  border: 2px solid #898989; /* Blue border */
  border-radius: 8px;
}
</style>
