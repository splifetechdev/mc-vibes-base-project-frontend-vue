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
          Forgot Password
        </v-card-title>
        <!-- </v-img> -->
        <v-card-text>
          <v-form @submit.prevent="submit">
            <!-- Username -->
            <v-text-field
              class="heightsize40"
              name="email"
              label="Email"
              id="email"
              v-model="account.email"
              outlined
              dense
            />

            <v-row class="px-3 pt-3">
              <v-btn block dark type="submit" color="#254e58" style="margin-top:16px;">
                Send Link
              </v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>

      <SuccessDialog
        :status="dialogAdd"
        :text_color="text_color"
        :title="title"
        :message="message"
      />
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";
import { server } from "@/services/constants";
import SuccessDialog from "@/components/cards/SuccessDialog";

export default {
  mounted() {
    if (api.isLoggedIn()) {
      this.$router.push("/dashboard");
    }

    this.$hideLoader();
  },
  components: { SuccessDialog },
  data() {
    return {
      text_color: "text-h5 green--text text-center",
      title: "green",
      message: "green",
      link: "",
      dialogAdd: false,
      isShowPassword: false,
      account: {
        email: "",
      },
    };
  },
  methods: {
    async submit() {
      if (this.account.email == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please Input Email",
          "text-h5 red--text text-center"
        );
        return;
      }

      const res_reset = await api.getUserByEmail(this.account.email);
      // alert(res_edit.status);
      // console.log("res_reset", JSON.stringify(res_reset.data));
      // alert(res_reset.data.length);
      // if (res_reset.data.length > 0) {
      //   alert("Please check your email");
      // } else {
      //   alert("No data");
      // }
      if (res_reset.data.length > 0) {
        // this.$store.state.global_dialog_push = true;
        // this.setupAlertDialog(
        //   true,
        //   "Success!!!",
        //   "Update data success",
        //   "text-h5 green--text text-center"
        // );
        //Send Mail
        this.$showLoader();
        var payload = {
          email: this.account.email,
          id: res_reset.data[0].id,
          subject: "Reset Password",
          message: "Please click link below to reset password",
          link: "",
        };
        const res_sendmail = await api.sendMailResetPassword(payload);
        this.$hideLoader();
        // console.log("res_sendmail", JSON.stringify(res_sendmail.data));
        // console.log("res_sendmail", res_sendmail.data.link);
        if (res_sendmail.data.link == true) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Success!!!",
            res_sendmail.data.message,
            "text-h5 green--text text-center"
          );
        } else {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            res_sendmail.data.message,
            "text-h5 red--text text-center"
          );
        }
      } else {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Email not found",
          "text-h5 red--text text-center"
        );
      }
    },
    setupAlertDialog(status, title, message, text_color) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
    },
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
