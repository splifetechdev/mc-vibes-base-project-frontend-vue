import axios from "axios";
import {
  server,
  apiUrl,
  NOT_CONNECT_NETWORK,
  NETWORK_CONNECTION_MESSAGE,
} from "@/services/constants";
import router from "@/router";
import api from "@/services/api";

const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

axios.interceptors.request.use(async (config) => {
  if (!isAbsoluteURLRegex.test(config.url)) {
    const userToken = localStorage.getItem(server.TOKEN_KEY);
    // console.log("httpClient:" + userToken);
    if (userToken) {
      config.headers = {
        "x-access-token": userToken,
        authorization: `Bearer ${userToken}`,
      };
    }
    config.url = apiUrl + "/" + config.url;
    console.log("httpClient:" + config.url);
    // console.log("httpClient:" + JSON.stringify(config.headers));
  }
  config.timeout = 30000; // 30 Second
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      api.logoff();
      router.push("/login");
    }
    if (response.status === 400) {
      return response;
    }
    // console.log(JSON.stringify(error, undefined, 2));
    router.push("/dashboard");
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    } else if (!error.response) {
      return Promise.reject({
        code: NOT_CONNECT_NETWORK,
        message: NETWORK_CONNECTION_MESSAGE,
      });
    }
    return Promise.reject(error);
  }
);

export default axios;
