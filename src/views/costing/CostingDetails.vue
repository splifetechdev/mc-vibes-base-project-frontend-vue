<template>
  <v-container fluid>
    <v-card class="ma-3">
      <v-row class="mt-5 ml-5 mr-5">
        <v-col cols="12" md="12">
          <v-row>
            <v-col cols="12" md="12" justify="center" class="">
              <h4>รายงานแสดงต้นทุนการผลิต (แบบละเอียด)</h4>
            </v-col>
          </v-row>

          <v-row class="ma-2">
            <v-col cols="12" sm="12" md="3">
              <v-text-field
                label="เลขที่คำสั่งผลิต"
                v-model="dessertsHeader.doc_running_no"
                hide-details
                outlined
                dense
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-text-field
                label="รหัสสินค้า"
                v-model="dessertsHeader.item_id"
                hide-details
                outlined
                dense
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <v-text-field
                label="ชื่อสินค้า"
                v-model="dessertsHeader.item_name"
                hide-details
                outlined
                dense
                disabled
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="ma-2">
            <v-col cols="12" sm="12" md="6">
              <v-text-field
                label="Work Center"
                v-model="dessertsHeader.work_center"
                hide-details
                outlined
                dense
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="4"> </v-col>
            <v-col cols="12" sm="12" md="2" justify="center">
              <v-btn
                width="200"
                color="blue white--text"
                class="mb-2"
                @click="exportToPDFPreview()"
                :disabled="!desserts.length > 0"
              >
                Print
              </v-btn>
            </v-col>
            <!-- <v-col cols="12" md="2" justify="center">
              <v-btn color="#1f51ff" dark class="mb-2 mr-2" @click="SearchData">
                Search
              </v-btn>
            </v-col> -->
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
                Batch
              </th>
              <th
                rowspan="4"
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #0730e9;color: #ffffff;text-align: center;"
              >
                Status
              </th>
              <!-- <th
                rowspan="3"
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #0730e9;color: #ffffff;text-align: center;"
              >
                Item
              </th> -->
              <!-- <th
                rowspan="3"
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #0730e9;color: #ffffff;text-align: center;"
              >
                Item Name
              </th> -->
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
              <!-- <td
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #0730e9;color: #ffffff;text-align: center;"
              ></td>
              <td
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #0730e9;color: #ffffff;text-align: center;"
              ></td> -->
              <!-- <td
                style="border-right:1px solid #ffffff;border-left:1px solid #ffffff;background: #0730e9;color: #ffffff;text-align: center;"
              ></td> -->
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
                {{ item.batch_count ? item.batch_count : "-" }}
              </td>
              <td>
                {{ item.status ? item.status : "-" }}
              </td>
              <!-- <td class="text-left" width="200">
                {{ item.item_id ? item.item_id : "-" }}
              </td> -->
              <!-- <td class="text-left">
                {{ item.item_name ? item.item_name : "-" }}
              </td> -->

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
    <!-- :style="showprint" -->
    <div :style="showprint" id="mydivhtmltobase">
      <div v-for="index in pageAll" style="margin-bottom: 0.1mm;">
        <div class="aligncenter" id="foo">
          <page size="A4landscape" class="aligncenter">
            <div class="aligncenter">
              <div class="rowprpo mt20prpo">
                <div class="col-md-6print">
                  <!-- <img
                    src="@/assets/sp65.png"
                    alt=""
                    width="30%"
                    contain
                    class="alignleft colprpo ml30prpo"
                  /> -->
                </div>
                <div class="col-md-6print">
                  <!-- <p class="alignright caption colprpo mr30prpo">
                    Page {{ index }} of {{ pageAll }}
                  </p> -->
                </div>
              </div>
              <div class="rowprpo aligncenter ">
                <div class="col-md-12print mb20prpo">
                  <h5>
                    รายงานแสดงต้นทุนการผลิต (แบบละเอียด)
                  </h5>
                </div>
              </div>
              <div class="col-md-12print mt-10prpo">
                <div class="rowprpo  textalignleft ml5prpo ">
                  <div class="width25 fontsize14">
                    เลขที่คำสั่งผลิต :
                    {{
                      dessertsHeader.doc_running_no
                        ? dessertsHeader.doc_running_no
                        : "-"
                    }}
                  </div>
                  <div class="width25 fontsize14">
                    รหัสสินค้า :
                    {{ dessertsHeader.item_id ? dessertsHeader.item_id : "-" }}
                  </div>
                  <div class="width50 fontsize14">
                    ชื่อสินค้า :
                    {{
                      dessertsHeader.item_name ? dessertsHeader.item_name : "-"
                    }}
                  </div>
                </div>
              </div>

              <div
                class="col-md-12print "
                style="margin-top:10px;margin-bottom:10px"
              >
                <div class="rowprpo  textalignleft ml5prpo ">
                  <div class="width100 fontsize14">
                    Work Center :
                    {{
                      dessertsHeader.work_center
                        ? dessertsHeader.work_center
                        : "-"
                    }}
                  </div>
                </div>
              </div>
            </div>

            <div
              class="rowprpo caption  ml5prpo mr5prpo"
              style="margin-top:3px"
            >
              <table class="caption">
                <tr>
                  <th
                    class="width4"
                    rowspan="4"
                    style="border-right:1px solid #000000;border-left:1px solid #000000;border-bottom:1px solid #000000;border-top:1px solid #000000;color: #000000;text-align: center;"
                  >
                    Batch
                  </th>

                  <th
                    class="width4"
                    rowspan="4"
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;border-top:1px solid #000000;color: #000000;text-align: center;"
                  >
                    Status
                  </th>

                  <th
                    rowspan="4"
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;border-top:1px solid #000000;color: #000000;text-align: center;"
                  >
                    Standard HRS
                  </th>
                  <th
                    rowspan="4"
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;border-top:1px solid #000000;color: #000000;text-align: center;"
                  >
                    ACTUAL HRS
                  </th>
                </tr>

                <tr>
                  <th
                    colspan="4"
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;border-top:1px solid #000000;color: #000000;text-align: center;"
                  >
                    Standard
                  </th>
                  <th
                    colspan="4"
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;border-top:1px solid #000000;color: #000000;text-align: center;"
                  >
                    ACTUAL
                  </th>
                  <th
                    colspan="5"
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;border-top:1px solid #000000;color: #000000;text-align: center;"
                  >
                    Varience
                  </th>
                </tr>
                <tr>
                  <th
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;color: #000000;text-align: center;"
                  >
                    DL
                  </th>
                  <th
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;color: #000000;text-align: center;"
                  >
                    FOH
                  </th>
                  <th
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;color: #000000;text-align: center;"
                  >
                    VOH
                  </th>
                  <th
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;color: #000000;text-align: center;"
                  >
                    Total
                  </th>
                  <th
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;color: #000000;text-align: center;"
                  >
                    DL
                  </th>
                  <th
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;color: #000000;text-align: center;"
                  >
                    FOH
                  </th>
                  <th
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;color: #000000;text-align: center;"
                  >
                    VOH
                  </th>
                  <th
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;color: #000000;text-align: center;"
                  >
                    Total
                  </th>
                  <th
                    colspan="2"
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;color: #000000;text-align: center;"
                  >
                    DL
                  </th>
                  <th
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;color: #000000;text-align: center;"
                  >
                    FOH
                  </th>
                  <th
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;color: #000000;text-align: center;"
                  >
                    VOH
                  </th>
                  <th
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;color: #000000;text-align: center;"
                  >
                    Total
                  </th>
                </tr>
                <tr>
                  <th
                    colspan="4"
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;color: #000000;text-align: center;"
                  ></th>

                  <th
                    colspan="4"
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;color: #000000;text-align: center;"
                  ></th>

                  <th
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;color: #000000;text-align: center;"
                  >
                    HR
                  </th>
                  <th
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;color: #000000;text-align: center;"
                  >
                    RATE
                  </th>
                  <th
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;color: #000000;text-align: center;"
                  >
                    HR
                  </th>
                  <th
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;color: #000000;text-align: center;"
                  >
                    HR
                  </th>
                  <th
                    style="border-right:1px solid #000000;border-bottom:1px solid #000000;color: #000000;text-align: center;"
                  ></th>
                </tr>
                <!-- <tr>
                  <th
                    scope="colgroup"
                    class="prborderbottom prbordertop prborderleft width10 caption prborderright"
                  >
                    ORD ID
                  </th>
                  <th
                    scope="colgroup"
                    class="prborderbottom prbordertop width9 caption prborderright fontsize10"
                  >
                    Batch
                  </th>
                  <th
                    scope="colgroup"
                    class="prborderbottom prbordertop width15 caption prborderright"
                  >
                    Status
                  </th>
                  <th
                    scope="colgroup"
                    class="prborderbottom prbordertop width15 caption prborderright"
                  >
                    MCH
                  </th>
                  <th
                    scope="colgroup"
                    class="prborderbottom prbordertop width12 caption prborderright"
                  >
                    Zone
                  </th>
                  <th
                    scope="colgroup"
                    class="prborderbottom prbordertop width5 caption prborderright fontsize10"
                  >
                    ระยะทาง
                  </th>
                  <th
                    scope="colgroup"
                    class="prborderbottom prbordertop width5 caption prborderright fontsize10"
                  >
                    ประเภท
                  </th>
                  <th
                    scope="colgroup"
                    class="prborderbottom prbordertop width8 caption prborderright"
                  >
                    ค่าเที่ยว
                  </th>
                  <th
                    scope="colgroup"
                    class="prborderbottom prbordertop width8 caption prborderright"
                  >
                    ค่าทางด่วน
                  </th>
                  <th
                    scope="colgroup"
                    class="prborderbottom prbordertop width8 caption prborderright"
                  >
                    ค่าเปิดท้าย
                  </th>
                  <th
                    scope="colgroup"
                    class="prborderbottom prbordertop width8 caption prborderright"
                  >
                    ค่าพ่วง
                  </th>
                  <th
                    scope="colgroup"
                    class="prborderbottom prbordertop width8 caption prborderright"
                  >
                    ค่างานกลับ
                  </th>
                  <th
                    scope="colgroup"
                    class="prborderbottom prbordertop width8 caption prborderright"
                  >
                    แบก/ฉีก
                  </th>
                  <th
                    scope="colgroup"
                    class="prborderbottom prbordertop width8 caption prborderright"
                  >
                    อื่นๆ
                  </th>
                  <th
                    scope="colgroup"
                    class="prborderbottom prbordertop prborderright width10 caption"
                  >
                    รวมทั้งสิ้น
                  </th>
                </tr> -->

                <tr v-for="(data, i) in setdatatoshow[index - 1]" id="content">
                  <td
                    class="width10 textaligncenter prborderleft prborderright prborderbottom fontsize10"
                  >
                    {{ data.batch_count ? data.batch_count : "-" }}
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    {{ data.status ? data.status : "-" }}
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    {{
                      data.std_hours
                        ? fntolocalestringnumber(Number(data.std_hours))
                        : "-"
                    }}
                  </td>

                  <td
                    class="width20 textalignleft prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter pl5prpo">
                      {{
                        data.act_hours
                          ? fntolocalestringnumber(Number(data.act_hours))
                          : "-"
                      }}
                    </span>
                  </td>

                  <td
                    class="width10 textalignleft prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter pl5prpo">
                      {{
                        data.std_labor
                          ? fntolocalestringnumber(Number(data.std_labor))
                          : "-"
                      }}
                    </span>
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <!-- class="fixonerow" -->
                    <span class="fixonerowaligncenter">{{
                      data.std_foh
                        ? fntolocalestringnumber(Number(data.std_foh))
                        : "-"
                    }}</span>
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">{{
                      data.std_voh
                        ? fntolocalestringnumber(Number(data.std_voh))
                        : "-"
                    }}</span>
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">{{
                      data.sum_std
                        ? fntolocalestringnumber(Number(data.sum_std))
                        : "-"
                    }}</span>
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">{{
                      data.act_labor
                        ? fntolocalestringnumber(Number(data.act_labor))
                        : "-"
                    }}</span>
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">{{
                      data.act_foh
                        ? fntolocalestringnumber(Number(data.act_foh))
                        : "-"
                    }}</span>
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">
                      {{
                        data.act_voh
                          ? fntolocalestringnumber(Number(data.act_voh))
                          : "-"
                      }}</span
                    >
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">{{
                      data.sum_act
                        ? fntolocalestringnumber(Number(data.sum_act))
                        : "-"
                    }}</span>
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">
                      {{
                        data.V_DL_Hours
                          ? fntolocalestringnumber(Number(data.V_DL_Hours))
                          : "-"
                      }}</span
                    >
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">{{
                      data.V_DL_Rate
                        ? fntolocalestringnumber(Number(data.V_DL_Rate))
                        : "-"
                    }}</span>
                  </td>

                  <td
                    class="width6 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">
                      {{
                        data.V_foh
                          ? fntolocalestringnumber(Number(data.V_foh))
                          : "-"
                      }}</span
                    >
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">
                      {{
                        data.V_voh
                          ? fntolocalestringnumber(Number(data.V_voh))
                          : "-"
                      }}</span
                    >
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">
                      {{
                        data.sum_v
                          ? fntolocalestringnumber(Number(data.sum_v))
                          : "-"
                      }}</span
                    >
                  </td>
                </tr>

                <tr v-if="pageAll == index" style="font-weight: bold;">
                  <td
                    class="width10 textaligncenter prborderleft prborderright prborderbottom fontsize10"
                  ></td>
                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">
                      {{ datatotal.word_en }}
                    </span>
                  </td>
                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">
                      {{
                        datatotal.std_hours
                          ? fntolocalestringnumber(datatotal.std_hours)
                          : "-"
                      }}
                    </span>
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">
                      {{
                        datatotal.act_hours
                          ? fntolocalestringnumber(datatotal.act_hours)
                          : "-"
                      }}
                    </span>
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">
                      {{
                        datatotal.std_labor
                          ? fntolocalestringnumber(datatotal.std_labor)
                          : "-"
                      }}
                    </span>
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">
                      {{
                        datatotal.std_foh
                          ? fntolocalestringnumber(datatotal.std_foh)
                          : "-"
                      }}
                    </span>
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">
                      {{
                        datatotal.std_voh
                          ? fntolocalestringnumber(datatotal.std_voh)
                          : "-"
                      }}
                    </span>
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">
                      {{
                        datatotal.sum_std
                          ? fntolocalestringnumber(datatotal.sum_std)
                          : "-"
                      }}
                    </span>
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">
                      {{
                        datatotal.act_labor
                          ? fntolocalestringnumber(datatotal.act_labor)
                          : "-"
                      }}
                    </span>
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">
                      {{
                        datatotal.act_foh
                          ? fntolocalestringnumber(datatotal.act_foh)
                          : "-"
                      }}
                    </span>
                  </td>

                  <td
                    class="width6 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">
                      {{
                        datatotal.act_voh
                          ? fntolocalestringnumber(datatotal.act_voh)
                          : "-"
                      }}
                    </span>
                  </td>

                  <td
                    class="width6 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">
                      {{
                        datatotal.sum_act
                          ? fntolocalestringnumber(datatotal.sum_act)
                          : "-"
                      }}
                    </span>
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">
                      {{
                        datatotal.V_DL_Hours
                          ? fntolocalestringnumber(datatotal.V_DL_Hours)
                          : "-"
                      }}
                    </span>
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">
                      {{
                        datatotal.V_DL_Rate
                          ? fntolocalestringnumber(datatotal.V_DL_Rate)
                          : "-"
                      }}
                    </span>
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">
                      {{
                        datatotal.V_foh
                          ? fntolocalestringnumber(datatotal.V_foh)
                          : "-"
                      }}
                    </span>
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">
                      {{
                        datatotal.V_voh
                          ? fntolocalestringnumber(datatotal.V_voh)
                          : "-"
                      }}
                    </span>
                  </td>

                  <td
                    class="width10 textaligncenter prborderright prborderbottom fontsize10"
                  >
                    <span class="fixonerowaligncenter">
                      {{
                        datatotal.sum_v
                          ? fntolocalestringnumber(datatotal.sum_v)
                          : "-"
                      }}
                    </span>
                  </td>
                </tr>
              </table>
            </div>
            <!-- <div class="footerprpo ">
              <div class="alignright mr40prpo">
                ผู้ปริ้น {{ fullname }} วันที่ {{ datenowFormatted }}
              </div>
            </div> -->
          </page>
        </div>
      </div>
    </div>
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
import html2pdf from "html2pdf.js";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
export default {
  data: (vm) => ({
    datatotal: {
      word_en: "Total",
      word_th: "รวมทั้งสิ้น",
      std_hours: 0,
      std_foh: 0,
      std_voh: 0,
      std_labor: 0,
      act_hours: 0,
      act_foh: 0,
      act_voh: 0,
      act_labor: 0,
      V_DL_Hours: 0,
      V_foh: 0,
      V_voh: 0,
      V_DL_Rate: 0,
      calother: 0,
      sum_std: 0,
      sum_act: 0,
      sum_v: 0,
    },
    showprint: "display:none;",
    pageAll: 1,
    setdatatoshow: [],
    dataforshowprpo: [],
    dessertsHeader: {},
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
        value: "id",
        align: "center",
      },
      { text: "batch_count", value: "batch_count", align: "center" },
      { text: "Status", value: "status", align: "center" },
      { text: "machine_id", value: "machine_id" },
      { text: "std_hours", value: "std_hours", align: "center" },
      { text: "std_foh", value: "std_foh", align: "center" },
      { text: "std_voh", value: "std_voh", align: "center" },
      { text: "std_labor", value: "std_labor", align: "center" },

      { text: "std_hours", value: "std_hours", align: "center" },
      { text: "std_foh", value: "std_foh", align: "center" },
      { text: "std_voh", value: "std_voh", align: "center" },
      { text: "std_labor", value: "std_labor", align: "center" },

      { text: "std_hours", value: "std_hours", align: "center" },
      { text: "std_foh", value: "std_foh", align: "center" },
      { text: "std_voh", value: "std_voh", align: "center" },
      { text: "std_labor", value: "std_labor", align: "center" },
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
    async exportToPDFPreview() {
      this.showprint = "";
      const element = document.getElementById("mydivhtmltobase");

      const opt = {
        filename: "ใบวางบิลค่าเที่ยวรถขนส่ง.pdf",
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
          orientation: "landscape",
          putOnlyUsedFonts: true,
          pagesplit: true,
        },
        // pagebreak: { mode: ["avoid-all"], after: ".cke_pagebreak" },
      };

      let abcd = await html2pdf()
        .from(element)
        .set(opt)
        .toPdf()
        // .save()
        .get("pdf")
        // .output("bloburl")
        .then(function(pdf) {
          const totalPages = pdf.internal.getNumberOfPages();
          pdf.deletePage(totalPages);
          pdf.setProperties({
            title: "รายงานแสดงต้นทุนการผลิต(แบบละเอียด).pdf",
          });
          return pdf.output("bloburl");
        });
      window.open(abcd);
      let blob = await fetch(abcd).then((r) => r.blob());
      this.showprint = "display:none;";
      this.showtemplatehtml = false;
      // return blob;
    },
    async SearchData(doc_running_no) {
      if (doc_running_no == null || doc_running_no == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "ORD ID Not Found !!!",
          "text-h5 red--text text-center"
        );
        return;
      }
      // return;

      this.$showLoader();
      const results = await api.SearchORDCostingDetailH({
        doc_running_no: doc_running_no,
      });
      if (results.length == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Data Not Found !!!",
          "text-h5 red--text text-center"
        );
        return;
      }
      // console.log(results.data);

      this.dessertsHeader.doc_running_no = results.data[0].doc_running_no;
      this.dessertsHeader.item_id = results.data[0].item_id;
      this.dessertsHeader.item_name = results.data[0].item_name;
      this.dessertsHeader.work_center = `${results.data[0].wc_id}  FOH=${results.data[0].foh_rate} / VOH=${results.data[0].voh_rate} / Labor=${results.data[0].labor_rate}`;

      const resultsDetails = await api.SearchORDCostingDetailD({
        doc_running_no: doc_running_no,
      });

      this.desserts = resultsDetails.data;
      if (this.desserts.length == 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Data Not Found !!!",
          "text-h5 red--text text-center"
        );
        return;
      }
      this.desserts.forEach(async (x, i) => {
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

        this.datatotal.std_hours += Number(
          stringcommatonumber(
            this.fntolocalestringnumber(x.std_hours ? x.std_hours : 0)
          )
        );
        this.datatotal.std_foh += Number(
          stringcommatonumber(
            this.fntolocalestringnumber(x.std_foh ? x.std_foh : 0)
          )
        );
        this.datatotal.std_voh += Number(
          stringcommatonumber(
            this.fntolocalestringnumber(x.std_voh ? x.std_voh : 0)
          )
        );
        this.datatotal.std_labor += Number(
          stringcommatonumber(
            this.fntolocalestringnumber(x.std_labor ? x.std_labor : 0)
          )
        );
        this.datatotal.act_hours += Number(
          stringcommatonumber(
            this.fntolocalestringnumber(x.act_hours ? x.act_hours : 0)
          )
        );
        this.datatotal.act_foh += Number(
          stringcommatonumber(
            this.fntolocalestringnumber(x.act_foh ? x.act_foh : 0)
          )
        );
        this.datatotal.act_voh += Number(
          stringcommatonumber(
            this.fntolocalestringnumber(x.act_voh ? x.act_voh : 0)
          )
        );
        this.datatotal.act_labor += Number(
          stringcommatonumber(
            this.fntolocalestringnumber(x.act_labor ? x.act_labor : 0)
          )
        );
        this.datatotal.V_DL_Hours += Number(
          stringcommatonumber(
            this.fntolocalestringnumber(x.V_DL_Hours ? x.V_DL_Hours : 0)
          )
        );
        this.datatotal.V_foh += Number(
          stringcommatonumber(
            this.fntolocalestringnumber(x.V_foh ? x.V_foh : 0)
          )
        );
        this.datatotal.V_voh += Number(
          stringcommatonumber(
            this.fntolocalestringnumber(x.V_voh ? x.V_voh : 0)
          )
        );
        this.datatotal.V_DL_Rate += Number(
          stringcommatonumber(
            this.fntolocalestringnumber(x.V_DL_Rate ? x.V_DL_Rate : 0)
          )
        );
        this.datatotal.sum_std += Number(
          stringcommatonumber(
            this.fntolocalestringnumber(x.sum_std ? x.sum_std : 0)
          )
        );
        this.datatotal.sum_act += Number(
          stringcommatonumber(
            this.fntolocalestringnumber(x.sum_act ? x.sum_act : 0)
          )
        );
        this.datatotal.sum_v += Number(
          stringcommatonumber(
            this.fntolocalestringnumber(x.sum_v ? x.sum_v : 0)
          )
        );
        if (i == this.desserts.length - 1) {
          await this.checkcontent();
        }
      });
      this.$hideLoader();
    },

    async checkcontent(index) {
      this.sumqtyorderpo = 0;
      this.sumlineamountpo = 0;
      this.sumlinedispo = 0;
      this.sumlinetaxpo = 0;
      this.sumlinepercenpo = 0;
      this.sumgrandtotalpo = 0;
      //checklineforsig = เช็คบรรทัดของ detail เพื่อแสดงลายเซ็น
      let checklineforsig = 10;
      //linedetailprpo คือ บรรทัดทั้งหมดของหน้า
      let linedetailprpo = 24;
      //datainlineprpo คือ ข้อมูลแต่ละบรรทัด
      let datainlineprpo = 27;
      let addnewbutget = 0;
      let getdata = [];
      let getnewdata = [];
      this.setdatatoshow = [];
      let hllinedetails = 0;
      this.pageAll = 1;
      let newhllinedetails = 0;
      for (let i = 0; i < this.desserts.length; i++) {
        let stringchecklength = "";
        // let lengthofdataforshowprpo = this.desserts[i].address.length;
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
        this.desserts[i].no = i + 1;
        this.sumqtyorderpo += this.desserts[i].machine_id;

        // stringchecklength = this.desserts[i].address;
        stringchecklength = "1";
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
        getnewdata.push(this.desserts[i]);
        // console.log(hllinedetails, newhllinedetails);
        if (hllinedetails + newhllinedetails > linedetailprpo) {
          this.setdatatoshow[this.pageAll - 1] = getdata;
          this.pageAll++;

          hllinedetails = 0;
          getdata = [];
          getdata.push(this.desserts[i]);
          hllinedetails += newhllinedetails;
          if (i == this.desserts.length - 1) {
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

          getdata.push(this.desserts[i]);
          if (i == this.desserts.length - 1) {
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
    onChange(event) {},
    openchangeapproval() {
      this.dialogchangeapproval = true;
    },
    getRows(rows) {
      // console.log(rows);
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

    await this.$hideLoader();
    await this.SearchData(this.$route.params.doc_running_no);

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
.col-md-1print {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 8.333333333333333%;
  flex: 0 0 8.333333333333333%;
  max-width: 8.333333333333333%;
}
.col-md-2print {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 16.66666666666667%;
  flex: 0 0 16.66666666666667%;
  max-width: 16.66666666666667%;
}

.col-md-3print {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 20%;
  flex: 0 0 20%;
  max-width: 20%;
}

.col-md-4print {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 33.33333333333333%;
  flex: 0 0 33.33333333333333%;
  max-width: 33.33333333333333%;
}

.col-md-5print {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 41.66666666666667%;
  flex: 0 0 41.66666666666667%;
  max-width: 41.66666666666667%;
}

.col-md-6print {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
  max-width: 50%;
}
.col-md-7print {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 58.33333333333333%;
  flex: 0 0 58.33333333333333%;
  max-width: 58.33333333333333%;
}
.col-md-8print {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 66.66666666666667%;
  flex: 0 0 66.66666666666667%;
  max-width: 66.66666666666667%;
}
.col-md-9print {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 75%;
  flex: 0 0 75%;
  max-width: 75%;
}
.col-md-10print {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 83.33333333333333%;
  flex: 0 0 83.33333333333333%;
  max-width: 83.33333333333333%;
}
.col-md-11print {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 91.66666666666667%;
  flex: 0 0 91.66666666666667%;
  max-width: 91.66666666666667%;
}
.col-md-12print {
  word-wrap: break-word;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  max-width: 100%;
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
.mr5prpo {
  margin-right: 5px !important;
}
.mr10prpo {
  margin-right: 10px !important;
}
.mr20prpo {
  margin-right: 20px !important;
}
.mr30prpo {
  margin-right: 30px !important;
}
.mr40prpo {
  margin-right: 40px !important;
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

.ml2prpo {
  margin-left: 2px !important;
}

.ml5prpo {
  margin-left: 5px !important;
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

.col-md-4printpr {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 30%;
  flex: 0 0 30%;
  max-width: 30%;
}
.col-md-8printpr {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 70%;
  flex: 0 0 70%;
  max-width: 70%;
}
.col-md-4printprrd {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
  max-width: 50%;
}
.col-md-8printprrd {
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
.width3 {
  word-wrap: break-word;
  width: 3%;
}
.width4 {
  word-wrap: break-word;
  width: 4%;
}
.width5 {
  word-wrap: break-word;
  width: 5%;
}
.width6 {
  word-wrap: break-word;
  width: 6%;
}
.width7 {
  word-wrap: break-word;
  width: 7%;
}
.width8 {
  word-wrap: break-word;
  width: 8%;
}
.width9 {
  word-wrap: break-word;
  width: 9%;
}
.width13 {
  word-wrap: break-word;
  width: 13%;
}
.width12 {
  word-wrap: break-word;
  width: 12%;
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
  border-bottom: 1px solid;
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
.fontsize8 {
  font-size: 8px;
}
.fontsize10 {
  font-size: 10px;
}
.fontsize12 {
  font-size: 12px;
}
.fontsize14 {
  font-size: 14px;
}
.fontsize16 {
  font-size: 16px;
}
.widthsignature {
  width: 3cm;
  height: 1.5cm;
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
.pl5prpo {
  padding-left: 5px !important;
}
.pl10prpo {
  padding-left: 10px !important;
}
.pl15prpo {
  padding-left: 15px !important;
}
.pl20prpo {
  padding-left: 20px !important;
}
</style>
