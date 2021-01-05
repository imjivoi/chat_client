import { IChatState } from "@/store/interfaces/chat";
import { IRootState } from "@/store/interfaces/root";
import chatAPI from "@/utils/api/chatAPI";
import { ActionTree } from "vuex";
import { ChatActionsTypes } from "./actions.types";
import { MutationTypes } from "./mutatios.types";

export const actions: ActionTree<IChatState, IRootState> & ChatActionsTypes = {
  GET_CHATS({ commit, dispatch }) {
    return new Promise(async (resolve, reject) => {
      const token = await dispatch("GET_TOKEN");
      commit(MutationTypes.SET_LOADING, true);
      try {
        const { data } = await chatAPI.getChats(token);
        commit(MutationTypes.SET_CHATS, data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
      commit(MutationTypes.SET_LOADING, false);
    });
  },
};