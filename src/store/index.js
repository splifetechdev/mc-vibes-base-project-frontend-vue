import Vue from "vue";
import Vuex from "vuex";
import api from "@/services/api";
import {
  server
} from "@/services/constants";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    username: "",
    fullname: "",
    role: "",
    global_dialog: false,
    global_dialog_push: false,
    navMenu: false,
    alertapprovalmenu: 0,
    work_order_edit_item:null,
  },
  getters: {
    isLogin(state) {
      return state.isLogged;
    },
    username(state) {
      return state.username;
    },
    fullname(state) {
      return state.fullname;
    },
  },
  mutations: {
    SET_LOGGED_IN(state) {
      state.isLogged = true;
    },
    SET_LOGGED_OUT(state) {
      state.isLogged = false;
    },
    SET_USERNAME(state, value) {
      state.username = value;
    },
    SET_FULLNAME(state, value) {
      state.fullname = value;
    },
  },
  actions: {
    async doLogin({
      commit,
      dispatch
    }, {
      username,
      password
    }) {
      let result = await api.login({
        username,
        password
      });
      let FULLNAME = localStorage.getItem(server.FULLNAME);

      if (result == true) {
        commit("SET_LOGGED_IN");
        commit("SET_USERNAME", username);
        commit("SET_FULLNAME", FULLNAME);
      } else {
        dispatch("doLogout", {});
      }
    },
    doLogout({
      commit
    }) {
      api.logoff();
      commit("SET_LOGGED_OUT");
      commit("SET_USERNAME", "");
      commit("SET_FULLNAME", "");
    },
    restoreLogin({
      commit
    }) {
      if (api.isLoggedIn() == true) {
        let username = localStorage.getItem(server.USERNAME);
        let FULLNAME = localStorage.getItem(server.FULLNAME);
        commit("SET_LOGGED_IN");
        commit("SET_USERNAME", username);
        commit("SET_FULLNAME", FULLNAME);
      }
    },
  },
  modules: {},
});