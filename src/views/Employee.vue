<template>
  <v-card>
    <v-row class="mt-5 ml-5 mr-5">
      <v-col cols="12" md="3">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Username, firstname ,lastname..."
          outlined
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-autocomplete
          v-model="search"
          :items="department_list"
          label="Department"
          filled
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" md="3">
        <v-autocomplete
          v-model="search"
          :items="position_list"
          label="Position"
          filled
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" md="3">
        <v-autocomplete
          v-model="search"
          :items="status_list"
          label="Status"
          filled
        ></v-autocomplete>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      sort-by="calories"
      class="elevation-1  ma-5"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-row class="row1 mt-5  pt-5"> </v-row>

          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="900px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="#254E58"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                @click="addEmp"
                :disabled="!authorize_add"
              >
                เพิ่มพนักงาน
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container fluid>
                  <v-row align="center" justify="center">
                    <v-col cols="12" sm="4" md="4">
                      <v-select
                        :items="prename_th"
                        v-model="editedItem.prename_th"
                        label="คำนำหน้า"
                        solo
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.firstname"
                        label="Firstname Thai"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.lastname"
                        label="Lastname Thai"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                      <v-select
                        :items="prename_en"
                        v-model="editedItem.prename_en"
                        label="Title"
                        solo
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.firstname_en"
                        label="Firstname English"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.lastname_en"
                        label="Lastname English"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.phone"
                        label="Phone Number"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.abbname_en"
                        label="Nick Name"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-select
                        v-validate="'required'"
                        required
                        outlined
                        :rules="commonRules"
                        :items="authorize"
                        v-model="editedItem.authorize_id"
                        item-value="id"
                        item-text="sgm_name"
                        label="Authorize"
                        solo
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-select
                        v-validate="'required'"
                        required
                        outlined
                        :rules="commonRules"
                        :items="company"
                        v-model="editedItem.company_id"
                        item-value="id"
                        item-text="name"
                        label="Company Name"
                        @change="changeCompany"
                        solo
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-col class="d-flex" cols="12" sm="12">
                        <v-select
                          v-validate="'required'"
                          required
                          outlined
                          :rules="commonRules"
                          :items="department"
                          v-model="editedItem.department_id"
                          item-text="name"
                          item-value="id"
                          label="Department"
                          @change="changeDepartment(editedItem.department_id)"
                          solo
                        ></v-select>
                      </v-col>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-select
                        v-validate="'required'"
                        required
                        outlined
                        :rules="commonRules"
                        :items="position"
                        v-model="editedItem.position_id"
                        item-text="name"
                        item-value="id"
                        label="Position"
                        solo
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" sm="4" md="4" v-if="false">
                      <v-text-field
                        v-model="editedItem.emp_rate"
                        label="Rate"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        disabled
                        v-model="editedItem.dimension"
                        label="Dimension"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        disabled
                        v-model="editedItem.sub_dimension"
                        label="Sub Dimension"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.level"
                        label="Level"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                      <v-select
                        :items="approver_role"
                        v-model="editedItem.user_role"
                        item-text="status_name"
                        item-value="id"
                        label="Approve Status"
                        outlined
                      ></v-select>
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                      <v-select
                        :items="emp_status"
                        v-model="editedItem.emp_status"
                        item-text="status_name"
                        item-value="id"
                        label="Status"
                        outlined
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col align="center" cols="12" sm="4" md="4">
                      <v-autocomplete
                        v-model="editedItem.approver_level1"
                        :items="approver"
                        item-text="name"
                        item-value="id"
                        label="Approver1"
                        filled
                      ></v-autocomplete>
                    </v-col>
                    <v-col align="center" cols="12" sm="4" md="4">
                      <v-autocomplete
                        v-model="editedItem.approver_level2"
                        :items="approver"
                        item-text="name"
                        item-value="id"
                        label="Approver2"
                        filled
                      ></v-autocomplete>
                    </v-col>
                    <v-col align="center" cols="12" sm="4" md="4">
                      <v-autocomplete
                        v-model="editedItem.approver_level3"
                        :items="approver"
                        item-text="name"
                        item-value="id"
                        label="Approver3"
                        filled
                      ></v-autocomplete>
                    </v-col>

                    <v-col align="center" cols="12" sm="4" md="4">
                      <v-autocomplete
                        v-model="editedItem.approver_level4"
                        :items="approver"
                        item-text="name"
                        item-value="id"
                        label="Approver4"
                        filled
                      ></v-autocomplete>
                    </v-col>
                    <v-col align="center" cols="12" sm="4" md="4">
                      <v-autocomplete
                        v-model="editedItem.approver_level5"
                        :items="approver"
                        item-text="name"
                        item-value="id"
                        label="Approver5"
                        filled
                      ></v-autocomplete>
                    </v-col>
                    <v-col align="center" cols="12" sm="4" md="4">
                      <v-autocomplete
                        v-model="editedItem.approver_level6"
                        :items="approver"
                        item-text="name"
                        item-value="id"
                        label="Approver6"
                        filled
                      ></v-autocomplete>
                    </v-col>

                    <v-col align="center" cols="12" sm="4" md="4">
                      <v-autocomplete
                        v-model="editedItem.approver_level7"
                        :items="approver"
                        item-text="name"
                        item-value="id"
                        label="Approver7"
                        filled
                      ></v-autocomplete>
                    </v-col>
                    <v-col align="center" cols="12" sm="4" md="4">
                      <v-autocomplete
                        v-model="editedItem.approver_level8"
                        :items="approver"
                        item-text="name"
                        item-value="id"
                        label="Approver8"
                        filled
                      ></v-autocomplete>
                    </v-col>
                    <v-col align="center" cols="12" sm="4" md="4">
                      <v-autocomplete
                        v-model="editedItem.approver_level9"
                        :items="approver"
                        item-text="name"
                        item-value="id"
                        label="Approver9"
                        filled
                      ></v-autocomplete>
                    </v-col>

                    <v-col align="center" cols="12" sm="4" md="4">
                      <v-autocomplete
                        v-model="editedItem.approver_level10"
                        :items="approver"
                        item-text="name"
                        item-value="id"
                        label="Approver10"
                        filled
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="4" md="4"></v-col>
                    <v-col cols="12" sm="4" md="4"></v-col>

                    <v-col cols="12" sm="1" md="1"></v-col>

                    <v-col align="center" cols="12" md="4">
                      <v-row
                        :style="{ visibility: showsig1 ? 'visible' : 'hidden' }"
                      >
                        <VueSignaturePad
                          class="signature"
                          width="100%"
                          height="150px"
                          ref="firstsignaturePad"
                        />
                        <v-row
                          :style="{
                            visibility: showbuttonsavesig1
                              ? 'visible'
                              : 'hidden',
                          }"
                        >
                          <v-col align="center">
                            <v-btn depressed class="ml-5" @click="clearsig1()">
                              Clear
                            </v-btn>
                          </v-col>
                          <v-col>
                            <v-btn
                              class="mr-5 mb-5 primary"
                              depressed
                              @click="savesig1()"
                            >
                              Save
                            </v-btn>
                          </v-col>
                        </v-row>
                        <v-row
                          :style="{
                            visibility: showbuttonsavesig1
                              ? 'visible'
                              : 'hidden',
                          }"
                        >
                          <!-- <v-col>
                            <input
                              type="file"
                              accept="image/*"
                              @change="previewimagetobasesignature"
                              class="inputsize"
                              ref="filefile"
                              style="display: none"
                            />
                            <v-btn
                              disabled
                              depressed
                              :style="{
                                backgroundColor: '#254E58',
                                color: 'white',
                              }"
                              class="widthbtnimagefile mb-2 mt-n7"
                              @click="$refs.filefile.click()"
                              elevation="7"
                            >
                              import image</v-btn
                            >
                          </v-col> -->
                        </v-row>
                      </v-row>

                      <v-btn
                        @click="editsig1()"
                        depressed
                        :style="{
                          backgroundColor: '#254E58',
                          color: 'white',
                        }"
                        class="widthbtnimagefile mb-2 mt-n7"
                        elevation="7"
                      >
                        Signature Pad</v-btn
                      >
                      <!-- <v-btn class="mr-2" @click="editsig1()">
                        {{ defaultwordbuttonsig1 }}
                        <v-icon right>mdi-border-color</v-icon>
                      </v-btn> -->
                    </v-col>
                    <v-col cols="12" sm="2" md="2"></v-col>
                    <!-- imagesignature -->

                    <v-col align="center" cols="12" md="4">
                      <!-- <v-row
                        :style="{
                          visibility: showsigimage ? 'visible' : 'hidden',
                        }"
                      > -->
                      <!-- <VueSignaturePad
                          class="signature"
                          width="100%"
                          height="150px"
                          ref="imagesignaturePad"
                        /> -->
                      <v-card>
                        <v-img
                          lazy-src="https://upload.wikimedia.org/wikipedia/en/2/24/Crystal_personal.svg"
                          max-height="150"
                          class="mt-3"
                          aspect-ratio="1.7"
                          contain
                          :src="initial_dataimage"
                        ></v-img>
                      </v-card>
                      <v-row
                        :style="{
                          visibility: showbuttonsavesigimage
                            ? 'visible'
                            : 'hidden',
                        }"
                      >
                        <v-col align="center">
                          <v-btn
                            depressed
                            class="ml-5"
                            @click="clearsigimage()"
                          >
                            Clear
                          </v-btn>
                        </v-col>
                        <v-col>
                          <v-btn
                            class="mr-5 mb-5 primary"
                            depressed
                            @click="savesigimage()"
                          >
                            Save
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row
                        :style="{
                          visibility: showbuttonsavesigimage
                            ? 'visible'
                            : 'hidden',
                        }"
                      >
                        <!-- <v-col>
                            <input
                              type="file"
                              accept="image/*"
                              @change="previewimagetobasesignatureimage"
                              class="inputsize"
                              ref="filefileimage"
                              style="display: none"
                            />
                            <v-btn
                              depressed
                              :style="{
                                backgroundColor: '#254E58',
                                color: 'white',
                              }"
                              class="widthbtnimagefile mb-2 mt-n7"
                              @click="$refs.filefileimage.click()"
                              elevation="7"
                            >
                              import image</v-btn
                            >
                          </v-col> -->
                        <!-- </v-row> -->
                      </v-row>
                      <input
                        type="file"
                        accept="image/*"
                        @change="previewimagetobasesignatureimage"
                        class="inputsize"
                        ref="filefileimage"
                        style="display: none"
                      />
                      <v-btn
                        depressed
                        :style="{
                          backgroundColor: '#254E58',
                          color: 'white',
                        }"
                        class="widthbtnimagefile mb-2 mt-n7"
                        @click="$refs.filefileimage.click()"
                        elevation="7"
                      >
                        Signature image</v-btn
                      >
                      <!-- <v-btn class="mr-2" @click="editsigimage()">
                        {{ defaultwordbuttonsigimage }}
                        <v-icon right>mdi-border-color</v-icon>
                      </v-btn> -->
                    </v-col>

                    <v-col cols="12" sm="1" md="1"></v-col>

                    <!-- seal -->
                    <v-col cols="12" sm="1" md="1"></v-col>

                    <v-col align="center" cols="12" md="4">
                      <!-- <v-row
                        :style="{ visibility: showsig2 ? 'visible' : 'hidden' }"
                      > -->
                      <!-- <VueSignaturePad
                          class="signature"
                          width="100%"
                          height="150px"
                          ref="secondsignaturePad"
                        /> -->
                      <v-card>
                        <v-img
                          lazy-src="https://upload.wikimedia.org/wikipedia/en/2/24/Crystal_personal.svg"
                          max-height="150"
                          class="mt-3"
                          aspect-ratio="1.7"
                          contain
                          :src="initial_data2"
                        ></v-img>
                      </v-card>
                      <v-row
                        :style="{
                          visibility: showbuttonsavesig2 ? 'visible' : 'hidden',
                        }"
                      >
                        <v-col align="center">
                          <v-btn depressed class="ml-5" @click="clearsig2()">
                            Clear
                          </v-btn>
                        </v-col>
                        <v-col>
                          <v-btn
                            class="mr-5 mb-5 primary"
                            depressed
                            @click="savesig2()"
                          >
                            Save
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row
                        :style="{
                          visibility: showbuttonsavesig2 ? 'visible' : 'hidden',
                        }"
                      >
                        <!-- <v-col>
                            <input
                              type="file"
                              accept="image/*"
                              @change="previewimagetobasesignature2"
                              class="inputsize"
                              ref="filefile2"
                              style="display: none"
                            />
                            <v-btn
                              depressed
                              :style="{
                                backgroundColor: '#254E58',
                                color: 'white',
                              }"
                              class="widthbtnimagefile mb-2 mt-n7"
                              @click="$refs.filefile2.click()"
                              elevation="7"
                            >
                              import image</v-btn
                            >
                          </v-col> -->
                      </v-row>
                      <!-- </v-row> -->

                      <input
                        type="file"
                        accept="image/*"
                        @change="previewimagetobasesignature2"
                        class="inputsize"
                        ref="filefile2"
                        style="display: none"
                      />
                      <v-btn
                        depressed
                        :style="{
                          backgroundColor: '#254E58',
                          color: 'white',
                        }"
                        class="widthbtnimagefile mb-2 mt-n7"
                        @click="$refs.filefile2.click()"
                        elevation="7"
                      >
                        Stamp image</v-btn
                      >
                      <!-- <v-btn class="mr-2" @click="editsig2()">
                        {{ defaultwordbuttonsig2 }}
                        <v-icon right>mdi-border-color</v-icon>
                      </v-btn> -->
                    </v-col>
                    <v-col cols="12" sm="2" md="2"></v-col>
                    <v-col align="center" cols="12" md="4">
                      <!-- <v-row
                        :style="{
                          visibility: showsigimage ? 'visible' : 'hidden',
                        }"
                      > -->
                      <!-- <VueSignaturePad
                          class="signature"
                          width="100%"
                          height="150px"
                          ref="imagesignaturePad"
                        /> -->
                      <v-card>
                        <v-img
                          lazy-src="https://upload.wikimedia.org/wikipedia/en/2/24/Crystal_personal.svg"
                          max-height="150"
                          class="mt-3"
                          aspect-ratio="1.7"
                          contain
                          :src="img_preview"
                        ></v-img>
                      </v-card>
                      <v-row
                        :style="{
                          visibility: showbuttonsavesigimage
                            ? 'visible'
                            : 'hidden',
                        }"
                      >
                        <v-col align="center">
                          <v-btn
                            depressed
                            class="ml-5"
                            @click="clearsigimage()"
                          >
                            Clear
                          </v-btn>
                        </v-col>
                        <v-col>
                          <v-btn
                            class="mr-5 mb-5 primary"
                            depressed
                            @click="savesigimage()"
                          >
                            Save
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row
                        :style="{
                          visibility: showbuttonsavesigimage
                            ? 'visible'
                            : 'hidden',
                        }"
                      >
                        <!-- <v-col>
                            <input
                              type="file"
                              accept="image/*"
                              @change="previewimagetobasesignatureimage"
                              class="inputsize"
                              ref="filefileimage"
                              style="display: none"
                            />
                            <v-btn
                              depressed
                              :style="{
                                backgroundColor: '#254E58',
                                color: 'white',
                              }"
                              class="widthbtnimagefile mb-2 mt-n7"
                              @click="$refs.filefileimage.click()"
                              elevation="7"
                            >
                              import image</v-btn
                            >
                          </v-col> -->
                        <!-- </v-row> -->
                      </v-row>
                      <input
                        type="file"
                        accept="image/*"
                        @change="onFileSelected"
                        class="inputsize"
                        ref="image"
                        style="display: none"
                      />
                      <v-btn
                        depressed
                        :style="{
                          backgroundColor: '#254E58',
                          color: 'white',
                        }"
                        class="widthbtnimagefile mb-2 mt-n7"
                        @click="$refs.image.click()"
                        elevation="7"
                      >
                        import image</v-btn
                      >
                      <!-- <v-btn class="mr-2" @click="editsigimage()">
                        {{ defaultwordbuttonsigimage }}
                        <v-icon right>mdi-border-color</v-icon>
                      </v-btn> -->
                    </v-col>
                    <v-col cols="12" sm="1" md="1"></v-col>

                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.username"
                        label="User Name"
                        outlined
                        :disabled="!toggleDisable"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.password"
                        label="Password"
                        type="password"
                        outlined
                        :disabled="!toggleDisable"
                      ></v-text-field>
                    </v-col>

                    <!-- <v-col cols="12" sm="4" md="4">
                      <v-file-input
                        label="image"
                        filled
                        prepend-icon="mdi-camera"
                        type="file"
                        @change="onFileSelected"
                      ></v-file-input>
                    </v-col> -->
                  </v-row>
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
          &nbsp
          <!-- replace -->
          <v-dialog v-model="dialogApprover" max-width="900px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="#254E58"
                dark
                class="mb-2 ml-2"
                v-bind="attrs"
                v-on="on"
                @click="addEmp"
                :disabled="!authorize_add"
              >
                replace
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Replace Approver</span>
              </v-card-title>

              <v-card-text>
                <v-container fluid>
                  <v-row align="center" justify="center">
                    <v-col align="center" cols="12" sm="4" md="4">
                      <v-autocomplete
                        v-model="repalceId"
                        :items="approver"
                        item-text="name"
                        item-value="id"
                        label="Name"
                        filled
                      ></v-autocomplete>
                    </v-col>
                    <v-col align="center" cols="12" sm="4" md="4"></v-col>
                    <v-col align="center" cols="12" sm="4" md="4"></v-col>
                  </v-row>
                  <v-row align="center" justify="center">
                    <v-col cols="12" sm="4" md="4">
                      <span class="text-h5">Replace By</span>
                    </v-col>
                    <v-col align="center" cols="12" sm="4" md="4"></v-col>
                    <v-col align="center" cols="12" sm="4" md="4"></v-col>
                  </v-row>
                  <v-row align="center" justify="center">
                    <v-col align="center" cols="12" sm="4" md="4">
                      <v-autocomplete
                        v-model="editedItem.approver_level1"
                        :items="approver"
                        item-text="name"
                        item-value="id"
                        label="Approver1"
                        filled
                      ></v-autocomplete>
                    </v-col>
                    <v-col align="center" cols="12" sm="4" md="4">
                      <v-autocomplete
                        v-model="editedItem.approver_level2"
                        :items="approver"
                        item-text="name"
                        item-value="id"
                        label="Approver2"
                        filled
                      ></v-autocomplete>
                    </v-col>
                    <v-col align="center" cols="12" sm="4" md="4">
                      <v-autocomplete
                        v-model="editedItem.approver_level3"
                        :items="approver"
                        item-text="name"
                        item-value="id"
                        label="Approver3"
                        filled
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeReplace">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="saveReplace">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
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
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
          v-if="authorize_edit"
        >
          mdi-pencil
        </v-icon>
        <!-- <v-icon small @click="deleteItem(item)" v-if="authorize_del">
          mdi-delete
        </v-icon> -->
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="loadAccounts">
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
  </v-card>
