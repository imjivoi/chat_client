import { IFriendsState } from "@/store/interfaces/friends-state";
import { IRootState } from "@/store/interfaces/root";
import friendsAPI from "@/utils/api/friendsAPI";
import { ActionTree } from "vuex";
import { FriendsActionsTypes } from "./actions.types";
import { MutationTypes } from "./mutations.types";

export const actions: ActionTree<IFriendsState, IRootState> &
  FriendsActionsTypes = {
  GET_FRIENDS({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await friendsAPI.get();
        commit(MutationTypes.SET_FRIENDS, data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },
};
