import { IChatItem, IChatState } from "@/store/interfaces/chat";
import { IRootState } from "@/store/interfaces/root";
import { ActionContext } from "vuex";
import { ChatMutationsTypes } from "./mutatios.types";

export enum ActionTypes {
  GET_CHATS = "GET_CHATS",
}

type AugmentedActionContext = {
  commit<K extends keyof ChatMutationsTypes>(
    key: K,
    payload?: Parameters<ChatMutationsTypes[K]>[1]
  ): ReturnType<ChatMutationsTypes[K]>;
} & Omit<ActionContext<IChatState, IRootState>, "commit">;

export type ChatActionsTypes = {
  [ActionTypes.GET_CHATS]({
    commit,
  }: AugmentedActionContext): Promise<Array<IChatItem>>;
};
