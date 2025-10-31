<template>
  <v-container fluid>
    <v-card class="ma-3">
      <v-row class="mt-5 ml-5 mr-5 mb-3">
        <v-col cols="12" md="12">
          <v-row align="center" justify="center" class="mb-3 mt-3">
            <v-toolbar-title class="text-h6">รายงานประสิทธิภาพการผลิต</v-toolbar-title>
          </v-row>

          <v-row dense>
            <v-col cols="12" md="3">
              <v-autocomplete label="Work Center Group" v-model="datasearch.work_center_group_id" hide-details outlined
                dense :items="workCenterGroups" :item-text="getwork_center_group_name" item-value="work_center_group_id"
                @change="changworkcentergrouptogetworkcenter" clearable @click:clear="
                  $nextTick(() => {
                    datasearch.work_center_id = null;
                    datasearch.mch_id = null;
                    workcenterlist = [];
                    machinelist = [];
                  })
                  "></v-autocomplete>
            </v-col>

            <v-col cols="12" md="3">
              <v-autocomplete required outlined dense hide-details :items="workcenterlist"
                v-model="datasearch.work_center_id" item-value="id" :item-text="getgroupnameworkcenter"
                label="Work Center" @change="changworkcentertogetmch" clearable @click:clear="
                  $nextTick(() => {
                    datasearch.mch_id = null;
                    machinelist = [];
                  })
                  "></v-autocomplete>
            </v-col>

            <v-col cols="12" md="3">
              <v-autocomplete required outlined dense hide-details :items="machinelist" v-model="datasearch.mch_id"
                item-value="id" :item-text="getgroupnamemachine" label="Machine" clearable></v-autocomplete>
            </v-col>

            <v-col cols="12" md="3">
              <v-autocomplete required outlined dense hide-details :items="worker_list" v-model="datasearch.worker_id"
                item-value="id" :item-text="getgroupnameworker" label="Worker" clearable></v-autocomplete>
            </v-col>
          </v-row>

          <v-row dense class="mt-1">
            <v-col cols="12" md="3">
              <v-autocomplete required outlined dense hide-details :items="ord_list" v-model="datasearch.work_order"
                item-value="doc_running_no" item-text="doc_running_no" label="ORD" clearable></v-autocomplete>
            </v-col>

            <v-col cols="12" md="3">
              <v-autocomplete required outlined dense hide-details :items="item_master_list"
                v-model="datasearch.item_id" item-value="item_id" item-text="item_id" label="Item"
                clearable></v-autocomplete>
            </v-col>

            <v-col cols="12" md="2">
              <v-menu v-model="menusearchdatefrom" :close-on-content-click="false" :nudge-right="40"
                transition="scale-transition" offset-y max-width="290px" min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field hide-details outlined dense v-model="datasearch.datefrom" persistent-hint
                    append-icon="mdi-calendar" label="Date From" readonly v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="datefrom" @input="menusearchdatefrom = false"></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" md="2">
              <v-menu v-model="menusearchdateto" :close-on-content-click="false" :nudge-right="40"
                transition="scale-transition" offset-y max-width="290px" min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field hide-details outlined dense v-model="datasearch.dateto" persistent-hint
                    append-icon="mdi-calendar" label="Date To" readonly v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="dateto" @input="menusearchdateto = false"></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" md="2">
              <v-btn color="#254E58" dark @click="searchData" block>
                <v-icon left>mdi-magnify</v-icon>
                Search
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>


      <div v-if="desserts.length > 0">
        <v-data-table :headers="headers" :items="desserts" :search="search" sort-by="fullname" class="elevation-1"
          :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus',
          }">
          <template v-slot:item.ord_no="{ item }">
            <div class="text-left">{{ item.ord_no }}</div>
          </template>
          <template v-slot:item.machine="{ item }">
            <div class="text-left">{{ item.machine }}</div>
          </template>
          <template v-slot:item.item_id="{ item }">
            <div class="text-left">{{ item.item_id }}</div>
          </template>
          <template v-slot:item.item_name="{ item }">
            <div class="text-left">{{ item.item_name }}</div>
          </template>
          <template v-slot:item.opn_desc="{ item }">
            <div class="text-left">{{ item.opn_desc }}</div>
          </template>
          <template v-slot:item.worker_name="{ item }">
            <div class="text-left">{{ item.worker_name }}</div>
          </template>
          <template v-slot:item.work_hours="{ item }">
            <div style="text-align: right;">
              {{ Number(item.work_hours).toLocaleString(undefined, {
                minimumFractionDigits: 2, maximumFractionDigits: 2
              }) }}
            </div>
          </template>

          <template v-slot:item.qty="{ item }">
            <div style="text-align: right;">
              {{ Number(item.qty).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
            </div>
          </template>

          <template v-slot:item.stdqty="{ item }">
            <div style="text-align: right;">
              {{ Number(item.stdqty).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              }}
            </div>
          </template>
          <template v-slot:item.performance="{ item }">
            <div style="text-align: right;">
              {{ Number(item.performance).toLocaleString(undefined, {
                minimumFractionDigits: 2, maximumFractionDigits: 2
              }) }}
            </div>
          </template>
          <!-- <template v-slot:item.time="{ item }">
            {{ item.time_start }} - {{ item.time_end }}
          </template> -->
          <!-- <template v-slot:item.due_date="{ item }">
            {{ formatDate(item.due_date) }}
          </template> -->
          <template v-slot:body.append>
            <tr class="sticky-table-footer">
              <td style="text-align: left;">
              </td>
              <td style="text-align: left;">
              </td>
              <td style="text-align: left;">
              </td>
              <td style="text-align: left;">
              </td>
              <td style="text-align: left;">
              </td>
              <td style="text-align: center;">
                <h3>รวม</h3>
              </td>
              <td style="text-align: left;">
              </td>
              <td style="text-align: left;">
              </td>
              <td style="text-align: left;">

              </td>
              <td style="text-align: right;">
                <h4>
                  {{
                    desserts.reduce(
                      (sum, item) => sum + item.qty,
                      0
                    ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  }}
                </h4>
              </td>
              <td style="text-align: right;">
                <h4>
                  {{
                    desserts.reduce(
                      (sum, item) => sum + item.stdqty,
                      0
                    ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  }}
                </h4>
              </td>
              <td style="text-align: right;">
                <h4>
                  {{
                    (
                      (desserts.reduce((sum, item) => sum + Number(item.stdqty), 0) > 0
                        ? (desserts.reduce((sum, item) => sum + Number(item.qty), 0) /
                          desserts.reduce((sum, item) => sum + Number(item.stdqty), 0)) *
                        100
                        : 0
                      ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  )
                  }}
                </h4>
              </td>
              <td style="text-align: center;"></td>
            </tr>
          </template>
        </v-data-table>

        <div id="mydivhtmltobase" v-if="desserts.length > 0">
          <div v-for="index in pageAll">
            <div class="aligncenter setfontfamily" id="foo">
              <page size="A4" class="aligncenter">
                <div class="aligncenter">
                  <!-- <div class="rowprpo mt20prpo">
                    <div class="col-md-6">
                      <img
                    src="@/assets/sp65.png"
                    alt=""
                    width="30%"
                    contain
                    class="alignleft colprpo ml30prpo"
                  />
                    </div>
                    <div class="col-md-6">
                      <p class="alignright colprpo mr30prpo fontsize14">
                        วันที่เรียกรายงาน :
                        {{ datenowFormatted }}
                      </p>
                      <p class="alignright caption colprpo mr30prpo">
                    Page {{ index }} of {{ pageAll }}
                  </p>
                    </div>
                  </div> -->
                  <div class="rowprpo aligncenter ">
                    <div class="col-md-12 mb20prpo">
                      <h3>
                        รายงานประสิทธิภาพการผลิต
                      </h3>
                    </div>
                  </div>
                </div>

                <div class="rowprpo captiontableheader  ml30prpo mr30prpo" style="margin-top:3px">
                  <table class="captiontableheader">
                    <tr>
                      <th scope="colgroup"
                        class="prborderbottom prbordertop prborderleft width10 captiontableheader prborderright bgcolorgray textfontbold fontsize10">
                        Date
                      </th>
                      <th scope="colgroup"
                        class="prborderbottom prbordertop width10 captiontableheader prborderright bgcolorgray textfontbold fontsize10">
                        ORD
                      </th>
                      <th scope="colgroup"
                        class="prborderbottom prbordertop width20 captiontableheader prborderright bgcolorgray textfontbold fontsize10">
                        Machine
                      </th>
                      <th scope="colgroup"
                        class="prborderbottom prbordertop width20 captiontableheader prborderright bgcolorgray textfontbold fontsize10">
                        Item ID
                      </th>
                      <th scope="colgroup"
                        class="prborderbottom prbordertop width20 captiontableheader prborderright bgcolorgray textfontbold fontsize10">
                        Item Name
                      </th>
                      <th scope="colgroup"
                        class="prborderbottom prbordertop width10 captiontableheader prborderright bgcolorgray textfontbold fontsize10">
                        OPN Desc.
                      </th>
                      <th scope="colgroup"
                        class="prborderbottom prbordertop width5 captiontableheader prborderright bgcolorgray textfontbold fontsize10">
                        Batch
                      </th>
                      <th scope="colgroup"
                        class="prborderbottom prbordertop width15 captiontableheader prborderright bgcolorgray textfontbold fontsize10">
                        Worker
                      </th>
                      <th scope="colgroup"
                        class="prborderbottom prbordertop width10 captiontableheader prborderright bgcolorgray textfontbold fontsize10">
                        Actual Hours
                      </th>
                      <th scope="colgroup"
                        class="prborderbottom prbordertop width10 captiontableheader prborderright bgcolorgray textfontbold fontsize10">
                        QTY
                      </th>
                      <th scope="colgroup"
                        class="prborderbottom prbordertop width10 captiontableheader prborderright bgcolorgray textfontbold fontsize10">
                        Standard QTY
                      </th>
                      <th scope="colgroup"
                        class="prborderbottom prbordertop width15 captiontableheader prborderright bgcolorgray textfontbold fontsize10">
                        % Performance
                      </th>

                    </tr>

                    <tr v-for="(data, i) in setdatatoshow[index - 1]" id="content">
                      <td
                        class="width20 textalignleft prborderleft prborderright prborderbottom captionnofontsize   fontsize7"
                        style="position: relative;padding-right: 2px;">
                        {{ data.tcdate ? data.tcdate : "-" }}
                      </td>
                      <td class="width20 textalignleft prborderright prborderbottom captionnofontsize   fontsize7"
                        style="padding-left: 2px;">
                        {{ data.ord_no ? data.ord_no : "-" }}
                      </td>
                      <td class="width20 textalignleft prborderright prborderbottom captionnofontsize   fontsize7"
                        style="padding-left: 2px;">
                        {{ data.machine ? data.machine : "-" }}
                      </td>
                      <td class="width20 textalignleft prborderright prborderbottom captionnofontsize   fontsize7"
                        style="padding-left: 2px;">
                        {{ data.item_id ? data.item_id : "-" }}
                      </td>
                      <td class="width20 textalignleft prborderright prborderbottom captionnofontsize  fontsize7"
                        style="padding-right: 2px;">
                        {{ data.item_name ? data.item_name : "-" }}
                      </td>
                      <td class="width20 textalignleft prborderright prborderbottom captionnofontsize  fontsize7"
                        style="padding-right: 2px;">
                        {{ data.opn_desc ? data.opn_desc : "-" }}
                      </td>
                      <td class="width20 textalignright prborderright prborderbottom captionnofontsize  fontsize7"
                        style="padding-right: 2px;">
                        {{ data.batch ? data.batch : "-" }}
                      </td>
                      <td class="width20 textalignleft prborderright prborderbottom captionnofontsize  fontsize7"
                        style="padding-right: 2px;">
                        {{ data.worker_name ? data.worker_name : "-" }}
                      </td>
                      <td class="width20 textalignright prborderright prborderbottom captionnofontsize  fontsize7"
                        style="padding-right: 2px;">
                        {{ data.work_hours ? data.work_hours : "-" }}
                      </td>
                      <td class="width20 textalignright prborderright prborderbottom captionnofontsize  fontsize7"
                        style="padding-right: 2px;">
                        {{ data.qty !== null && data.qty !== undefined
                          ? Number(data.qty).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                        })
                        : "-"
                        }}
                      </td>
                      <td class="width20 textalignright prborderright prborderbottom captionnofontsize fontsize7"
                        style="padding-right: 2px;">
                        {{ data.stdqty !== null && data.stdqty !== undefined
                          ? Number(data.stdqty).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                        })
                        : "-"
                        }}
                      </td>
                      <td class="width20 textalignright prborderright prborderbottom captionnofontsize fontsize7"
                        style="padding-right: 2px;">
                        {{ data.performance !== null && data.performance !== undefined
                          ? Number(data.performance).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                        })
                        : "-"
                        }}
                      </td>
                    </tr>
                  </table>
                </div>
              </page>
            </div>
          </div>
        </div>
        <v-card-actions class="mt-5">
          <v-spacer></v-spacer>

          <v-btn dark width="200" color="blue white--text" class="mb-2" @click="exportToPDFPreview('portrait')">
            print
          </v-btn>

          <xlsx-workbook @change="onChange" @created="onCreated">
            <xlsx-sheet :collection="sheet.data" v-for="sheet in sheets" :key="sheet.name" :sheet-name="sheet.name" />
            <xlsx-download :filename="exportsumfilename">
              <v-btn dark width="200" color="green white--text mb-2 ml-2">
                <span>Export</span>
                <v-icon small center>mdi-download</v-icon>
              </v-btn>
            </xlsx-download>
          </xlsx-workbook>

          <v-spacer></v-spacer>
        </v-card-actions>
      </div>



      <SuccessDialog :status="dialogAdd" :text_color="text_color" :title="title" :message="message" />

      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h6">Are you sure you want to delete this Work Order
            {{ edit_item_doc_no }} ?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
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
                  <v-select :items="approver_all_show" label="Old Approval" item-text="name" item-value="id"
                    v-model="itemchangeapproval.oldapproval" outlined required></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <!-- v-validate="'required'"  :rules="commonRules" -->
                  <v-select :items="approver_active_show" label="New Approval" item-text="name" item-value="id"
                    v-model="itemchangeapproval.newapproval" outlined required></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="cancelchangeapproval()">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="savechangeapproval()">Save</v-btn>
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
import html2pdf from "html2pdf.js";
import {
  XlsxRead,
  XlsxTable,
  XlsxSheets,
  XlsxJson,
  XlsxWorkbook,
  XlsxSheet,
  XlsxDownload,
} from "vue-xlsx";

