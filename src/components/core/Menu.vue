<template>
  <nav>
    <!-- <v-navigation-drawer clipped app permanent dark color="#DFDFDF">  #2a4bc1 -->
      <!-- width="70px" -->
    <v-navigation-drawer app permanent dark color="#ffffff" >
      <!-- <v-row class="ma-5" align="center" justify="center" >
        <v-col>  -->
      <router-link to="/" exact>
        <div
          :style="{
            backgroundColor: '#ffffff',
            color: '#ffffff',
            textAlign: '-webkit-center',
          }"
        >
          <v-img
            src="@/assets/MVibes_Logo1.jpg"
            color="#ffffff"
            alt=""
            height="50px"
            width="50px"
            contain
          />
        </div>
      </router-link>
      <!-- </v-col>
      </v-row> -->

      <v-list>
        <!-- <v-subheader><h2 style="color:#254E58">MENUS</h2></v-subheader> -->
        <v-list-item-group
          mandatory
          v-model="$store.state.modelmenu"
          active-class="bg-active"
        >
          <!-- open-on-hover -->
          <v-menu
            v-for="item in menus"
            :key="item.title"
            v-model="item.active"
            :prepend-icon="item.action"
            bottom
            :offset-x="!item.route"
          >
           <template v-slot:activator="{ on, attrs }">
              <v-list-item
                v-on="on"
                v-bind="attrs"
                @click="onClickMenuItem(item)"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.action"></v-icon>
                  <v-badge
                    v-if="
                      item.title == 'Approval' &&
                        $store.state.alertapprovalmenu != 0
                    "
                    color="red"
                    :content="$store.state.alertapprovalmenu.toString()"
                  >
                  </v-badge>

                  <v-badge
                    v-if="
                      item.title == 'Approval Template' &&
                        $store.state.alertapprovaltemplatemenu != 0
                    "
                    color="red"
                    :content="$store.state.alertapprovaltemplatemenu.toString()"
                  >
                  </v-badge>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon v-if="!item.route">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <!-- <v-divider></v-divider> -->
            </template>

            <v-list v-if="!item.route">
              <v-list-item-content
                v-for="subItem in item.items"
                :key="subItem.title"
                class="tile"
                @click="onClickMenuItem(subItem)"
              >
                <v-list-item-title class="ml-3">{{
                  subItem.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list>
          </v-menu>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import api from "../../services/api";
import { server } from "../../services/constants";

export default {
  methods: {
    onClickMenu(link) {
      this.$router.push(link).catch((err) => {});
    },
    onClickMenuItem(link) {
      localStorage.setItem(server.MODELMENU, link.index);
      // alert(link);
      this.$router.push(link.route).catch((err) => {
        // console.log(err);
      });
    },
  },

  async mounted() {
    this.$store.state.modelmenu = parseInt(
      localStorage.getItem(server.MODELMENU)
    );
    const res_get = await api.getListMenuDetailById(
      localStorage.getItem(server.AUTHORIZE_ID)
    );
    this.authorize = res_get.data;
    this.authorize.forEach((item) => {
      // cut Scheduling  Menu
      if (item.cmd_route == "scheduling" && item.smd_view == 0) {
        this.subdashboardscheduling = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Dashboard") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Scheduling") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut Availability Dashboard  Menu
      if (item.cmd_route == "availability-dashboard" && item.smd_view == 0) {
        this.subdashboardavailabilitydashboard = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Dashboard") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Availability Dashboard") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

    // cut Productivity Dashboard  Menu
      if (item.cmd_route == "productivity-dashboard" && item.smd_view == 0) {
        this.subdashboardproductivitydashboard = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Dashboard") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Productivity Dashboard") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

          // cut Quality Dashboard  Menu
      if (item.cmd_route == "quality-dashboard" && item.smd_view == 0) {
        this.subdashboardqualitydashboard = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Dashboard") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Quality Dashboard") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      
          // cut OEE Dashboard  Menu
      if (item.cmd_route == "oee-dashboard" && item.smd_view == 0) {
        this.subdashboardoeedashboard = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Dashboard") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "OEE Dashboard") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut dashboard
      if (
        this.subdashboardmaindashboard &&
        this.subdashboardscheduling &&
        this.subdashboardavailabilitydashboard &&
        this.subdashboardproductivitydashboard &&
        this.subdashboardqualitydashboard &&
        this.subdashboardoeedashboard
      ) {
        let getremoveindex = [];
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Dashboard") {
            getremoveindex.push(index);
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus.splice(getremoveindex[i], 1);
      }

      // cut administrator company
      if (item.cmd_route == "company" && item.smd_view == 0) {
        this.subcompany = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Administrator") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Company") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut administrator department
      if (item.cmd_route == "department" && item.smd_view == 0) {
        this.subdepartment = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Administrator") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Department") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut administrator position
      if (item.cmd_route == "position" && item.smd_view == 0) {
        this.subposition = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Administrator") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Position") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut administrator division
      if (item.cmd_route == "division" && item.smd_view == 0) {
        this.subdivision = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Administrator") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Division") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut administrator section
      if (item.cmd_route == "section" && item.smd_view == 0) {
        this.subsection = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Administrator") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Section") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut administrator docruningconfig
      if (item.cmd_route == "docruningconfig" && item.smd_view == 0) {
        this.subdocruningconfig = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Administrator") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Doc-Running Config") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut administrator employee
      if (item.cmd_route == "employee" && item.smd_view == 0) {
        this.subemployee = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Administrator") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Employee") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut administrator worker
      if (item.cmd_route == "worker" && item.smd_view == 0) {
        this.subworker = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Administrator") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Worker") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut administrator worker
      if (item.cmd_route == "u-define-module" && item.smd_view == 0) {
        this.subudefinemodule = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Administrator") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "U-Define") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

   // cut Warehouse menu
      if (item.cmd_route == "warehouse" && item.smd_view == 0) {
        this.subwarehouse = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Administrator") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Warehouse") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

         // cut Location menu
      if (item.cmd_route == "location" && item.smd_view == 0) {
        this.sublocation = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Administrator") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Location") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

   // cut Sheft menu
      if (item.cmd_route == "sheft" && item.smd_view == 0) {
        this.subsheft = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Administrator") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Shelt") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      

      // cut config group-menu menu
      if (item.cmd_route == "group-menu" && item.smd_view == 0) {
        this.subgroupmenu = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Config") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Group Menu") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut config menu-detail menu
      if (item.cmd_route == "menu-detail" && item.smd_view == 0) {
        this.submenudetail = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Config") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Menu Detail") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut config setting-group-menu menu
      if (item.cmd_route == "setting-group-menu" && item.smd_view == 0) {
        this.subsettinggroupmenu = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Config") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Setting Authorize") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

            // cut config import-file menu
      if (!this.authorize.some(item => item.cmd_route === 'file-import-system') || (item.cmd_route == "file-import-system" && item.smd_view == 0)) {
        this.subsettingimportfile = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Config") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "File Import System") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      if (this.subgroupmenu && this.submenudetail && this.subsettinggroupmenu && this.subsettingimportfile) {
        let getremoveindex = [];
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Config") {
            getremoveindex.push(index);
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus.splice(getremoveindex[i], 1);
      }

      if (
        this.subcompany &&
        this.subdepartment &&
        this.subposition &&
        this.subdivision &&
        this.subsection &&
        this.subdocruningconfig &&
        this.subemployee &&
        this.subworker &&
        this.subudefinemodule && 
        this.subwarehouse &&
        this.sublocation && 
        this.subsheft
      ) {
        let getremoveindex = [];
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Administrator") {
            getremoveindex.push(index);
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus.splice(getremoveindex[i], 1);
      }

      // cut Inventory Item Group Menu
      if (item.cmd_route == "itemgroup" && item.smd_view == 0) {
        this.subitemgroup = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Inventory") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Item Group") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut Inventory Unit Menu
      if (item.cmd_route == "unit" && item.smd_view == 0) {
        this.subunit = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Inventory") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Item Unit") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut Inventory Item Master Menu
      if (item.cmd_route == "item-master" && item.smd_view == 0) {
        this.subitemmaster = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Inventory") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Item Master") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

    // cut Inventory Receive From Production Menu
      if (item.cmd_route == "receive-from-production-list" && item.smd_view == 0) {
        this.subreceivefromproductionlist = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Inventory") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Receive From Production") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      

      if (this.subitemmaster && this.subreceivefromproductionlist && this.subunit && this.subitemgroup) {
        let getremoveindex = [];
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Inventory") {
            getremoveindex.push(index);
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus.splice(getremoveindex[i], 1);
      }

      // cut Production Work Center Group Menu
      if (item.cmd_route == "workcenter-group-list" && item.smd_view == 0) {
        this.subworkcentergroup = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Production") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Work Center Group") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut Production Work Center Menu
      if (item.cmd_route == "workcenter-list" && item.smd_view == 0) {
        this.subworkcenter = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Production") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Work Center") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      

            // cut Production DownTime Cause Menu
      if (item.cmd_route == "machine" && item.smd_view == 0) {
        this.submachine = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Production") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Machine") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut Production DownTime Cause Menu
      if (item.cmd_route == "downtime-cause-list" && item.smd_view == 0) {
        this.subdowntimecause = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Production") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "DownTime Cause") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut Production KPI Master Menu
      if (item.cmd_route == "kpi-master-list" && item.smd_view == 0) {
        this.subkpimastermenu = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Production") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "KPI Master") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut Production Defect Cause Menu
      if (item.cmd_route == "defect-cause" && item.smd_view == 0) {
        this.subdefectcause = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Production") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Defect Cause") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut Production Shift Menu
      if (item.cmd_route == "shift" && item.smd_view == 0) {
        this.subshift = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Production") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Shift") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut Production PLC Mapping Menu
      if (item.cmd_route == "plc-mapping-machine" && item.smd_view == 0) {
        this.subplcmapping = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Production") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "PLC Mapping Machine") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut Production Holiday Menu
      if (item.cmd_route == "holiday-list" && item.smd_view == 0) {
        this.subholidaymenu = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Production") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Holiday") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut Production Routing Menu
      if (item.cmd_route == "routing" && item.smd_view == 0) {
        this.subrouting = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Production") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Routing") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      if (
        this.subdefectcause &&
        this.subshift &&
        this.subworkcentergroup &&
        this.subworkcenter &&
        this.submachine &&
        this.subdowntimecause &&
        this.subkpimastermenu &&
        this.subholidaymenu &&
        this.subplcmapping &&
        this.subrouting
      ) {
        let getremoveindex = [];
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Production") {
            getremoveindex.push(index);
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus.splice(getremoveindex[i], 1);
      }

      // cut Production Routing Menu
      if (item.cmd_route == "production-order-list" && item.smd_view == 0) {
        this.subproductionorder = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Production Order") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Production Order") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut Production Routing Menu
      if (
        item.cmd_route == "receive-production-order-list" &&
        item.smd_view == 0
      ) {
        this.subreceiveproductionorder = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Production Order") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Partial Receive") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      
      // cut Timecard Job menu
      if (item.cmd_route == "time-card" && item.smd_view == 0) {
        this.subproductionordertimecard = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Production Order") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Timecard") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut Delete Job menu
      if (item.cmd_route == "delete-job" && item.smd_view == 0) {
        this.subproductionorderdeletejob = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Production Order") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Delete Job") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

            // cut Job menu
      if (item.cmd_route == "job-tfms" && item.smd_view == 0) {
        this.subproductionorderjob = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Production Order") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Job") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut Check In menu
      if (item.cmd_route == "worker-check-in" && item.smd_view == 0) {
        this.subproductionorderworkercheckin = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Production Order") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Check In") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

            // cut Check Out menu
      if (item.cmd_route == "worker-check-out" && item.smd_view == 0) {
        this.subproductionorderworkercheckout = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Production Order") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Check Out") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }
      
      
      

      // cut IOT Mapping menu
      if (item.cmd_route == "iot-mapping" && item.smd_view == 0) {
        this.subproductionorderiotmapping = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Production Order") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "IOT Mapping") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut Calculate Cost menu
      if (item.cmd_route == "calculate-cost" && item.smd_view == 0) {
        this.subreportcalculatecost = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Production Order") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Calculate Cost") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      if (
        this.subproductionorder &&
        this.subproductionorderiotmapping &&
        this.subproductionordertimecard &&
        this.subproductionorderdeletejob &&
        this.subproductionorderjob &&
        this.subproductionorderworkercheckin &&
        this.subproductionorderworkercheckout &&
        this.subreceiveproductionorder &&
        this.subreportcalculatecost
      ) {
        let getremoveindex = [];
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Production Order") {
            getremoveindex.push(index);
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus.splice(getremoveindex[i], 1);
      }

      if (item.cmd_route == "time-card-report" && item.smd_view == 0) {
        this.subreporttimecardreport = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Report") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Time Card Report") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      if (
        item.cmd_route == "report-on-inquiries-about-cloth-registration" &&
        item.smd_view == 0
      ) {
        this.subreportreportoninquiriesaboutclothregistration = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Report") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "รายงานสอบถามทะเบียนลูกผ้า") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      if (item.cmd_route == "leader-time-card-report" && item.smd_view == 0) {
        this.subreportleadertimecardreport = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Report") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Time Card Report (Leader)") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut Production Status Report menu
      if (item.cmd_route == "production-status-report" && item.smd_view == 0) {
        this.subproductionorderproductionstatusreport = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Report") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Production Status Report") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      // cut Production Order Production Costing Report menu
      if (item.cmd_route == "re-cal-costing" && item.smd_view == 0) {
        this.subproductionorderrecalcosting = true;
        let getremoveindex = [];
        let indexsubmenu = -1;
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Production Order") {
            indexsubmenu = index;
            this.menus[index].items.forEach((x, i) => {
              if (x.title == "Production Costing Report") {
                getremoveindex.push(i);
              }
            });
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus[indexsubmenu].items.splice(getremoveindex[i], 1);
      }

      if (
        this.subreporttimecardreport &&
        this.subreportreportoninquiriesaboutclothregistration &&
        this.subreportleadertimecardreport &&
        this.subproductionorderproductionstatusreport &&
        this.subproductionorderrecalcosting
      ) {
        let getremoveindex = [];
        this.menus.forEach((itemmenu, index) => {
          if (itemmenu.title == "Report") {
            getremoveindex.push(index);
          }
        });
        for (var i = getremoveindex.length - 1; i >= 0; i--)
          this.menus.splice(getremoveindex[i], 1);
      }
    });
    this.menus.forEach((x, i) => {
      x.index = i;
      if (x.items.length > 0) {
        x.items.forEach((itemitems, index) => {
          itemitems.index = i;
        });
      }
    });
    // this.selectedMenu = this.menus.findIndex(
    //   (menu) => menu[2][1] == this.$route.path
    // );

    this.selectedMenu = this.menus.findIndex(
      (menu) =>
        menu.items.findIndex((item) => item.route == this.$route.path) != -1
    );
    // alert(this.selectedMenu);
  },
  data() {
    return {
      subholidaymenu: false,
      subkpimastermenu: false,
      subgroupmenu: false,
      submenudetail: false,
      subsettinggroupmenu: false,
      subsettingimportfile:false,
      subcompany: false,
      subdepartment: false,
      subposition: false,
      subdivision: false,
      subsection: false,
      subdocruningconfig: false,
      subemployee: false,
      subworker: false,
      subudefinemodule: false,
      subwarehouse:false,
      sublocation:false,
      subsheft:false,
      subitemgroup: false,
      subunit: false,
      subitemmaster: false,
      subreceivefromproductionlist:false,
      subdefectcause: false,
      subshift: false,
      subworkcentergroup: false,
      subworkcenter: false,
      subdowntimecause: false,
      submachine:false,
      subplcmapping: false,
      subrouting: false,
      subproductionorder: false,
      subreceiveproductionorder: false,
      subproductionorderiotmapping: false,
      subproductionordertimecard:false,
      subproductionorderdeletejob: false,
      subproductionorderjob:false,
      subproductionorderworkercheckin:false,
      subproductionorderworkercheckout:false,
      subproductionorderproductionstatusreport: false,
      subproductionorderrecalcosting: false,
      subdashboardmaindashboard: false,
      subdashboardscheduling: false,
      subdashboardavailabilitydashboard: false,
      subdashboardproductivitydashboard:false,
      subdashboardqualitydashboard:false,
      subdashboardoeedashboard:false,
      subreportcalculatecost: false,
      subreporttimecardreport: false,
      subreportreportoninquiriesaboutclothregistration: false,
      subreportleadertimecardreport: false,
      administratormenu: -1,
      configmenu: -1,
      isActive: false,
      items: [
        { text: "Real-Time", icon: "mdi-clock" },
        { text: "Audience", icon: "mdi-account" },
        { text: "Conversions", icon: "mdi-flag" },
      ],
      authorize: [],
      selectedMenu: 0,
      // menus: [
      //   ["mdi-apps-box", "Stock", "/stock"],
      //   ["mdi-chart-areaspline", "Report", "/report"],
      //   ["mdi mdi-account-multiple", "Employee", "/employee"],
      //   ["mdi mdi-account-multiple", "Customer", "/customer"],
      //   ["mdi mdi-account-convert", "Config", "/config"],
      //   ["mdi mdi-sitemap", "Menu setting", "/roleconfig"],
      // ],
      menus: [
        // menu Dashboard
        {
          // index: 0,
          action: "mdi-apps-box",
          title: "Dashboard",
          items: [
            {
              index: 0,
              title: "Dashboard",
              route: "/dashboard",
            },
            {
              index: 0,
              title: "Scheduling",
              route: "/scheduling",
            },
            {
              index: 0,
              title: "Availability Dashboard",
              route: "/availability-dashboard",
            },
            {
              index: 0,
              title: "Productivity Dashboard",
              route: "/productivity-dashboard",
            },
            {
              index: 0,
              title: "Quality Dashboard",
              route: "/quality-dashboard",
            },
            {
              index: 0,
              title: "OEE Dashboard",
              route: "/oee-dashboard",
            },
          ],
        },

        // menu Admin
        {
          // index: 1,
          action: "mdi-clipboard-account",
          title: "Administrator",
          items: [
            {
              index: 1,
              title: "Company",
              route: "/company",
            },
            {
              index: 1,
              title: "Department",
              route: "/department",
            },
            {
              index: 1,
              title: "Position",
              route: "/position",
            },
            {
              index: 1,
              title: "Division",
              route: "/division",
            },
            {
              index: 1,
              title: "Section",
              route: "/section",
            },
            {
              index: 1,
              title: "Doc-Running Config",
              route: "/docruningconfig",
            },
            {
              index: 1,
              // action: "mdi mdi-account-multiple",
              title: "Employee",
              // items: [],
              route: "/employee",
            },
            {
              index: 1,
              // action: "mdi mdi-account-clock",
              title: "Worker",
              // items: [],
              route: "/worker",
            },
            {
              index: 1,
              // action: "mdi mdi-account-clock",
              title: "U-Define",
              // items: [],
              route: "/u-define-module",
            },
            {
              index: 1,
              title: "Warehouse",
              route: "/warehouse",
            },
            {
              index: 1,
              title: "Location",
              route: "/location",
            },
            {
              index: 1,
              title: "Shelt",
              route: "/sheft",
            },
            // {
            //   index: 1,
            //   title: "Warehouse",
            //   route: "/warehouse",
            // },
            // {
            //   index: 1,
            //   title: "Location",
            //   route: "/location",
            // },
            // {
            //   index: 1,
            //   title: "Sheft",
            //   route: "/sheft",
            // },
          ],
        },
        // menu Config
        {
          index: 2,
          action: "mdi mdi-sitemap",
          title: "Config",
          items: [
            {
              index: 2,
              title: "Group Menu",
              route: "/group-menu",
            },
            {
              index: 2,
              title: "Menu Detail",
              route: "/menu-detail",
            },
            {
              index: 2,
              title: "Setting Authorize",
              route: "/setting-group-menu",
            },
             {
              index: 2,
              title: "File Import System",
              route: "/file-import-system",
            },
          ],
        },
        //menu Inventory
        {
          // index: 1,
          action: "mdi-archive",
          title: "Inventory",
          items: [
            {
              index: 3,
              title: "Item Group",
              route: "/itemgroup",
            },
            {
              index: 3,
              title: "Item Unit",
              route: "/unit",
            },
            {
              index: 3,
              title: "Item Master",
              route: "/item-master",
            },
            {
              index: 3,
              title: "Receive From Production",
              route: "/receive-from-production-list",
            },
          ],
        },

        {
          // index: 1,
          action: "mdi-folder",
          title: "Production",
          items: [
            {
              index: 4,
              title: "Work Center Group",
              route: "/workcenter-group-list",
            },
            {
              index: 4,
              title: "Work Center",
              route: "/workcenter-list",
            },
            {
              index: 4,
              title: "Defect Cause",
              route: "/defect-cause",
            },
            {
              index: 4,
              title: "Shift",
              route: "/shift",
            },
            {
              index: 4,
              title: "Machine",
              route: "/machine",
            },
            {
              index: 4,
              title: "DownTime Cause",
              route: "/downtime-cause-list",
            },
            {
              index: 4,
              title: "KPI Master",
              route: "/kpi-master-list",
            },
            {
              index: 4,
              title: "PLC Mapping Machine",
              route: "/plc-mapping-machine",
            },
            {
              index: 4,
              title: "Holiday",
              route: "/holiday-list",
            },
            {
              index: 4,
              title: "Routing",
              route: "/routing",
            },
          ],
        },

        {
          // index: 1,
          action: "mdi-folder-edit",
          title: "Production Order",
          items: [
            {
              index: 5,
              title: "Production Order",
              route: "/production-order-list",
            },
            {
              index: 4,
              title: "Partial Receive",
              route: "/receive-production-order-list",
            },
            {
              index: 5,
              title: "Timecard",
              route: "/time-card",
            },
            {
              index: 5,
              title: "Delete Job",
              route: "/delete-job",
            },
            {
              index: 5,
              title: "Job",
              route: "/job-tfms",
            },
            {
              index: 5,
              title: "IOT Mapping",
              route: "/iot-mapping",
            },

            {
              index: 5,
              title: "Check In",
              route: "/worker-check-in",
            },
            {
              index: 5,
              title: "Check Out",
              route: "/worker-check-out",
            },
            {
              index: 5,
              title: "Calculate Cost",
              route: "/calculate-cost",
            },
          ],
        },
        {
          // index: 1,
          action: "mdi-file-document",
          title: "Report",
          items: [
            {
              index: 6,
              title: "Time Card Report",
              route: "/time-card-report",
            },
            {
              index: 6,
              title: "รายงานสอบถามทะเบียนลูกผ้า",
              route: "/report-on-inquiries-about-cloth-registration",
            },
            {
              index: 6,
              title: "Time Card Report (Leader)",
              route: "/leader-time-card-report",
            },
            {
              index: 6,
              title: "Production Status Report",
              route: "/production-status-report",
            },
            {
              index: 6,
              title: "Production Costing Report",
              route: "/re-cal-costing",
            },
          ],
        },
        // {
        //   index: 3,
        //   action: "mdi mdi-account",
        //   title: "Customer",
        //   items: [],
        //   route: "/customer",
        // },
      ],
    };
  },
  watch: {
    $route(to, from) {
      // this.selectedMenu = this.menus.items.findIndex(
      //   (menu) => menu[2][1] == to.path
      // );
      // this.menus.forEach((x, i) => {
      //   x.index = i;
      // });
      if (
        to.fullPath == "/dashboard" ||
        to.fullPath == "/scheduling" ||
        to.fullPath == "/availability-dashboard"
      ) {
        // localStorage.setItem(server.MODELMENU, 0);
        // this.$store.state.modelmenu = parseInt(
        //   localStorage.getItem(server.MODELMENU)
        // );
        let indexmenu;
        this.menus.forEach((item, index) => {
          if (item.title == "Dashboard") {
            indexmenu = index;
          }
        });
        localStorage.setItem(server.MODELMENU, indexmenu);
        this.$store.state.modelmenu = parseInt(
          localStorage.getItem(server.MODELMENU)
        );
      } else if (
        to.fullPath == "/group-menu" ||
        to.fullPath == "/menu-detail" ||
        to.fullPath == "/setting-group-menu"
      ) {
        let indexmenu;
        this.menus.forEach((item, index) => {
          if (item.title == "Config") {
            indexmenu = index;
          }
        });
        localStorage.setItem(server.MODELMENU, indexmenu);
        this.$store.state.modelmenu = parseInt(
          localStorage.getItem(server.MODELMENU)
        );
      } else if (
        to.fullPath == "/company" ||
        to.fullPath == "/department" ||
        to.fullPath == "/position" ||
        to.fullPath == "/division" ||
        to.fullPath == "/section" ||
        to.fullPath == "/docruningconfig"
      ) {
        let indexmenu;
        this.menus.forEach((item, index) => {
          if (item.title == "Administrator") {
            indexmenu = index;
          }
        });
        localStorage.setItem(server.MODELMENU, indexmenu);
        this.$store.state.modelmenu = parseInt(
          localStorage.getItem(server.MODELMENU)
        );
      } else if (
        to.fullPath == "/itemgroup" ||
        to.fullPath == "/unit" ||
        to.fullPath == "/item-master" ||
        to.fullPath == "/receive-from-production-list"
      ) {
        let indexmenu;
        this.menus.forEach((item, index) => {
          if (item.title == "Inventory") {
            indexmenu = index;
          }
        });
        localStorage.setItem(server.MODELMENU, indexmenu);
        this.$store.state.modelmenu = parseInt(
          localStorage.getItem(server.MODELMENU)
        );
      } else if (
        to.fullPath == "/workcenter-group-list" ||
        to.fullPath == "/workcenter-list" ||
        to.fullPath == "/defect-cause" ||
        to.fullPath == "/shift" ||
        to.fullPath == "/machine" ||
        to.fullPath == "/downtime-cause-list" ||
        to.fullPath == "/kpi-master-list" ||
        to.fullPath == "/plc-mapping-machine" ||
        to.fullPath == "/holiday-list" ||
        to.fullPath == "/routing"
      ) {
        let indexmenu;
        this.menus.forEach((item, index) => {
          if (item.title == "Production") {
            indexmenu = index;
          }
        });
        localStorage.setItem(server.MODELMENU, indexmenu);
        this.$store.state.modelmenu = parseInt(
          localStorage.getItem(server.MODELMENU)
        );
      } else if (
        to.fullPath == "/production-order-list" ||
        to.fullPath == "/time-card" ||
        to.fullPath == "/delete-job" ||
        to.fullPath == "/job" ||
        to.fullPath == "/iot-mapping" 
      ) {
        let indexmenu;
        this.menus.forEach((item, index) => {
          if (item.title == "Production Order") {
            indexmenu = index;
          }
        });
        localStorage.setItem(server.MODELMENU, indexmenu);
        this.$store.state.modelmenu = parseInt(
          localStorage.getItem(server.MODELMENU)
        );
      } else if (
        to.fullPath == "/time-card-report" ||
        to.fullPath == "/report-on-inquiries-about-cloth-registration" ||
        to.fullPath == "/leader-time-card-report" ||
        to.fullPath == "/production-status-report" ||
        to.fullPath == "/re-cal-costing" ||
        to.fullPath == "/calculate-cost"
      ) {
        let indexmenu;
        this.menus.forEach((item, index) => {
          if (item.title == "Report") {
            indexmenu = index;
          }
        });
        localStorage.setItem(server.MODELMENU, indexmenu);
        this.$store.state.modelmenu = parseInt(
          localStorage.getItem(server.MODELMENU)
        );
      }

      this.selectedMenu = this.menus.findIndex(
        (menu) => menu.items.findIndex((item) => item.route == to.path) != -1
      );

      // alert(this.selectedMenu);
    },
  },
};
</script>

<style scoped>
.theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled):not(.v-list-item__icon) {
  color: #254e58 !important;
  /* font-weight: bold; */
}

.v-icon {
  color: #2a4bc1;
}

.v-list-item__icon {
  color: white;
}

.bg-active {
  background-color: #2a4bc1;
  color: white !important;
}

.tile {
  color: #254e58;
  cursor: pointer;
  margin: 5px;
  border-radius: 4px;
}

.tile:hover {
  color: white;
  background-color: #2a4bc1;
}

/* click submenu */
.tile:active {
  background: #808080;
}

.badgeapprover {
  margin-right: 96px;
}
</style>
