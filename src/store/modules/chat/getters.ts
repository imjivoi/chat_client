import { IChatItem, IChatState } from "@/store/interfaces/chat";
import { IRootState } from "@/store/interfaces/root";
import { GetterTree } from "vuex";
import { ChatGettersTypes } from "./getters.types";

export const getters: GetterTree<IChatState, IRootState> & ChatGettersTypes = {
  chats: (state) => state.chats.list,
  activeChat: (state) => (payload): IChatItem | null =>
    state.chats.list.filter((i) => i._id === payload)[0],
};