export default {
  data: (vm) => ({
    menusearchdatefrom: false,
    menusearchdateto: false,

    workCenterGroups: [],
    workcenterlist: [],
    machinelist: [],
    shifts: [],
    worker_list: [],
    ord_list: [],
    item_master_list: [],
    datasearch: {
      wc_group: null,
      work_center_group_id: null,
      work_center_id: null,
      mch_id: null,
      worker_id: null,
      work_order: null,
      item_id: null,
      datefrom: vm.formatDate(
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      ),
      dateto: vm.formatDate(
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      ),
    },
    datefrom: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateto: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    sheets: [
      {
        name: "summary_activity_report",
        data: [],
      },
    ],
    exportsumfilename: "รายงานเวลาที่สูญเสีย.xlsx",
    datenow: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(2, 8)
      .split("-")
      .join(""),
    datenowFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    doc_type_name: "แบบสรุป",
    opensummarizepo: false,
    showprint: "display:none;",
    pageAll: 1,
    setdatatoshow: [],
    setdatatoshow: [],
    dataforshowprpo: [],
    select_doc_status: "",
    select_doc_type: 1,
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

    doc_status: [
      { id: "A", status_name: "Open" },
      { id: "C", status_name: "Close" },
    ],
    doc_type: [
      { id: 1, status_name: "แบบสรุป" },
      { id: 2, status_name: "แบบละเอียด" },
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
    searchdoc_running_no: "",
    headers: [
      {
        text: "Date",
        align: "center",
        sortable: false,
        value: "tcdate",
      },
      { text: "ORD", value: "ord_no", align: "center" },
      { text: "Machine", value: "machine", align: "center" },
      { text: "Item ID", value: "item_id", align: "center" },
      { text: "Item Name", value: "item_name", align: "center" },
      { text: "OPN Desc.", value: "opn_desc", align: "center" },
      { text: "Batch", value: "batch", align: "center" },
      { text: "Worker", value: "worker_name", align: "center" },
      { text: "Actual Hours", value: "work_hours", align: "center" },
      { text: "QTY", value: "qty", align: "center" },
      { text: "Standard QTY", value: "stdqty", align: "center" },
      { text: "% Performance", value: "performance", align: "center" },
    ],
    headerssum: [
      {
        text: "Downtime Cause",
        align: "start",
        sortable: false,
        value: "description",
      },
      { text: "Hours", value: "work_hours", align: "end" },
      { text: "percent", value: "percent", align: "end" },
    ],
    repalceId: 0,
    desserts: [],
    dessertssum: [],
    dessertsdetail: [],
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
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มพนักงาน" : "แก้ไขข้อมูลพนักงาน";
    },

  },
  components: {
    SuccessDialog,
    XlsxRead,
    XlsxTable,
    XlsxSheets,
    XlsxJson,
    XlsxWorkbook,
    XlsxSheet,
    XlsxDownload,
  },

  watch: {
    datefrom(val) {
      this.datasearch.datefrom = this.formatDate(this.datefrom);
    },
    dateto(val) {
      this.datasearch.dateto = this.formatDate(this.dateto);
    },
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
    await this.loadDownWorker();
    await this.loadORD();
    await this.loadItemMaster();


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
    async loadWorkCenterGroup() {
      const response = await api.getWorkCenterGroupMaster(
        localStorage.getItem(server.COMPANYID)
      );
      this.workCenterGroups = response.data.map(data => ({ ...data, label: `${data.work_center_group_id}: ${data.work_center_group_name}` }));
    },

    async loadDownWorker() {
      const response = await api.getWorkerByCompany(
        localStorage.getItem(server.COMPANYID)
      );
      this.worker_list = response.data;
      // this.workCenterGroups = response.data.map(data => ({ ...data, label: `${data.work_center_group_id}: ${data.work_center_group_name}` }));
    },
    async loadItemMaster() {
      const res_get = await api.getItemMasterByCompanyID(
        localStorage.getItem(server.COMPANYID)
      );
      this.item_master_list = res_get.data;
    },
    async loadORD() {
       const result = await api.getOrderByQuery(
        localStorage.getItem(server.COMPANYID),
        {doc_status:""}
      );
      this.ord_list = result.data;
    },

    onCreated(wb) {
      // console.log(wb);
    },
    onChange(wb) {
      // console.log("wb-------------");
      // console.log(wb);
      const merge = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }];
      // wb.Sheets.summary_activity_report.A1 = {
      //   t: "s",
      //   v: `Export Summary TimeSheets Activity as of   ${unity.formatDate(this.datasearch.datefrom)} to  ${unity.formatDate(this.datasearch.dateto)}`,
      // };

      // wb.Sheets.summary_activity_report.B1 = { t: "s", c: 0, v: "" };
      // wb.Sheets.summary_activity_report.C1 = { t: "s", c: 0, v: "" };
      // wb.Sheets.summary_activity_report.D1 = { t: "s", c: 0, v: "" };
      // wb.Sheets.summary_activity_report.E1 = { t: "s", c: 0, v: "" };
      // wb.Sheets.summary_activity_report.F1 = { t: "s", c: 0, v: "" };
      // wb.Sheets.summary_activity_report.G1 = { t: "s", c: 0, v: "" };

      wb.Sheets.summary_activity_report.A1 = { t: "s", v: "Date" };
      wb.Sheets.summary_activity_report.B1 = { t: "s", v: "ORD" };
      wb.Sheets.summary_activity_report.C1 = { t: "s", v: "MCH" };
      wb.Sheets.summary_activity_report.D1 = { t: "s", v: "Item ID" };
      wb.Sheets.summary_activity_report.E1 = { t: "s", v: "Item Name" };
      wb.Sheets.summary_activity_report.F1 = { t: "s", v: "OPN Desc." };
      wb.Sheets.summary_activity_report.G1 = { t: "s", v: "Batch" };
      wb.Sheets.summary_activity_report.H1 = { t: "s", v: "Worker" };
      wb.Sheets.summary_activity_report.I1 = { t: "s", v: "QTY" };
      wb.Sheets.summary_activity_report.J1 = { t: "s", v: "Standard QTY" };
      wb.Sheets.summary_activity_report.K1 = { t: "s", v: "% Performance" };

      // wb.Sheets.summary_activity_report["!merges"] = merge;
    },
    async setexporttoxlsx(dataexport) {
      // let setexportxlsx = [{}, {}];
      // this.mDataArray.forEach((x, index) => {
      //   setexportxlsx.splice(index + 2, 0, {
      //     dep_name: x.dep_name,
      //     UserName: x.UserName,
      //     F_C: x.F_C,
      //     N_C: x.N_C,
      //     T_C: x.T_C,
      //     OFF: x.OFF,
      //     Total: x.Total,
      //   });
      // });
      let setexportxlsx = [];
      dataexport.forEach((x, index) => {
        setexportxlsx.splice(index + 0, 0, {
          tcdate: x.tcdate,
          ord_no: x.ord_no,
          machine: x.machine,
          item_id: x.item_id,
          item_name: x.item_name,
          opn_desc: x.opn_desc,
          batch: x.batch,
          worker_name: x.worker_name,
          qty: Number(x.qty),
          stdqty: Number(x.stdqty),
          performance: Number(x.performance),
        });
      });
      this.sheets[0].data = setexportxlsx;
    },
    async checkcontent(dataprint) {
      this.sumqtyorderpo = 0;
      this.sumlineamountpo = 0;
      this.sumlinedispo = 0;
      this.sumlinetaxpo = 0;
      this.sumlinepercenpo = 0;
      this.sumgrandtotalpo = 0;
      //checklineforsig = เช็คบรรทัดของ detail เพื่อแสดงลายเซ็น
      let checklineforsig = 10;
      //linedetailprpo คือ บรรทัดทั้งหมดของหน้า
      let linedetailprpo = 10;
      //datainlineprpo คือ ข้อมูลแต่ละบรรทัด
      let datainlineprpo = 21;
      let addnewbutget = 0;
      let getdata = [];
      let getnewdata = [];
      this.setdatatoshow = [];
      let hllinedetails = 0;
      this.pageAll = 1;
      let newhllinedetails = 0;
      for (let i = 0; i < dataprint.length; i++) {
        let stringchecklength = "";
        // let lengthofdataforshowprpo = dataprint[i].wh_name.length;
        let maiek = "่"; //ไม้เอก
        let maito = "้"; //ไม้โท
        let maitree = "๊"; //ไม้ตรี
        let maijattawa = "๋"; //ไม้จัตวา
        let vowelei = "ิ"; //สระอิ
        let vowelee = "ี"; //สระอี
        let voweleue = "ึ"; //สระอึ
        let voweleu = "ื"; //สระอือ
        let vowelu = "ุ"; //สระอุ
        let voweluu = "ู"; //สระอู
        let maihun = "ั"; //ไม้หันอากาศ
        let maiyamok = "็"; //ไม้เอก

        newhllinedetails = 0;
        getnewdata = [];
        dataprint[i].no = i + 1;
        // this.sumqtyorderpo += dataprint[i].qty;

        stringchecklength = dataprint[i].wh_name ? dataprint[i].wh_name : "";
        let stringcutnewline = stringchecklength.split("\n");

        stringcutnewline.forEach((x, index) => {
          let setlangthofdata = x.length;
          for (let j = 0; j < x.length; j++) {
            if (
              x[j] == maiek ||
              x[j] == maito ||
              x[j] == maitree ||
              x[j] == maijattawa ||
              x[j] == vowelei ||
              x[j] == vowelee ||
              x[j] == voweleue ||
              x[j] == voweleu ||
              x[j] == vowelu ||
              x[j] == voweluu ||
              x[j] == maihun ||
              x[j] == maiyamok
            ) {
              setlangthofdata--;
            }
            if (j == x.length - 1) {
            }
          }
          if (Math.ceil(setlangthofdata / datainlineprpo) == 0) {
            newhllinedetails += 1;
          } else {
            newhllinedetails += Math.ceil(setlangthofdata / datainlineprpo);
          }
        });

        // newhllinedetails += addnewbutget;
        getnewdata.push(dataprint[i]);
        // console.log(hllinedetails, newhllinedetails);
        if (hllinedetails + newhllinedetails > linedetailprpo) {
          this.setdatatoshow[this.pageAll - 1] = getdata;
          this.pageAll++;

          hllinedetails = 0;
          getdata = [];
          getdata.push(dataprint[i]);
          hllinedetails += newhllinedetails;
          if (i == dataprint.length - 1) {
            this.setdatatoshow[this.pageAll - 1] = getdata;
            getdata = [];
            // if (
            //   hllinedetails > checklineforsig ||
            //   this.getnamesignature.length + 1 > 9 ||
            //   (hllinedetails > 0 && this.getnamesignature.length > 3)
            // ) {
            //   this.pageAll++;
            // }
          }
        } else {
          hllinedetails += newhllinedetails;

          getdata.push(dataprint[i]);
          if (i == dataprint.length - 1) {
            this.setdatatoshow[this.pageAll - 1] = getdata;
            getdata = [];
            // if (
            //   hllinedetails > checklineforsig ||
            //   this.getnamesignature.length + 1 > 9 ||
            //   (hllinedetails > 0 && this.getnamesignature.length > 3)
            // ) {
            //   this.pageAll++;
            // }
          }
        }
      }

      // const toWords = new ToWords();

      // this.sumgrandtotalpo = this.sumlinepercenpo + this.sumlinetaxpo;

      // this.sumgrandtotalpo = parseFloat(this.sumgrandtotalpo.toFixed(2));
      // this.textsumlineamountpo = THBText(this.sumgrandtotalpo.toString());
      // this.textsumlineamountpo = this.textsumlineamountpo.replace(
      //   "undefined",
      //   "ลบ"
      // );
      // this.textsumlineamountpo_en = toWords.convert(this.sumgrandtotalpo);
      // this.textsumlineamountpo_en = convert.toWords(this.sumgrandtotalpo);

      // this.pageAll++;
      // this.pageAll += 2;
      this.opensummarizepo = true;

      this.setdatatoshow.forEach((x, index) => {
        if (x.length == 0) {
          this.setdatatoshow.splice(index, 1);
          this.pageAll--;
        }
      });

      // console.log(this.pageAll);
      // console.log(this.setdatatoshow);
    },
    async exportToPDFPreview(orientation) {
      this.$showLoader();
      this.showprint = "";
      const element = document.getElementById("mydivhtmltobase");
      // let element;
      // if (orientation == "landscape") {
      //   element = document.getElementById("mydivhtmltobasesum");
      // } else if (orientation == "portrait") {
      //   element = document.getElementById("mydivhtmltobase");
      // } else {
      // }

      const opt = {
        margin: [0, 0, 0, 0],
        image: {
          type: "jpeg",
          quality: 0.98,
        },
        // enableLinks: false,
        html2canvas: {
          scale: 2,
          dpi: 192,
          letterRendering: true,
          useCORS: true,
        },
        jsPDF: {
          unit: "cm",
          format: "A4",
          orientation: "portrait",
          putOnlyUsedFonts: true,
          pagesplit: true,
        },
        // pagebreak: { mode: ["avoid-all"], after: ".cke_pagebreak" },
      };

      let abcd = await html2pdf()
        .from(element)
        .set(opt)
        .toPdf()
        .get("pdf")
        // .output("bloburl")
        .then(function (pdf) {
          // if (orientation == "landscape") {
          // } else if (orientation == "portrait") {
          //   const totalPages = pdf.internal.getNumberOfPages();
          //   pdf.deletePage(totalPages);
          // } else {
          // }
          const totalPages = pdf.internal.getNumberOfPages();
          pdf.deletePage(totalPages);
          return pdf.output("bloburl");
        });
      window.open(abcd);
      let blob = await fetch(abcd).then((r) => r.blob());
      this.showprint = "display:none;";
      this.showtemplatehtml = false;
      this.$hideLoader();
      // return blob;
    },

    async searchData() {
      this.desserts = [];
      this.dessertssum = [];
      this.$showLoader();
      console.log(this.datasearch);
      if (this.datasearch.work_center_group_id) {
        // const getrcg = this.workCenterGroups.filter(
        //   (item) => item.id == this.datasearch.work_center_group_id
        // );
        // this.datasearch.wc_group = this.datasearch.work_center_group_id
      }
      else {
        this.datasearch.wc_group = null;
      }
      const result = await api.GetListPerformanceReport(this.datasearch
        //   {datefrom:this.datefrom,dateto:this.dateto,
        //   wc_group:this.datasearch.wc_group,wc_id:this.datasearch.work_center_id,
        //   mch_id:this.datasearch.mch_id,downtime_id:this.datasearch.downtime_id

        // }
      );
      console.log(result);

      if (result.data.length > 0) {
        result.data.forEach(async (x, i) => {
          this.desserts.push(x);
          await this.checkcontent(this.desserts);
          await this.setexporttoxlsx(this.desserts);
        });
      }
      this.$hideLoader();
    },


    async loadAuthorize() {
      const res_get = await api.getSettingGroupMenu();
      this.authorize = res_get.data;
    },

    initialize() {
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
      const res_del = await api.DeleteOrder(this.edit_item_doc_no);
      if (res_del.status == 200) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Delete data success",
          "text-h5 green--text text-center"
        );
        await this.loadItemMaster();
      } else {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Delete data Failed : " + res_del.data.message,
          "text-h5 red--text text-center"
        );
      }

      this.closeDelete();
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
        this.initial_data1 = baseimagetosignature;

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
        this.initial_data2 = baseimagetosignature;

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
    async changworkcentergrouptogetworkcenter(work_center_group_id) {
      if (work_center_group_id) {
        this.$showLoader();
        this.datasearch.wc_group = this.datasearch.work_center_group_id;
        const result = await api.getbyWorkcentergroup(work_center_group_id);
        this.datasearch.work_center_id = null;
        this.datasearch.mch_id = null;
        this.workcenterlist = result.data;
        this.$hideLoader();
      }

    },
    async changworkcentertogetmch(work_center_id) {

      if (work_center_id) {
        this.$showLoader();
        const result = await api.listMachineByWorkcenterID(work_center_id);
        this.datasearch.mch_id = null;
        this.machinelist = result.data;
        this.$hideLoader();
      }

    },
    getgroupnameworkcenter(item) {
      return `${item.wc_id}:${item.wc_name}`;
    },
    getwork_center_group_name(item) {
      return `${item.work_center_group_id}:${item.work_center_group_name}`;
    },
    getgroupnamemachine(item) {
      return `${item.machine_id}:${item.name}`;
    },
    getgroupnameworker(item) {
      return `${item.prename_th} ${item.firstname} ${item.lastname}`;
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
    this.$store.state.navMenu = true;
  },
};
</script>
<style scoped>
.row1 {
  padding-top: 20px;
}

