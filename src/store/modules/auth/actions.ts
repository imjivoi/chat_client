import { IRootState } from "@/store/interfaces/root";
import { IUserData } from "@/store/interfaces/user";
import { ActionTree } from "vuex";
import { AuthActionsTypes } from "./actions.type";

export const actions: ActionTree<IUserData, IRootState> & AuthActionsTypes = {
  GET_AUTH({ commit }) {
    return new Promise(() => {});
  },
};
