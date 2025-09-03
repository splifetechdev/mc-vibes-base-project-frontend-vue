import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vue2Filters from "vue2-filters";
import { imageUrl } from "@/services/constants";
import Fragment from "vue-fragment";

// import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// Import Bootstrap and BootstrapVue CSS files (order is important)
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";

import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

// import {
//   Datetime
// } from "vue-datetime";
// import "vue-datetime/dist/vue-datetime.css";
import VueSignature from "vue-signature-pad";
import { Settings } from "luxon";
Settings.defaultLocale = navigator.language;

import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

// Vue.use(Datetime);
// Vue.component("datetime", Datetime);
Vue.use(Fragment.Plugin);
Vue.use(VueAxios, axios);
Vue.use(Vue2Filters);
Vue.use(VueSignature);
Vue.use(VueLoading);
// Make BootstrapVue available throughout your project
// Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin);

Vue.filter("imageUrl", function(image) {
  return `${imageUrl}/${image}?timestamp=${Date.now()}`;
});
