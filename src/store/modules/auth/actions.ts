import { IAuthState } from "@/store/interfaces/auth-state";
import { IRootState } from "@/store/interfaces/root";
import authAPI from "@/utils/api/authAPI";
import { ActionTree } from "vuex";
import { AuthActionsTypes } from "./actions.type";
import { MutationTypes } from "./mutations.types";
import { VueCookieNext } from "vue-cookie-next";
import router from "@/router";
import notificationService from "@/services/notificationService";

export const actions: ActionTree<IAuthState, IRootState> & AuthActionsTypes = {
  GET_AUTH({ dispatch, commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        commit(MutationTypes.SET_LOADING, true);
        const res = await authAPI.getToken(payload);

        commit(MutationTypes.SET_TOKEN, res.data);
        resolve(res.data);
        dispatch("GET_USER_DATA");
      } catch (error) {
        notificationService.error(error.response.data.detail);
        reject(error);
      }
    });
  },
  GET_USER_DATA({ commit, dispatch }) {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await dispatch("CHECK_TOKEN");
        if (!token) return router.push("/auth/login");
        const res = await authAPI.getUser(token);

        commit(MutationTypes.SET_USER_DATA, res.data);
        router.push("/");
        resolve(res.data);
      } catch (error) {
        router.push("/auth/login");
        reject(error);
      }
      commit(MutationTypes.SET_LOADING, false);
    });
  },
  GET_TOKEN({ commit, state }): string {
    const token = state.token || VueCookieNext.getCookie("auth_token");
    if (state.token && !VueCookieNext.getCookie("auth_token"))
      commit(MutationTypes.SET_TOKEN, { access: token, refresh: "" });
    return token;
  },
  LOGOUT({ commit }) {
    commit(MutationTypes.CLEAR_STATE);
    router.push({ name: "Login" });
  },
};
