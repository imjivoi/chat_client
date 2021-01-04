import { IChatState } from "@/store/interfaces/chat";
import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";
import { ChatActionsTypes } from "./actions.types";
import { ChatGettersTypes } from "./getters.types";
import { ChatMutationsTypes } from "./mutatios.types";

export type ChatStoreModuleTypes<S = IChatState> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<
    K extends keyof ChatMutationsTypes,
    P extends Parameters<ChatMutationsTypes[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<ChatMutationsTypes[K]>;
} & {
  getters: {
    [K in keyof ChatGettersTypes]: ReturnType<ChatGettersTypes[K]>;
  };
} & {
  dispatch<K extends keyof ChatActionsTypes>(
    key: K,
    payload?: Parameters<ChatActionsTypes[K]>[1],
    options?: DispatchOptions
  ): ReturnType<ChatActionsTypes[K]>;
};