.div222 {
  border-style: dashed;
  border-color: #a8a8a8;
}

body {
  background: rgb(204, 204, 204);
}

.page {
  background: white;
  display: block;
  margin: 0 auto;
  margin-bottom: 0.5cm;
  /* box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5); */
}

.page[size="A4"] {
  width: 21cm;
  height: 29.7cm;
}

.page[size="A4"][layout="landscape"] {
  width: 29.7cm;
  height: 21cm;
}

.page[size="A3"] {
  width: 29.7cm;
  height: 42cm;
}

.page[size="A3"][layout="landscape"] {
  width: 42cm;
  height: 29.7cm;
}

.page[size="A5"] {
  width: 14.8cm;
  height: 21cm;
}

.page[size="A5"][layout="landscape"] {
  width: 21cm;
  height: 14.8cm;
}

@page {
  size: 7in 9.25in;
  margin: 27mm 16mm 27mm 16mm;
}

page {
  position: relative;
  background: white;
  display: block;
  margin: 0 auto;
  /* margin-bottom: 0.5cm; */
  border: 1px solid;
  /* box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5); */
}

page[size="A4"] {
  width: 21cm;
  height: 29.7cm;
}

page[size="A4landscape"] {
  width: 29.7cm;
  height: 21cm;
}

page[size="A4"][layout="portrait"] {
  width: 29.7cm;
  height: 21cm;
}

