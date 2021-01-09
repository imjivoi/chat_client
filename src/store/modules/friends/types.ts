import { IFriendsState } from "@/store/interfaces/friends-state";
import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";
import { FriendsActionsTypes } from "./actions.types";
import { FriendsGettersTypes } from "./getters.types";
import { FriendsMutationsTypes } from "./mutations.types";

export type FriendsStoreModuleTypes<S = IFriendsState> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<
    K extends keyof FriendsMutationsTypes,
    P extends Parameters<FriendsMutationsTypes[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<FriendsMutationsTypes[K]>;
} & {
  getters: {
    [K in keyof FriendsGettersTypes]: ReturnType<FriendsGettersTypes[K]>;
  };
} & {
  dispatch<K extends keyof FriendsActionsTypes>(
    key: K,
    payload?: Parameters<FriendsActionsTypes[K]>[1],
    options?: DispatchOptions
  ): ReturnType<FriendsActionsTypes[K]>;
};
