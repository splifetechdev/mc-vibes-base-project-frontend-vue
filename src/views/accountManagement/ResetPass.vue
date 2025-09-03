<<template>
  <v-container fill-height>
    <v-row class="justify-center align-center pl-5">
      <v-card style="width:400px;">
        <!-- <v-img
          class="white--text align-end"
          src="@/assets/login_bg.jpg"
          height="200px"
        > -->
        <v-card-title primary-title style="color:#254e58">
          Change Password
        </v-card-title>
        <!-- </v-img> -->
        <v-card-text>
          <v-form @submit.prevent="submit">
            <!-- Password -->
            <v-text-field
              class="heightsize60"
              name="password"
              label="New Password"
              id="password"
              v-model="account.password"
              :append-icon="isShowPassword ? 'visibility' : 'visibility_off'"
              @click:append="isShowPassword = !isShowPassword"
              :type="isShowPassword ? 'text' : 'password'"
              outlined
              dense
            />

            <v-text-field
              class="heightsize40"
              name="password"
              label="Confirm New Password"
              id="password"
              v-model="account.confirm_password"
              :append-icon="isShowPassword2 ? 'visibility' : 'visibility_off'"
              @click:append="isShowPassword2 = !isShowPassword2"
              :type="isShowPassword2 ? 'text' : 'password'"
              outlined
              dense
            />

            <v-row class="px-3 pt-3 pb-3 mt-4">
              <v-btn block dark type="submit" color="#1F51FF">
                Reset Password
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

      <SuccessDialogPush
        :status="dialogAdd"
        :text_color="text_color"
        :title="title"
        :message="message"
        :link="link"
      />
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";
import { server } from "@/services/constants";
import SuccessDialog from "@/components/cards/SuccessDialog";
import SuccessDialogPush from "@/components/cards/SuccessDialogPush";

export default {
  mounted() {
    // if (api.isLoggedIn()) {
    //   this.$router.push("/dashboard");
    // }

    this.$hideLoader();
  },
  components: { SuccessDialog, SuccessDialogPush },
  data() {
    return {
      text_color: "text-h5 green--text text-center",
      title: "green",
      message: "green",
      link: "",
      dialogAdd: false,
      isShowPassword: false,
      isShowPassword2: false,
      account: {
        password: "",
        confirm_password: "",
      },
    };
  },
  methods: {
    async submit() {
      if (this.account.password == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please Input password",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.account.confirm_password == "") {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please Input Confirm Password",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.account.password != this.account.confirm_password) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Password and Confirm Password not match",
          "text-h5 red--text text-center"
        );
        return;
      }

      const res_reset = await api.resetPassword(
        localStorage.getItem(server.USER_ID),
        this.account
      );
      // alert(res_edit.status);
      if (res_reset.status == 200 || res_reset.status == 201) {
        this.$store.state.global_dialog_push = true;
        this.setupAlertDialogPush(
          true,
          "Success!!!",
          "Update data success",
          "text-h5 green--text text-center",
          "/dashboard"
        );
      } else {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Update data Failed",
          "text-h5 red--text text-center"
        );
      }
    },
    setupAlertDialogPush(status, title, message, text_color, link) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
      this.link = link;
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
>