</template>
<script>
import SuccessDialog from "@/components/cards/SuccessDialog";
import api from "@/services/api";
import { server } from "@/services/constants";
import { imageUrl } from "@/services/constants";
export default {
  data: () => ({
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
      //{ text: "คำนำหน้า", value: "prename_th" },
      {
        text: "ชื่อ",
        align: "start",
        sortable: false,
        value: "firstname",
      },
      { text: "นามสกุล", value: "lastname" },
      // { text: "เบอร์", value: "phone" },
      // { text: "username", value: "username" },
      // { text: "role", value: "role" },
      // { text: "รหัสพนักงาน", value: "emp_i_d" },
      // { text: "prename_en", value: "prename_en" },
      { text: "ชื่อ-อังกฤษ", value: "firstname_en" },
      { text: "สกุล-อังกฤษ", value: "lastname_en" },
      //{ text: "abbname_en", value: "abbname_en" },
      { text: "บริษัท", value: "company_name" },
      { text: "แผนก", value: "department_name" },
      { text: "ตำแหน่ง", value: "position_name" },
      //{ text: "Rate", value: "emp_rate" },
      { text: "สถานะ", value: "emp_status_name" },
      //{ text: "email", value: "email" },
      // { text: "password", value: "password" },
      //{ text: "image", value: "image" },
      { text: "Actions", value: "actions", sortable: false },
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
    this.showdefaultsignature();
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
    await this.loadAccounts();
    // console.log("res1:" + JSON.stringify(res1.data));
    let comp_id = localStorage.getItem(server.COMPANYID);
    // console.log("comp_id:" + comp_id);
    await this.loadCompanyMaster(comp_id);
    await this.loadDepartmentMaster(comp_id);
    await this.loadPositionMaster(comp_id);
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

    async loadAccounts() {
      const result = await api.getAccounts();
      // console.log("result1:" + JSON.stringify(result.data));
      this.desserts = result.data;
      console.log(this.desserts);
      const resultList = await api.getAccountslist();
      // console.log("result2:" + JSON.stringify(resultList.data));
      this.approver = resultList.data;

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
      const result = await api.getDepartmentMaster(id);
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

    async loadPositionMaster(id) {
      const result = await api.getPositionMaster(id);
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
      this.showdefaultsignature();
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

    async editItem(dataitem) {
      this.$showLoader();

      const result = await api.getMyProfile(dataitem.id);
      // console.log("img:", JSON.stringify(result.data));
      // let item = result.data;
      this.initial_data1 = result.data.signature;
      this.initial_dataimage = result.data.imagesignature;
      this.initial_data2 = result.data.seal;
      // console.log("initial_dataimage:", this.initial_dataimage);
      // console.log("initial_data1:", this.initial_data1);
      // console.log("initial_data2:", this.initial_data2);
      // console.log("initial_dataitem.id:", dataitem.id);
      await this.loadDepartmentMaster(dataitem.company_id);
      await this.loadPositionMaster(dataitem.company_id);

      this.img_preview = `${imageUrl}/${dataitem.image}`;

      this.showdefaultsignature();
      this.showsig1 = true;
      // this.showsigimage = true;
      // this.showsig2 = true;

      // this.showbuttonsavesig1 = true;

      // console.log("editItem:", JSON.stringify(dataitem));
      this.toggleDisable = false;
      // this.loadDetailAccount(item.id);
      this.edit_item_id = dataitem.id;
      this.editedIndex = this.desserts.indexOf(dataitem);
      this.editedItem = Object.assign({}, dataitem);
      // alert(item.company_id);
      // alert(item.department_id);
      // alert(item.position_id);

      // const res_acc = await api.getAccountDetail(
      //     localStorage.getItem(server.item.id)
      //  );
      // this.initial_data1 = res_acc.data[0].signature;
      // this.edi
      this.dialog = true;
      this.$hideLoader();
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
      this.clearsig1();
      // this.showsig1 = false;
      this.showbuttonsavesig1 = false;
      this.defaultwordbuttonsig1 = "sinature";

      this.clearsig2();
      // this.showsig2 = false;
      this.showbuttonsavesig2 = false;
      this.defaultwordbuttonsig2 = "seal";

      this.clearsigimage();
      // this.showsigimage = false;
      this.showbuttonsavesigimage = false;
      this.defaultwordbuttonsigimage = "image";
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
    setupAlertDialog(status, title, message, text_color) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
    },
    editsig1() {
      this.showsig1 = true;
      this.showbuttonsavesig1 = true;
      //await Vue.nextTick();
      this.$refs.firstsignaturePad.resizeCanvas();
      this.$refs.firstsignaturePad.fromDataURL(this.initial_data1);
      this.$refs.firstsignaturePad.openSignaturePad();
    },
    clearsig1() {
      this.$refs.firstsignaturePad.resizeCanvas();
      this.$refs.firstsignaturePad.clearSignature();
      this.initial_data1 = "";
    },
    savesig1() {
      this.defaultwordbuttonsig1 = "Edit";
      this.showbuttonsavesig1 = false;

      const { isEmpty, data } = this.$refs.firstsignaturePad.saveSignature();
      this.initial_data1 = data;
      console.log(this.initial_data1);
      this.$refs.firstsignaturePad.resizeCanvas();
      this.$refs.firstsignaturePad.fromDataURL(this.initial_data1);
      //alert(this.signature)
      this.showbuttonsavesig1 = false;
      this.$refs.firstsignaturePad.lockSignaturePad();
    },

    editsig2() {
      this.showsig2 = true;
      this.showbuttonsavesig2 = true;
      //await Vue.nextTick();
      this.$refs.secondsignaturePad.resizeCanvas();
      this.$refs.secondsignaturePad.fromDataURL(this.initial_data2);
      this.$refs.secondsignaturePad.openSignaturePad();
    },
    clearsig2() {
      this.$refs.secondsignaturePad.resizeCanvas();
      this.$refs.secondsignaturePad.clearSignature();
      this.initial_data2 = "";
    },
    savesig2() {
      this.defaultwordbuttonsig2 = "Edit";
      this.showbuttonsavesig2 = false;

      const { isEmpty, data } = this.$refs.secondsignaturePad.saveSignature();
      this.initial_data2 = data;
      console.log(this.initial_data2);
      this.$refs.secondsignaturePad.resizeCanvas();
      this.$refs.secondsignaturePad.fromDataURL(this.initial_data2);
      //alert(this.signature)
      this.showbuttonsavesig2 = false;
      this.$refs.secondsignaturePad.lockSignaturePad();
    },

    editsigimage() {
      this.showsigimage = true;
      this.showbuttonsavesigimage = true;
      //await Vue.nextTick();
      this.$refs.imagesignaturePad.resizeCanvas();
      this.$refs.imagesignaturePad.fromDataURL(this.initial_dataimage);
      this.$refs.imagesignaturePad.openSignaturePad();
    },
    clearsigimage() {
      this.$refs.imagesignaturePad.resizeCanvas();
      this.$refs.imagesignaturePad.clearSignature();
      this.initial_dataimage = "";
    },
    savesigimage() {
      this.defaultwordbuttonsigimage = "Edit";
      this.showbuttonsavesigimage = false;

      const { isEmpty, data } = this.$refs.imagesignaturePad.saveSignature();
      this.initial_dataimage = data;
      console.log(this.initial_dataimage);
      this.$refs.imagesignaturePad.resizeCanvas();
      this.$refs.imagesignaturePad.fromDataURL(this.initial_dataimage);
      //alert(this.signature)
      this.showbuttonsavesigimage = false;
      this.$refs.imagesignaturePad.lockSignaturePad();
    },
    async showdefaultsignature() {
      this.$nextTick(() => {
        this.$refs.firstsignaturePad.resizeCanvas();
        this.$refs.firstsignaturePad.fromDataURL(this.initial_data1);
        this.$refs.firstsignaturePad.lockSignaturePad();
        // this.$refs.secondsignaturePad.resizeCanvas();
        // this.$refs.secondsignaturePad.fromDataURL(this.initial_data2);
        // this.$refs.secondsignaturePad.lockSignaturePad();
        // this.$refs.imagesignaturePad.resizeCanvas();
        // this.$refs.imagesignaturePad.fromDataURL(this.initial_dataimage);
        // this.$refs.imagesignaturePad.lockSignaturePad();
        // this.$refs.firstsignaturePad.lockSignaturePad();
        // this.$refs.firstsignaturePad.resizeCanvas();
        // this.$refs.firstsignaturePad.lockSignaturePad();
      });
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
