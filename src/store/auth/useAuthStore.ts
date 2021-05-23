import authAPI from "@/services/api/authAPI";
import {defineStore} from "pinia";
import {VueCookieNext} from "vue-cookie-next";
import notificationService from "@/services/notificationService";
import router from "@/router";
import {IAuth} from "./types/user";
import {state} from "./state";
import {getDefaultState} from "./default-state";
import {setAuthHeader} from "@/utils/axios";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => state,
  actions: {
    GET_AUTH(payload: IAuth) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        authAPI
          .getToken(payload)
          .then(res => {
            VueCookieNext.setCookie("accessToken", res.data.accessToken);
            this.isLogged = true;
            setAuthHeader(res.data.accessToken);

            if (this.userData === null) this.GET_USER_DATA();
            resolve(res.data);
          })
          .catch(error => {
            notificationService.error(error.response.data.detail);
            reject(error);
          });
        this.isLoading = false;
      });
    },
    GET_USER_DATA() {
      return new Promise((resolve, reject) => {
        const token = VueCookieNext.getCookie("accessToken");
        if (!token) {
          reject('Token is empty');
          return;
        }
        this.isLoading = true;
        return authAPI
          .getUser()
          .then(res => {
            this.userData = res.data;
          })
          .catch(error => reject(error))
          .finally(() => {
            this.isLoading = false;
          });
      });
    },
    LOGOUT() {
      router.push({name: "Welcome"});
      VueCookieNext.removeCookie('accessToken')
      this.$state = getDefaultState();
    },
    REGISTER(payload: IAuth) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        authAPI
          .register(payload)
          .then(({data}) => {
            this.userData = data.user;
            this.isLogged = true;
            VueCookieNext.setCookie("accessToken", data.accessToken);
            router.push({name: "Home"})

            resolve(data);
          })
          .catch(error => reject(error));
        this.isLoading = false;
      });
    }
  }
});
