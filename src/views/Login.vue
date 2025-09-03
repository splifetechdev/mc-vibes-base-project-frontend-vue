<template>
  <v-container fill-height>
    <v-row class="justify-center align-center pl-5">
      <v-card style="width:400px;">
        <!-- <v-img
          class="white--text align-end"
          src="@/assets/login_bg.jpg"
          height="200px"
        > -->
        <v-card-title primary-title style="color:#254e58">
          Login
        </v-card-title>
        <!-- </v-img> -->
        <v-card-text>
          <v-form @submit.prevent="submit">
            <!-- Username -->
            <v-text-field name="username" label="Username" id="username" v-model="account.username" outlined dense />

            <!-- Password -->
            <v-text-field class="heightsize40" name="password" label="Password" id="password" v-model="account.password"
              :append-icon="isShowPassword ? 'visibility' : 'visibility_off'"
              @click:append="isShowPassword = !isShowPassword" :type="isShowPassword ? 'text' : 'password'" outlined
              dense />

            <v-row>
              <v-btn style="color:#254e58;margin-top:18px;" text @click.prevent="forgotPassword()">Forgot Password
                ?</v-btn>
            </v-row>

            <v-row class="px-3 pt-3 pb-3">
              <v-btn block dark type="submit" color="#1F51FF"> Login </v-btn>
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
