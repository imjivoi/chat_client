import authAPI from '@/services/api/userAPI';
import { defineStore } from 'pinia';
import { VueCookieNext } from 'vue-cookie-next';
import notificationService from '@/services/notificationService';
import router from '@/router';
import { IAuth } from './types/user';
import { state } from './state';
import { getDefaultState } from './default-state';
import { setAuthHeader } from '@/utils/axios';

export const useUserStore = defineStore({
  id: 'user',
  state: () => state,
  actions: {
    getAuth(payload: IAuth) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        authAPI
          .getToken(payload)
          .then(res => {
            VueCookieNext.setCookie('accessToken', res.data.accessToken);
            this.isLogged = true;
            setAuthHeader(res.data.accessToken);

            if (this.userData === null) this.getUserData();
            resolve(res.data);
          })
          .catch(error => {
            reject(error);
          });
        this.isLoading = false;
      });
    },
    getUserData() {
      return new Promise((resolve, reject) => {
        const token = VueCookieNext.getCookie('accessToken');
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
    logout() {
      router.push({ name: 'Welcome' });
      VueCookieNext.removeCookie('accessToken');
      this.$state = getDefaultState();
    },
    register(payload: IAuth) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        authAPI
          .register(payload)
          .then(({ data }) => {
            this.userData = data.user;
            this.isLogged = true;
            VueCookieNext.setCookie('accessToken', data.accessToken);
            router.push({ name: 'Home' });

            resolve(data);
          })
          .catch(error => reject(error));
        this.isLoading = false;
      });
    },
    async uploadAvatar(payload: FormData) {
      const { data } = await authAPI.uploadAvatar(payload);
      this.userData = data;
    },
  },
});
