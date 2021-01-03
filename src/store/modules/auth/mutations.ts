import { IAuthState } from "@/store/interfaces/auth-state";
import { IUserData } from "@/store/interfaces/user";
import { MutationTree } from "vuex";
import { AuthMutationsTypes } from "./mutations.types";

export const mutations: MutationTree<IAuthState> & AuthMutationsTypes = {
  SET_LOADING(state, payload) {
    state.isLoading = payload;
  },
  SET_TOKEN(state, payload) {
    state.token = payload;
  },
  SET_USER_DATA(state, payload) {
    state.userData = payload;
  },
};
