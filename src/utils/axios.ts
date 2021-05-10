import axios from "axios";
import appConfig from '@/app.config'

export const HTTP = axios.create({
  baseURL: appConfig.apiUrl
});

export const setAuthHeader = (token: string) => {
  HTTP.defaults.headers.Authorization = `Bearer ${token}`;
};
