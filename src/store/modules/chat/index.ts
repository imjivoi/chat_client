import { IChatState } from "@/store/interfaces/chat";
import { IRootState } from "@/store/interfaces/root";
import { Module } from "vuex";

const chat: Module<IChatState, IRootState> = {};

export default chat;
