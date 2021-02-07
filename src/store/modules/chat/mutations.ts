import { IChatState } from "@/store/interfaces/chat";
import { MutationTree } from "vuex";
import { state } from "../auth/state";
import { ChatMutationsTypes } from "./mutatios.types";

export const mutations: MutationTree<IChatState> & ChatMutationsTypes = {
  SET_CHATS(state, payload) {
    state.chats = payload;
  },
  SET_ACTIVE_CHAT(state, payload) {},
  SET_DELETED_USER(state, payload) {},
  SET_DELETE_CHAT(state, payload) {},
  SET_DELETE_MESSAGE(state, payload) {},
  SET_MESSAGES(state, payload) {
    const chat = state.chats.list.filter((i) => i._id === payload.chat_id);
    chat[0].all_messages.list.push(...payload.messages);
  },
  SET_NEW_MESSAGE(state, payload) {
    const chat = state.chats.list.find((i) => i._id === payload.chat);
    if (chat) {
      chat.all_messages.list.push(payload);
      chat.last_message = payload;
      chat.total_messages++;
    }
  },
  SET_ONE_NEW_CHAT(state, payload) {},
  SET_READ(state, payload) {
    const chat = state.chats.list.find((i) => i._id === payload.chat_id);
    chat?.all_messages.list.forEach((i) => {
      if (i.sender?._id !== payload.user_id) {
        i.is_readed = true;
      }
    });
  },
  SET_TYPING(state, payload) {
    const index = state.chats.list.findIndex((i) => i._id === payload.chat_id);

    state.chats.list[index] = { ...state.chats.list[index], typing: payload };
  },
};
