<template>
  <v-container fill-height>
    <v-row class="justify-center align-center">
      <v-card style="width:400px;">
        <!-- <v-img
          class="white--text align-end"
          src="@/assets/login_bg.jpg"
          height="200px"
        > -->
         <!-- <v-row class="justify-center align-center">
         <v-col cols="12" md="12" class="justify-center align-center"> -->
             <v-card-title class="justify-center align-center">
        <v-img
            src="/MVibes_Logo.jpg"
            color="#ffffff"
            alt=""
            height="150px"
            width="150px"
            contain
          />
          </v-card-title>
           <!-- </v-col>
          </v-row> -->
        <v-card-title primary-title style="color:#1F51FF;font-size:22px;" class="justify-center align-center mt-n8">
          M/C VIBES TRANSMISSION
        </v-card-title>
          <v-card-title primary-title style="color:#000000;font-size: 14px;" class="justify-center align-center mt-n8">
         Smart Monitoring for Machine Vibrations
        </v-card-title>
        <!-- </v-img> -->
        <v-card-text>
          <v-form @submit.prevent="submit">
           <h3 class="black--text pb-1">Username</h3> 
            <v-text-field name="username" label="Enter your username" id="username" v-model="account.username" outlined dense />

               <h3 class="black--text pb-1">Password</h3> 
            <v-text-field class="heightsize40" name="password" label="Enter your password" id="password" v-model="account.password"
              :append-icon="isShowPassword ? 'visibility' : 'visibility_off'"
              @click:append="isShowPassword = !isShowPassword" :type="isShowPassword ? 'text' : 'password'" outlined
              dense />
              
            <v-row class="px-3 pt-10">
              <v-btn block dark type="submit" color="#1F51FF"> Login </v-btn>
            </v-row>

             <v-row class="mt-n2">
              <!-- #254e58 -->
               <v-col cols="12" md="6" class="justify-center align-center">
              <v-btn style="color:#1F51FF;margin-top:18px;font-size: 12px;" text @click.prevent="forgotPassword()">Forgot Password
                ?</v-btn>
                </v-col>
                 <v-col cols="12" md="6" class="justify-center align-center">
                  <!-- @click.prevent="forgotPassword()" -->
                     <v-btn style="color:#1F51FF;margin-top:18px;font-size: 12px;" text >Contact Support
                ?</v-btn>
                 </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  mounted() {
    if (api.isLoggedIn()) {
      this.$router.push("/dashboard");
    }

    this.$hideLoader();
  },
  data() {
    return {
      isShowPassword: false,
      account: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    submit() {
      this.$showLoader();
      // this.$router.push("/dashboard");
      this.$store
        .dispatch({
          type: "doLogin",
          username: this.account.username,
          password: this.account.password,
        })
        .then(() => {
          this.$router.push("/dashboard");
        });
    },
    forgotPassword() {
      // alert("Forgot Password");
      this.$router.push("/forgot-password");
    },

  },
  beforeCreate() {
    this.$store.state.isLogged = false;
    this.$store.state.navMenu = false;
  },
};
</script>

<style>
.heightsize60 {
  height: 60px;
}

.heightsize40 {
  height: 40px;
}
</style>
