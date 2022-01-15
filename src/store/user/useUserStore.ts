import userAPI from '@/services/api/userAPI';
import { defineStore } from 'pinia';
import notificationService from '@/services/notificationService';
import router from '@/router';
import { IAuth } from './types/user';
import { state } from './state';
import { getDefaultState } from './default-state';
import { setAuthHeader } from '@/plugins/axios';
import { i18n } from '../../resource/i18n';

export const useUserStore = defineStore({
  id: 'user',
  state: () => state,
  actions: {
    getAuth(payload: IAuth) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        userAPI
          .getToken(payload)
          .then(res => {
            localStorage.setItem('accessToken', res.data.accessToken);
            this.isLogged = true;
            setAuthHeader(res.data.accessToken);

            if (this.userData === null) this.getUserData();
            resolve(res.data);
          })
          .catch(error => {
            if (error.response?.data?.statusCode === 400) {
              this.logout();
            }

            reject(error);
          });
        this.isLoading = false;
      });
    },
    getUserData() {
      return new Promise((resolve, reject) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          reject('Token is empty');
          return;
        }
        this.isLoading = true;
        return userAPI
          .getUser()
          .then(res => {
            this.userData = res.data;
          })
          .catch(error => {
            if ([400,401].includes(error.response?.data?.statusCode)) {
              this.logout();
            }

            reject(error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      });
    },
    logout() {
      router.push({ name: 'Welcome' });
      localStorage.removeItem('accessToken');
      this.$state = getDefaultState();
      notificationService.default('You are signed out');
    },
    register(payload: IAuth) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        userAPI.register(payload).then(({ data }) => {
          this.userData = data.user;
          this.isLogged = true;
          const token = data.accessToken;
          localStorage.setItem('accessToken', token);
          router.push({ name: 'Home' });
          setAuthHeader(token);
          resolve(data);
        });

        this.isLoading = false;
      });
    },
    async uploadAvatar(payload: FormData) {
      try {
        const { data } = await userAPI.uploadAvatar(payload);
        this.userData = data;
      } catch (error) {
        if (error.response?.data?.statusCode === 400) {
          this.logout();
        }
      }
    },
    async delete() {
      try {
        await userAPI.delete();
        notificationService.default(i18n.global.t('Account was deleted'));
        this.logout();
      } catch (error) {
        if (error.response?.data?.statusCode === 400) {
          this.logout();
        }
      }
    },
  },
});
