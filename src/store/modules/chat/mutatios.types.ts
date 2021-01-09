import {
  IChatItem,
  IChatState,
  SocketStatusConnect,
} from "@/store/interfaces/chat";
import { IMessage } from "@/store/interfaces/message";

export enum MutationTypes {
  SET_CHATS = "SET_CHATS",
  SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT",
  SET_DELETE_CHAT = "SET_DELETE_CHAT",
  SET_NEW_MESSAGE = "SET_NEW_MESSAGE",
  SET_DELETE_MESSAGE = "SET_DELETE_MESSAGE",
  SET_DELETED_USER = "SET_DELETED_USER",
  SET_READ = "SET_READ",
  SET_TYPING = "SET_TYPING",
  SET_MESSAGES = "SET_MESSAGES",
}

export type ChatMutationsTypes<S = IChatState> = {
  [MutationTypes.SET_CHATS](state: S, payload: IChatItem[]): void;
  [MutationTypes.SET_ACTIVE_CHAT](state: S, payload: string): void;
  [MutationTypes.SET_DELETE_CHAT](state: S, payload: string): void;
  [MutationTypes.SET_NEW_MESSAGE](state: S, payload: IMessage): void;
  [MutationTypes.SET_DELETE_MESSAGE](state: S, payload: any): void;
  [MutationTypes.SET_DELETED_USER](state: S, payload: any): void;
  [MutationTypes.SET_READ](state: S, payload: string): void;
  [MutationTypes.SET_TYPING](state: S, payload: string): void;
  [MutationTypes.SET_MESSAGES](state: S, payload: any): void;
};
