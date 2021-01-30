import { IAuthState } from "@/store/interfaces/auth-state";
import { VueCookieNext } from "vue-cookie-next";
import { MutationTree } from "vuex";
import { getDefaultState } from "./default-state";
import { AuthMutationsTypes } from "./mutations.types";

export const mutations: MutationTree<IAuthState> & AuthMutationsTypes = {
  SET_LOADING(state, payload) {
    state.isLoading = payload;
  },
  SET_TOKEN(state, payload) {
    VueCookieNext.setCookie("accessToken", payload.accessToken);
  },
  SET_USER_DATA(state, payload) {
    state.userData = payload;
  },
  CLEAR_STATE(state) {
    state = getDefaultState();
    VueCookieNext.removeCookie("accessToken");
  },
  SET_LOGGED(state, payload) {
    state.isLogged = payload;
  },
};
