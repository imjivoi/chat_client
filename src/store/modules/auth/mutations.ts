import { IUserData } from "@/store/interfaces/user";
import { MutationTree } from "vuex";
import { AuthMutationsTypes } from "./mutations.types";

export const mutations: MutationTree<IUserData> & AuthMutationsTypes = {
  SET_AUTH(state, payload) {
    state = payload;
    state.isAuthorized = true;
  },
};
