import axios from "axios";
import { VueCookieNext } from "vue-cookie-next";

export const HTTP = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || "http://127.0.0.1:8000",
});

HTTP.interceptors.request.use(function(config) {
  const token = VueCookieNext.getCookie("auth_token");
  config.headers.Authorization = token ? `JWT ${token}` : "";
  return config;
});
