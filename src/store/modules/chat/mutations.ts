import { IChatState } from "@/store/interfaces/chat";
import { MutationTree } from "vuex";
import { ChatMutationsTypes } from "./mutatios.types";

export const mutations: MutationTree<IChatState> & ChatMutationsTypes = {
  SET_LOADING(state, payload) {
    state.isLoading = payload;
  },
  SET_CHATS(state, payload) {
    state.chats = payload;
  },
};
