<template fluid>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Welcome {{ this.$store.getters["username"] }}
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import api from "@/services/api";
import { server } from "../services/constants";
import StockCard from "@/components/cards/StockCard";

export default {
  name: "Dashboard",
  data() {
    return {
      search: "",
      selectedProductId: "",
      confirmDeleteDlg: false,
      mDataArray: [],
      fullPage: true,
      headers: [
        {
          text: "Id",
          align: "left",
          sortable: false,
          value: "id",
        },
        { text: "Image", value: "image" },
        { text: "Name", value: "name" },
        { text: "Price", value: "price" },
        { text: "Stock", value: "stock" },
        { text: "Action", value: "action" },
      ],
    };
  },
  components: {
    StockCard,
  },
  async mounted() {
    // await api.checkVersion();
    const userId = localStorage.getItem(server.USER_ID);
    if (userId && api.isLoggedIn()) {
      this.$store.state.navMenu = true;
      // this.$router.push("/");
    } else {
      localStorage.clear();
      this.$store.state.isLogged = false;
      this.$router.push("/login");
    }
    localStorage.setItem(server.MODELMENU, 0);
    // console.log("Login mounted : " + api.isLoggedIn());
    // console.log("Login mounted : " + userId);
    // await this.loadProducts();
    // this.$showLoader();
    this.$hideLoader();
  },
  methods: {
    submit() {
      let loader = this.$loading.show({
        // Optional parameters
        color: "green",
        loader: "dots",
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
        width: 120,
        height: 120,
        backgroundColor: "#F1F4F7",
        opacity: 0.5,
        zIndex: 999,
        onCancel: this.onCancel,
      });
      // simulate AJAX
      setTimeout(() => {
        loader.hide();
      }, 2000);
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },
    editItem(item) {
      this.$router.push(`/stock-edit/${item.id}`);
    },
    deleteItem(item) {
      this.selectedProductId = item.id;
      this.confirmDeleteDlg = true;
    },
    async confirmDelete() {
      await api.deleteProduct(this.selectedProductId);
      this.confirmDeleteDlg = false;
      this.loadProducts();
    },
    async loadProducts() {
      let result = await api.getProducts();
      this.mDataArray = result.data;
    },
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
};
</script>

<style></style>
