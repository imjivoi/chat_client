import router from "@/router";
import { useAuthStore } from "@/store/auth/useAuthStore";
import axios from "axios";
import { VueCookieNext } from "vue-cookie-next";

export const HTTP = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || "http://127.0.0.1:8000",
});

HTTP.interceptors.request.use(function(config) {
  const token = VueCookieNext.getCookie("accessToken");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

HTTP.interceptors.response.use(undefined, function(err) {
  return new Promise(function(resolve, reject) {
    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      const auth = useAuthStore();
      auth.LOGOUT();
      router.push("/auth/login");
    }
    throw err;
  });
});