page[size="A4landscape"][layout="landscape"] {
  width: 29.7cm;
  height: 21cm;
}

@media print {
  @page {
    size: 7in 9.25in;
    margin: 27mm 16mm 27mm 16mm;
  }

  page[size="A4"] {
    width: 21cm;
    height: 29.7cm;
  }

  page[size="A4landscape"] {
    width: 29.7cm;
    height: 21cm;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }
}

body {
  margin: 0 auto;
  padding: 0;
  background: rgb(204, 204, 204);
  display: flex;
  flex-direction: column;
}

.page {
  display: inline-block;
  position: relative;
  height: 297mm;
  width: 210mm;
  font-size: 12pt;
  margin: 2em auto;
  padding: calc(var(--bleeding) + var(--margin));
  /* box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5); */
  background: white;
}

@media screen {}

.v-btn:not(.v-btn--round).v-size--default.buttonblue {
  background-color: #1d2442;
  color: white;
}

.btnuploadfile {
  border: 2px solid;
}

.v-btn:not(.v-btn--round).v-size--default.buttonred {
  width: 100%;
  background-color: #9e3b1b;
  color: white;
}

h3 {
  font-size: 1.17em;
}

h4 {
  font-size: 1em;
  font-family: "Roboto", sans-serif;
}

.test {
  border-style: double;
}

