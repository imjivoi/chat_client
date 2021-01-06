import axios from "axios";
import { VueCookieNext } from "vue-cookie-next";

export const HTTP = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || "http://127.0.0.1:8000",
  headers: {
    Authorization: `JWT ${VueCookieNext.getCookie("auth_token")}`,
  },
});
