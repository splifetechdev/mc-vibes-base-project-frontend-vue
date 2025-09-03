<template>
  <v-dialog v-model="$store.state.global_dialog" max-width="290">
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
      <v-card-text>
        <v-spacer />
        <div class="text-center">
          <div>click anywhere to close...</div>
        </div>
        <v-spacer />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "SuccessDialog",
  props: ["status", "title", "message", "text_color"],
  beforeDestroy() {
    // console.log("SuccessDialog beforeDestroy");
    this.$store.commit("set_global_dialog", false);
    this.$store.state.global_dialog = false;
  },
};
</script>

<style></style>