.borderblack {
  border-style: solid;
  border-width: thin;
}

.mt-50 {
  margin-top: 50px;
}

.mb-50 {
  margin-bottom: 50px;
}

.card {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.1875rem;
}

.card-img-actions {
  position: relative;
}

.card-body {
  flex: 1 1 auto;
  text-align: center;
}

.card-title {
  margin-top: 10px;
  font-size: 17px;
}

.invoice-color {
  color: red !important;
}

a {
  text-decoration: none !important;
}

.btn-light {
  color: #333;
  background-color: #fafafa;
  border-color: #ddd;
}

.header-elements-inline {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
}

@media (min-width: 768px) {
  .wmin-md-400 {
    min-width: 400px !important;
  }
}

.btn-primary {
  color: #fff;
  background-color: #2196f3;
}

.btn-labeled>b {
  position: absolute;
  top: -1px;
  background-color: blue;
  display: block;
  line-height: 1;
  padding: 0.62503rem;
}

.alignleft {
  float: left;
}

.alignright {
  float: right;
}

.aligncenter {
  text-align: center;
}

.caption {
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.0333333333em;
  line-height: 1.25rem;
  font-family: "Roboto", sans-serif;
  /* font-family: Tahoma, sans-serif !important; */
}

.captionnofontsize {
  font-weight: 400;
  letter-spacing: 0.0333333333em;
  line-height: 1.5rem;
  font-family: "Roboto", sans-serif;
  /* font-family: Tahoma, sans-serif !important; */
}

