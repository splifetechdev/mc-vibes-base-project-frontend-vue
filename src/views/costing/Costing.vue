<template>
  <v-container fluid>
    <v-card class="ma-3">
      <v-row class="mt-5 ml-5 mr-5">
        <v-col cols="12" md="12">
          <v-row>
            <v-toolbar-title class="text-h6 mt-4"
              >Production Costing Report:
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-col cols="12" md="2">
              <!-- <v-autocomplete
                label="Work order"
                v-model="itemsearch.doc_running_no"
                hide-details
                outlined
                dense
                :items="workOrders"
                item-text="doc_running_no"
                item-value="doc_running_no"
                clearable
              ></v-autocomplete> -->
              <v-text-field
                label="ORD"
                v-model="itemsearch.doc_running_no"
                hide-details
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <!-- <v-autocomplete
                label="Work Center"
                v-model="itemsearch.item_id"
                hide-details
                outlined
                dense
                :items="workCenters"
                :item-text="getwork_center_name"
                item-value="id"
                clearable
              ></v-autocomplete> -->
              <v-text-field
                label="Item ID"
                v-model="itemsearch.item_id"
                hide-details
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <!-- <v-autocomplete
                label="Machine"
                v-model="itemsearch.item_name"
                hide-details
                outlined
                dense
                :items="machines"
                :item-text="getmachine_name"
                item-value="id"
                clearable
              ></v-autocomplete> -->
              <v-text-field
                label="Item Name"
                v-model="itemsearch.item_name"
                hide-details
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-autocomplete
                v-model="itemsearch.status"
                :items="doc_status"
                outlined
                dense
                label="Status"
                item-text="status_name"
                item-value="id"
                clearable
                @click:clear="
                  $nextTick(() => {
                    itemsearch.status = '';
                  })
                "
              ></v-autocomplete>
            </v-col>
            <!-- <v-col cols="12" md="2" justify="center">
              <v-btn color="#1f51ff" dark class="mb-2 mr-2" @click="SearchData">
                Search
              </v-btn>
            </v-col> -->
          </v-row>

          <v-row>
            <v-toolbar-title class="text-h6 mt-4" style="visibility: hidden;"
              >Production Costing Report:
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-col cols="12" md="2">
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    clearable
                    @click:clear="
                      $nextTick(() => {
                        itemsearch.date1 = '';
                        date1 = '';
                      })
                    "
                    v-model="itemsearch.date1"
                    persistent-hint
                    @keydown.enter="date1 = parseDate(itemsearch.date1)"
                    @blur="date1 = parseDate(itemsearch.date1)"
                    append-icon="mdi-calendar"
                    label="วันที่ปิดคำสั่งผลิต"
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    dense
                  ></v-text-field>
                </template>

                <v-date-picker
                  v-model="date1"
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="2">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    clearable
                    @click:clear="
                      $nextTick(() => {
                        itemsearch.date2 = '';
                        date2 = '';
                      })
                    "
                    v-model="itemsearch.date2"
                    persistent-hint
                    @keydown.enter="date2 = parseDate(itemsearch.date2)"
                    @blur="date2 = parseDate(itemsearch.date2)"
                    append-icon="mdi-calendar"
                    label="วันที่ปิดคำสั่งผลิต"
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    dense
                  ></v-text-field>
                </template>

                <v-date-picker
                  v-model="date2"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="2" justify="center">
              <v-btn color="#1f51ff" dark class="mb-2 mr-2" @click="SearchData">
                Search
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!-- disable-pagination -->
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        sort-by="fullname"
        class="elevation-1"
        hide-default-header
        disable-sort
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          prevIcon: 'mdi-minus',
          nextIcon: 'mdi-plus',
        }"
      >
        <template v-slot:header="props">
          <thead
            class="v-data-table-header"
            style="background: #0730e9;border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #0730e9;"
          >
            <tr>
              <th
                rowspan="4"
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #0730e9;color: #ffffff;text-align: center;"
              >
                ORD
              </th>
              <th
                rowspan="4"
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #0730e9;color: #ffffff;text-align: center;"
              >
                Status
              </th>
              <th
                rowspan="4"
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #0730e9;color: #ffffff;text-align: center;"
              >
                Item
              </th>
              <th
                rowspan="4"
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #0730e9;color: #ffffff;text-align: center;"
              >
                Item Name
              </th>
              <th
                rowspan="4"
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #0730e9;color: #ffffff;text-align: center;"
              >
                Standard HRS
              </th>
              <th
                rowspan="4"
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #0730e9;color: #ffffff;text-align: center;"
              >
                ACTUAL HRS
              </th>
            </tr>

            <tr>
              <td
                colspan="4"
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;border-bottom:1px solid #ffffff;background: #0730e9;color:#ffffff;text-align: center;"
              >
                Standard
              </td>
              <td
                colspan="4"
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #0730e9;border-bottom:1px solid #ffffff;color: #ffffff;text-align: center;"
              >
                ACTUAL
              </td>
              <td
                colspan="5"
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #0730e9;border-bottom:1px solid #ffffff;color: #ffffff;text-align: center;"
              >
                Varience
              </td>
            </tr>
            <tr>
              <td
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #1f44eb;border-bottom:1px solid #ffffff;color: #ffffff;text-align: center;"
              >
                DL
              </td>
              <td
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #1f44eb;border-bottom:1px solid #ffffff;color: #ffffff;text-align: center;"
              >
                FOH
              </td>
              <td
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #1f44eb;border-bottom:1px solid #ffffff;color: #ffffff;text-align: center;"
              >
                VOH
              </td>
              <td
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #1f44eb;border-bottom:1px solid #ffffff;color: #ffffff;text-align: center;"
              >
                Total
              </td>
              <td
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #1f44eb;border-bottom:1px solid #ffffff;color: #ffffff;text-align: center;"
              >
                DL
              </td>
              <td
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #1f44eb;border-bottom:1px solid #ffffff;color: #ffffff;text-align: center;"
              >
                FOH
              </td>
              <td
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #1f44eb;border-bottom:1px solid #ffffff;color: #ffffff;text-align: center;"
              >
                VOH
              </td>
              <td
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #1f44eb;border-bottom:1px solid #ffffff;color: #ffffff;text-align: center;"
              >
                Total
              </td>
              <td
                colspan="2"
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #1f44eb;border-bottom:1px solid #ffffff;color: #ffffff;text-align: center;"
              >
                DL
              </td>
              <td
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #1f44eb;border-bottom:1px solid #ffffff;color: #ffffff;text-align: center;"
              >
                FOH
              </td>
              <td
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #1f44eb;border-bottom:1px solid #ffffff;color: #ffffff;text-align: center;"
              >
                VOH
              </td>
              <td
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #1f44eb;border-bottom:1px solid #ffffff;color: #ffffff;text-align: center;"
              >
                Total
              </td>
            </tr>
            <tr>
              <td
                colspan="4"
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #0730e9;color: #ffffff;text-align: center;"
              ></td>
              <td
                colspan="4"
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #0730e9;color: #ffffff;text-align: center;"
              ></td>

              <td
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #516EEF;color: #ffffff;text-align: center;"
              >
                HR
              </td>
              <td
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #516EEF;color: #ffffff;text-align: center;"
              >
                RATE
              </td>
              <td
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #516EEF;color: #ffffff;text-align: center;"
              >
                HR
              </td>
              <td
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #516EEF;color: #ffffff;text-align: center;"
              >
                HR
              </td>
              <td
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #516EEF;color: #ffffff;text-align: center;"
              ></td>
            </tr>
            <!-- <tr>
              <th
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #0730e9;color: #ffffff"
                v-for="(h, i) in headers"
                :key="i"
                class="text-center parent-header td-border-style"
                :rowspan="h.triplechildren ? 3 : h.children ? 1 : 2"
                :colspan="
                  h.triplechildren
                    ? h.triplechildren.length
                    : h.children
                    ? h.children.length
                    : 1
                "
              >
                {{ h.triplechildren ? h.triplechildren.length : "" }}
                {{ h.text }}
              </th>
            </tr>
            <tr>
              <th
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: red;"
                v-for="(h1, i1) in getSubHeader(headers)"
                :key="i1"
                class="text-center child-header td-border-style"
              >
                {{ h1.title }}
              </th>
            </tr>
            <tr>
              <th
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: blue;color:#ffffff"
                v-for="(h2, i2) in getSubtripleHeader(headers)"
                :key="i2"
                class="text-center child-header td-border-style"
              >
                {{ h2.title }}
              </th>
            </tr> -->
          </thead>
        </template>
        <!-- <template #item="props">
          <tr>
            <td v-for="(c, ci) in getRows(props.item)" :key="ci">
              {{ c }}
            </td>
          </tr>
        </template> -->
        <template v-slot:body="{ items }">
          <tbody class="text-center">
            <tr v-for="item in items" :key="item.id">
              <td>
                <v-btn text color="#2561eb" @click="onclickToDetails(item)">
                  {{ item.doc_running_no ? item.doc_running_no : "-" }}
                </v-btn>
              </td>
              <td>
                {{ item.status ? item.status : "-" }}
              </td>
              <td class="text-left" width="200">
                {{ item.item_id ? item.item_id : "-" }}
              </td>
              <td class="text-left">
                {{ item.item_name ? item.item_name : "-" }}
              </td>

              <td>
                {{
                  item.std_hours
                    ? fntolocalestringnumber(Number(item.std_hours))
                    : "-"
                }}
              </td>
              <td>
                {{
                  item.act_hours
                    ? fntolocalestringnumber(Number(item.act_hours))
                    : "-"
                }}
              </td>
              <td>
                {{
                  item.std_labor
                    ? fntolocalestringnumber(Number(item.std_labor))
                    : "-"
                }}
              </td>
              <td>
                {{
                  item.std_foh
                    ? fntolocalestringnumber(Number(item.std_foh))
                    : "-"
                }}
              </td>
              <td>
                {{
                  item.std_voh
                    ? fntolocalestringnumber(Number(item.std_voh))
                    : "-"
                }}
              </td>
              <td>
                {{
                  item.sum_std
                    ? fntolocalestringnumber(Number(item.sum_std))
                    : "-"
                }}
              </td>
              <td>
                {{
                  item.act_labor
                    ? fntolocalestringnumber(Number(item.act_labor))
                    : "-"
                }}
              </td>
              <td>
                {{
                  item.act_foh
                    ? fntolocalestringnumber(Number(item.act_foh))
                    : "-"
                }}
              </td>
              <td>
                {{
                  item.act_voh
                    ? fntolocalestringnumber(Number(item.act_voh))
                    : "-"
                }}
              </td>
              <td>
                {{
                  item.sum_act
                    ? fntolocalestringnumber(Number(item.sum_act))
                    : "-"
                }}
              </td>
              <td>
                {{
                  item.V_DL_Hours
                    ? fntolocalestringnumber(Number(item.V_DL_Hours))
                    : "-"
                }}
              </td>
              <td>
                {{
                  item.V_DL_Rate
                    ? fntolocalestringnumber(Number(item.V_DL_Rate))
                    : "-"
                }}
              </td>
              <td>
                {{
                  item.V_foh ? fntolocalestringnumber(Number(item.V_foh)) : "-"
                }}
              </td>
              <td>
                {{
                  item.V_voh ? fntolocalestringnumber(Number(item.V_voh)) : "-"
                }}
              </td>
              <td>
                {{
                  item.sum_v ? fntolocalestringnumber(Number(item.sum_v)) : "-"
                }}
              </td>
            </tr>
          </tbody>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <!-- <v-icon
          small
          class="mr-2"
          @click="$router.push(`/item-edit/${item.id}`)"
          v-if="authorize_edit"
          :style="{
            backgroundColor: '#E1F5FE',
            color: '#2196F3',
          }"
        >
          mdi-pencil
        </v-icon> -->
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
    </v-card>
    <SuccessDialog
      :status="dialogAdd"
      :text_color="text_color"
      :title="title"
      :message="message"
    />
    <v-dialog v-model="confirmDeleteDlg" max-width="290">
      <v-card>
        <v-card-title primary-title>
          Confirm Delete
        </v-card-title>

        <v-card-text class="body">
          Are you sure to delete this timecard? You cannot restore it after
          clicking confirm.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="confirmDeleteDlg = false">
            Cancel
          </v-btn>

          <v-btn color="error" text @click="confirmDelete">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import SuccessDialog from "@/components/cards/SuccessDialog";
