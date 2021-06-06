import axios from 'axios';
import appConfig from '@/app.config';
import ErrorService from '@/services/errorService';

export const HTTP = axios.create({
  baseURL: appConfig.apiUrl as string,
});

export const setAuthHeader = (token: string) => {
  HTTP.defaults.headers.Authorization = `Bearer ${token}`;
};

HTTP.interceptors.response.use(
  response => response,
  error => {
    ErrorService.requestError(error);
    throw error;
  },
);
