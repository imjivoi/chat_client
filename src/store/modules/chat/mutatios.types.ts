import { IChatItem, IChatState } from "@/store/interfaces/chat";

export enum MutationTypes {
  SET_LOADING = "SET_LOADING",
  SET_CHATS = "SET_CHATS",
}

export type ChatMutationsTypes<S = IChatState> = {
  [MutationTypes.SET_LOADING](state: S, payload: boolean): void;
  [MutationTypes.SET_CHATS](state: S, payload: IChatItem[]): void;
};
