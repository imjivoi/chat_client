import axios from "axios";

export const HTTP = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || "http://127.0.0.1:8000"
});

export const setAuthHeader = (token: string) => {
  HTTP.defaults.headers.Authorization = `Bearer ${token}`;
};
