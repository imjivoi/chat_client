import {
  ChatSocketEvents,
  IChatState,
  ISocketResponseData,
  SocketStatusConnect,
} from "@/store/interfaces/chat";
import { IRootState } from "@/store/interfaces/root";
import chatAPI from "@/utils/api/chatAPI";
import { ActionTree } from "vuex";
import { ChatActionsTypes } from "./actions.types";
import { MutationTypes } from "./mutatios.types";

export const actions: ActionTree<IChatState, IRootState> & ChatActionsTypes = {
  GET_CHATS({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await chatAPI.getChats();
        commit(MutationTypes.SET_CHATS, data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async GET_MESSAGES({ commit }, payload) {
    try {
      const { data } = await chatAPI.getMessages(payload);
      commit(MutationTypes.SET_MESSAGES, { chat_id: payload, messages: data });
    } catch (error) {}
  },
};
