<template>
  <v-container fluid>
    <v-card class="ma-3">
      <v-row class="mt-5 ml-5 mr-5">
        <v-col cols="12" md="10">
          <v-row>
            <v-toolbar flat>
              <v-toolbar-title>Start Job : </v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-autocomplete
                class="mx-2"
                label="Work Center Group"
                v-model="selectedWorkCenterGroup"
                hide-details
                outlined
                dense
                :items="workCenterGroups"
                item-text="label"
                item-value="id"
                clearable
              ></v-autocomplete>
              <v-autocomplete
                class="mx-2"
                label="Work Center"
                v-model="selectedWorkCenterId"
                hide-details
                outlined
                dense
                :items="workCenters"
                item-text="label"
                item-value="id"
                clearable
              ></v-autocomplete>
              <v-autocomplete
                class="mx-2"
                label="Machine"
                v-model="selectedMachineId"
                hide-details
                outlined
                dense
                :items="machines"
                item-text="label"
                item-value="id"
                clearable
              ></v-autocomplete>
              <v-menu
                v-model="startDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="Start Date"
                    clearable
                    @change="onStartDateChange"
                    :value="formatDisplayDate(startDate)"
                    hide-details
                    prepend-icon="mdi-calendar"
                    outlined
                    readonly
                    dense
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="startDate"
                  @input="startDateMenu = false"
                ></v-date-picker>
              </v-menu>
              <v-menu
                v-model="endDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="End Date"
                    clearable
                    @change="onEndDateChange"
                    outlined
                    :value="formatDisplayDate(endDate)"
                    hide-details
                    prepend-icon="mdi-calendar"
                    readonly
                    dense
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="endDate"
                  @input="endDateMenu = false"
                ></v-date-picker>
              </v-menu>
              <v-autocomplete
                class="mx-2"
                label="Worker"
                v-model="selectedWorkerId"
                hide-details
                outlined
                dense
                :items="workers"
                item-text="label"
                item-value="id"
                clearable
              ></v-autocomplete>
            </v-toolbar>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" justify="center">
          <div id="tabs" class="containertab">
            <div class="tabs">
              <div
                class="ml-1"
                v-on:click="activetab = 2"
                v-bind:class="[activetab === 2 ? 'active' : '']"
              >
                Starting
              </div>
              <div
                class="ml-1"
                v-on:click="activetab = 3"
                v-bind:class="[activetab === 3 ? 'active' : '']"
              >
                End
              </div>
            </div>

            <div class="content">
              <div
                v-if="activetab === 1 && callsoopentab == true"
                class="tabcontent"
              >
                <v-row>
                  <v-col
                    v-for="(item, index) in computedFilteredJobs"
                    :key="index"
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-card class="mx-auto" max-width="400">
                      <v-card-text>
                        <v-autocomplete
                          class="card-input"
                          v-model="item.worker_id_list"
                          hide-details
                          :items="workers"
                          item-value="id"
                          item-text="label"
                          dense
                          label="Worker IDs"
                        ></v-autocomplete>
                        <v-autocomplete
                          class="card-input"
                          v-model="item.mch_id"
                          @change="(e) => onOpnOrdIdChange(e, item)"
                          hide-details
                          :items="machines"
                          item-text="label"
                          item-value="id"
                          dense
                          label="Machine ID"
                        ></v-autocomplete>

                        <v-autocomplete
                          class="card-input"
                          v-model="item.wo_running_no"
                          hide-details
                          :items="workOrders"
                          dense
                          label="Work Order Running No"
                        ></v-autocomplete>

                        <v-text-field
                          class="card-input"
                          v-model="item.opn_desc"
                          hide-details
                          dense
                          label="Operation Description"
                        ></v-text-field>

                        <v-autocomplete
                          class="card-input"
                          v-model="item.item_id"
                          hide-details
                          :items="items"
                          dense
                          item-value="id"
                          item-text="item_id"
                          label="Item ID"
                        ></v-autocomplete>

                        <v-text-field
                          class="card-input"
                          :value="getItemLabel(item.item_id)"
                          readonly
                          dense
                          label="Item Name"
                        ></v-text-field>
                        <v-row>
                          <v-col cols="7">
                            <v-menu
                              v-model="item.start_at_menu"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  :value="formatDisplayDate(item.start_at)"
                                  hide-details
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  dense
                                  v-bind="attrs"
                                  v-on="on"
                                  label="Start At"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="item.start_at"
                                @input="item.start_at_menu = false"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="5">
                            <vue-timepicker
                              close-on-complete
                              format="HH:mm"
                              append-to-body
                              fixed-dropdown-button
                              auto-scroll
                              hide-clear-button
                              width="100%"
                              v-model="item.start_time"
                              label="Start Time"
                            ></vue-timepicker>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="7">
                            <v-menu
                              v-model="item.end_at_menu"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                              disabled
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  :value="formatDisplayDate(item.end_at)"
                                  hide-details
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  dense
                                  v-bind="attrs"
                                  v-on="on"
                                  label="End At"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="item.end_at"
                                @input="item.end_at_menu = false"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="5">
                            <vue-timepicker
                              close-on-complete
                              format="HH:mm"
                              append-to-body
                              fixed-dropdown-button
                              auto-scroll
                              hide-clear-button
                              width="100%"
                              v-model="item.end_time"
                              label="End Time"
                            ></vue-timepicker>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-card-title
                        style="justify-content: end; flex-direction: row-reverse;"
                      >
                        <v-icon
                          color="green"
                          x-large
                          class="mr-2"
                          @click="onClickStartJobButton(item)"
                        >
                          mdi-play-circle
                        </v-icon>
                        <v-icon
                          x-large
                          class="mr-2"
                          @click="onClickDeleteButton(item)"
                          :style="{
                            color: '#F44336',
                          }"
                        >
                          mdi-delete
                        </v-icon>
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
              <div v-if="activetab === 2" class="tabcontent">
                <v-row>
                  <v-col
                    v-for="(item, index) in computedFilteredJobs"
                    :key="index"
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-card class="mx-auto" max-width="400">
                      <v-card-text>
                        <v-autocomplete
                          class="card-input"
                          v-model="item.worker_id_list"
                          hide-details
                          :items="workers"
                          item-value="id"
                          item-text="label"
                          multiple
                          dense
                          label="Worker IDs"
                        ></v-autocomplete>
                        <v-autocomplete
                          class="card-input"
                          v-model="item.mch_id"
                          @change="(e) => onOpnOrdIdChange(e, item)"
                          hide-details
                          :items="machines"
                          item-text="label"
                          item-value="id"
                          dense
                          label="Machine ID"
                        ></v-autocomplete>
                        <v-autocomplete
                          class="card-input"
                          v-model="item.wo_running_no"
                          hide-details
                          :items="workOrders"
                          dense
                          label="Work Order Running No"
                        ></v-autocomplete>
                        <v-row>
                          <v-col cols="6">
                            <v-text-field
                              class="card-input"
                              v-model="item.opn_desc"
                              hide-details
                              dense
                              label="Operation Description"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              class="card-input"
                              v-model="item.batch"
                              hide-details
                              dense
                              label="Batch"
                              readonly
                              editable="false"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-autocomplete
                          class="card-input"
                          v-model="item.item_id"
                          hide-details
                          :items="items"
                          dense
                          item-value="id"
                          item-text="item_id"
                          label="Item ID"
                        ></v-autocomplete>
                        <v-text-field
                          class="card-input"
                          :value="getItemLabel(item.item_id)"
                          readonly
                          dense
                          label="Item Name"
                        ></v-text-field>
                        <v-row>
                          <v-col cols="7">
                            <v-menu
                              v-model="item.start_at_menu"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  :value="formatDisplayDate(item.start_at)"
                                  hide-details
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  dense
                                  v-bind="attrs"
                                  v-on="on"
                                  label="Start At"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="item.start_at"
                                @input="item.start_at_menu = false"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="5">
                            <vue-timepicker
                              close-on-complete
                              format="HH:mm"
                              append-to-body
                              fixed-dropdown-button
                              auto-scroll
                              hide-clear-button
                              width="100%"
                              v-model="item.start_time"
                              label="Start Time"
                            ></vue-timepicker>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="7">
                            <v-menu
                              v-model="item.end_at_menu"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                              disabled
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  :value="formatDisplayDate(item.end_at)"
                                  hide-details
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  dense
                                  v-bind="attrs"
                                  v-on="on"
                                  label="End At"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="item.end_at"
                                @input="item.end_at_menu = false"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="5">
                            <vue-timepicker
                              close-on-complete
                              format="HH:mm"
                              append-to-body
                              fixed-dropdown-button
                              auto-scroll
                              hide-clear-button
                              width="100%"
                              v-model="item.end_time"
                              label="End Time"
                            ></vue-timepicker>
                          </v-col>
                        </v-row>
                        <v-row
                          justify="center"
                          align-content="center"
                          style="padding: 0px 5px"
                        >
                          <v-col
                            cols="12"
                            sm="12"
                            md="12"
                            align-self="center"
                            style="display: flex;  align-items: center; "
                          >
                            <div style="font-size: 20px; font-weight: bold;">
                              Received qty:
                            </div>
                            <div
                              style="font-size: 20px; font-weight: bold; margin-left: 5px;"
                            >
                              {{ detailQty[item.id] || "0.00" }}
                            </div>
                            <v-icon
                              color="green"
                              x-large
                              class="mr-2"
                              @click="getTimecardDetailReceiveQty(item)"
                            >
                              mdi-refresh
                            </v-icon>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="12"
                            md="12"
                            style="display: flex;  align-items: center; "
                          >
                            <div style="font-size: 20px; font-weight: bold;">
                              Defect:
                            </div>
                            <div
                              style="font-size: 20px; font-weight: bold; margin-left: 5px;"
                            >
                              {{
                                item.defects
                                  .filter((defect) => !defect.isDeleted)
                                  .reduce(
                                    (acc, cur) => acc + Number(cur.qty),
                                    0
                                  )
                              }}
                            </div>

                            <v-btn
                              small
                              depressed
                              class="buttonblue"
                              style="margin-left: 5px;"
                              @click="onClickAddDefect(item)"
                            >
                              Add
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-card-title
                        style="justify-content: end; flex-direction: row-reverse;"
                      >
                        <v-btn
                          depressed
                          x-large
                          class="mr-2"
                          @click="onClickEndJobButton(item)"
                          color="success"
                        >
                          Checkout
                        </v-btn>
                        <v-btn
                          depressed
                          x-large
                          class="mr-2"
                          @click="onClickSaveJobButton(item)"
                          color="success"
                        >
                          Save
                        </v-btn>
                        <!-- <v-icon
                          color="red"
                          x-large
                          class="mr-2"
                          @click="onClickEndJobButton(item)"
                        >
                          mdi-stop-circle
                        </v-icon> -->
                        <v-spacer></v-spacer>
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
              <div v-if="activetab === 3" class="tabcontent">
                <v-row>
                  <v-col
                    v-for="(item, index) in computedFilteredJobs"
                    :key="index"
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-card class="mx-auto" max-width="400">
                      <v-card-title>
                        <span>{{ getMachineLabel(item.mch_id) }}</span>
                      </v-card-title>
                      <v-card-subtitle>
                        {{ getItemLabel(item.item_id) }}
                      </v-card-subtitle>
                      <v-card-text>
                        <div>
                          <strong>Workers:</strong>
                          {{ getWorkerNames(item.worker_id_list) }}
                        </div>
                        <div>
                          <strong>Item ID:</strong>
                          {{ getItemId(item.item_id) }}
                        </div>
                        <div>
                          <strong>Item Name:</strong>
                          {{ getItemLabel(item.item_id) }}
                        </div>
                        <div>
                          <strong>Batch:</strong>
                          {{ item.batch }}
                        </div>
                        <v-row>
                          <v-col cols="6">
                            <div>
                              <strong>Start At:</strong>
                              {{ formatDisplayDate(item.start_at) }}
                            </div>
                            <div>
                              <strong>Start Time:</strong>
                              {{ item.start_time }}
                            </div>
                          </v-col>
                          <v-col cols="6">
                            <div>
                              <strong>End At:</strong>
                              {{ formatDisplayDate(item.end_at) }}
                            </div>
                            <div>
                              <strong>End Time:</strong>
                              {{ item.end_time }}
                            </div>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="6">
                            <div>
                              <strong style="font-size: 20px;"
                                >received qty</strong
                              >
                              <span style="font-size: 20px;">{{
                                item.qty
                              }}</span>
                            </div>
                          </v-col>
                          <v-col cols="6">
                            <div>
                              <strong>defect</strong>
                              {{
                                item.defects
                                  .filter((defect) => !defect.isDeleted)
                                  .reduce((acc, cur) => acc + cur.qty, 0)
                              }}
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-card-actions>
                        <!-- Add any actions here if needed -->
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <div class="text-center">
        <v-pagination
          style="margin-bottom: 20px;"
          :total-visible="7"
          v-model="currentPage"
          :length="paginationLength"
          circle
        ></v-pagination>
      </div>
      <div style="min-height: 20px;"></div>
      <v-dialog v-model="defectDialog" max-width="500px">
        <v-card>
          <v-card-text>
            <v-container>
              <v-data-table
                hide-default-footer
                width-full
                :headers="defectHeaders"
                :items="computedAvailableDefect"
                :search="search"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-spacer></v-spacer>
                    <v-dialog max-width="500px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          @click="onClickNewDefect"
                          depressed
                          width="100"
                          class="mr-3 buttonblue"
                        >
                          Add New
                        </v-btn>
                      </template>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:item.qty="{ item }">
                  <v-text-field
                    v-model="item.qty"
                    hide-details
                    min="0"
                    type="number"
                    dense
                  ></v-text-field>
                </template>
                <template v-slot:item.defect_cause_id="{ item }">
                  <v-autocomplete
                    v-model="item.defect_cause_id"
                    item-disabled="disabled"
                    hide-details
                    item-text="waste_code"
                    item-value="id"
                    :items="getDefectOptions"
                    dense
                  ></v-autocomplete>
                </template>
                <template v-slot:item.defect_cause_name="{ item }">
                  <v-autocomplete
                    v-model="item.defect_cause_id"
                    hide-details
                    item-text="description"
                    item-value="id"
                    :items="getDefectOptions"
                    dense
                  ></v-autocomplete>
                </template>
                <template v-slot:item.action="{ item }">
                  <v-icon
                    small
                    class="mr-2"
                    @click="() => onRemoveDefect(item)"
                    :style="{
                      backgroundColor: '#FFEBEE',
                      color: '#F44336',
                    }"
                  >
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">
              Cancel
            </v-btn>
            <v-btn color="blue darken-1" text @click="save">
              Save
            </v-btn>
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
      <v-dialog v-model="confirmDialog" max-width="290">
        <v-card>
          <v-card-title primary-title>
            Confirm Start Job
          </v-card-title>

          <v-card-text class="body">
            Are you sure to start job this job?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="confirmDialog = false">
              Cancel
            </v-btn>

            <v-btn color="success" text @click="confirmStartJob">
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="confirmEndJobDialog" max-width="290">
        <v-card>
          <v-card-title primary-title>
            Confirm End Job
          </v-card-title>

          <v-card-text class="body">
            Are you sure to end this job?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="confirmEndJobDialog = false">
              Cancel
            </v-btn>

            <v-btn color="success" text @click="confirmEndJob">
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="confirmDeleteJobDialog" max-width="290">
        <v-card>
          <v-card-title primary-title>
            Confirm Delete
          </v-card-title>

          <v-card-text class="body">
            Are you sure to delete this job?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="confirmDeleteJobDialog = false">
              Cancel
            </v-btn>

            <v-btn color="error" text @click="confirmDeleteJob">
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import api from "@/services/api";
import SuccessDialog from "@/components/cards/SuccessDialog";
import SuccessDialogPush from "@/components/cards/SuccessDialogPush";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import { server } from "@/services/constants";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default {
  components: {
    SuccessDialog,
    SuccessDialogPush,
    VueTimepicker,
  },
  data: (vm) => ({
    headers: [
      { text: "Machine", value: "mch_id" },
      { text: "Work Order", value: "wo_running_no" },
      { text: "OPN Desc", value: "opn_desc" },
      { text: "Item ID", value: "item_id" },
      { text: "Item Name", value: "item_name" },
      { text: "Worker", value: "worker_id" },
      { text: "Start Date", value: "start_at" },
      { text: "Start Time", value: "start_time" },
      { text: "End Date", value: "end_at" },
      { text: "End Time", value: "end_time" },
      { text: "Action", value: "action" },
    ],
    jobs: [],
    search: "",
    startDate: null,
    endDate: null,
    workOrders: [],
    workers: [],
    workCenters: [],
    activetab: 2,
    workCenterGroups: [],
    selectedWorkCenterGroup: null,
    selectedWorkCenterId: null,
    machines: [],
    items: [],
    selectedMachineId: null,
    selectedWorkerId: null,
    title: "green",
    message: "green",
    link: "",
    text_color: "text-h5 green--text text-center",
    dialogAdd: false,
    authorize_add: false,
    jobStatus: "pending",
    callsoopentab: true,
    confirmDialog: false,
    confirmEndJobDialog: false,
    confirmDeleteJobDialog: false,
    selectedItem: null,
    deleteItem: null,
    startDateMenu: false,
    endDateMenu: false,
    defectDialog: false,
    editingDetailId: null,
    isActive: {},
    detailQty: {},
    displayJobs: [],
    currentPage: 1,
    pageSize: 6,
    paginationLength: 0,
    defects: [],
    defectOptions: [],
    defectHeaders: [
      { text: "qty", value: "qty" },
      { text: "Defect", value: "defect_cause_id" },
      { text: "Name", value: "defect_cause_name" },
      { text: "Action", value: "action" },
    ],
    countDown: 1800,
  }),
  computed: {
    computedAvailableDefect() {
      return this.defects.filter((d) => d?.isDeleted !== true);
    },
    computedFilteredJobs() {
      // this.displayJobs = this.jobs.slice(
      //   (this.currentPage - 1) * this.pageSize,
      //   this.currentPage * this.pageSize
      // );
      let filteredData = this.jobs;
      if (this.startDate) {
        filteredData = filteredData.filter((job) =>
          dayjs(job.start_at).isSameOrAfter(dayjs(this.startDate))
        );
      }
      if (this.endDate) {
        filteredData = filteredData.filter((job) =>
          dayjs(job.start_at).isSameOrBefore(dayjs(this.endDate))
        );
      }
      if (this.selectedMachineId) {
        const machine = this.machines.find(
          (m) => m.id === this.selectedMachineId
        );
        if (!machine) {
          return filteredData;
        }
        this.selectedWorkCenterGroup =
          machine.tbl_work_center.tbl_work_center_group.id;
        this.selectedWorkCenterId = machine.tbl_work_center.id;
        filteredData = filteredData.filter(
          (job) => job.mch_id === this.selectedMachineId
        );
      }
      if (this.selectedWorkCenterGroup) {
        console.log(filteredData);
        filteredData = filteredData.filter(
          (job) => job.wc_group_id.id === this.selectedWorkCenterGroup
        );
      }
      if (this.selectedWorkCenterId) {
        const workcenter = this.workCenters.find(
          (m) => m.id === this.selectedWorkCenterId
        );
        if (!workcenter) {
          return filteredData;
        }
        const workcentergroup = this.workCenterGroups.find(
          (wcg) => wcg.work_center_group_id === workcenter.wc_group
        );
        if (!workcentergroup) {
          return filteredData;
        }
        this.selectedWorkCenterGroup = workcentergroup.id;
        filteredData = filteredData.filter(
          (job) => job.wc_id === this.selectedWorkCenterId
        );
      }
      if (this.selectedWorkerId) {
        filteredData = filteredData.filter((job) =>
          job.worker_id_list.includes(this.selectedWorkerId)
        );
      }
      this.displayJobs = filteredData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
      this.syncQty();
      this.paginationLength = Math.ceil(filteredData.length / this.pageSize);
      return this.displayJobs;
      // return filteredData;
    },
    getDefectOptions() {
      const usedDefectIdList = this.defects.map(
        (defect) => defect.defect_cause_id
      );
      return this.defectOptions.map((option) => {
        if (usedDefectIdList.includes(option.id)) {
          return {
            ...option,
            disabled: true,
          };
        } else {
          return {
            ...option,
            disabled: false,
          };
        }
      });
    },
  },
  watch: {
    activetab() {
      this.loadData();
    },
    selectedWorkCenterGroup(val) {
      if (val === null) {
        this.selectedWorkCenterId = null;
        this.selectedMachineId = null;
      }
    },
    selectedWorkCenterId(val) {
      if (val === null) {
        this.selectedMachineId = null;
      }
    },
  },
  methods: {
    onStartDateChange(val) {
      if (val === null) {
        this.startDate = null;
      }
    },
    onRemoveDefect(item) {
      const foundDefect = this.defects.find((defect) => defect.id === item.id);
      foundDefect.isDeleted = true;
      this.defects = [...this.defects];
      // this.defects = this.defects.filter(defect => defect.id !== item.id)
    },
    onChangeDefect(id) {
      const defect = this.defectOptions.find((defect) => defect.id === id);
      defect.disabled = true;
    },
    onClickNewDefect() {
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const initialDefect = {
        id: timestamp,
        qty: 0,
        defect_cause_id: null,
        isNew: true,
      };

      this.defects = [...this.defects, initialDefect];
    },
    onClickAddDefect(timecardDetail) {
      this.defectDialog = true;
      this.editingDetailId = timecardDetail.id;
      this.defects = timecardDetail.defects;
    },
    async loadDefect() {
      const response = await api.getDefectCauseByCompanyID(
        localStorage.getItem(server.COMPANYID)
      );
      this.defectOptions = response.data;
    },
    onEndDateChange(val) {
      if (val === null) {
        this.endDate = null;
      }
    },
    close() {
      this.defectDialog = false;
    },
    async save() {
      const founded = this.jobs.find((log) => log.id === this.editingDetailId);
      founded.defects = this.defects;
      const response = await api.upsertDefect({
        time_card_detail_id: this.editingDetailId,
        defects: this.defects
          .filter((defect) => !defect.isDeleted)
          .map((defect) => ({
            defect_cause_id: defect.defect_cause_id,
            qty: defect.qty,
          })),
      });
      this.defects = [];
      this.editingDetailId = null;
      this.defectDialog = false;
    },
    async loadWorkCenterGroup() {
      const response = await api.getWorkCenterGroupMaster(
        localStorage.getItem(server.COMPANYID)
      );
      this.workCenterGroups = response.data.map((data) => ({
        ...data,
        label: `${data.work_center_group_id}: ${data.work_center_group_name}`,
      }));
    },
    async loadWorkCenter() {
      const response = await api.getWorkCenterMaster(
        localStorage.getItem(server.COMPANYID)
      );
      if (response.data.length > 0) {
        this.workCenters = response.data.map((data) => ({
          ...data,
          label: `${data.wc_id}:${data.wc_name}`,
        }));
      }
    },
    async loadMachine() {
      const response = await api.listMachineByCompany(
        localStorage.getItem(server.COMPANYID)
      );
       if(response.data.length > 0){
      this.machines = response.data.map((data) => ({
        ...data,
        label: `${data.machine_id}:${data.name}`,
      }));
    }
    },
    async loadAuthorize() {
      const res_get = await api.getSettingGroupMenu();
      this.authorize = res_get.data;
    },
    getReceivedQty(job) {
      return job.received_qty || 0;
    },
    async loadData() {
      this.jobs = [];
      const mapping = {
        1: "pending",
        2: "start",
        3: "end",
      };

      const formatDate = "YYYY-MM-DD";
      const formatTime = "HH:mm";
      if (["start", "end"].includes(mapping[this.activetab])) {
        const response = await api.getTimeCardDetails();
        const posted = this.activetab === 3;
        const targetStatus = posted ? "post" : "save";
        const checkIsEnd = targetStatus === "save";
        this.jobs = response.data
          .filter(
            (data) =>
              // data.tbl_time_card.status === targetStatus &&
              data.tbl_time_card.time_card_type === "worker" &&
              (checkIsEnd ? data.end_at === null : data.end_at !== null)
          )
          .map((data) => {
            const found = this.operations.find(
              (opnOrd) => opnOrd.id === data.id
            );
            let startAt,
              endAt = null;
            if (data.tbl_time_card?.doc_date) {
              const startDate = dayjs(data.time_card_date).format("YYYY-MM-DD");
              startAt = dayjs(`${startDate} ${data.time_start}:00`);
              endAt = dayjs(`${startDate} ${data.time_end}:00`);
              if (endAt.isBefore(startAt)) {
                endAt = endAt.add(1, "day");
              }

              startAt = startAt.format(formatDate);
              endAt = endAt.format(formatDate);
            }

            return {
              id: data.id,
              opn_ord_id: data.opn_ord_id || "",
              mch_id: data?.mch_id || data.machine_id,
              wo_running_no: data?.wo_running_no,
              opn_desc: `${data?.opn_desc}`,
              batch: data?.tbl_opn_ord?.batch_count,
              item_id: data.item_id,
              start_at: startAt,
              start_time: data?.time_start,
              end_at: endAt,
              end_time: data?.time_end,
              wc_id: data?.tbl_mch?.work_center_id || data?.wc_id,
              wc_group_id:
                data?.tbl_mch?.tbl_work_center?.tbl_work_center_group,
              worker_id_list: data?.tbl_time_card_detail_workers.map(
                (worker) => worker.worker_id
              ),
              worker_id: data?.worker_id,
              defects: data?.tbl_time_card_defects,
              qty: data?.qty,
              // tbl_job_workers: tbl_job?.tbl_job_workers,
            };
          });
        this.displayJobs = this.jobs.slice(0, this.pageSize);
        const totalPage = Math.ceil(this.jobs.length / this.pageSize);
        this.paginationLength = totalPage;
        this.currentPage = 1;
      } else {
        const response = await api.listJobByStatus(mapping[this.activetab]);
        this.jobs = response.data.map((data) => {
          const { tbl_jobs } = data;
          const tbl_job = tbl_jobs[0];
          const found = this.operations.find((opnOrd) => opnOrd.id === data.id);
          let startAt,
            endAt = null;
          if (tbl_job?.start_at || data.opn_start_date_time) {
            startAt = tbl_job?.start_at
              ? dayjs(tbl_job.start_at).format(formatTime)
              : dayjs(data.opn_start_date_time).format(formatTime);
          }

          if (tbl_job?.end_at || data.opn_end_date_time) {
            endAt = tbl_job?.end_at
              ? dayjs(tbl_job.end_at).format(formatTime)
              : dayjs(data.opn_end_date_time).format(formatTime);
          }
          return {
            opn_ord_id: data.id,
            mch_id: tbl_job?.mch_id || data.machine_id,
            wo_running_no: tbl_job?.wo_running_no || data.doc_running_no,
            opn_desc: tbl_job?.opn_desc || found.opn_desc,
            item_id: tbl_job?.item_id || data.item_master_id,
            // start_at: tbl_job?.start_at
            //   ? dayjs(tbl_job.start_at).format(formatDate)
            //   : dayjs(data.opn_start_date_time).format(formatDate),
            start_at: startAt,
            start_time: tbl_job?.start_at
              ? dayjs(tbl_job.start_at).format(formatTime)
              : dayjs(data.opn_start_date_time).format(formatTime),
            end_at: endAt,
            // end_at: tbl_job?.end_at
            //   ? dayjs(tbl_job.end_at).format(formatDate)
            //   : dayjs(data.opn_end_date_time).format(formatDate),
            end_time: tbl_job?.end_at
              ? dayjs(tbl_job.end_at).format(formatTime)
              : dayjs(data.opn_end_date_time).format(formatTime),
            wc_id:
              tbl_job?.tbl_mch?.work_center_id || data?.tbl_mch?.work_center_id,
            wc_group_id:
              tbl_job?.tbl_mch?.tbl_work_center?.tbl_work_center_group ||
              data?.tbl_mch?.tbl_work_center?.tbl_work_center_group,
            id: tbl_job?.id || null,
            worker_id: tbl_job?.worker_id || null,
            worker_id_list: tbl_job?.tbl_job_workers?.length
              ? tbl_job?.tbl_job_workers.map((jobWorker) => jobWorker.worker_id)
              : [],
            tbl_job_workers: tbl_job?.tbl_job_workers,
          };
        });
      }
    },
    async loadWorkOrder() {
      const response = await api.getWorkOrderOption();
      this.workOrders = response.data;
    },
    async loadOpn() {
      const response = await api.getOpnOrdOption(
        localStorage.getItem(server.COMPANYID)
      );
      this.operations = response.data;
    },
    async loadItem() {
      const response = await api.getItemMasterByCompanyID(
        localStorage.getItem(server.COMPANYID)
      );
      this.items = response.data;
    },
    async loadWorker() {
      const response = await api.getWorkerByCompany();
      if (response.data.length > 0) {
        this.workers = response.data.map((data) => ({
          ...data,
          label: `${data.emp_id}:${data.firstname} ${data.lastname}`,
        }));
      }
    },
    async loadLatestJob() {
      const response = await api.getLatestJob();
      if (response.data) {
        this.selectedMachineId = response.data.mch_id;
        this.selectedWorkCenterId = response.data.tbl_mch?.work_center_id;
      }
    },
    setupAlertDialog(status, title, message, text_color) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
    },
    formatDisplayDate(date) {
      if (!date) {
        return;
      }
      return date === "Invalid Date" ? "" : dayjs(date).format("DD/MM/YYYY");
    },
    onClickDeleteButton(item) {
      this.deleteItem = item;
      this.confirmDeleteJobDialog = true;
    },
    async getTimecardDetailReceiveQty(job) {
      const response = await api.getTimecardDetailReceiveQty(job.id);
      this.detailQty = {
        ...this.detailQty,
        [job.id]: response.data.qty,
      };
      return response.data.qty;
    },
    async syncQty() {
      for (const job of this.displayJobs) {
        if (job.id in this.detailQty) {
          continue;
        }
        await this.getTimecardDetailReceiveQty(job);
      }
    },
    async onClickSaveJobButton(item) {
      const startTime = item.start_time;
      if ("Invalid Date" === startTime) {
        startDateTime = null;
      }

      const endTime = item.end_time;
      if ("Invalid Date" === endTime) {
        endDateTime = null;
      }

      const updateData = {
        id: item.id,
        opn_ord_id: item.opn_ord_id || "",
        mch_id: item.mch_id,
        wo_running_no: item.wo_running_no,
        opn_desc: item.opn_desc,
        item_id: item.item_id,
        time_card_date: item.start_at,
        time_start: item.start_time,
        time_end: item.end_time,
        worker_id: item.worker_id,
        qty: await this.getTimecardDetailReceiveQty(item),
      };
      await api.upsertTimecardLog(updateData);
      // const oldWorkerIdList = this.selectedItem.tbl_job_workers.map(
      //   (jobWorker) => jobWorker.worker_id
      // );
      // const removeWorkerIdList = oldWorkerIdList.filter(
      //   (jobWorkerId) => !this.selectedItem.worker_id_list.includes(jobWorkerId)
      // );
      // await Promise.all([
      //   api.updateJob(updateData),
      //   ...removeWorkerIdList.map((jobWorkerId) =>
      //     api.removeJobWorker(updateData.id, jobWorkerId)
      //   ),
      // ]);
      this.reloadData();
    },
    onClickEndJobButton(item) {
      // console.log(`onClickEndJobButton: `, JSON.stringify(item, null, 2));

      // return;

      const now = new Date();
      const target = new Date(`${item.end_at}T${item.end_time}:00`);

      if (now >= target) {
        if (!item.worker_id_list.length === 0) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(true, "Failed!!!", "Please fill worker");
          return;
        }
        this.selectedItem = item;
        this.confirmEndJobDialog = true;
      } else {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "ไม่สามารถ checkout ก่อนเวลาได้"
        );
        return;
      }
    },
    onClickStartJobButton(item) {
      if (!item.worker_id_list.length === 0) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(true, "Failed!!!", "Please fill worker");
        return;
      }
      this.selectedItem = item;
      this.confirmDialog = true;
    },
    getWorkerNames(worker_id_list) {
      const workers = this.workers.filter((worker) =>
        worker_id_list.includes(worker.id)
      );
      return workers.map((worker) => worker.label).join(",");
    },
    getMachineLabel(mch_id) {
      const machine = this.machines.find((machine) => machine.id === mch_id);
      return machine?.label;
    },
    getItemLabel(item_id) {
      const item = this.items.find((item) => item.id === item_id);
      return item?.item_name;
    },
    getItemId(item_id) {
      const item = this.items.find((item) => item.id === item_id);
      return item?.item_id;
    },
    setupAlertDialogPush(status, title, message, text_color, link) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
      this.link = link;
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        setTimeout(() => {
          this.countDown = 1800; // 1800 sec
          this.countDownTimer();
          if (this.activetab === 2) {
            this.syncQty();
          }
        }, 1000);
      }
    },
    reloadData() {
      this.$store.state.global_dialog_push = true;
      this.setupAlertDialogPush(
        true,
        "Success!!!",
        "success",
        "text-h5 green--text text-center",
        "/job-tfms"
      );
      this.loadData();
      this.selectedItem = null;
      this.confirmDialog = false;
      this.confirmEndJobDialog = false;
    },
    async confirmDeleteJob() {
      const { opn_ord_id } = this.deleteItem;
      if (opn_ord_id) {
        await api.deleteByOpnOrdId(opn_ord_id, false);
      }
      this.reloadData();
      this.deleteItem = null;
      this.confirmDeleteJobDialog = false;
    },
    async confirmEndJob() {
      const startTime = this.selectedItem.start_time;
      if ("Invalid Date" === startTime) {
        startDateTime = null;
      }

      const endTime = this.selectedItem.end_time;
      if ("Invalid Date" === endTime) {
        endDateTime = null;
      }

      const updateData = {
        id: this.selectedItem.id,
        opn_ord_id: this.selectedItem.opn_ord_id || "",
        mch_id: this.selectedItem.mch_id,
        wo_running_no: this.selectedItem.wo_running_no,
        opn_desc: this.selectedItem.opn_desc,
        item_id: this.selectedItem.item_id,
        time_start: this.selectedItem.start_time,
        time_end: this.selectedItem.end_time,
        worker_id: this.selectedItem.worker_id,
        qty: await this.getTimecardDetailReceiveQty(this.selectedItem),
        end_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      };
      await api.endTimecardDetail(updateData);
      // const oldWorkerIdList = this.selectedItem.tbl_job_workers.map(
      //   (jobWorker) => jobWorker.worker_id
      // );
      // const removeWorkerIdList = oldWorkerIdList.filter(
      //   (jobWorkerId) => !this.selectedItem.worker_id_list.includes(jobWorkerId)
      // );
      // await Promise.all([
      //   api.updateJob(updateData),
      //   ...removeWorkerIdList.map((jobWorkerId) =>
      //     api.removeJobWorker(updateData.id, jobWorkerId)
      //   ),
      // ]);
      this.reloadData();
    },
    async confirmStartJob() {
      const startTime = this.selectedItem.start_time;
      const startDate = this.selectedItem.start_at;
      const startDateTime = dayjs(`${startDate} ${startTime}:00`);
      const endTime = this.selectedItem.end_time;
      const endDate = this.selectedItem.end_at;
      const endDateTime = dayjs(`${endDate} ${endTime}:00`);

      const saveData = {
        ...this.selectedItem,
        start_at: startDateTime,
        end_at: endDateTime,
      };
      const result = await api.createJob(saveData);
      const jobId = result.data.id;
      if (jobId) {
        await Promise.all(
          saveData.worker_id_list.map(
            async (worker_id) =>
              await api.createJobWorker(jobId, { job_id: jobId, worker_id })
          )
        );
      }
      this.reloadData();
    },
  },
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

      // this.$showLoader();
    await this.loadAuthorize();
    await this.loadOpn();
    await this.loadWorkOrder();
    await this.loadWorkCenterGroup();
    await this.loadWorkCenter();
    await this.loadMachine();
    await this.loadItem();
    await this.loadData();
    await Promise.all([
      this.loadWorker(),
      this.loadDefect(),
      this.loadLatestJob(),
    ]);

    this.$hideLoader();
    this.syncQty();
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
  created() {
    this.countDownTimer();
  },
};
</script>

<style scoped>
.v-btn:not(.v-btn--round).buttonblue {
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

.card-input {
  padding: 10px 5px;
}
.v-pagination {
  margin-bottom: 20px !important;
}
</style>
