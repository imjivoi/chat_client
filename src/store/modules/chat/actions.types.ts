import { IChatItem, IChatState } from "@/store/interfaces/chat";
import { IRootState } from "@/store/interfaces/root";
import { ICreateChatData } from "@/utils/api/chatAPI";
import { ActionContext } from "vuex";
import { ChatMutationsTypes } from "./mutatios.types";

export enum ActionTypes {
  GET_CHATS = "GET_CHATS",
  GET_MESSAGES = "GET_MESSAGES",
  CREATE_CHAT = "CREATE_CHAT",
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
  [ActionTypes.GET_MESSAGES](
    { commit }: AugmentedActionContext,
    payload: string
  ): void;
  [ActionTypes.CREATE_CHAT](
    { commit }: AugmentedActionContext,
    payload: ICreateChatData
  ): Promise<IChatItem>;
};
