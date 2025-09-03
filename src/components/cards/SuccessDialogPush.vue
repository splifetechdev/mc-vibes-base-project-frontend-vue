<template>
  <v-dialog v-model="$store.state.global_dialog_push" max-width="290" @click:outside="closeDialogSendmail(link)">
    <v-card>
      <v-card-title :class="text_color">
        <v-spacer />
        <div class="text-center">
          <div>{{ title }}</div>
        </div>
        <v-spacer />
      </v-card-title>

      <v-card-text>
        <v-spacer />
        <div class="text-center">
          <div v-html="message"></div>
        </div>
        <v-spacer />
      </v-card-text>
      <!-- <v-card-text>
        <v-spacer />
        <div class="text-center">
          <div>click anywhere to close...</div>
        </div>
        <v-spacer />
      </v-card-text> -->

      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <v-btn color="blue darken-1" text @click="closeDeleteForm"
              >Cancel</v-btn
            > -->
        <v-btn color="blue darken-1" text @click="closeDialogSendmail(link)"
          >OK</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "SuccessDialog",
  props: ["status", "title", "message", "text_color", "link"],
  beforeDestroy() {
    // console.log("SuccessDialog beforeDestroy");
    // this.$store.commit("set_global_dialog", false);
    // this.$store.state.global_dialog = false;
  },
  methods: {
    closeDialogSendmail(tlink) {
      this.$store.commit("set_global_dialog", false);
      this.$store.state.global_dialog_push = false;
      if (tlink === "/reloadpage") {
        this.$router.go();
      }else if(tlink.split("/")[1] == "locationreloadroute"){
        location.href = `${location.origin}/${tlink.split("/")[2]}/${tlink.split("/")[3]}/${tlink.split("/")[4]}`
      }
      else {
        this.$router.push(`${tlink}`);
      }

      //"/advance-list"
    },
  },
};
</script>

<style></style>