.captiontableheader {
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.0333333333em;
  line-height: 2.25rem;
  font-family: "Roboto", sans-serif;
  /* font-family: Tahoma, sans-serif !important; */
}

/* .v-application .caption {
  font: 12pt "Tahoma" !important;
  font-size: 10px !important;
} */
.rowprpo {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  margin-right: -12px;
  margin-left: -12px;
}

.colprpo {
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  max-width: 100%;
}


.col-md-20persen {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 20%;
  flex: 0 0 20%;
  max-width: 20%;
}

.col-md-25persen {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 25%;
  flex: 0 0 25%;
  max-width: 25%;
}

.col-md-50persen {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
  max-width: 50%;
}

.col-md-60persen {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 55%;
  flex: 0 0 55%;
  max-width: 55%;
}


.mt-0prpo {
  margin-top: 0px !important;
}

.mt-5prpo {
  margin-top: -5px !important;
}

.mt-10prpo {
  margin-top: -10px !important;
}

.mt-20prpo {
  margin-top: -20px !important;
}

.mt-25prpo {
  margin-top: -25px !important;
}

.mt-30prpo {
  margin-top: -30px !important;
}

.mt-40prpo {
  margin-top: -40px !important;
}

.mt-50prpo {
  margin-top: -50px !important;
}

