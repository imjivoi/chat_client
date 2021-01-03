import { IAuthState } from "@/store/interfaces/auth-state";
import { IUserData } from "@/store/interfaces/user";
import { Module } from "vuex";

export const state: IAuthState = {
  userData: null,
  isLoading: false,
  isLogged: false,
  token: null,
};
