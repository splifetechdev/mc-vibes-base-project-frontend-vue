<template>
  <v-container class="pa-1" fluid>
    <v-card class="pa-12">
      <v-card-title>
        <v-row no-gutters>
          <v-col cols="12" md="6" justify="center" class="mb-6">
            <h3>
              Adjust Production Order # {{ main_item_data.doc_running_no }}
            </h3>
          </v-col>
          <!-- <v-col cols="12" md="6" justify="center" align="end">
            <h3>{{ main_item_data.doc_running_no }}</h3>
          </v-col> -->
        </v-row>
      </v-card-title>

      <v-row no-gutters class="pb-3">
        <v-col cols="12" md="12" justify="center">
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12" md="3" justify="center">
          <!-- <p>{{ radios || "null" }}</p> -->
          <v-radio-group
            v-model="radios"
            mandatory
            @change="onRadioChange()"
            :disabled="doc_status"
          >
            <v-radio
              label="Adjust First Start Date"
              value="adjust_start_date_time"
            >
            </v-radio>
            <v-radio
              label="Adjust Due Date"
              value="adjust_due_date_time"
            ></v-radio>
            <v-radio
              label="Adjust Between Production"
              value="adjust_between_date_time"
              disabled
            ></v-radio>
            <v-radio label="Close" value="close"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col
          cols="12"
          md="6"
          justify="center"
          class="pt-3"
          v-if="rd_aj_status"
        >
          <v-row no-gutters>
            <v-col cols="12" md="4" justify="center">
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateFormatted2"
                    label="Start Date"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    dense
                    :disabled="doc_status"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date2"
                  no-title
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <p class="pt-2 pl-5">Due Time :</p>
            <v-col class="d-flex pl-2 pt-1" cols="12" sm="2">
              <vue-timepicker
                v-model="tmp_due_time2"
                close-on-complete
                format="HH:mm"
                fixed-dropdown-button
                auto-scroll
                hide-clear-button
                width="100%"
                :disabled="doc_status"
              ></vue-timepicker>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="3" justify="center">
          <!-- <p>{{ radios || "null" }}</p> -->
          <v-radio-group v-model="rd_spacial" @change="onRadioSpacialChange()">
            <v-radio
              label="แก้ไขเลขที่คำสั่งผลิต"
              value="adjust_doc_running_no"
            >
            </v-radio>
            <v-radio
              label="แก้ไข Line of MCH"
              value="adjust_line_of_mch"
            ></v-radio>
            <v-radio label="แก้ไข QTY Order" value="adjust_qty_order"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12" md="12" justify="center">
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="12" justify="center">
          <div id="tabs" class="containertab">
            <div class="tabs">
              <div
                v-on:click="activetab = 1"
                v-bind:class="[activetab === 1 ? 'active' : '']"
              >
                General
              </div>
            </div>

            <div class="content">
              <div
                v-if="activetab === 1 && callsoopentab == true"
                class="tabcontent"
              >
                <v-row no-gutters>
                  <v-col class="d-flex" cols="12" sm="3">
                    <v-select
                      autofocus
                      v-model="select_doc_running"
                      :items="doc_running_list"
                      label="Doc. Group *"
                      outlined
                      item-text="module"
                      item-value="module"
                      dense
                      class="mr-2"
                      disabled
                    ></v-select>
                  </v-col>

                  <v-col class="d-flex" cols="12" sm="3">
                    <v-select
                      v-model="select_item_master"
                      :items="item_master_list"
                      label="Item ID"
                      outlined
                      item-text="item_id"
                      item-value="item_id"
                      dense
                      class="mr-2"
                      @change="changeItemMaster"
                      disabled
                    ></v-select>
                  </v-col>

                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                      v-model="item_master_name"
                      label="Item Name"
                      outlined
                      dense
                      readonly
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col cols="12" sm="12" md="2">
                    <v-text-field
                      v-model="itemadd.order_qty"
                      label="Order QTY"
                      outlined
                      dense
                      type="number"
                      class="mr-2"
                      disabled
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="2" md="1">
                    <v-text-field
                      v-model="item_master_unit"
                      label="Unit Name"
                      outlined
                      dense
                      readonly
                      class="mr-2"
                      disabled
                    ></v-text-field>
                  </v-col>

                  <v-col class="d-flex" cols="12" sm="2">
                    <v-select
                      v-model="select_routing"
                      :items="routing_data_list"
                      label="RTG ID"
                      outlined
                      item-text="rtg_id"
                      item-value="rtg_id"
                      dense
                      class="mr-2"
                      disabled
                      @change="changeRouting"
                    ></v-select>
                  </v-col>

                  <v-col class="d-flex" cols="12" sm="2">
                    <v-menu
                      ref="menu0"
                      v-model="menu0"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateFormatted0"
                          label="Order Date"
                          persistent-hint
                          prepend-icon="mdi-calendar"
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          dense
                          :disabled="approve_status"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date0"
                        no-title
                        @input="menu0 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="2">
                    <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateFormatted1"
                          label="Due Date"
                          persistent-hint
                          prepend-icon="mdi-calendar"
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          dense
                          :disabled="!rd_due_status"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date1"
                        no-title
                        @input="menu1 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col class="d-flex pl-2 pt-1" cols="12" sm="1" md="1">
                    <p class="pt-1">Due Time :</p></v-col
                  >
                  <v-col class="d-flex pl-2 pt-1" cols="12" sm="2" md="2">
                    <vue-timepicker
                      v-model="tmp_due_time"
                      close-on-complete
                      format="HH:mm"
                      fixed-dropdown-button
                      auto-scroll
                      hide-clear-button
                      width="100%"
                      :disabled="!rd_due_status"
                    ></vue-timepicker>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col cols="12" md="2" sm="2" lg="2" justify="center">
                    <v-text-field
                      v-model="no_of_mch"
                      label="No MCH"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                    sm="3"
                    lg="3"
                    justify="center"
                    class="pl-2"
                  >
                    <v-autocomplete
                      v-model="new_mch_selected"
                      :items="new_mch_list"
                      outlined
                      dense
                      chips
                      small-chips
                      label="Machine"
                      multiple
                      item-text="f_mch_name"
                      item-value="id"
                      @change="changeNewMachine"
                      clearable
                    ></v-autocomplete>
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                    sm="3"
                    lg="3"
                    justify="center"
                    class="pl-2"
                  >
                    <v-text-field
                      v-model="line_of_mch"
                      label="Line of MCH"
                      outlined
                      dense
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
              <div v-if="activetab === 3" class="tabcontent">
                <UDefine
                  :udmodulename="udmodule_name"
                  :dataudefine="itemaddudefine"
                  @dataOnUdefine="getdataOnUdefine"
                >
                </UDefine>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-card-actions>
        <v-row justify="center" class="mt-3">
          <v-btn
            depressed
            width="150"
            class="mr-3 buttongreen"
            outlined
            @click="adjustPlanAndPreview()"
            :disabled="doc_status || approve_status"
          >
            Preview Plan
          </v-btn>

          <v-btn
            depressed
            width="100"
            class="mr-3  buttonblue"
            @click="onApproveUpdateWO()"
            :disabled="approve_status"
          >
            Approve
          </v-btn>

          <v-btn
            depressed
            class="mr-3  buttonred"
            width="100"
            @click="onGoBack"
          >
            Back
          </v-btn>
        </v-row>
      </v-card-actions>

      <v-dialog v-model="dialogAdjustDocRunningNo" max-width="70%">
        <v-card>
          <v-card-title class="text-h5">แก้ไขเลขที่คำสั่งผลิต</v-card-title>
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="12" md="12" justify="center">
                <v-text-field
                  v-model="new_doc_running_no"
                  label="หมายเลขที่คำสั่งผลิตใหม่"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              dark
              outlined
              dense
              @click="closeAdjustDocRunningNo"
              >Cancel</v-btn
            >
            <v-btn
              color="pink darken-1"
              outlined
              dense
              dark
              @click="confirmAdjustDocRunningNo"
              >Save</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogAdjustLineOfMch" max-width="70%">
        <v-card>
          <v-card-title class="text-h5">แก้ไข Line of MCH</v-card-title>
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="12" md="12" justify="center">
                <v-text-field
                  v-model="new_line_of_mch"
                  label="Line of MCH"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              dark
              outlined
              dense
              @click="closeAdjustLineOfMch"
              >Cancel</v-btn
            >
            <v-btn
              color="pink darken-1"
              outlined
              dense
              dark
              @click="confirmAdjustLineOfMch"
              >Save</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogAdjustQtyOrder" max-width="70%">
        <v-card>
          <v-card-title class="text-h5">แก้ไข QTY Order</v-card-title>
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="12" md="12" justify="center">
                <v-text-field
                  v-model="new_qty_order"
                  label="QTY Order"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              dark
              outlined
              dense
              @click="closeAdjustQtyOrder"
              >Cancel</v-btn
            >
            <v-btn
              color="pink darken-1"
              outlined
              dense
              dark
              @click="confirmAdjustQtyOrder"
              >Save</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogpreviewimage" max-width="700px">
        <v-card>
          <v-card-title class="text-h5">
            <v-btn icon @click="closepreviewimage">
              <v-icon large>mdi-close</v-icon>
            </v-btn>
            Preview Image</v-card-title
          >

          <v-img
            disabled
            :src="previewimage"
            class="grey lighten-2 mt-3 mb-5"
            aspect-ratio="1"
            contain
          >
          </v-img>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closepreviewimage"
              >Cancel</v-btn
            >

            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDeleteimage" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Are you sure you want to delete this image?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeUpdateWO"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="confirmCloseWorkOrder"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <br />

      <v-row no-gutters>
        <v-spacer></v-spacer>
        <v-col cols="12" md="1" lg="1" justify="center">
          <!-- <v-divider></v-divider> -->
          <v-btn color="#1731fe" block dark @click="newOPN()">New OPN</v-btn>
        </v-col>
      </v-row>

      <div class="pa-2 div-iterator" v-if="doc_running">
        <v-data-table :headers="headers" :items="items" class="elevation-1">
          <template v-slot:[`item.adjusts`]="{ item }">
            <v-menu
              left
              :offset-x="true"
              rounded="rounded"
              :disabled="doc_status"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  class="ml-1"
                  :style="{
                    color: '#4c4d49',
                  }"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-dots-vertical
                </v-icon>
              </template>

              <v-list>
                <v-list-item
                  v-for="(aj_item, index) in adjust_dt_menu_items"
                  :key="index"
                  @click="selectSection(item, aj_item)"
                >
                  <v-list-item-title>{{ aj_item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="onClickedPrint(item)"
              :style="{
                backgroundColor: '#E1F5FE',
                color: '#2196F3',
              }"
            >
              mdi-printer-outline
            </v-icon>
          </template>
        </v-data-table>
      </div>

      <v-dialog v-model="dialogPreview" max-width="100%">
        <v-card>
          <v-card-title class="text-h5"
            >New Plan Preview ({{ adjust_message }})</v-card-title
          >
          <v-card-text>
            <v-data-table
              :headers="headers_preview"
              :items="itemsPreview"
              class="elevation-1"
            >
            </v-data-table>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" outlined @click="confirmNewPlan"
              >Confirm New Plan</v-btn
            >
            <v-btn color="red darken-1" outlined @click="dialogPreview = false"
              >Cancel</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogApprove" max-width="500px">
        <v-card>
          <v-card-title class="text-h6"
            >Are you sure you want to Approve Work Order
            {{ main_item_data.doc_running_no }} ?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" outlined @click="closeApproveUpdateWO"
              >Cancel</v-btn
            >
            <v-btn
              color="green darken-1"
              outlined
              @click="confirmapproveWorkOrder"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogClose" max-width="500px">
        <v-card>
          <v-card-title class="text-h6"
            >Are you sure you want to Close Work Order
            {{ main_item_data.doc_running_no }} ?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" outlined @click="closeUpdateWO"
              >Cancel</v-btn
            >
            <v-btn color="red darken-1" outlined @click="confirmCloseWorkOrder"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogAdjustPreview" max-width="80%">
        <v-card>
          <v-card-title
            class="text-h5 red--text"
            v-if="this.adjust_message == 'Due date is Over , Want to postpone?'"
          >
            New Machine Preview ({{ adjust_message }})
          </v-card-title>
          <v-card-title
            class="text-h5 green--text"
            v-if="this.adjust_message != 'Due date is Over , Want to postpone?'"
          >
            New Machine Preview ({{ adjust_message }})
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers_adjust_preview"
              :items="itemsPreview"
              class="elevation-1"
            >
            </v-data-table>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" outlined @click="confirmAdjustMachine"
              >Confirm New Machine</v-btn
            >
            <v-btn
              color="red darken-1"
              outlined
              @click="dialogAdjustPreview = false"
              >Cancel</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogAdjustMachine" max-width="40%">
        <v-card>
          <v-card-title class="text-h5">Change Machine</v-card-title>
          <v-card-text>
            <v-divider class="pt-3 pb-1"></v-divider>
            <v-row no-gutters class="pb-3">
              <v-col cols="12" md="12" justify="center">
                <h3>ID : {{ adjust_preview_item.id }}</h3>
              </v-col>
            </v-row>
            <v-row no-gutters class="pb-3">
              <v-col cols="12" md="12" justify="center">
                <h3>Old Machine : {{ adjust_preview_item.machine_id }}</h3>
              </v-col>
            </v-row>
            <v-row no-gutters class="pb-3">
              <v-col cols="12" md="12" justify="center">
                <h3>OPN Desc : {{ adjust_preview_item.opn_name }}</h3>
              </v-col>
            </v-row>

            <v-row no-gutters class="pb-3">
              <v-col cols="12" md="12" justify="center">
                <h3>Batch : {{ adjust_preview_item.batch_count }}</h3>
              </v-col>
            </v-row>

            <v-row no-gutters class="pb-3">
              <v-col cols="12" md="12" justify="center">
                <v-radio-group v-model="rd_mch" column>
                  <v-radio label="This Operation" value="TO"></v-radio>
                  <v-radio label="All Related Operation" value="AO"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col cols="12" md="12" justify="center">
                <v-autocomplete
                  v-model="mch_item_selected"
                  :items="mch_item_list"
                  label="Machine"
                  hide-details
                  outlined
                  dense
                  item-text="mch_name"
                  item-value="id"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              outlined
              @click="adjustMachineAndPreview()"
              >Preview Change</v-btn
            >
            <v-btn
              color="red darken-1"
              outlined
              @click="dialogAdjustMachine = false"
              >Cancel</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogAdjustStartTime" max-width="40%">
        <v-card>
          <v-card-title class="text-h5">Change Start Time</v-card-title>
          <v-card-text>
            <v-divider class="pt-3 pb-1"></v-divider>
            <v-row no-gutters class="pb-3">
              <v-col cols="12" md="12" justify="center">
                <h3>ID : {{ adjust_preview_item.id }}</h3>
              </v-col>
            </v-row>
            <v-row no-gutters class="pb-3">
              <v-col cols="12" md="12" justify="center">
                <h3>Machine : {{ adjust_preview_item.machine_id }}</h3>
              </v-col>
            </v-row>
            <v-row no-gutters class="pb-3">
              <v-col cols="12" md="12" justify="center">
                <h3>OPN Desc : {{ adjust_preview_item.opn_name }}</h3>
              </v-col>
            </v-row>

            <v-row no-gutters class="pb-3">
              <v-col cols="12" md="12" justify="center">
                <h3>Batch : {{ adjust_preview_item.batch_count }}</h3>
              </v-col>
            </v-row>

            <v-row no-gutters class="pb-3">
              <v-col cols="12" md="12" justify="center">
                <h3>
                  Old Start Date & Time :
                  {{ adjust_preview_item.fopn_start_date_time }}
                </h3>
              </v-col>
            </v-row>

            <v-row no-gutters class="pt-3">
              <v-col cols="12" md="4" justify="center">
                <v-menu
                  ref="menu3"
                  v-model="menu3"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateFormatted3"
                      label="New Start Date"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      dense
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date3"
                    no-title
                    @input="menu3 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <p class="pt-2 pl-5">Due Time :</p>
              <v-col class="d-flex pl-2 pt-1" cols="12" sm="2">
                <vue-timepicker
                  v-model="tmp_due_time3"
                  close-on-complete
                  format="HH:mm"
                  fixed-dropdown-button
                  auto-scroll
                  hide-clear-button
                  width="100%"
                ></vue-timepicker>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" outlined>Confirm Change</v-btn>
            <v-btn
              color="red darken-1"
              outlined
              @click="dialogAdjustStartTime = false"
              >Cancel</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogAdjustOverTime" max-width="40%">
        <v-card>
          <v-card-title class="text-h5">Add Over Time</v-card-title>
          <v-card-text>
            <v-divider class="pt-3 pb-1"></v-divider>
            <v-row no-gutters class="pb-3">
              <v-col cols="12" md="12" justify="center">
                <h3>ID : {{ adjust_preview_item.id }}</h3>
              </v-col>
            </v-row>
            <v-row no-gutters class="pb-3">
              <v-col cols="12" md="12" justify="center">
                <h3>Machine : {{ adjust_preview_item.machine_id }}</h3>
              </v-col>
            </v-row>
            <v-row no-gutters class="pb-3">
              <v-col cols="12" md="12" justify="center">
                <h3>OPN Desc : {{ adjust_preview_item.opn_name }}</h3>
              </v-col>
            </v-row>

            <v-row no-gutters class="pb-3">
              <v-col cols="12" md="12" justify="center">
                <h3>Batch : {{ adjust_preview_item.batch_count }}</h3>
              </v-col>
            </v-row>

            <v-row no-gutters class="pb-3">
              <v-col cols="12" md="12" justify="center">
                <h3>
                  Start Date & Time :
                  {{ adjust_preview_item.fopn_start_date_time }}
                </h3>
              </v-col>
            </v-row>

            <v-row no-gutters class="pb-3">
              <v-col cols="12" md="12" justify="center">
                <h3>
                  End Date & Time :
                  {{ adjust_preview_item.fopn_end_date_time }}
                </h3>
              </v-col>
            </v-row>

            <v-row no-gutters class="pb-3">
              <v-col cols="12" md="12" justify="center">
                <h3>
                  Holiday Type : I
                </h3>
              </v-col>
            </v-row>

            <v-row no-gutters class="pt-3 ">
              <v-col cols="12" sm="12" md="6" justify="center" class="pr-3">
                <v-menu
                  ref="menu4"
                  v-model="menu4"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateFormatted4"
                      label="Date From"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      dense
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date4"
                    no-title
                    @input="menu4 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col class="" cols="12" sm="12" md="4">
                <v-text-field
                  v-model="itemadd.hours"
                  label="Hours"
                  outlined
                  dense
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn color="green darken-1" outlined @click="onSaveHoliday" -->
            <v-btn color="green darken-1" outlined>Confirm Add Over Time</v-btn>
            <v-btn
              color="red darken-1"
              outlined
              @click="dialogAdjustStartTime = false"
              >Cancel</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDeleteOPN" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Are you sure you want to delete this item opn_id:
            {{ opn_id_del }} ?</v-card-title
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

      <v-dialog v-model="dialogNewOPN" max-width="90%">
        <v-card>
          <v-card-title class="text-h5">Add New OPN</v-card-title>
          <v-card-text>
            <v-row no-gutters class="pt-4">
              <v-col cols="12" md="4" sm="12" lg="4" justify="center">
                <v-text-field
                  v-model="item_add_new_opn.opn_name"
                  label="OPN Desc"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="4"
                sm="12"
                lg="4"
                justify="center"
                class="pl-2"
              >
                <v-text-field
                  v-model="item_add_new_opn.wc_name"
                  label="Work Center"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <!-- <v-col
                cols="12"
                md="4"
                sm="12"
                lg="4"
                justify="center"
                class="pl-2"
              >
                <v-text-field
                  v-model="item_add_new_opn.machine_id"
                  label="Machine"
                  outlined
                  dense
                ></v-text-field>
              </v-col> -->

              <v-col
                cols="12"
                md="4"
                sm="12"
                lg="4"
                justify="center"
                class="pl-2"
              >
                <v-autocomplete
                  v-model="new_mch_add_opn_selected"
                  :items="new_mch_add_opn_list"
                  outlined
                  dense
                  label="Machine"
                  item-text="f_mch_name"
                  item-value="id"
                  @change="changeNewMachineAddOpn"
                  clearable
                  hide-details
                ></v-autocomplete>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col cols="12" md="4" sm="12" lg="4" justify="center">
                <v-text-field
                  v-model="item_add_new_opn.batch_count"
                  label="Batch"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4"
                sm="12"
                lg="4"
                justify="center"
                class="pl-2"
              >
                <v-text-field
                  v-model="item_add_new_opn.batch_amount"
                  label="QTY"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4"
                sm="12"
                lg="4"
                justify="center"
                class="pl-2"
              >
                <v-text-field
                  v-model="item_add_new_opn.unit_name"
                  label="UM"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col cols="12" md="3" sm="12" lg="3" justify="center">
                <v-menu
                  ref="menu91"
                  v-model="menu91"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateFormatted91"
                      label="Start Date"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      dense
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date91"
                    no-title
                    @input="menu91 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <p class="pt-2 pl-5">Start Time :</p>
              <v-col class="d-flex pl-2 pt-1" cols="12" sm="1" md="1" lg="1">
                <vue-timepicker
                  v-model="tmp_due_time91"
                  close-on-complete
                  format="HH:mm"
                  fixed-dropdown-button
                  auto-scroll
                  hide-clear-button
                  width="100%"
                ></vue-timepicker>
              </v-col>

              <v-col
                class="pl-3"
                cols="12"
                md="3"
                sm="12"
                lg="3"
                justify="center"
              >
                <v-menu
                  ref="menu92"
                  v-model="menu92"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateFormatted92"
                      label="End Date"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      dense
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date92"
                    no-title
                    @input="menu92 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <p class="pt-2 pl-5">End Time :</p>
              <v-col class="d-flex pl-2 pt-1" cols="12" sm="1" md="1" lg="1">
                <vue-timepicker
                  v-model="tmp_due_time92"
                  close-on-complete
                  format="HH:mm"
                  fixed-dropdown-button
                  auto-scroll
                  hide-clear-button
                  width="100%"
                ></vue-timepicker>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col cols="12" md="4" sm="12" lg="4" justify="center">
                <v-text-field
                  v-model="item_add_new_opn.setup_time"
                  label="Set up Hrs"
                  outlined
                  dense
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="4"
                sm="12"
                lg="4"
                justify="center"
                class="pl-2"
              >
                <v-text-field
                  v-model="item_add_new_opn.pcs_hr"
                  label="Pcs/Hrs"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="4"
                sm="12"
                lg="4"
                justify="center"
                class="pl-2"
              >
                <v-text-field
                  v-model="item_add_new_opn.time_process_by_opn"
                  label="Plan Run Hrs"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="pink darken-1"
              outlined
              dense
              @click="closeNewOPN"
              class="mr-3"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" outlined dense @click="addNewOPN"
              >Add</v-btn
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
  </v-container>
</template>
<script>
import SuccessDialog from "@/components/cards/SuccessDialog";
import SuccessDialogPush from "@/components/cards/SuccessDialogPush";
import api from "@/services/api";
import UDefine from "@/views/u-define/UDefine";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";

import { server, udgroup } from "@/services/constants";

const aj_status = {
  adjust_start_date_time: "adjust_start_date_time",
  adjust_due_date_time: "adjust_due_date_time",
  adjust_between_date_time: "adjust_between_date_time",
  close: "close",
};

const spacial_status = {
  adjust_doc_running_no: "adjust_doc_running_no",
  adjust_line_of_mch: "adjust_line_of_mch",
  adjust_qty_order: "adjust_qty_order",
};

export default {
  components: {
    SuccessDialog,
    SuccessDialogPush,
    UDefine,
    VueTimepicker,
  },
  computed: {
    computedDateFormatted4() {
      return this.formatDate(this.date4);
    },
    computedDateFormatted3() {
      return this.formatDate(this.date3);
    },
    computedDateFormatted2() {
      return this.formatDate(this.date2);
    },
    computedDateFormatted1() {
      return this.formatDate(this.date1);
    },
    computedDateFormatted() {
      return this.formatDaparseDatete(this.date);
    },

    computedDateFormatted91() {
      return this.formatDate(this.date91);
    },
    computedDateFormatted92() {
      return this.formatDate(this.date92);
    },
  },

  watch: {
    date4(val) {
      this.dateFormatted4 = this.formatDate(this.date4);
    },
    date3(val) {
      this.dateFormatted3 = this.formatDate(this.date3);
    },

    date2(val) {
      this.dateFormatted2 = this.formatDate(this.date2);
    },
    date1(val) {
      this.dateFormatted1 = this.formatDate(this.date1);
    },
    date0(val) {
      this.dateFormatted0 = this.formatDate(this.date0);
    },

    date91(val) {
      this.dateFormatted91 = this.formatDate(this.date91);
    },

    date92(val) {
      this.dateFormatted92 = this.formatDate(this.date92);
    },

    // udmodule_name(){}
    // ,
    last_purchase_price_date(val) {
      this.itemadd.last_purchase_price_date = this.formatDate(
        this.last_purchase_price_date
      );
    },
    cost_price_date(val) {
      this.itemadd.cost_price_date = this.formatDate(this.cost_price_date);
    },
    sales_price_date(val) {
      this.itemadd.sales_price_date = this.formatDate(this.sales_price_date);
    },

    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  data: (vm) => ({
    new_doc_running_no: null,
    new_line_of_mch: null,
    new_qty_order: null,
    dialogAdjustDocRunningNo: false,
    dialogAdjustLineOfMch: false,
    dialogAdjustQtyOrder: false,
    rd_spacial: null,
    new_mch_add_opn_selected: null,
    new_mch_add_opn_list: [],
    tmp_due_time91: null,
    tmp_due_time92: null,
    line_of_mch: "",
    no_of_mch: 0,
    new_mch_selected: null,
    new_mch_list: [],
    get_routing_to_backup: null,
    rd_mch: "TO",
    select_holiday_mch: [],
    udmodule_name: "",
    main_u_define_module_id: 0,
    itemaddudefine: {
      module_master_id: 0,
      // u_define_module_id =1 คือ Item
      u_define_module_id: 1,
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
    itemadd: {
      wcg_id: null,
      date_from: null,
      holiday_type: null,
      hours: null,
      company_id: localStorage.getItem(server.COMPANYID),
      user_create: localStorage.getItem(server.USER_ID),
      created_at: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    },

    mch_item_list: [],
    mch_item_selected: null,
    dialogAdjustMachine: false,
    dialogAdjustStartTime: false,
    dialogAdjustOverTime: false,
    dialogAdjustPreview: false,
    adjust_preview_item: [],
    adjust_dt_menu_select: "",
    adjust_dt_menu_items: [
      { title: "Change Machine" },
      { title: "Change Start Time" },
      { title: "Add Over Time" },
      { title: "Delete OPN" },
    ],
    offset: true,
    doc_status: false,
    approve_status: false,
    adjust_message: "",
    dialogPreview: false,
    dialogClose: false,
    dialogApprove: false,
    rd_aj_status: false,
    rd_due_status: false,
    radios: null,
    main_item_data: null,
    doc_running: null,
    itemsPerPage: 5,
    items: [],
    itemsPreview: [],
    tmp_due_time: null,
    routing_data_list: [],
    select_routing: null,
    item_master_id: null,
    item_master_name: "",
    item_master_unit: "",
    item_master_list: [],
    select_item_master: [],
    doc_running_list: [],
    select_doc_running: null,

    tmp_due_time4: null,
    date4: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted4: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu4: false,

    tmp_due_time3: null,
    date3: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted3: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu3: false,

    tmp_due_time2: null,
    date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted2: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu2: false,

    date1: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted1: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu1: false,

    date0: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted0: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu0: false,

    date91: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted91: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu91: false,

    date92: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted92: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu92: false,

    tab: null,
    work_center_group_list: [],
    select_work_center_group: null,
    itemadd: {
      doc_running: null,
      doc_module_name: null,
      item_master_id: null,
      order_qty: null,
      rtg_id: null,
      order_date: null,
      due_date: null,
      due_time: null,
      start_date: null,
      start_time: null,
      company_id: localStorage.getItem(server.COMPANYID),
      user_update: localStorage.getItem(server.USER_ID),
      updated_at: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    },
    last_purchase_price_date: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),
    cost_price_date: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),
    sales_price_date: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),
    main_u_define_module_id: 0,
    itemaddudefine: {
      module_master_id: 0,
      // u_define_module_id =1 คือ Item
      u_define_module_id: 1,
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
    prename_th: ["นาย", "นาง", "นางสาว"],
    prename_en: ["Mr", "Miss", "Mrs."],
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
      { text: "OPN ID", value: "id" },
      { text: "OPN Desc", value: "opn_name" },
      { text: "Work Center", value: "wc_name" },
      { text: "Machine", value: "machine_id" },
      { text: "Batch", value: "batch_count" },
      { text: "QTY", value: "freal_qty_order_scrap_by_opn" },
      { text: "Um", value: "unit_name" },
      { text: "Start Date Time", value: "fopn_start_date_time" },
      { text: "End Date Time", value: "fopn_end_date_time" },
      { text: "Set up Hrs", value: "fsetup_time" },
      { text: "Pcs/Hrs", value: "pcs_hr" },
      { text: "Plan Run Hrs", value: "ftime_process_by_opn" },
      { text: "Adjust", value: "adjusts", sortable: false },
      { text: "Print", value: "actions", sortable: false },
    ],
    headers_preview: [
      { text: "OPN ID", value: "id" },
      { text: "OPN Desc", value: "opn_name" },
      { text: "Work Center", value: "wc_name" },
      { text: "Machine", value: "machine_id" },
      { text: "Batch", value: "batch_count" },
      { text: "QTY", value: "freal_qty_order_scrap_by_opn" },
      { text: "Um", value: "unit_name" },
      { text: "Start Date Time", value: "fopn_start_date_time" },
      { text: "End Date Time", value: "fopn_end_date_time" },
      { text: "Set up Hrs", value: "fsetup_time" },
      { text: "Pcs/Hrs", value: "pcs_hr" },
      { text: "Plan Run Hrs", value: "ftime_process_by_opn" },
    ],
    headers_adjust_preview: [
      { text: "OPN ID", value: "id" },
      { text: "OPN Desc", value: "opn_name" },
      { text: "Work Center", value: "wc_name" },
      { text: "Machine", value: "mch_name" },
      { text: "Batch", value: "batch_count" },
      { text: "QTY", value: "freal_qty_order_scrap_by_opn" },
      { text: "Um", value: "unit_name" },
      { text: "Start Date Time", value: "fopn_start_date_time" },
      { text: "End Date Time", value: "fopn_end_date_time" },
      { text: "Set up Hrs", value: "fsetup_time" },
      { text: "Pcs/Hrs", value: "pcs_hr" },
      { text: "Plan Run Hrs", value: "ftime_process_by_opn" },
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
    main_id: 0,
    udmodule_name: "",
    dialogDeleteOPN: false,
    opn_id_del: null,
    dialogNewOPN: false,
    item_add_new_opn: {
      doc_group_name: "PD",
      doc_running_no: "C2400119",
      item_master_id: 1345,
      order_qty: 5190,
      opn_qty: 2000,
      rtg_id: "01",
      opn_id: "1000",
      pcs_hr: 28,
      time_process_by_opn: 2089.9438,
      setup_time: 0,
      real_qty_order_scrap_by_opn: 60000,
      machine_id: "SW23",
      overlap_time: 0,
      setup_timehr_per: "B",
      batch: 2000,
      batch_count: 1,
      batch_amount: 2000,
      company_id: 3,
      predecessor: "0",
      dependency: "FS",
      production_time: 71.4286,
      due_date: "2024-11-30",
      due_time: "1970-01-01T10:00:00.000Z",
      doc_module_name: "ทอซูเซอร์",
      order_date: "2024-10-31",
      status: "D",
      prod_status: "N",
      std_labor_cost: 2071.4286,
      std_foh_cost: 1714.2857,
      std_voh_cost: 3571.4286,
      receive_qty: 0,
      act_setup_time: 0,
      act_prod_time: 0,
      act_labor_cost: 0,
      act_foh_cost: 0,
      act_voh_cost: 0,
      user_create: 9,
      user_update: null,
      created_at: "2024-10-31T00:40:26.833Z",
      updated_at: "2024-10-31T00:40:26.849Z",
      deleted_at: "2024-10-31T00:40:26.857Z",
      opn_start_date_time: "2024-08-02T20:00:00.000Z",
      opn_end_date_time: "2024-08-06T02:33:42.857Z",
      routing_id: 0,
      iot_um_conv: 0,
      mch_name: "SW23",
      fopn_start_date_time: "02/08/2024 20:00",
      fopn_end_date_time: "06/08/2024 02:33",
      fsetup_time: 0,
      fproduction_time: 71.43,
      unit_name: "เมตร    ",
      opn_name: "1000-ทอซูเซอร์ ,3ลูก",
      wc_name: "ทอซู-ตรง 3.3 เมตร   ",
      ftime_process_by_opn: 71.43,
      freal_qty_order_scrap_by_opn: 2000,
    },
  }),
  async mounted() {
    this.userId = localStorage.getItem(server.USER_ID);

    await this.onLoadUdefineIDByCompanyAndModuleName(
      udgroup.PRODUCTION_ORDER,
      localStorage.getItem(server.COMPANYID)
    );
    this.udmodule_name = udgroup.PRODUCTION_ORDER;
    await this.loadDocRunning();
    await this.loadItemMaster();

    await this.onLoadNewMch();
    await this.onLoadNewMchAddOpn();

    await this.onloadWODataEdit();

    // await this.changeRouting();
    this.$hideLoader();
  },
  methods: {
    async confirmAdjustQtyOrder() {
      if (this.new_qty_order == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please fill in New Qty Order",
          "text-h5 red--text text-center"
        );
        return;
      }
      let body_data = {
        order_qty: this.new_qty_order,
      };

      this.$showLoader();
      const res = await api.updateTblOrd(this.$route.params.id, body_data);
      this.$hideLoader();

      this.dialogAdjustQtyOrder = false;

      console.log("confirmAdjustQtyOrder res.data:", JSON.stringify(res.data));

      if (res.status == 201 || res.status == 200) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Update Success",
          "text-h5 green--text text-center"
        );

        this.main_item_data.order_qty = this.new_qty_order;
        this.itemadd.order_qty = this.new_qty_order;
      } else {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Update Failed",
          "text-h5 red--text text-center"
        );
      }
    },
    async confirmAdjustLineOfMch() {
      if (this.new_line_of_mch == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please fill in New Line Of Mch",
          "text-h5 red--text text-center"
        );
        return;
      }
      let body_data = {
        line_of_mch: this.new_line_of_mch,
      };

      this.$showLoader();
      const res = await api.updateTblOrd(this.$route.params.id, body_data);
      this.$hideLoader();

      this.dialogAdjustLineOfMch = false;

      console.log("confirmAdjustLineOfMch res.data:", JSON.stringify(res.data));

      if (res.status == 201 || res.status == 200) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Update Success",
          "text-h5 green--text text-center"
        );

        this.main_item_data.line_of_mch = this.new_line_of_mch;
        this.line_of_mch = this.new_line_of_mch;
      } else {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Update Failed",
          "text-h5 red--text text-center"
        );
      }

      // await this.onloadWODataEdit();
    },
    async confirmAdjustDocRunningNo() {
      if (this.new_doc_running_no == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please fill in New Doc Running No",
          "text-h5 red--text text-center"
        );
        return;
      }
      let body_data = {
        new_doc_running_no: this.new_doc_running_no,
      };

      this.$showLoader();
      const res = await api.putUpdateDockRunningNo(
        this.main_item_data.doc_running_no,
        body_data
      );
      this.$hideLoader();

      this.dialogAdjustDocRunningNo = false;

      console.log(
        "confirmAdjustDocRunningNo res.data:",
        JSON.stringify(res.data)
      );

      if (res.data.save_sta == true) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          res.data.save_msg,
          "text-h5 green--text text-center"
        );

        this.main_item_data.doc_running_no = this.new_doc_running_no;
      } else {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          res.data.save_msg,
          "text-h5 red--text text-center"
        );
      }

      await this.onloadWODataEdit();
    },
    closeAdjustDocRunningNo() {
      this.dialogAdjustDocRunningNo = false;
    },
    closeAdjustLineOfMch() {
      this.dialogAdjustLineOfMch = false;
    },
    closeAdjustQtyOrder() {
      this.dialogAdjustQtyOrder = false;
    },
    async onRadioSpacialChange() {
      console.log("onRadioSpacialChange", this.rd_spacial);

      if (this.rd_spacial == spacial_status.adjust_doc_running_no) {
        // alert("adjust_doc_running_no");
        this.dialogAdjustDocRunningNo = true;
      } else if (this.rd_spacial == spacial_status.adjust_line_of_mch) {
        // alert("adjust_line_of_mch");
        this.dialogAdjustLineOfMch = true;
      } else if (this.rd_spacial == spacial_status.adjust_qty_order) {
        // alert("adjust_qty_order");
        this.dialogAdjustQtyOrder = true;
      }
      // console.log("this.rd_spacial", this.rd_spacial);
    },

    async onLoadNewMchAddOpn() {
      const res_get = await api.getPONewMachineName(
        localStorage.getItem(server.COMPANYID)
      );
      this.new_mch_add_opn_list = res_get.data;
      // console.log("this.new_mch_add_opn_list", JSON.stringify(this.new_mch_add_opn_list));
    },
    changeNewMachineAddOpn() {
      let sp_data = this.new_mch_add_opn_selected.split(":");

      this.item_add_new_opn.machine_id = sp_data[0];
      this.item_add_new_opn.wc_name = sp_data[1];

      // console.log(
      //   "this.new_mch_selected",
      //   JSON.stringify(this.new_mch_add_opn_selected)
      // );
    },
    async addNewOPN() {
      // console.log("addNewOPN:", JSON.stringify(this.item_add_new_opn));
      //"/getDataCheckBatchForAddNewOPN/:doc_running_no/:rtg_id/:item_master_id/:opn_id/:batch_count",
      const res = await api.getDataCheckBatchForAddNewOPN(
        this.item_add_new_opn.doc_running_no,
        this.item_add_new_opn.rtg_id,
        this.item_add_new_opn.item_master_id,
        this.item_add_new_opn.opn_id,
        this.item_add_new_opn.batch_count
      );
      // console.log("addNewOPN:", JSON.stringify(res.data));

      if (res.data.length > 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Batch นี้มีอยู่แล้ว กรุณาเปลี่ยน Batch ใหม่",
          "text-h5 red--text text-center"
        );
        return;
      } else {
        // console.log(`dateFormatted91: ${this.dateFormatted91}`);
        // console.log(`dateFormatted92: ${this.dateFormatted92}`);
        // console.log(`date91: ${this.date91}`);
        // console.log(`date92: ${this.date92}`);
        // console.log(`tmp_due_time91: ${JSON.stringify(this.tmp_due_time91)}`);
        // console.log(`tmp_due_time92: ${JSON.stringify(this.tmp_due_time92)}`);

        //check date time start and end != null
        if (
          this.dateFormatted91 == null ||
          this.dateFormatted92 == null ||
          this.tmp_due_time91 == null ||
          this.tmp_due_time92 == null
        ) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Please fill in Start Date Time and End Date Time",
            "text-h5 red--text text-center"
          );
          return;
        }

        // "opn_start_date_time": "2024-10-09T16:09:30.000Z",
        // "opn_end_date_time": "2024-10-12T11:58:30.000Z",
        // const date = "2024-10-09";
        // const time = { HH: "15", mm: "00" };

        // Combine the date and time into an ISO 8601 format string
        const dateStartString = `${this.date91}T${this.tmp_due_time91.HH}:${this.tmp_due_time91.mm}:00.000Z`;

        // Combine the date and time into an ISO 8601 format string
        const dateEndString = `${this.date92}T${this.tmp_due_time92.HH}:${this.tmp_due_time92.mm}:00.000Z`;

        this.item_add_new_opn.opn_start_date_time = dateStartString;
        this.item_add_new_opn.opn_end_date_time = dateEndString;

        // console.log(`dateFormatted91: ${this.dateFormatted91}`);
        // console.log(`dateFormatted92: ${this.dateFormatted92}`);

        if (this.new_mch_add_opn_selected == null) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Please select Machine",
            "text-h5 red--text text-center"
          );
          return;
        }

        if (this.item_add_new_opn.machine_id == null) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Please select Machine",
            "text-h5 red--text text-center"
          );
          return;
        }

        // console.log(
        //   "this.item_add_new_opn",
        //   JSON.stringify(this.item_add_new_opn)
        // );

        // return;

        // add new opn
        this.$showLoader();
        const res = await api.createProdOrderPlanDraft(this.item_add_new_opn);
        // console.log("addNewOPN:", JSON.stringify(res.data));

        if (res.status == 200 || res.status == 201) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Success!!!",
            "Add New OPN Success",
            "text-h5 green--text text-center"
          );
          this.dialogNewOPN = false;

          //load edit data
          await this.onloadWODataEdit();

          this.$hideLoader();
        } else {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Add New OPN Failed",
            "text-h5 red--text text-center"
          );

          this.$hideLoader();
        }
      }
    },
    closeNewOPN() {
      this.dialogNewOPN = false;
    },
    newOPN() {
      let last_item = this.items[this.items.length - 1];
      this.item_add_new_opn.doc_group_name = last_item.doc_group_name;
      this.item_add_new_opn.doc_running_no = last_item.doc_running_no;
      this.item_add_new_opn.item_master_id = last_item.item_master_id;
      this.item_add_new_opn.order_qty = last_item.order_qty;
      this.item_add_new_opn.opn_qty = last_item.opn_qty;
      this.item_add_new_opn.rtg_id = last_item.rtg_id;
      this.item_add_new_opn.opn_id = last_item.opn_id;
      this.item_add_new_opn.pcs_hr = last_item.pcs_hr;
      this.item_add_new_opn.time_process_by_opn = last_item.time_process_by_opn;
      this.item_add_new_opn.setup_time = last_item.setup_time;
      this.item_add_new_opn.real_qty_order_scrap_by_opn =
        last_item.real_qty_order_scrap_by_opn;
      // this.item_add_new_opn.machine_id = last_item.machine_id;
      this.item_add_new_opn.overlap_time = last_item.overlap_time;
      this.item_add_new_opn.setup_timehr_per = last_item.setup_timehr_per;
      this.item_add_new_opn.batch = last_item.batch;
      this.item_add_new_opn.batch_count = last_item.batch_count + 1;
      this.item_add_new_opn.batch_amount = last_item.batch_amount;
      this.item_add_new_opn.company_id = last_item.company_id;
      this.item_add_new_opn.predecessor = last_item.predecessor;
      this.item_add_new_opn.dependency = last_item.dependency;
      this.item_add_new_opn.production_time = last_item.production_time;
      this.item_add_new_opn.due_date = last_item.due_date;
      this.item_add_new_opn.due_time = last_item.due_time;
      this.item_add_new_opn.doc_module_name = last_item.doc_module_name;
      this.item_add_new_opn.order_date = last_item.order_date;
      // this.item_add_new_opn.status = last_item.status;
      this.item_add_new_opn.status = "A";
      this.item_add_new_opn.prod_status = last_item.prod_status;
      this.item_add_new_opn.std_labor_cost = last_item.std_labor_cost;
      this.item_add_new_opn.std_foh_cost = last_item.std_foh_cost;
      this.item_add_new_opn.std_voh_cost = last_item.std_voh_cost;
      this.item_add_new_opn.receive_qty = last_item.receive_qty;
      this.item_add_new_opn.act_setup_time = last_item.act_setup_time;
      this.item_add_new_opn.act_prod_time = last_item.act_prod_time;
      this.item_add_new_opn.act_labor_cost = last_item.act_labor_cost;
      this.item_add_new_opn.act_foh_cost = last_item.act_foh_cost;
      this.item_add_new_opn.act_voh_cost = last_item.act_voh_cost;
      this.item_add_new_opn.user_create = last_item.user_create;
      this.item_add_new_opn.user_update = last_item.user_update;
      this.item_add_new_opn.created_at = last_item.created_at;
      this.item_add_new_opn.updated_at = last_item.updated_at;
      this.item_add_new_opn.deleted_at = last_item.deleted_at;
      this.item_add_new_opn.opn_start_date_time = last_item.opn_start_date_time;
      this.item_add_new_opn.opn_end_date_time = last_item.opn_end_date_time;
      this.item_add_new_opn.routing_id = last_item.routing_id;
      this.item_add_new_opn.iot_um_conv = last_item.iot_um_conv;
      this.item_add_new_opn.mch_name = last_item.mch_name;
      this.item_add_new_opn.fopn_start_date_time =
        last_item.fopn_start_date_time;
      this.item_add_new_opn.fopn_end_date_time = last_item.fopn_end_date_time;
      this.item_add_new_opn.fsetup_time = last_item.fsetup_time;
      this.item_add_new_opn.fproduction_time = last_item.fproduction_time;
      this.item_add_new_opn.unit_name = last_item.unit_name;
      this.item_add_new_opn.opn_name = last_item.opn_name;
      this.item_add_new_opn.wc_name = last_item.wc_name;
      this.item_add_new_opn.ftime_process_by_opn =
        last_item.ftime_process_by_opn;
      this.item_add_new_opn.freal_qty_order_scrap_by_opn =
        last_item.freal_qty_order_scrap_by_opn;

      this.item_add_new_opn.machine_id = null;
      this.new_mch_add_opn_selected = null;

      // console.log(
      //   "this.item_add_new_opn",
      //   JSON.stringify(this.item_add_new_opn)
      // );

      this.dialogNewOPN = true;
    },
    deleteItem(item) {
      // this.editedIndex = this.desserts.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      this.dialogDeleteOPN = true;
    },

    async deleteItemConfirm() {    
      // alert(this.opn_id_del);
      // this.desserts.splice(this.editedIndex, 1)
      // this.desserts.splice(this.editedIndex, 1);

      //check opn in use in time_card_detail
      const res_chk = await api.checkOpnInUsedInTimecardDetailByOpnId(
        this.opn_id_del
      );

      // console.log(`res_chk: ${JSON.stringify(res_chk.data)}`);
      //res_chk: [{"ctc":5}]
      if (res_chk.data[0].ctc > 0) {
        this.$hideLoader();
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "รายการนี้มีการใช้งานแล้วไม่สามารถลบได้!!!",
          "text-h5 red--text text-center"
        );
        this.closeDelete();
        return;
      }

      // console.log(`หลุดลงมาได้`);

      this.$showLoader();
      // delete data by id
      const res_del = await api.deleteOPNById(this.opn_id_del);
      // console.log("res_del", JSON.stringify(res_del));

      //load edit data
      await this.onloadWODataEdit();

      this.$hideLoader();
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDeleteOPN = false;
      // this.$nextTick(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem);
      //   this.editedIndex = -1;
      // });
    },

    async onLoadNewMch() {
      const res_get = await api.getPONewMachineRoutingTmp(
        localStorage.getItem(server.COMPANYID)
      );
      this.new_mch_list = res_get.data;
      // console.log("this.new_mch_list", JSON.stringify(this.new_mch_list));
    },
    async changeNewMachine() {
      console.log(
        "this.new_mch_selected",
        JSON.stringify(this.new_mch_selected)
      );
      this.no_of_mch = this.new_mch_selected.length;
    },
    async changeRouting() {
      console.log("this.select_routing", this.select_routing);
      // this.get_routing_to_backup = this.routing_data_list.filter(
      //   (x) => x.rtg_id == this.select_routing
      // );
      // console.log(
      //   "this.get_routing_to_backup",
      //   JSON.stringify(this.get_routing_to_backup)
      // );
    },

    async popupAdjustMachinePreview() {
      this.dialogAdjustPreview;
    },
    async closeAdjustMachinePreview() {
      this.dialogAdjustPreview = false;
    },
    async adjustMachineAndPreview() {
      /*
          {
              "id": 1643,
              "adjust_type": "AO",
              "new_machine_id":[39],
              "doc_group_name": "PD",
              "doc_running_no": "PBX-2400050",
              "item_master_id": 13,
              "order_qty": 1000,
              "rtg_id": "02",
              "opn_id": "100",
              "opn_start_date_time": "2024-04-09T06:59:00.000Z",
              "opn_end_date_time": "2024-04-09T07:59:00.000Z",
              "due_date": "2024-03-22",
              "due_time": "17:00:00"
            }
       */
      let aj_type = "";
      if (this.rd_mch == "TO") {
        aj_type = "TO";
      } else {
        aj_type = "AO";
      }

      // console.log(
      //   "this.adjust_preview_item:",
      //   JSON.stringify(this.adjust_preview_item)
      // );

      let data = {
        id: this.adjust_preview_item.id,
        adjust_type: aj_type,
        new_machine_id: [this.mch_item_selected],
        doc_group_name: "PD",
        doc_running_no: this.main_item_data.doc_running_no,
        item_master_id: this.main_item_data.item_master_id,
        order_qty: this.main_item_data.order_qty,
        rtg_id: this.main_item_data.rtg_id,
        opn_id: this.adjust_preview_item.id,
        opn_start_date_time: this.adjust_preview_item.fopn_start_date_time,
        opn_end_date_time: this.adjust_preview_item.fopn_end_date_time,
        due_date: this.main_item_data.due_date,
        due_time: this.main_item_data.due_time,
      };
      // console.log("data: ", JSON.stringify(data));
      // return;

      this.$showLoader();

      let res_add = null;
      try {
        res_add = await api.adjustPOChangeMchAllOPN(
          this.adjust_preview_item.id,
          data
        );
      } catch (error) {
        console.log("error", error);
      }

      // this.$hideLoader();
      //{ message: "success", doc_running: doc_running, cpd_res: cpd_res }
      // console.log("res_add: ", JSON.stringify(res_add.data));
      if (res_add.data.message == "success") {
        this.adjust_message = res_add.data.cpd_res;
        this.itemsPreview = [];
        this.doc_running = res_add.data.doc_running;

        // doc_running,
        // rtg_id,
        // item_master_id
        // const res_pod = await api.getTempOpnOrderPlanDraftByID(
        //   this.doc_running,
        //   this.itemadd.rtg_id,
        //   this.itemadd.item_master_id
        // );

        const res_pod = await api.getOrderAdjustPlanDraftByDocRunningID(
          this.doc_running
        );

        // console.log("res_pod: ", JSON.stringify(res_pod.data));
        this.itemsPreview = res_pod.data;
        this.dialogAdjustPreview = true;
        // console.log("this.items: ", JSON.stringify(this.items));
        this.$hideLoader();
      } else if (res_add.status == 204) {
        this.$hideLoader();
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          res_add.data.message,
          "text-h5 red--text text-center"
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
    async confirmAdjustMachine() {
      this.$showLoader();

      let data = {
        adjust_message: this.adjust_message,
      };
      // console.log("data: ", JSON.stringify(data));
      // console.log(
      //   "adjust_preview_item: ",
      //   JSON.stringify(this.adjust_preview_item)
      // );
      const res_add = await api.adjustAdjustBetweenConfirm(
        this.adjust_preview_item.doc_running_no,
        data
      );

      if (res_add.data.message == "success") {
        this.items = [];
        // this.doc_running = res_add.data.doc_running;
        // this.doc_running = this.main_item_data.doc_running_no;

        // doc_running,
        // rtg_id,
        // item_master_id
        const res_pod = await api.getProdOrderPlanDraftByID(
          this.adjust_preview_item.doc_running_no,
          this.adjust_preview_item.rtg_id,
          this.adjust_preview_item.item_master_id
        );
        this.items = res_pod.data;

        this.$hideLoader();
        // this.$store.state.global_dialog_push = true;
        // this.setupAlertDialogPush(
        //   true,
        //   "Success!!!",
        //   "Add data success",
        //   "text-h5 green--text text-center",
        //   "/production-order-list"
        // );
        this.dialogAdjustMachine = false;
        this.dialogAdjustPreview = false;

        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Update data success",
          "text-h5 green--text text-center"
        );
        return;
      } else if (res_add.status == 204) {
        this.$hideLoader();
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          res_add.data.message,
          "text-h5 red--text text-center"
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

    async onSaveHoliday() {
      this.itemadd.date_from = this.date4;
      this.itemadd.holiday_type = "I";
      this.itemadd.company_id = localStorage.getItem(server.COMPANYID);
      this.itemadd.user_create = localStorage.getItem(server.USER_ID);

      if (this.select_holiday_type == "D") {
        this.itemadd.hours = null;
      } else {
        if (this.itemadd.hours == null || this.itemadd.hours == "") {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Please fill in the Hours",
            "text-h5 red--text text-center"
          );
          return;
        }
      }

      if (this.itemadd.wcg_id == null || this.itemadd.wcg_id == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please fill in the Work Center Group",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.date_from == null || this.itemadd.date_from == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please fill in the Date From",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (
        this.itemadd.holiday_type == null ||
        this.itemadd.holiday_type == ""
      ) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please fill in the Holiday Type",
          "text-h5 red--text text-center"
        );
        return;
      }

      // if (this.mch_checkbox == false && this.select_holiday_mch == null) {
      //   this.$store.state.global_dialog = true;
      //   this.setupAlertDialog(
      //     true,
      //     "Failed!!!",
      //     "Please fill in the Machine",
      //     "text-h5 red--text text-center"
      //   );
      //   return;
      // }

      // console.log("this.itemadd : ", JSON.stringify(this.itemadd));
      const res_add = await api.addHoliday(this.itemadd);

      // console.log("res_add: ", JSON.stringify(res_add.data));
      if (res_add.status == 200) {
        // ----- add holiday mch -----
        let addMch = [];
        // if (this.mch_checkbox == false) {
        addMch = this.select_holiday_mch;
        addMch.forEach((element) => {
          let obj = {
            holiday_id: res_add.data.id,
            machine_id: element,
          };
          api.addHolidayMch(obj);
        });
        // } else {
        //   addMch = this.list_holiday_mch;
        //   addMch.forEach((element) => {
        //     let obj = {
        //       holiday_id: res_add.data.id,
        //       machine_id: element.machine_id,
        //     };
        //     api.addHolidayMch(obj);
        //   });
        // }
        // ----- add holiday mch -----
        this.$hideLoader();
        this.itemaddudefine.module_master_id = res_add.data.id;
        this.itemaddudefine.date1 = this.parseDate(this.itemaddudefine.date1);
        this.itemaddudefine.date2 = this.parseDate(this.itemaddudefine.date2);

        // console.log(
        //   "this.itemaddudefine : ",
        //   JSON.stringify(this.itemaddudefine)
        // );
        this.itemaddudefine.u_define_module_id = this.main_u_define_module_id;
        const res_addudefine = await api.addu_define_master(
          this.itemaddudefine
        );

        if (res_addudefine.status == 200) {
          this.$hideLoader();
          this.$store.state.global_dialog_push = true;
          this.setupAlertDialogPush(
            true,
            "Success!!!",
            "Add data success",
            "text-h5 green--text text-center",
            "/holiday-list"
          );
          return;
        } else {
          this.itemaddudefine.date1 = this.formatDate(
            this.itemaddudefine.date1
          );
          this.itemaddudefine.date2 = this.formatDate(
            this.itemaddudefine.date2
          );
          this.$hideLoader();
          // this.$store.state.global_dialog = true;
          // this.setupAlertDialog(
          //   true,
          //   "Failed!!!",
          //   "Add data Failed",
          //   "text-h5 red--text text-center"
          // );
          // return;
        }
        return;
      } else if (res_add.status == 204) {
        // this.$store.state.global_dialog = true;
        // this.setupAlertDialog(
        //   true,
        //   "Failed!!!",
        //   "Add data Item ID Duplicate",
        //   "text-h5 red--text text-center"
        // );
        // return;
      } else {
        this.$hideLoader();
        // this.$store.state.global_dialog = true;
        // this.setupAlertDialog(
        //   true,
        //   "Failed!!!",
        //   "Add data Failed",
        //   "text-h5 red--text text-center"
        // );
        // return;
      }
    },
    async onSaveAddOverTime() {
      // console.log(this.itemadd);
      // console.log(this.itemaddudefine);
      // return;

      // this.itemadd.wcg_id = this.select_work_center_group;
      this.itemadd.date_from = this.date4;
      this.itemadd.holiday_type = "I";
      this.itemadd.company_id = localStorage.getItem(server.COMPANYID);
      this.itemadd.user_create = localStorage.getItem(server.USER_ID);

      if (this.select_holiday_type == "D") {
        this.itemadd.hours = null;
      } else {
        if (this.itemadd.hours == null || this.itemadd.hours == "") {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Please fill in the Hours",
            "text-h5 red--text text-center"
          );
          return;
        }
      }

      if (this.itemadd.wcg_id == null || this.itemadd.wcg_id == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please fill in the Work Center Group",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.date_from == null || this.itemadd.date_from == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please fill in the Date From",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (
        this.itemadd.holiday_type == null ||
        this.itemadd.holiday_type == ""
      ) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please fill in the Holiday Type",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.mch_checkbox == false && this.select_holiday_mch == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please fill in the Machine",
          "text-h5 red--text text-center"
        );
        return;
      }

      // console.log("this.itemadd : ", JSON.stringify(this.itemadd));
      const res_add = await api.addHoliday(this.itemadd);

      // console.log("res_add: ", JSON.stringify(res_add.data));
      if (res_add.status == 200) {
        // ----- add holiday mch -----
        let addMch = [];
        if (this.mch_checkbox == false) {
          addMch = this.select_holiday_mch;
          addMch.forEach((element) => {
            let obj = {
              holiday_id: res_add.data.id,
              machine_id: element,
            };
            api.addHolidayMch(obj);
          });
        } else {
          addMch = this.list_holiday_mch;
          addMch.forEach((element) => {
            let obj = {
              holiday_id: res_add.data.id,
              machine_id: element.machine_id,
            };
            api.addHolidayMch(obj);
          });
        }
        // ----- add holiday mch -----
        this.$hideLoader();
        this.itemaddudefine.module_master_id = res_add.data.id;
        this.itemaddudefine.date1 = this.parseDate(this.itemaddudefine.date1);
        this.itemaddudefine.date2 = this.parseDate(this.itemaddudefine.date2);

        // console.log(
        //   "this.itemaddudefine : ",
        //   JSON.stringify(this.itemaddudefine)
        // );
        this.itemaddudefine.u_define_module_id = this.main_u_define_module_id;
        const res_addudefine = await api.addu_define_master(
          this.itemaddudefine
        );

        if (res_addudefine.status == 200) {
          this.$hideLoader();
          this.$store.state.global_dialog_push = true;
          this.setupAlertDialogPush(
            true,
            "Success!!!",
            "Add data success",
            "text-h5 green--text text-center",
            "/holiday-list"
          );
          return;
        } else {
          this.itemaddudefine.date1 = this.formatDate(
            this.itemaddudefine.date1
          );
          this.itemaddudefine.date2 = this.formatDate(
            this.itemaddudefine.date2
          );
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
        return;
      } else if (res_add.status == 204) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Add data Item ID Duplicate",
          "text-h5 red--text text-center"
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

    async onLoadUdefineIDByCompanyAndModuleName(module_name, company_id) {
      const res_get = await api.getu_define_module_UdefineIDByCompanyAndModuleName(
        module_name,
        company_id
      );

      // console.log("res_get", JSON.stringify(res_get.data));
      this.main_u_define_module_id = res_get.data[0].id;
      this.itemaddudefine.u_define_module_id = this.main_u_define_module_id;
      // console.log("this.main_u_define_module_id:", this.main_u_define_module_id);
    },
    async onLoadAutoCompleteMachine(company_id) {
      this.$showLoader();
      const res = await api.getAllMchToAdjustPOByCompany(company_id);
      // console.log("mch_item_list:", JSON.stringify(res.data));
      this.mch_item_list = res.data;
      // console.log("mch_item_list:", JSON.stringify(this.mch_item_list));
      this.$hideLoader();
    },
    async selectSection(item, aj_item) {
      this.adjust_preview_item = item;
      // console.log(
      //   "adjust_preview_item :",
      //   JSON.stringify(this.adjust_preview_item)
      // );
      this.adjust_dt_menu_select = aj_item.title;
      // console.log("this.adjust_dt_menu_select:", this.adjust_dt_menu_select);
      if (aj_item.title == "Change Machine") {
        await this.onLoadAutoCompleteMachine(item.company_id);
        // this.mch_item_selected = item.machine_id;
        this.dialogAdjustMachine = true;
      } else if (aj_item.title == "Change Start Time") {
        this.dialogAdjustStartTime = true;
      } else if (aj_item.title == "Add Over Time") {
        await this.onLoadUdefineIDByCompanyAndModuleName(
          udgroup.HOLIDAY,
          localStorage.getItem(server.COMPANYID)
        );
        this.udmodule_name = udgroup.HOLIDAY;

        //---- get wcg_id and machine_id ----
        const res = await api.getWorkCenterGroupByMachineId(item.machine_id);
        console.log("res:", JSON.stringify(res.data));
        this.itemadd.wcg_id = res.data[0].work_center_group_id;
        this.select_holiday_mch.push(res.data[0].mch_id);
        console.log(
          "this.select_holiday_mch:",
          JSON.stringify(this.select_holiday_mch)
        );

        this.dialogAdjustOverTime = true;
      } else if (aj_item.title == "Delete OPN") {
        // console.log("Delete OPN:", JSON.stringify(item));
        this.opn_id_del = item.id;
        this.dialogDeleteOPN = true;
      }
    },
    onGoBack() {
      // go to production order list
      this.$router.push("/production-order-list");
      // this.$router.back();
    },

    async closeApproveUpdateWO() {
      this.dialogApprove = false;
    },

    async confirmapproveWorkOrder() {
      this.dialogApprove = false;
      this.$showLoader();
      const res = await api.approveWorkOrder(
        this.main_item_data.doc_running_no,
        {
          status: "A",
        }
      );
      this.$hideLoader();

      if (res.status == 200 || res.status == 201) {
        this.$store.state.global_dialog_push = true;
        this.setupAlertDialogPush(
          true,
          "Success!!!",
          "Approve Work Order success",
          "text-h5 green--text text-center",
          "/production-order-list"
        );
        return;
      } else if (res.status == 204) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          res.data.message,
          "text-h5 red--text text-center"
        );
        return;
      } else {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Approve Work Order Failed",
          "text-h5 red--text text-center"
        );
        return;
      }
    },
    onApproveUpdateWO() {
      this.dialogApprove = true;
    },

    async closeUpdateWO() {
      this.dialogClose = false;
    },
    async confirmCloseWorkOrder() {
      this.dialogClose = false;
      this.$showLoader();
      const res = await api.closeWorkOrder(this.main_item_data.doc_running_no, {
        status: "C",
      });
      this.$hideLoader();

      if (res.status == 200 || res.status == 201) {
        this.$store.state.global_dialog_push = true;
        this.setupAlertDialogPush(
          true,
          "Success!!!",
          "Close Work Order success",
          "text-h5 green--text text-center",
          "/production-order-list"
        );
        return;
      } else if (res.status == 204) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          res.data.message,
          "text-h5 red--text text-center"
        );
        return;
      } else {
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

    async confirmNewPlan() {
      this.dialogPreview = false;

      this.$showLoader();
      console.log("this.itemadd", JSON.stringify(this.itemadd));
      const res_add = await api.adjustProductionOrderConfirm(
        this.main_item_data.doc_running_no,
        this.itemadd
      );
      // this.$hideLoader();

      console.log("confirmNewPlan res_add: ", JSON.stringify(res_add.data));

      if (res_add.data.message == "success") {
        this.items = [];
        // this.doc_running = res_add.data.doc_running;
        this.doc_running = this.main_item_data.doc_running_no;

        // doc_running,
        // rtg_id,
        // item_master_id
        const res_pod = await api.getProdOrderPlanDraftByID(
          this.doc_running,
          this.itemadd.rtg_id,
          this.itemadd.item_master_id
        );
        this.items = res_pod.data;

        this.$hideLoader();
        // this.$store.state.global_dialog_push = true;
        // this.setupAlertDialogPush(
        //   true,
        //   "Success!!!",
        //   "Add data success",
        //   "text-h5 green--text text-center",
        //   "/production-order-list"
        // );
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Update data success",
          "text-h5 green--text text-center"
        );
        return;
      } else if (res_add.status == 204) {
        this.$hideLoader();
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          res_add.data.message,
          "text-h5 red--text text-center"
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
    async onRadioChange() {
      if (this.radios == aj_status.adjust_start_date_time) {
        this.rd_aj_status = true;
        this.rd_due_status = false;
      } else if (this.radios == aj_status.adjust_due_date_time) {
        this.rd_aj_status = false;
        this.rd_due_status = true;
      } else if (this.radios == aj_status.close) {
        this.rd_aj_status = false;
        this.rd_due_status = false;
        this.dialogClose = true;
      }
      // console.log("this.radios", this.radios);
    },
    async onClickedPrint(item) {
      console.log("item:", JSON.stringify(item));
    },
    async changeItemMaster() {
      // console.log("this.select_item_master", this.select_item_master);
      let tmp = null;
      tmp = this.item_master_list.filter(
        (x) => x.item_id == this.select_item_master
      );
      // console.log("tmp", JSON.stringify(tmp));
      this.item_master_name = tmp[0].item_name;
      this.item_master_unit = tmp[0].unit_name;
      this.item_master_id = tmp[0].id;

      await this.getRoutingDataByItemID(this.item_master_id);
    },
    async getRoutingDataByItemID(item_id) {
      const res_get = await api.getRoutingWorkOrder(
        item_id,
        localStorage.getItem(server.COMPANYID)
      );
      this.routing_data_list = res_get.data;
      // console.log(
      //   "this.routing_data_list",
      //   JSON.stringify(this.routing_data_list)
      // );
    },
    async loadItemMaster() {
      const res_get = await api.getItemMasterByCompanyID(
        localStorage.getItem(server.COMPANYID)
      );
      this.item_master_list = res_get.data;
      // console.log(
      //   "this.item_master_list:",
      //   JSON.stringify(this.item_master_list)
      // );
    },
    async loadDocRunning() {
      const res_get = await api.getAllByGroupPD();
      this.doc_running_list = res_get.data;
      // console.log(
      //   "this.doc_running_list",
      //   JSON.stringify(this.doc_running_list)
      // );
    },

    async onloadWODataEdit() {
      // this.main_item_data = this.$store.state.work_order_edit_item;

      this.main_item_data = JSON.parse(
        localStorage.getItem(server.WO_EDIT_ITEM)
      );
      // console.log("this.main_item_data:", JSON.stringify(this.main_item_data));

      // {
      //   "doc_running_no": "PDCM-240276",
      //   "item_master_id": 10,
      //   "order_qty": 1000,
      //   "rtg_id": 1,
      //   "due_date_time": "29/02/2024 16:00",
      //   "item_id": "FG-ZZ-BH03WAP-AAAA",
      //   "item_name": "โต๊ะไม้สตูสูงยาว L1500*W500*THN19 เมลามีน สีขาว",
      //   "status": "D",
      //   "doc_module_name": "PD ceramic",
      //   "due_date": "2024-02-29",
      //   "due_time": "16:00:00",
      //   "order_date": "2024-02-15"
      // }

      this.get_routing_to_backup = [];
      const res = await api.getMainRoutingByItemAndRtgId(
        this.main_item_data.item_master_id,
        this.main_item_data.rtg_id,
        localStorage.getItem(server.COMPANYID)
      );

      this.get_routing_to_backup = res.data;

      // console.log(
      //   "this.get_routing_to_backup",
      //   JSON.stringify(this.get_routing_to_backup)
      // );

      this.line_of_mch = this.main_item_data.line_of_mch;

      this.itemadd.doc_running = this.main_item_data.doc_running_no;
      this.itemadd.doc_module_name = this.main_item_data.doc_module_name;
      this.itemadd.item_master_id = this.main_item_data.item_master_id;
      this.itemadd.order_qty = this.main_item_data.order_qty;
      this.itemadd.rtg_id = this.main_item_data.rtg_id;
      this.itemadd.order_date = this.main_item_data.order_date;

      this.date0 = this.main_item_data.order_date;
      this.dateFormatted0 = this.formatDate(this.main_item_data.order_date);

      this.itemadd.due_date = this.main_item_data.due_date;
      this.itemadd.due_time = this.main_item_data.due_time;
      this.itemadd.company_id = localStorage.getItem(server.COMPANYID);
      this.itemadd.user_update = localStorage.getItem(server.USER_ID);
      this.itemadd.updated_at = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);

      // this.tmp_due_time = this.main_item_data.due_time;
      let split_due_time = this.main_item_data.due_time.split(":");
      this.tmp_due_time = {
        HH: split_due_time[0],
        mm: split_due_time[1],
      };
      this.date1 = this.main_item_data.due_date;
      this.date0 = this.main_item_data.order_date;
      this.select_doc_running = this.main_item_data.doc_module_name;
      this.select_item_master = this.main_item_data.item_id;
      this.item_master_name = this.main_item_data.item_name;
      this.select_routing = this.main_item_data.rtg_id;
      await this.changeItemMaster();

      this.items = [];
      this.doc_running = this.main_item_data.doc_running_no;

      const res_pod = await api.getProdOrderPlanDraftByID(
        this.doc_running,
        this.main_item_data.rtg_id,
        this.main_item_data.item_master_id
      );
      this.items = res_pod.data;

      // ---- get order status for check adjust plan ----
      const res_get = await api.getOrderByDocRunningID(
        this.main_item_data.doc_running_no,
        this.$route.params.id
      );
      console.log("res_get:", JSON.stringify(res_get.data[0]));

      // if (res_get.data[0].status == "D") {
      //   this.doc_status = false;
      //   this.approve_status = false;
      // } else
      if (res_get.data[0].status == "A") {
        this.doc_status = false;
        this.approve_status = true;
      } else if (res_get.data[0].status == "C") {
        this.doc_status = true;
        this.approve_status = true;
      }
    },
    async onHoursChange() {
      if (this.select_holiday_type == "D") {
        this.itemadd.hours = null;

        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Type of holiday is  D, Cannot input Hours",
          "text-h5 red--text text-center"
        );
        return;
      }
    },
    async changeHolidayType() {
      if (this.select_holiday_type == "D") {
        this.itemadd.hours = null;
      }
    },
    async loadWorkCenterGroup() {
      const res_get = await api.getWorkCenterGroupMaster(
        localStorage.getItem(server.COMPANYID)
      );
      this.work_center_group_list = res_get.data;
      // console.log(
      //   "this.work_center_group_list",
      //   JSON.stringify(this.work_center_group_list)
      // );
    },
    // async onLoadUdefineIDByCompanyAndModuleName(module_name, company_id) {
    //   const res_get = await api.getu_define_module_UdefineIDByCompanyAndModuleName(
    //     module_name,
    //     company_id
    //   );

    //   // console.log("res_get", JSON.stringify(res_get.data));
    //   this.main_u_define_module_id = res_get.data[0].id;
    //   this.itemaddudefine.u_define_module_id = this.main_u_define_module_id;
    //   // console.log("this.main_u_define_module_id:", this.main_u_define_module_id);
    // },
    async loaddataEdit() {
      this.main_id = this.$route.params.id;
      const result = await api.getHolidayByID(
        this.main_id,
        this.main_u_define_module_id
      );

      // console.log("result:", JSON.stringify(result.data));
      if (result.data[0]) {
        //item
        this.itemadd.wcg_id = result.data[0].wcg_id;
        this.select_work_center_group = result.data[0].wcg_id;
        // this.itemadd.date_from = this.formatDate(result.data[0].date_from);
        this.date1 = result.data[0].fdate_from;
        this.itemadd.holiday_type = result.data[0].holiday_type;
        this.select_holiday_type = result.data[0].holiday_type;
        this.itemadd.hours = result.data[0].hours;
        this.itemadd.company_id = result.data[0].company_id;

        //itemdfine
        this.itemaddudefine.numeric1 = result.data[0].numeric1;
        this.itemaddudefine.numeric2 = result.data[0].numeric2;
        this.itemaddudefine.date1 = this.formatDate(result.data[0].date1);
        this.itemaddudefine.date2 = this.formatDate(result.data[0].date2);
        this.itemaddudefine.boolean1 = result.data[0].boolean1;
        this.itemaddudefine.boolean2 = result.data[0].boolean2;
        this.itemaddudefine.char1 = result.data[0].char1;
        this.itemaddudefine.char2 = result.data[0].char2;
        this.itemaddudefine.text1 = result.data[0].text1;
        this.itemaddudefine.text2 = result.data[0].text2;
      }
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
    previewImage: function(event) {
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
    async adjustPlanAndPreview() {
      if (this.new_mch_selected != [] && this.new_mch_selected != null) {
        console.log("adjustPlanAndPreview:", "this.new_mch_selected != []");

        if (this.new_mch_selected.length > 0) {
          //this.get_routing_to_backup
          console.log(
            "adjustPlanAndPreview:",
            "this.new_mch_selected.length > 0"
          );
          this.$showLoader();
          // // check tbl_routing_tmp_new
          // const res_check_routing_tmp_new = await api.getRoutingTmpNewByRtgMainId(
          //   this.get_routing_to_backup[0].id
          // );
          // console.log(
          //   "res_check_routing_tmp_new",
          //   JSON.stringify(res_check_routing_tmp_new.data)
          // );

          // // check tbl_routing_tmp
          // const res_check_routing_tmp = await api.getRoutingTmpById(
          //   this.get_routing_to_backup[0].id
          // );
          // console.log(
          //   "res_check_routing_tmp",
          //   JSON.stringify(res_check_routing_tmp.data)
          // );

          let str_new_mch = "";

          let c = 0;
          for (let item of this.new_mch_selected) {
            if (c == this.new_mch_selected.length - 1) {
              console.log("last item");
              str_new_mch += item.split(":")[0];
            } else {
              console.log("not last item");
              str_new_mch += item.split(":")[0] + ",";
            }
            c++;
          }

          // console.log("str_new_mch", str_new_mch);

          //save tbl_routing_tmp_new
          let body_new_mch = {
            rtg_main_id: this.get_routing_to_backup[0].id,
            no_of_machine: this.no_of_mch,
            new_machine_id: str_new_mch,
            user_create: localStorage.getItem(server.USER_ID),
          };

          // console.log("body_new_mch", JSON.stringify(body_new_mch));
          const res_save_new_mch = await api.saveRoutingTmpNew(body_new_mch);

          // console.log("res_save_new_mch", JSON.stringify(res_save_new_mch.data));

          //save tbl_routing_tmp
          const res_save_mch = await api.saveRoutingTmp(
            this.get_routing_to_backup[0]
          );

          let mrt_body_data = {
            no_of_machine: this.no_of_mch,
            machine_id: str_new_mch,
          };
          console.log(`update Main Routing ให้เป็นใหม่`);
          //update tbl_routing (main) to new machine
          const res_update_routing = await api.updateMainRouting(
            this.get_routing_to_backup[0].id,
            mrt_body_data
          );

          this.$hideLoader();
        }
      }

      // return;

      this.itemadd.doc_module_name = this.select_doc_running;
      this.itemadd.item_master_id = this.item_master_id;
      this.itemadd.rtg_id = this.select_routing;
      this.itemadd.order_date = this.date0;
      this.itemadd.due_date = this.date1;
      this.itemadd.start_date = this.date2;

      if (this.radios == aj_status.adjust_start_date_time) {
        if (this.tmp_due_time2 == null) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Please select Start Time",
            "text-h5 red--text text-center"
          );
          return;
        }
        this.itemadd.start_time = `${this.tmp_due_time2.HH}:${this.tmp_due_time2.mm}:00`;

        if (this.itemadd.start_date == null) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Please select Start Date",
            "text-h5 red--text text-center"
          );
          return;
        }
      }

      if (this.radios == aj_status.adjust_due_date_time) {
        if (this.tmp_due_time == null) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Please select Due Time",
            "text-h5 red--text text-center"
          );
          return;
        }
        this.itemadd.due_time = `${this.tmp_due_time.HH}:${this.tmp_due_time.mm}:00`;

        if (this.itemadd.due_date == null) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Please select Due Date",
            "text-h5 red--text text-center"
          );
          return;
        }
      }

      this.itemadd.company_id = localStorage.getItem(server.COMPANYID);
      this.itemadd.user_create = localStorage.getItem(server.USER_ID);

      // if (this.radios == aj_status.adjust_start_date_time) {

      // } else if (this.radios == aj_status.adjust_due_date_time) {

      // } else if (this.radios == aj_status.close){

      // }

      console.log("this.itemadd : ", JSON.stringify(this.itemadd));

      this.$showLoader();
      let res_add = null;
      if (this.radios == aj_status.adjust_start_date_time) {
        console.log("adjustProductionOrderByStartDateDraft");
        try {
          res_add = await api.adjustProductionOrderByStartDateDraft(
            this.$route.params.id,
            this.itemadd
          );
        } catch (error) {
          console.log("error", error);
        }
        // res_add = await api.adjustProductionOrderByStartDateDraft(
        //   this.$route.params.id,
        //   this.itemadd
        // );
      } else if (this.radios == aj_status.adjust_due_date_time) {
        console.log("adjustProductionOrderByDueDateDraft");
        res_add = await api.adjustProductionOrderByDueDateDraft(
          this.$route.params.id,
          this.itemadd
        );
      }

      // this.$hideLoader();
      //{ message: "success", doc_running: doc_running, cpd_res: cpd_res }
      // console.log("res_add: ", JSON.stringify(res_add.data));
      if (res_add.data.message == "success") {
        if (this.new_mch_selected != [] && this.new_mch_selected != null) {
          if (this.new_mch_selected.length > 0) {
            let mrt_body_data = {
              no_of_machine: this.get_routing_to_backup[0].no_of_machine,
              machine_id: this.get_routing_to_backup[0].machine_id,
            };
            //update tbl_routing (main) to new machine
            const res_update_routing = await api.updateMainRouting(
              this.get_routing_to_backup[0].id,
              mrt_body_data
            );
            console.log(`update Main Routing กลับให้เป็นตัวเดิม`);

            //delete tbl_routing_tmp_new
            const res_delete_routing_tmp_new = await api.deleteRoutingTmpNew(
              this.get_routing_to_backup[0].id
            );

            //delete tbl_routing_tmp
            const res_delete_routing_tmp = await api.deleteRoutingTmp(
              this.get_routing_to_backup[0].id
            );
          }
        }

        this.adjust_message = res_add.data.cpd_res;
        this.itemsPreview = [];
        this.doc_running = res_add.data.doc_running;

        // doc_running,
        // rtg_id,
        // item_master_id
        const res_pod = await api.getTempOpnOrderPlanDraftByID(
          this.doc_running,
          this.itemadd.rtg_id,
          this.itemadd.item_master_id
        );

        // console.log("res_pod: ", JSON.stringify(res_pod.data));
        this.itemsPreview = res_pod.data;
        this.dialogPreview = true;
        // console.log("this.items: ", JSON.stringify(this.items));
        this.$hideLoader();
      } else if (res_add.status == 204) {
        this.$hideLoader();
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          res_add.data.message,
          "text-h5 red--text text-center"
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
    async savePlanDraft() {
      // let doc_running = null;
      console.log("savePlanDraft");
      // console.log(this.itemadd);
      // console.log(this.itemaddudefine);
      // return;

      // doc_module_name: null,
      // item_master_id: null,
      // order_qty: null,
      // rtg_id: null,
      // order_date: null,
      // due_date: null,

      this.itemadd.doc_module_name = this.select_doc_running;
      this.itemadd.item_master_id = this.item_master_id;
      this.itemadd.rtg_id = this.select_routing;
      this.itemadd.order_date = this.date0;
      this.itemadd.due_date = this.date1;

      // if (this.radios == aj_status.adjust_start_date_time) {

      // } else if (this.radios == aj_status.adjust_due_date_time) {

      // } else if (this.radios == aj_status.close){

      // }

      if (this.tmp_due_time == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Due Time",
          "text-h5 red--text text-center"
        );
        return;
      }
      this.itemadd.due_time = `${this.tmp_due_time.HH}:${this.tmp_due_time.mm}:00`;

      this.itemadd.company_id = localStorage.getItem(server.COMPANYID);
      this.itemadd.user_create = localStorage.getItem(server.USER_ID);

      // console.log("this.itemadd : ", JSON.stringify(this.itemadd));

      if (this.itemadd.doc_module_name == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Doc. Group",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.item_master_id == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Item ID",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.order_qty == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please input Order QTY",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.rtg_id == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select RTG ID",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.order_date == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Order Date",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.due_date == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Due Date",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.itemadd.due_time == null) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select Due Time",
          "text-h5 red--text text-center"
        );
        return;
      }

      console.log("this.itemadd : ", JSON.stringify(this.itemadd));

      this.$showLoader();
      const res_add = await api.updateProductionOrderDraft(
        this.$route.params.id,
        this.itemadd
      );
      // this.$hideLoader();

      // console.log("res_add: ", JSON.stringify(res_add.data));
      if (res_add.data.message == "success") {
        this.items = [];
        this.doc_running = res_add.data.doc_running;

        // doc_running,
        // rtg_id,
        // item_master_id
        const res_pod = await api.getProdOrderPlanDraftByID(
          this.doc_running,
          this.itemadd.rtg_id,
          this.itemadd.item_master_id
        );
        this.items = res_pod.data;
        // console.log("this.items: ", JSON.stringify(this.items));
        // this.$hideLoader();
        this.itemaddudefine.module_master_id = res_add.data.id;
        this.itemaddudefine.date1 = this.parseDate(this.itemaddudefine.date1);
        this.itemaddudefine.date2 = this.parseDate(this.itemaddudefine.date2);

        // console.log(
        //   "this.itemaddudefine : ",
        //   JSON.stringify(this.itemaddudefine)
        // );
        this.itemaddudefine.u_define_module_id = this.main_u_define_module_id;
        const res_addudefine = await api.addu_define_master(
          this.itemaddudefine
        );

        if (res_addudefine.status == 200) {
          this.$hideLoader();
          // this.$store.state.global_dialog_push = true;
          // this.setupAlertDialogPush(
          //   true,
          //   "Success!!!",
          //   "Add data success",
          //   "text-h5 green--text text-center",
          //   "/production-order-list"
          // );
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Success!!!",
            "Add data success",
            "text-h5 green--text text-center"
          );
          return;
        } else {
          this.itemaddudefine.date1 = this.formatDate(
            this.itemaddudefine.date1
          );
          this.itemaddudefine.date2 = this.formatDate(
            this.itemaddudefine.date2
          );
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
      } else if (res_add.status == 204) {
        this.$hideLoader();
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          res_add.data.message,
          "text-h5 red--text text-center"
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
    async loadModelGroupList(id) {
      const result = await api.getModelGroupByCompanyID(id);
      this.modelgrouplist = result.data;
      // this.modelgrouplist = [{id:1,name:"model group fixed"}]
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
    // getunitname(item){
    //   return `${item.unit_name} (${item.unit_item})`;
    // },

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
.v-btn:not(.v-btn--round).v-size--default.buttongreen {
  background-color: #068719;
  color: white;
}
.v-btn:not(.v-btn--round).v-size--default.buttonblue {
  background-color: #1f51ff;
  color: white;
}

.v-btn:not(.v-btn--round).v-size--default.buttonred {
  width: 100%;
  background-color: #9e3b1b;
  color: white;
}

.v-tab.v-tab--active {
  background-color: #1f51ff;
  color: white;
}

.v-slide-group__content {
  border: solid;
}

.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active),
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-icon,
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-btn,
.theme--light.v-tabs > .v-tabs-bar .v-tab--disabled {
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
  background-color: #1f51ff;
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
</style>
