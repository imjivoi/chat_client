import { IChatState } from "@/store/interfaces/chat";
import { IRootState } from "@/store/interfaces/root";
import { Module } from "vuex";
import { state } from "./state";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { getters } from "./getters";

const chat: Module<IChatState, IRootState> = {
  state,
  actions,
  mutations,
  getters,
};

export default chat;
