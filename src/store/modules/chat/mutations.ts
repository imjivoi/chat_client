import { IChatState } from "@/store/interfaces/chat";
import { MutationTree } from "vuex";
import { state } from "../auth/state";
import { ChatMutationsTypes } from "./mutatios.types";

export const mutations: MutationTree<IChatState> & ChatMutationsTypes = {
  SET_CHATS(state, payload) {
    state.chats = [...state.chats, ...payload];
  },
  SET_ACTIVE_CHAT(state, payload) {},
  SET_DELETED_USER(state, payload) {},
  SET_DELETE_CHAT(state, payload) {},
  SET_DELETE_MESSAGE(state, payload) {},
  SET_MESSAGES(state, payload) {
    const chat = state.chats.filter((i) => i.id === payload.chat_id);
    chat[0].messages.push(...payload.messages);
  },
  SET_NEW_MESSAGE(state, payload) {
    const chat = state.chats.filter((i) => i.id === payload.chat);
    chat[0].messages.push(payload);
    chat[0].last_message = payload;
  },
  SET_ONE_NEW_CHAT(state, payload) {},
  SET_READ(state, payload) {},
  SET_TYPING(state, payload) {},
};
