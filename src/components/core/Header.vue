<template>
  <div>
    <!--  <v-app-bar app clipped-left color="#88BDBC" dense class="colortextheader"> -->
    <v-app-bar app color="#ffffff" dense class="colortextheader" height="50px">
      <v-app-bar-nav-icon
        color="#1F51FF"
        @click="$store.state.navMenu = !$store.state.navMenu"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="colortextheader"
        >{{ title }} V{{ version }} {{ company[0].name_th || "" }}</v-toolbar-title
      >

      <v-spacer></v-spacer>

      <template>
        <v-row justify="end">
          <v-menu bottom min-width="200px" rounded offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon x-large v-on="on">
                <v-avatar class="colortextheader">
                  <v-icon class="colortextheader" dark>
                    mdi-account-circle
                  </v-icon>
                  <v-icon class="colortextheader" dark small left>
                    mdi mdi-chevron-down
                  </v-icon>
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-list-item-content class="justify-center">
                <div class="mx-auto text-center">
                  <v-avatar color="#1F51FF">
                    <span class="white--text text-h5">{{ user.initials }}</span>
                  </v-avatar>
                  <h4 class="mt-3">
                    {{ $store.getters["username"] | capitalize }}
                  </h4>

                  <v-divider class="mt-3"></v-divider>
                  <!-- <v-btn depressed text block>
                    <v-icon small> mdi-pencil</v-icon>
                    Edit Account
                  </v-btn>
                  <v-divider></v-divider> -->
                  <v-btn depressed text block @click="resetPassword">
                    <v-icon small>mdi-account-settings-outline</v-icon>
                    reset password
                  </v-btn>
                  <v-divider></v-divider>
                  <v-btn depressed text block @click="onClickLogOff">
                    <v-icon small>mdi-export</v-icon>
                    logout
                  </v-btn>
                  <v-divider></v-divider>
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
        </v-row>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import api from "@/services/api";
import { server } from "@/services/constants";

export default {
  name: "Header",
  data() {
    return {
      company: [],
      user: {
        initials: this.$store.getters["username"].split(" ")[0].substring(0, 1)
          ? this.$store.getters["username"].split(" ")[0].substring(0, 1)
          : "-" + this.$store.getters["username"].split(" ")[1].substring(0, 1)
          ? this.$store.getters["username"].split(" ")[1].substring(0, 1)
          : "-",
      },
    };
  },

  computed: {
    version() {
      return process.env.VUE_APP_VERSION;
    },
    title() {
      return process.env.VUE_APP_TITLE;
    },
  },
   async mounted() {
   await this.loadCompanyMaster();
  },
  methods: {
    onClickLogOff() {
      this.$store.state.navMenu = false;
      this.$store.dispatch("doLogout");
    },
    resetPassword() {
      // alert("Reset Password");
      this.$router.push("/reset-password");
    },
     async loadCompanyMaster() {
      const result = await api.getCompanyMaster(localStorage.getItem(server.COMPANYID));
      this.company = result.data;
      console.log(this.company)
    },
  },
};
</script>

<style scoped>
.colortextheader {
  color: #1F51FF;
}
/* #254E58 */
</style>