import SuccessDialogPush from "@/components/cards/SuccessDialogPush";
import {
  tolocalestringnumber,
  stringcommatonumber,
} from "../jsfunction/tolocalestringnumber";
import api from "@/services/api";
import { server } from "@/services/constants";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
export default {
  data: (vm) => ({
    menu1: false,
    menu2: false,
    date1: "",
    date2: "",
    doc_status: [
      { id: "A", status_name: "Approve" },
      { id: "C", status_name: "Close" },
    ],
    itemsAlldata: [],
    itemsearch: {
      doc_running_no: "",
      item_id: "",
      item_name: "",
      status: "C",
      date1: "",
      date2: "",
    },
    menu: false,
    dateFormatted1: "",
    docNoList: [],
    workOrders: [],
    docGroups: [],
    workCenters: [],
    machines: [],
    opnOrdList: [],
    confirmDeleteDlg: false,
    selectedTimecardId: null,
    selectedWorkCenterId: null,
    selectedDocGroupId: null,
    selectedDocRunningNo: null,
    selectedOpnOrdId: null,
    selectedDates: null,
    selectedStatus: "save",
    statusOptions: ["save", "post"],
    list: [],
    headers: [
      {
        text: "ORD",
        value: "doc_running_no",
        align: "center",
        divider: true,
      },
      { text: "Status", value: "status", align: "center" },
      { text: "Item", value: "item_id", align: "center" },
      { text: "Item Name", value: "item_name", align: "center" },
      {
        text: "Standard HRS",
        value: "std_hours",
        sortable: false,
        align: "center",
      },
      {
        text: "ACTUAL HRS",
        value: "act_hours",
        sortable: false,
        align: "center",
      },
      {
        text: "Standard",
        value: "std_labor",
        sortable: false,
        align: "center",
        divider: true,
        children: [
          { title: "DL", value: "std_labor" },
          { title: "FOH", value: "std_foh" },
          { title: "VOH", value: "std_voh" },
        ],
      },
      // { text: "STD FOH", value: "std_foh", sortable: false },
      // { text: "STD VOH", value: "std_voh", sortable: false },
      // { text: "ACT DL", value: "act_labor", sortable: false },
      // { text: "ACT FOH", value: "act_foh", sortable: false },
      // { text: "ACT VOH", value: "act_voh", sortable: false },
      {
        text: "ACTUAL",
        value: "act_labor",
        sortable: false,
        align: "center",
        children: [
          { title: "DL", value: "act_labor" },
          { title: "FOH", value: "act_foh" },
          { title: "VOH", value: "act_voh" },
        ],
      },
      {
        text: "Varience",
        value: "V_DL_Hours",
        sortable: false,
        align: "center",
        divider: true,
        children: [
          { title: "DL HR", value: "V_DL_Hours" },
          // { title: "DL RATE", value: "V_DL_Rate" },
          { title: "FOH HR", value: "V_foh" },
          { title: "VOH HR", value: "V_voh" },
        ],
        triplechildren: [
          { title: "DL", value: "std_labor" },
          { title: "FOH", value: "std_foh" },
          { title: "DL", value: "std_labor" },
          { title: "FOH", value: "std_foh" },
        ],
      },

      // {
      //   text: "V DL HR",
      //   value: "V_DL_Hours",
      //   sortable: false,
      //   align: "center",
      // },
      // {
      //   text: "V DL RATE",
      //   value: "V_DL_Rate",
      //   sortable: false,
      //   align: "center",
      // },
      // { text: "V FOH", value: "V_foh", sortable: false, align: "center" },
      // { text: "V VOH", value: "V_voh", sortable: false, align: "center" },
    ],
    desserts: [],
    itemchangeapproval: {
      oldapproval: 0,
      newapproval: 0,
    },
    authorize_add: false,
    authorize_edit: false,
    authorize_del: false,
    approver_active_show: [],
    approver_all_show: [],
    dialogchangeapproval: false,
    title: "green",
    message: "green",
    text_color: "text-h5 green--text text-center",
    dialogAdd: false,
    search: "",
    documentGroupOptions: [],
    selectedDocumentGroup: "",
    menu1: false,
    dates: [null, null],
  }),
  components: {
    SuccessDialog,
    SuccessDialogPush,
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
  watch: {
    date1(val) {
      this.itemsearch.date1 = this.formatDate(this.date1);
    },
    date2(val) {
      this.itemsearch.date2 = this.formatDate(this.date2);
    },
  },
  methods: {
    async onclickToDetails(item) {
      window.open(`/re-cal-costing-details/${item.doc_running_no}`);
    },
    async SearchData() {
      // if (
      //   this.itemsearch.doc_running_no == "" ||
      //   this.itemsearch.doc_running_no == null
      // ) {
      //   this.$store.state.global_dialog = true;
      //   this.setupAlertDialog(
      //     true,
      //     "Failed!!!",
      //     "Please enter Work Order",
      //     "text-h5 red--text text-center"
      //   );
      //   return;
      // }

      if (this.date1 || this.date1 != "") {
        if (!this.date2 || this.date2 == "") {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "กรุณาใส่ข้อมูลวันที่ปิดคำสั่งผลิต",
            "text-h5 red--text text-center"
          );
          return;
        }
      }

      if (this.date2 || this.date2 != "") {
        if (!this.date1 || this.date1 == "") {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "กรุณาใส่ข้อมูลวันที่ปิดคำสั่งผลิต",
            "text-h5 red--text text-center"
          );
          return;
        }
      }

      this.itemsearch.date1 = this.date1;
      this.itemsearch.date2 = this.date2;

      this.$showLoader();
      const results = await api.CostingSearchByV_ORD_costing(this.itemsearch);

      this.itemsearch.date1 = this.formatDate(this.date1);
      this.itemsearch.date2 = this.formatDate(this.date2);
      this.desserts = results.data;
      if (results.data.length == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "ไม่มีข้อมูล",
          "text-h5 red--text text-center"
        );
        this.$hideLoader();
        return;
      }
      this.desserts.forEach((x, i) => {
        x.sum_std = 0;
        x.sum_act = 0;
        x.sum_v = 0;
        x.sum_std =
          // x.std_hours + x.std_foh + x.std_voh + x.std_labor;
          Number(
            stringcommatonumber(
              this.fntolocalestringnumber(x.std_hours ? x.std_hours : 0)
            )
          ) +
          Number(
            stringcommatonumber(
              this.fntolocalestringnumber(x.std_foh ? x.std_foh : 0)
            )
          ) +
          Number(
            stringcommatonumber(
              this.fntolocalestringnumber(x.std_voh ? x.std_voh : 0)
            )
          ) +
          Number(
            stringcommatonumber(
              this.fntolocalestringnumber(x.std_labor ? x.std_labor : 0)
            )
          );
        x.sum_act =
          // x.act_hours + x.act_foh + x.act_voh + x.act_labor;
          Number(
            stringcommatonumber(
              this.fntolocalestringnumber(x.act_hours ? x.act_hours : 0)
            )
          ) +
          Number(
            stringcommatonumber(
              this.fntolocalestringnumber(x.act_foh ? x.act_foh : 0)
            )
          ) +
          Number(
            stringcommatonumber(
              this.fntolocalestringnumber(x.act_voh ? x.act_voh : 0)
            )
          ) +
          Number(
            stringcommatonumber(
              this.fntolocalestringnumber(x.act_labor ? x.act_labor : 0)
            )
          );
        x.sum_v =
          // x.V_DL_Hours + x.V_foh + x.V_voh + x.V_DL_Rate;
          Number(
            stringcommatonumber(
              this.fntolocalestringnumber(x.V_DL_Hours ? x.V_DL_Hours : 0)
            )
          ) +
          Number(
            stringcommatonumber(
              this.fntolocalestringnumber(x.V_foh ? x.V_foh : 0)
            )
          ) +
          Number(
            stringcommatonumber(
              this.fntolocalestringnumber(x.V_voh ? x.V_voh : 0)
            )
          ) +
          Number(
            stringcommatonumber(
              this.fntolocalestringnumber(x.V_DL_Rate ? x.V_DL_Rate : 0)
            )
          );
        if (i == this.desserts.length - 1) {
          this.$hideLoader();
        }
      });
    },
    onChange(event) {},
    openchangeapproval() {
      this.dialogchangeapproval = true;
    },
    getRows(rows) {
      console.log(rows);
      const result = {};
      _.forEach(rows, (i, key) => {
        if (i.children) {
          _.forEach(i.children, (i1, key1) => {
            result["c" + key1] = i1;
          });
        } else result[key] = i;
      });
      return result;
    },
    getStatusColor(item) {
      const { status } = item;
      if (status?.toLowerCase() === "post") {
        return "green";
      } else {
        return "yellow";
      }
    },
    fntolocalestringnumber(price) {
      return tolocalestringnumber(price);
    },
    setupAlertDialog(status, title, message, text_color) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
    },
    onClickDeleteBtn(item) {
      this.selectedTimecardId = item.id;
      this.confirmDeleteDlg = true;
    },
    async loadWorkOrder() {
      const response = await api.getOrderByCompanyID(
        localStorage.getItem(server.COMPANYID)
      );
      this.workOrders = response.data;
    },

    async confirmDelete() {
      await api.deleteTimecard(this.selectedTimecardId);
      this.confirmDeleteDlg = false;
    },
    async loadAccountsActive() {
      const resultList = await api.getAccountslistActive();
      this.approver_active_show = resultList.data;
    },
    async loadAccountsAll() {
      const resultList = await api.getAccountslist();
      this.approver_all_show = resultList.data;
    },
    async loadAuthorize() {
      const res_get = await api.getSettingGroupMenu();
      this.authorize = res_get.data;
    },
    async loadDocGroup() {
      const res_get = await api.getDocRunningGroupByGroupName("TC");
      this.docGroups = res_get.data;
    },
    async loadWorkCenter() {
      const response = await api.getWorkCenterMaster(
        localStorage.getItem(server.COMPANYID)
      );
      this.workCenters = response.data.map((data) => ({
        ...data,
        label: `${data.wc_id}:${data.wc_name}`,
      }));
    },
    async loadMachine() {
      const response = await api.listMachineByCompany(
        localStorage.getItem(server.COMPANYID)
      );
      this.machines = response.data.map((data) => ({
        ...data,
        label: `${data.machine_id}:${data.name}`,
      }));
    },
    getSubHeader(headers) {
      let result = [];
      headers
        .filter((i) => i.children)
        .forEach((v) => {
          result = result.concat(v.children);
        });
      return result;
    },
    getSubtripleHeader(headers) {
      let result = [];
      headers
        .filter((i) => i.triplechildren)
        .forEach((v) => {
          result = result.concat(v.triplechildren);
        });
      return result;
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
    getwork_center_name(item) {
      return `${item.wc_id}:${item.wc_name}`;
    },
    getmachine_name(item) {
      return `${item.machine_id}:${item.name}`;
    },
  },
  async created() {},
  async mounted() {
    this.userId = localStorage.getItem(server.USER_ID);
    let yourUrlString = window.location;
    let parser = document.createElement("a");
    parser.href = yourUrlString;
    this.authorize_id = localStorage.getItem(server.AUTHORIZE_ID);
    if (this.authorize_id == null || this.authorize_id == 0) {
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

    if (!this.authorize_view) {
      this.$router.back();
    }
    // ----------------- Check Authorize ---------------------------
    await this.$hideLoader();
    await this.SearchData();

    let comp_id = localStorage.getItem(server.COMPANYID);
    await this.loadAuthorize();

    if (this.userId && api.isLoggedIn()) {
      // this.$router.push("/");
    } else {
      this.$store.state.isLogged = false;
      this.$router.push("/login");
    }
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
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  color: #ffffff;
}
/* .theme--light.v-data-table {
  background-color: #ffffff;
  color: rgb(133 25 25 / 87%);
} */
</style>
