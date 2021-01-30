import router from "@/router";
import { IChatItem, IChatState } from "@/store/interfaces/chat";
import { IRootState } from "@/store/interfaces/root";
import chatAPI from "@/utils/api/chatAPI";
import { AxiosResponse } from "axios";
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
  CREATE_CHAT({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await chatAPI.createChat();
        if (res.status === 226) {
          router.push(`/chats/${res.data.id}`);
        } else {
          commit(MutationTypes.SET_CHATS, [res.data]);
          router.push(`/chats/${res.data.id}`);
        }
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    });
  },
};
