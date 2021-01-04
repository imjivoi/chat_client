import { IAuthState } from "@/store/interfaces/auth-state";
import { VueCookieNext } from "vue-cookie-next";
import { MutationTree } from "vuex";
import { AuthMutationsTypes } from "./mutations.types";

export const mutations: MutationTree<IAuthState> & AuthMutationsTypes = {
  SET_LOADING(state, payload) {
    state.isLoading = payload;
  },
  SET_TOKEN(state, payload) {
    state.token = payload.access;
    VueCookieNext.setCookie("refresh_token", payload.refresh);
    VueCookieNext.setCookie("auth_token", payload.access);
  },
  SET_USER_DATA(state, payload) {
    state.userData = payload;
    state.isLogged = true;
  },
  CLEAR_STATE(state) {
    state.userData = null;
    state.isLogged = false;
    state.token = null;
    VueCookieNext.removeCookie("auth_token");
    VueCookieNext.removeCookie("refresh_token");
  },
};
