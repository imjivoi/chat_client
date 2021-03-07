import authAPI from "@/utils/api/authAPI";
import { defineStore } from "pinia";
import { state } from "./state";
import { IAuth } from "./types/user";
import { VueCookieNext } from "vue-cookie-next";
import notificationService from "@/services/notificationService";
import router from "@/router";
import { getDefaultState } from "./default-state";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => state,
  actions: {
    GET_AUTH(payload: IAuth) {
      return new Promise(async (resolve, reject) => {
        try {
          this.isLoading = true;
          const res = await authAPI.getToken(payload);
          VueCookieNext.setCookie("accessToken", res.data.accessToken);
          this.isLogged = true;
          if (this.userData === null) this.GET_USER_DATA();
          resolve(res.data);
        } catch (error) {
          notificationService.error(error.response.data.detail);
          reject(error);
        }
      });
    },
    GET_USER_DATA() {
      return new Promise(async (resolve, reject) => {
        try {
          const token = VueCookieNext.getCookie("accessToken");
          if (!token) {
            reject(token);
            return router.push("/auth/login");
          }
          this.isLoading = true;
          const res = await authAPI.getUser();
          this.userData = res.data;
          resolve(res.data);
        } catch (error) {
          router.push("/auth/login");
          reject(error);
        }
        this.isLoading = false;
      });
    },
    LOGOUT() {
      this.$state = getDefaultState();
      router.push({ name: "Login" });
    },
    REGISTER(payload: IAuth) {
      return new Promise(async (resolve, reject) => {
        this.isLoading = true;
        try {
          const { data } = await authAPI.register(payload);
          this.userData = data;
          await this.GET_AUTH(payload);
          router.push("/");

          resolve(data);
        } catch (error) {
          reject(error);
        }
        this.isLoading = false;
      });
    },
  },
});