.mt-60prpo {
  margin-top: -60px !important;
}

.mr30prpo {
  margin-right: 30px !important;
}

.mt10prpo {
  margin-top: 10px !important;
}

.mt20prpo {
  margin-top: 20px !important;
}

.mt30prpo {
  margin-top: 30px !important;
}

.ml30prpo {
  margin-left: 30px !important;
}

.ml50prpo {
  margin-left: 50px !important;
}

.ml-25prpo {
  margin-left: -25px !important;
}

.ml-30prpo {
  margin-left: -30px !important;
}

.ml-40prpo {
  margin-left: -40px !important;
}

.ml-55prpo {
  margin-left: -55px !important;
}

.ml2prpo {
  margin-left: 2px !important;
}

.ml10prpo {
  margin-left: 10px !important;
}

.ml20prpo {
  margin-left: 20px !important;
}

.mb20prpo {
  margin-bottom: 20px !important;
}

.pl30prpo {
  padding-left: 30px !important;
}

.pl40prpo {
  padding-left: 40px !important;
}

.pr30prpo {
  padding-right: 30px !important;
}

.pr40prpo {
  padding-right: 40px !important;
}

.borderblockprrightblur {
  border: 1px solid black;
  border-width: 1px 0px 1px 1px;
  border-collapse: collapse;
  width: 100px;
  height: 130px;
  background: white;
  box-sizing: border-box;
  display: inline-block;
  /* outline: 2px solid black; */
}

.borderblockprleftblur {
  border: 1px solid black;
  border-width: 1px 1px 1px 0.5px;
  border-collapse: collapse;
  width: 100px;
  height: 130px;
  background: white;
  box-sizing: border-box;
  display: inline-block;
  /* outline: 2px solid black; */
}

.borderblockporightblur {
  border: 1px solid black;
  border-width: 1px 0px 1px 1px;
  width: 100px;
  height: 130px;
  background: white;
  box-sizing: border-box;
  display: inline-block;
  /* outline: 2px solid black; */
}

