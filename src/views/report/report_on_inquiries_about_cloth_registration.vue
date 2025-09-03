<template>
  <v-container fluid>
    <v-card class="ma-3">
      <v-row class="mt-5 ml-5 mr-5 mb-3">
        <v-col cols="12" md="12">
          <v-row>
            <v-toolbar-title class="text-h6 mt-4"
              >รายงานสอบถามทะเบียนลูกผ้า :
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="searchdoc_running_no"
                label="เลขที่ใบสั่งผลิต"
                append-icon="mdi-magnify"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-autocomplete
                v-model="select_doc_status"
                :items="doc_status"
                outlined
                dense
                label="Status"
                item-text="status_name"
                item-value="id"
                clearable
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" md="2">
              <v-select
                v-model="select_doc_type"
                :items="doc_type"
                outlined
                dense
                label=""
                item-text="status_name"
                item-value="id"
                @change="selectdoc_type_name(select_doc_type)"
              ></v-select>
            </v-col>

            <v-col cols="12" md="2">
              <v-btn color="#254E58" dark class="mb-2 mr-2" @click="searchData">
                <v-icon>mdi-magnify</v-icon>
                Search
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <div v-if="select_doc_type == 1 && dessertssum.length > 0">
        <v-row class="ma-3">
          <v-col cols="12" md="12" align="center">
            <h3>
              รายงานสอบถามทะเบียนลูกผ้า
              {{ doc_type_name ? doc_type_name : "-" }}
            </h3>
          </v-col>
        </v-row>
        <v-row class="ma-3">
          <v-col cols="12" md="12" align="right">
            <h5>
              วันที่เรียกรายงาน :
              {{ datenowFormatted }}
            </h5>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headerssum"
          :items="dessertssum"
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
          <template v-slot:item.order_date="{ item }">
            {{ formatDate(item.order_date) }}
          </template>
          <template v-slot:item.due_date="{ item }">
            {{ formatDate(item.due_date) }}
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
              Reset
            </v-btn>
          </template>
        </v-data-table>

        <div id="mydivhtmltobasesum" v-if="dessertssum.length > 0">
          <div v-for="index in pageAll">
            <div class="aligncenter setfontfamily" id="foo">
              <page size="A4landscape" class="aligncenter">
                <div class="aligncenter">
                  <div class="rowprpo mt20prpo">
                    <div class="col-md-6">
                      <!-- <img
                    src="@/assets/sp65.png"
                    alt=""
                    width="30%"
                    contain
                    class="alignleft colprpo ml30prpo"
                  /> -->
                    </div>
                    <div class="col-md-6">
                      <p class="alignright colprpo mr30prpo fontsize14">
                        วันที่เรียกรายงาน :
                        {{ datenowFormatted }}
                      </p>
                      <!-- <p class="alignright caption colprpo mr30prpo">
                    Page {{ index }} of {{ pageAll }}
                  </p> -->
                    </div>
                  </div>
                  <div class="rowprpo aligncenter ">
                    <div class="col-md-12 mb20prpo">
                      <h3>
                        รายงานสอบถามทะเบียนลูกผ้า
                        {{ doc_type_name ? doc_type_name : "-" }}
                      </h3>
                    </div>
                  </div>
                </div>

                <div
                  class="rowprpo captiontableheader  ml30prpo mr30prpo"
                  style="margin-top:3px"
                >
                  <table class="captiontableheader">
                    <tr>
                      <th
                        scope="colgroup"
                        class="prborderbottom prbordertop prborderleft width10 captiontableheader prborderright bgcolorgray textfontbold fontsize16"
                      >
                        เลขที่ใบสั่งผลิต
                      </th>
                      <th
                        scope="colgroup"
                        class="prborderbottom prbordertop prborderleft width10 captiontableheader prborderright bgcolorgray textfontbold fontsize16"
                      >
                        รหัสสินค้า
                      </th>
                      <th
                        scope="colgroup"
                        class="prborderbottom prbordertop width20 captiontableheader prborderright bgcolorgray textfontbold fontsize16"
                      >
                        ชื่่อสินค้า
                      </th>
                      <th
                        scope="colgroup"
                        class="prborderbottom prbordertop width5 captiontableheader prborderright bgcolorgray textfontbold fontsize16"
                      >
                        MCH
                      </th>
                      <th
                        scope="colgroup"
                        class="prborderbottom prbordertop width5 captiontableheader prborderright bgcolorgray textfontbold fontsize16"
                      >
                        หน้าผ้า
                      </th>
                      <th
                        scope="colgroup"
                        class="prborderbottom prbordertop width5 captiontableheader prborderright bgcolorgray textfontbold fontsize16"
                      >
                        จำนวนสั่ง
                      </th>
                      <th
                        scope="colgroup"
                        class="prborderbottom prbordertop width5 captiontableheader prborderright bgcolorgray textfontbold fontsize16"
                      >
                        ลูก
                      </th>
                      <th
                        scope="colgroup"
                        class="prborderbottom prbordertop width5 captiontableheader prborderright bgcolorgray textfontbold fontsize16"
                      >
                        จำนวนรับ
                      </th>
                      <th
                        scope="colgroup"
                        class="prborderbottom prbordertop width5 captiontableheader prborderright bgcolorgray textfontbold fontsize16"
                      >
                        ลูก
                      </th>
                      <th
                        scope="colgroup"
                        class="prborderbottom prbordertop width5 captiontableheader prborderright bgcolorgray textfontbold fontsize16"
                      >
                        ค้างรับ
                      </th>
                      <th
                        scope="colgroup"
                        class="prborderbottom prbordertop width5 captiontableheader prborderright bgcolorgray textfontbold fontsize16"
                      >
                        ลูก
                      </th>
                      <th
                        scope="colgroup"
                        class="prborderbottom prbordertop width10 captiontableheader prborderright bgcolorgray textfontbold fontsize16"
                      >
                        วันที่เริ่ม
                      </th>
                      <th
                        scope="colgroup"
                        class="prborderbottom prbordertop width10 captiontableheader prborderright bgcolorgray textfontbold fontsize16"
                      >
                        วันที่เสร็จ
                      </th>
                    </tr>

                    <tr
                      v-for="(data, i) in setdatatoshowsum[index - 1]"
                      id="content"
                    >
                      <td
                        class="width20 textaligncenter prborderleft prborderright prborderbottom captionnofontsize fontsize14"
                        style="position: relative;"
                      >
                        {{ data.doc_running_no ? data.doc_running_no : "-" }}
                      </td>
                      <td
                        class="width20 textaligncenter prborderright prborderbottom captionnofontsize fontsize14"
                      >
                        {{ data.item_id ? data.item_id : "-" }}
                      </td>
                      <td
                        class="width20 textaligncenter prborderright prborderbottom captionnofontsize fontsize14"
                      >
                        {{ data.item_name ? data.item_name : "-" }}
                      </td>
                      <td
                        class="width20 textaligncenter prborderright prborderbottom captionnofontsize fontsize14"
                      >
                        {{ data.machine_id ? data.machine_id : "-" }}
                      </td>
                      <td
                        class="width20 textaligncenter prborderright prborderbottom captionnofontsize fontsize14"
                      >
                        {{ data.line_of_mch ? data.line_of_mch : "-" }}
                      </td>
                      <td
                        class="width20 textaligncenter prborderright prborderbottom captionnofontsize fontsize14"
                      >
                        {{ data.order_qty ? data.order_qty : "-" }}
                      </td>
                      <td
                        class="width20 textaligncenter prborderright prborderbottom captionnofontsize fontsize14"
                      >
                        {{ data.ordcntbatch ? data.ordcntbatch : "-" }}
                      </td>
                      <td
                        class="width20 textaligncenter prborderright prborderbottom captionnofontsize fontsize14"
                      >
                        {{ data.sumqty ? data.sumqty : "-" }}
                      </td>
                      <td
                        class="width20 textaligncenter prborderright prborderbottom captionnofontsize fontsize14"
                      >
                        {{ data.rvcntbatch ? data.rvcntbatch : "-" }}
                      </td>
                      <td
                        class="width20 textaligncenter prborderright prborderbottom captionnofontsize fontsize14"
                      >
                        {{ data.remainqty ? data.remainqty : "-" }}
                      </td>
                      <td
                        class="width20 textaligncenter prborderright prborderbottom captionnofontsize fontsize14"
                      >
                        {{ data.remainbatch ? data.remainbatch : "-" }}
                      </td>
                      <td
                        class="width20 textaligncenter prborderright prborderbottom captionnofontsize fontsize14"
                      >
                        {{
                          data.order_date ? formatDate(data.order_date) : "-"
                        }}
                      </td>
                      <td
                        class="width20 textaligncenter prborderright prborderbottom captionnofontsize fontsize14"
                      >
                        {{ data.due_date ? formatDate(data.due_date) : "-" }}
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

          <v-btn
            dark
            width="200"
            color="blue white--text"
            class="mb-2"
            @click="exportToPDFPreview('landscape')"
          >
            print
          </v-btn>

          <xlsx-workbook @change="onChange" @created="onCreated">
            <xlsx-sheet
              :collection="sheet.data"
              v-for="sheet in sheets"
              :key="sheet.name"
              :sheet-name="sheet.name"
            />
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

      <div v-if="select_doc_type == 2 && dessertsdetail.length > 0">
        <v-row class="ma-3">
          <v-col cols="12" md="12" align="center">
            <h3>
              รายงานสอบถามทะเบียนลูกผ้า
              {{
                doc_type.find((obj) => {
                  return obj.id === this.select_doc_type;
                }).status_name
              }}
            </h3>
          </v-col>
        </v-row>
        <v-row class="ma-3">
          <v-col cols="12" md="12" align="right">
            <h5>
              วันที่เรียกรายงาน :
              {{ datenowFormatted }}
            </h5>
          </v-col>
        </v-row>
        <v-row class="ma-3">
          <v-col cols="12" md="4">
            <v-text-field
              v-model="dataheadersum.doc_running_no"
              label="เลขที่ใบสั่งผลิต"
              outlined
              dense
              hide-details
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="dataheadersum.item_id"
              label="สินค้า"
              outlined
              dense
              hide-details
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="dataheadersum.item_name"
              label="ชื่อสินค้า"
              outlined
              dense
              hide-details
              disabled
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="ma-3">
          <v-col cols="12" md="3">
            <v-text-field
              v-model="dataheadersum.po_qty"
              label="จำนวนสั่งผลิต"
              outlined
              dense
              hide-details
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="dataheadersum.sum_get"
              label="จำนวนรับ"
              outlined
              dense
              hide-details
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="dataheadersum.remain_qty"
              label="คงเหลือ"
              outlined
              dense
              hide-details
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="dataheadersum.status"
              label="Status"
              outlined
              dense
              hide-details
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headersdetail"
          :items="dessertsdetail"
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
          <template v-slot:item.date_receive="{ item }">
            {{ formatDate(item.date_receive) }}
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
              Reset
            </v-btn>
          </template>
        </v-data-table>

        <div id="mydivhtmltobase" v-if="dessertsdetail.length > 0">
          <div v-for="index in pageAll">
            <div class="aligncenter setfontfamily" id="foo">
              <page size="A4" class="aligncenter">
                <div class="aligncenter">
                  <div class="rowprpo mt20prpo">
                    <div class="col-md-6">
                      <!-- <img
                    src="@/assets/sp65.png"
                    alt=""
                    width="30%"
                    contain
                    class="alignleft colprpo ml30prpo"
                  /> -->
                    </div>
                    <div class="col-md-6">
                      <p class="alignright colprpo mr30prpo fontsize14">
                        วันที่เรียกรายงาน :
                        {{ datenowFormatted }}
                      </p>
                      <!-- <p class="alignright caption colprpo mr30prpo">
                    Page {{ index }} of {{ pageAll }}
                  </p> -->
                    </div>
                  </div>
                  <div class="rowprpo aligncenter ">
                    <div class="col-md-12 mb20prpo">
                      <h3>
                        รายงานสอบถามทะเบียนลูกผ้า
                        {{ doc_type_name ? doc_type_name : "-" }}
                      </h3>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="rowprpo  mt-30prpo">
                      <div
                        class="col-md-25persen textalignleft pl30prpo fontsize12 fixonerow"
                      >
                        เลขที่ใบสั่งผลิต :
                        {{
                          dataheadersum.doc_running_no
                            ? dataheadersum.doc_running_no
                            : "-"
                        }}
                      </div>
                      <div
                        class="col-md-25persen textalignleft pl10prpo fontsize12 fixonerow"
                      >
                        สินค้า :
                        {{
                          dataheadersum.item_id ? dataheadersum.item_id : "-"
                        }}
                      </div>
                      <div
                        class="col-md-50persen textalignleft ml-10prpo fontsize12 fixonerow"
                      >
                        ชื่อสินค้า :
                        {{
                          dataheadersum.item_name
                            ? dataheadersum.item_name
                            : "-"
                        }}
                      </div>
                    </div>
                    <div class="rowprpo  mt10prpo">
                      <div
                        class="col-md-25persen textalignleft pl30prpo fontsize12 fixonerow"
                      >
                        จำนวนสั่งผลิต :
                        {{ dataheadersum.po_qty ? dataheadersum.po_qty : "-" }}
                      </div>
                      <div
                        class="col-md-25persen textalignleft pl30prpo fontsize12 fixonerow"
                      >
                        จำนวนรับ :
                        {{
                          dataheadersum.sum_get ? dataheadersum.sum_get : "-"
                        }}
                      </div>
                      <div
                        class="col-md-25persen textalignleft pl30prpo fontsize12 fixonerow"
                      >
                        คงเหลือ :
                        {{
                          dataheadersum.remain_qty
                            ? dataheadersum.remain_qty
                            : "-"
                        }}
                      </div>
                      <div
                        class="col-md-25persen textalignleft pl30prpo fontsize12 fixonerow"
                      >
                        status :
                        {{ dataheadersum.status ? dataheadersum.status : "-" }}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="rowprpo captiontableheader  ml30prpo mr30prpo"
                  style="margin-top:3px"
                >
                  <table class="captiontableheader">
                    <tr>
                      <th
                        scope="colgroup"
                        class="prborderbottom prbordertop prborderleft width15 captiontableheader prborderright bgcolorgray textfontbold fontsize16"
                      >
                        วันที่รับ
                      </th>
                      <th
                        scope="colgroup"
                        class="prborderbottom prbordertop width15 captiontableheader prborderright bgcolorgray textfontbold fontsize16"
                      >
                        จำนวนรับ
                      </th>
                      <th
                        scope="colgroup"
                        class="prborderbottom prbordertop width20 captiontableheader prborderright bgcolorgray textfontbold fontsize16"
                      >
                        เลขที่ Lot
                      </th>
                      <th
                        scope="colgroup"
                        class="prborderbottom prbordertop width10 captiontableheader prborderright bgcolorgray textfontbold fontsize16"
                      >
                        Batch
                      </th>
                      <th
                        scope="colgroup"
                        class="prborderbottom prbordertop width20 captiontableheader prborderright bgcolorgray textfontbold fontsize16"
                      >
                        คลังสินค้า
                      </th>
                      <th
                        scope="colgroup"
                        class="prborderbottom prbordertop width20 captiontableheader prborderright bgcolorgray textfontbold fontsize16"
                      >
                        ผู้รับ
                      </th>
                    </tr>

                    <tr
                      v-for="(data, i) in setdatatoshow[index - 1]"
                      id="content"
                    >
                      <td
                        class="width20 textaligncenter prborderleft prborderright prborderbottom captionnofontsize fontsize14"
                        style="position: relative;"
                      >
                        {{
                          data.date_receive
                            ? formatDate(data.date_receive)
                            : "-"
                        }}
                      </td>
                      <td
                        class="width20 textaligncenter prborderright prborderbottom captionnofontsize fontsize14"
                      >
                        {{ data.qty ? data.qty : "0.00" }}
                      </td>
                      <td
                        class="width20 textaligncenter prborderright prborderbottom captionnofontsize fontsize14"
                      >
                        {{ data.lot ? data.lot : "-" }}
                      </td>
                      <td
                        class="width20 textaligncenter prborderright prborderbottom captionnofontsize fontsize14"
                      >
                        {{ data.batch ? data.batch : "0" }}
                      </td>
                      <td
                        class="width20 textaligncenter prborderright prborderbottom captionnofontsize fontsize14"
                      >
                        {{ data.wh_name ? data.wh_name : "-" }}
                      </td>
                      <td
                        class="width20 textaligncenter prborderright prborderbottom captionnofontsize fontsize14"
                      >
                        {{ data.firstname ? data.firstname : "-" }}
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

          <v-btn
            dark
            width="200"
            color="blue white--text"
            class="mb-2"
            @click="exportToPDFPreview('portrait')"
          >
            print
          </v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>
      </div>

      <SuccessDialog
        :status="dialogAdd"
        :text_color="text_color"
        :title="title"
        :message="message"
      />

      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h6"
            >Are you sure you want to delete this Work Order
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
    sheets: [
      {
        name: "summary_activity_report",
        data: [],
      },
    ],
    exportsumfilename: "รายงานสอบถามทะเบียนลูกผ้าแบบสรุป.xlsx",
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
    setdatatoshowsum: [],
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
    headerssum: [
      {
        text: "เลขที่ใบสั่งผลิต",
        align: "start",
        sortable: false,
        value: "doc_running_no",
      },
      { text: "รหัสสินค้า", value: "item_id" },
      { text: "ชื่่อสินค้า", value: "item_name" },
      { text: "MCH", value: "machine_id" },
      { text: "หน้าผ้า", value: "line_of_mch" },
      { text: "จำนวนสั่ง", value: "order_qty" },
      { text: "ลูก", value: "ordcntbatch" },
      { text: "จำนวนรับ", value: "sumqty" },
      { text: "ลูก", value: "rvcntbatch" },
      { text: "ค้างรับ", value: "remainqty" },
      { text: "ลูก", value: "remainbatch" },
      { text: "วันที่เริ่ม", value: "order_date" },
      { text: "วันที่เสร็จ", value: "due_date" },
    ],
    headersdetail: [
      {
        text: "วันที่รับ",
        align: "start",
        sortable: true,
        value: "date_receive",
      },
      { text: "จำนวนรับ", value: "qty" },
      { text: "เลขที่ Lot", value: "lot" },
      { text: "Batch", value: "batch" },
      { text: "คลังสินค้า", value: "wh_name" },
      { text: "ผู้รับ", value: "firstname" },
    ],
    repalceId: 0,
    desserts: [],
    dessertssum: [],
    dessertsdetail: [],
    dataheadersum: {
      doc_running_no: "",
      item_id: "",
      item_name: "",
      po_qty: "",
      sum_get: "",
      remain_qty: "",
      status: "",
      order_date: "",
    },
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
    XlsxRead,
    XlsxTable,
    XlsxSheets,
    XlsxJson,
    XlsxWorkbook,
    XlsxSheet,
    XlsxDownload,
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

      wb.Sheets.summary_activity_report.A1 = { t: "s", v: "เลขที่ใบสั่งผลิต" };
      wb.Sheets.summary_activity_report.B1 = { t: "s", v: "รหัสสินค้า" };
      wb.Sheets.summary_activity_report.C1 = { t: "s", v: "ชื่่อสินค้า" };
      wb.Sheets.summary_activity_report.D1 = { t: "s", v: "MCH" };
      wb.Sheets.summary_activity_report.E1 = { t: "s", v: "หน้าผ้า" };
      wb.Sheets.summary_activity_report.F1 = { t: "s", v: "จำนวนสั่ง" };
      wb.Sheets.summary_activity_report.G1 = { t: "s", v: "ลูก" };
      wb.Sheets.summary_activity_report.H1 = { t: "s", v: "จำนวนรับ" };
      wb.Sheets.summary_activity_report.I1 = { t: "s", v: "ลูก" };
      wb.Sheets.summary_activity_report.J1 = { t: "s", v: "ค้างรับ" };
      wb.Sheets.summary_activity_report.K1 = { t: "s", v: "ลูก" };
      wb.Sheets.summary_activity_report.L1 = { t: "s", v: "วันที่เริ่ม" };
      wb.Sheets.summary_activity_report.M1 = { t: "s", v: "วันที่เสร็จ" };

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
          doc_running_no: x.doc_running_no,
          item_id: x.item_id,
          item_name: x.item_name,
          machine_id: x.machine_id,
          line_of_mch: x.line_of_mch,
          order_qty: x.order_qty,
          ordcntbatch: x.ordcntbatch,
          sumqty: x.sumqty,
          rvcntbatch: x.rvcntbatch,
          remainqty: x.remainqty,
          remainbatch: x.remainbatch,
          order_date: this.formatDate(x.order_date),
          due_date: this.formatDate(x.due_date),
        });
      });
      this.sheets[0].data = setexportxlsx;
    },
    async checkcontentsum(dataprint) {
      this.setdatatoshowsum = [];
      this.sumqtyorderpo = 0;
      this.sumlineamountpo = 0;
      this.sumlinedispo = 0;
      this.sumlinetaxpo = 0;
      this.sumlinepercenpo = 0;
      this.sumgrandtotalpo = 0;
      //checklineforsig = เช็คบรรทัดของ detail เพื่อแสดงลายเซ็น
      let checklineforsig = 10;
      //linedetailprpo คือ บรรทัดทั้งหมดของหน้า
      let linedetailprpo = 22;
      //datainlineprpo คือ ข้อมูลแต่ละบรรทัด
      let datainlineprpo = 21;
      let addnewbutget = 0;
      let getdata = [];
      let getnewdata = [];
      let hllinedetails = 0;
      this.pageAll = 1;
      let newhllinedetails = 0;
      for (let i = 0; i < dataprint.length; i++) {
        let stringchecklength = "";
        // let lengthofdataforshowprpo = dataprint[i].item_name.length;
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

        stringchecklength = dataprint[i].item_name
          ? dataprint[i].item_name
          : "";
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
        if (hllinedetails + newhllinedetails > linedetailprpo) {
          this.setdatatoshowsum[this.pageAll - 1] = getdata;
          this.pageAll++;

          hllinedetails = 0;
          getdata = [];
          getdata.push(dataprint[i]);
          hllinedetails += newhllinedetails;
          if (i == dataprint.length - 1) {
            this.setdatatoshowsum[this.pageAll - 1] = getdata;
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
            this.setdatatoshowsum[this.pageAll - 1] = getdata;
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

      this.setdatatoshowsum.forEach((x, index) => {
        if (x.length == 0) {
          this.setdatatoshowsum.splice(index, 1);
          this.pageAll--;
        }
      });

      // console.log(this.pageAll);
      // console.log(this.setdatatoshow);
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
      let linedetailprpo = 28;
      //datainlineprpo คือ ข้อมูลแต่ละบรรทัด
      let datainlineprpo = 17;
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
      this.showprint = "";
      let element;
      if (orientation == "landscape") {
        element = document.getElementById("mydivhtmltobasesum");
      } else if (orientation == "portrait") {
        element = document.getElementById("mydivhtmltobase");
      } else {
      }

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
          orientation: orientation,
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
        .then(function(pdf) {
          if (orientation == "landscape") {
          } else if (orientation == "portrait") {
            const totalPages = pdf.internal.getNumberOfPages();
            pdf.deletePage(totalPages);
          } else {
          }

          return pdf.output("bloburl");
        });
      window.open(abcd);
      let blob = await fetch(abcd).then((r) => r.blob());
      this.showprint = "display:none;";
      this.showtemplatehtml = false;
      // return blob;
    },
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
      // console.log("Del item: ", JSON.stringify(item));

      // (item.status != "C" && !item.wo_running_no) || !authorize_del;
      let br = false;
      // console.log("Del item.wo_running_no : ", item.wo_running_no);
      // console.log("Del item.status : ", item.status);
      // console.log("Del authorize_del : ", this.authorize_del);
      if (!this.authorize_del) {
        br = false;
      } else if (item.status != "C" && !item.wo_running_no) {
        br = true;
      } else {
        br = false;
      }

      if (item.status == "A") {
        br = false;
      }
      // console.log("Del br : ", br);
      return br;
    },
    chkBtnEditStatus(item) {
      //item.status != 'C' || !authorize_edit
      let br = false;
      // console.log("Edit item.status : ", item.status);
      // console.log("Edit authorize_edit : ", this.authorize_edit);
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
      // alert("onClickedEdit");
      // alert(JSON.stringify(item));
      // this.$store.state.work_order_edit_item = item;
      localStorage.setItem(server.WO_EDIT_ITEM, JSON.stringify(item));
      this.$router.push(`/production-order-edit/${item.id}`);
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

    async searchData() {
      this.dessertsdetail = [];
      this.dessertssum = [];
      this.$showLoader();

      if (this.select_doc_type == 1) {
        const resultmch = await api.Getcloth_registration_mch({
          doc_running_no: this.searchdoc_running_no,
        });

        if (resultmch.data.length > 0) {
          for (let i = 0; i < resultmch.data.length; i++) {
            const resultsum = await api.Getcloth_registration_sum({
              doc_running_no: resultmch.data[i].doc_running_no,
              status: this.select_doc_status,
            });
            if (resultsum.data.length > 0) {
              for (let index = 0; index < resultsum.data.length; index++) {
                this.dessertssum.push({
                  ...resultsum.data[index],
                  machine_id: resultmch.data[i].machine_id,
                });

                if (
                  i === resultmch.data.length - 1 &&
                  index === resultsum.data.length - 1
                ) {
                  await this.checkcontentsum(this.dessertssum);
                  await this.setexporttoxlsx(this.dessertssum);
                }
              }
            }
          }
        }
      } else if (this.select_doc_type == 2) {
        if (this.searchdoc_running_no.trim() == "") {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "โปรดใส่เลขที่ใบสั่งผลิต",
            "text-h5 red--text text-center"
          );
          this.$hideLoader();
          return;
        }
        const resultsum = await api.Getcloth_registration_sum({
          doc_running_no: this.searchdoc_running_no,
          status: this.select_doc_status,
        });
        console.log(resultsum.data);

        if (resultsum.data.length > 0) {
          this.dataheadersum.doc_running_no = resultsum.data[0].doc_running_no;
          this.dataheadersum.item_id = resultsum.data[0].item_id;
          this.dataheadersum.item_name = resultsum.data[0].item_name;
          this.dataheadersum.po_qty = `${resultsum.data[0].order_qty} (${resultsum.data[0].ordcntbatch} batch)`;
          this.dataheadersum.sum_get = `${resultsum.data[0].sumqty} (${resultsum.data[0].rvcntbatch} batch)`;
          this.dataheadersum.remain_qty = `${resultsum.data[0].remainqty} (${resultsum.data[0].remainbatch} batch)`;
          this.dataheadersum.order_date = resultsum.data[0].order_date;

          if (resultsum.data[0].status == "A") {
            this.dataheadersum.status = "Active";
          } else if (resultsum.data[0].status == "C") {
            this.dataheadersum.status = "Close";
          } else {
            this.dataheadersum.status = "-";
          }

          this.dessertssum = resultsum.data;
        }

        const resultdetail = await api.Getcloth_registration_detail({
          doc_running_no: this.searchdoc_running_no,
          status: this.select_doc_status,
        });
        if (resultdetail.data.length > 0) {
          this.dessertsdetail = resultdetail.data;

          await this.checkcontent(this.dessertsdetail);
        }
      } else {
      }

      // this.$showLoader();
      this.$hideLoader();
    },

    async loadItemMaster() {
      // const result = await api.getProdOrderPlanDraftList(
      //   localStorage.getItem(server.COMPANYID)
      // );

      const result = await api.getOrderByCompanyID(
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
      this.department = result.data;
      result.data.forEach((item) => {
        this.department_list.push(item.name);
      });
    },
    async loadAuthorize() {
      const res_get = await api.getSettingGroupMenu();
      this.authorize = res_get.data;
    },

    async loadDivisionMaster(id) {
      const result = await api.getDivisionByCompanyID(id);
      this.position = result.data;

      result.data.forEach((item) => {
        this.position_list.push(item.name);
      });
    },

    async loadDetailAccount(id) {
      this.showsig1 = true;
      // console.log("loadDetailAccount:", id + "//");
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
    selectdoc_type_name(doc_type) {
      this.dessertsdetail = [];
      this.dessertssum = [];
      this.doc_type_name = this.doc_type.find((obj) => {
        return obj.id === doc_type;
      }).status_name;
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

@media screen {
}

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

.btn-labeled > b {
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
.col-md-1 {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 8.333333333333333%;
  flex: 0 0 8.333333333333333%;
  max-width: 8.333333333333333%;
}
.col-md-2 {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 16.66666666666667%;
  flex: 0 0 16.66666666666667%;
  max-width: 16.66666666666667%;
}

.col-md-3 {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 20%;
  flex: 0 0 20%;
  max-width: 20%;
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

.col-md-4 {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 33.33333333333333%;
  flex: 0 0 33.33333333333333%;
  max-width: 33.33333333333333%;
}

.col-md-5 {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 41.66666666666667%;
  flex: 0 0 41.66666666666667%;
  max-width: 41.66666666666667%;
}

.col-md-6 {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
  max-width: 50%;
}
.col-md-7 {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 58.33333333333333%;
  flex: 0 0 58.33333333333333%;
  max-width: 58.33333333333333%;
}
.col-md-8 {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 66.66666666666667%;
  flex: 0 0 66.66666666666667%;
  max-width: 66.66666666666667%;
}
.col-md-9 {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 75%;
  flex: 0 0 75%;
  max-width: 75%;
}
.col-md-10 {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 83.33333333333333%;
  flex: 0 0 83.33333333333333%;
  max-width: 83.33333333333333%;
}
.col-md-11 {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 91.66666666666667%;
  flex: 0 0 91.66666666666667%;
  max-width: 91.66666666666667%;
}
.col-md-12 {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  max-width: 100%;
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
</style>