.borderblockpoleftblur {
  border: 1px solid black;
  border-width: 1px 1px 1px 0.5px;
  width: 100px;
  height: 130px;
  background: white;
  box-sizing: border-box;
  display: inline-block;
  /* outline: 2px solid black; */
}

.col-md-4pr {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 30%;
  flex: 0 0 30%;
  max-width: 30%;
}

.col-md-8pr {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 70%;
  flex: 0 0 70%;
  max-width: 70%;
}

.col-md-4prrd {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
  max-width: 50%;
}

.col-md-8prrd {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
  max-width: 50%;
}

.textaligncenter {
  text-align: center;
}

.textalignleft {
  text-align: left;
}

.textalignright {
  text-align: right;
}

table {
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
  /* border: 1px solid black; */
}

.prborderleft {
  border-left: 1px solid black;
}

.prborderright {
  border-right: 1px solid black;
}

.prbordertop {
  border-top: 1px solid black;
}

.prborderbottom {
  border-bottom: 1px solid black;
}

td {
  /* vertical-align: bottom; */
  /* border: 1px solid black; */
}

.width5 {
  word-wrap: break-word;
  width: 7%;
}

.width6 {
  word-wrap: break-word;
  width: 7%;
}

.width7 {
  word-wrap: break-word;
  width: 7%;
}

.width15 {
  word-wrap: break-word;
  width: 15%;
}

.width10 {
  word-wrap: break-word;
  width: 10%;
}

.width20 {
  word-wrap: break-word;
  width: 20%;
}

.width25 {
  word-wrap: break-word;
  width: 25%;
}

.width30 {
  word-wrap: break-word;
  width: 30%;
}

.width35 {
  word-wrap: break-word;
  width: 35%;
}

.width40 {
  word-wrap: break-word;
  width: 40%;
}

.width45 {
  word-wrap: break-word;
  width: 45%;
}

.width50 {
  word-wrap: break-word;
  width: 50%;
}

.width60 {
  word-wrap: break-word;
  width: 60%;
}

.width65 {
  word-wrap: break-word;
  width: 65%;
}

.width70 {
  word-wrap: break-word;
  width: 70%;
}

.width80 {
  word-wrap: break-word;
  width: 80%;
}

.width90 {
  word-wrap: break-word;
  width: 90%;
}

.width100 {
  word-wrap: break-word;
  width: 100%;
}

/* header {
  top: 0;
  padding-top: 150mm;
  padding-bottom: 3mm;
} */
footer {
  bottom: 0;
  color: #000;
  padding-top: 3mm;
  padding-bottom: 5mm;
}

header,
footer {
  /* position: fixed; */
  left: 0;
  right: 0;
  background-color: #ccc;
  padding-right: 1.5cm;
  padding-left: 1.5cm;
}

.footerprpo {
  position: absolute;
  bottom: 10px;
  width: 100%;
}

.borderauto {
  border: 1px solid;
  margin: -1px;
}

.bordersignature {
  height: 110px;
  border-bottom: 1px dotted;
  margin: -10px;
}

.fixfourrow {
  /* white-space: nowrap; */
  /* text-overflow: ellipsis; */
  display: -webkit-box;
  /* display: block; */
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  height: 80px;
  overflow: hidden;
  text-align: left;
}

.fixthreerow {
  /* white-space: nowrap; */
  /* text-overflow: ellipsis; */
  display: -webkit-box;
  /* display: block; */
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  height: 60px;
  overflow: hidden;
  text-align: left;
}

.fixtworow {
  /* white-space: nowrap; */
  /* text-overflow: ellipsis; */
  display: -webkit-box;
  /* display: block; */
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 40px;
  overflow: hidden;
  text-align: left;
}

.fixonerow {
  /* white-space: nowrap;
  text-overflow: ellipsis; */
  display: -webkit-box;
  /* display: block; */
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  height: 20px;
  overflow: hidden;
  text-align: left;
}

.fixonerowaligncenter {
  /* white-space: nowrap;
  text-overflow: ellipsis; */
  display: -webkit-box;
  /* display: block; */
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  height: 20px;
  overflow: hidden;
  text-align: center;
}

.fontsize7 {
  font-size: 7px !important;
}

.fontsize8 {
  font-size: 8px !important;
}

.fontsize9 {
  font-size: 9px !important;
}

.fontsize10 {
  font-size: 10px !important;
}

.fontsize12 {
  font-size: 12px !important;
}

.fontsize14 {
  font-size: 14px !important;
}

.fontsize16 {
  font-size: 16px !important;
}

.widthsignature {
  width: 3cm;
  height: 1cm;
  align-content: center;
}

.positionrelative {
  position: relative;
}

.positionabsolutetop0 {
  position: absolute;
  top: 0px;
}

.textunderline {
  text-decoration: underline;
  text-underline-position: under;
}

.textdoubleunderline {
  text-decoration-line: underline;
  text-decoration-style: double;
  text-underline-position: under;
}

.prborderbottomsumpo {
  border-bottom: 1px solid black;
  padding-bottom: 5px;
}

.wordspacingsummary {
  word-spacing: -1px;
  line-height: 1.5;
  /* letter-spacing: -1px; */
}

.ml-25prpo {
  margin-left: -25px !important;
}

.sticky-table-footer td {
  /* font-weight: bold; */
  /* position: sticky; */
  /* bottom: 0; */
  background-color: white;
  border-top: thin solid rgba(0, 0, 0, 0.12);
}

.textfontbold {
  font-weight: 900;
}

.bgcolorgray {
  background-color: #b7b4b4 !important;
}

.setfontfamily {
  font-family: "Roboto", sans-serif;
}

/* .theme--light.v-data-table>.v-data-table__wrapper>table>thead>tr:last-child>th {
    text-align: center !important;
} */
</style>