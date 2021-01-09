import { IFriendsState } from "@/store/interfaces/friends-state";
import { IRootState } from "@/store/interfaces/root";
import { IUserData } from "@/store/interfaces/user";
import { ActionContext } from "vuex";
import { FriendsMutationsTypes } from "./mutations.types";

export enum ActionTypes {
  GET_FRIENDS = "GET_FRIENDS",
}

type AugmentedActionContext = {
  commit<K extends keyof FriendsMutationsTypes>(
    key: K,
    payload?: Parameters<FriendsMutationsTypes[K]>[1]
  ): ReturnType<FriendsMutationsTypes[K]>;
} & Omit<ActionContext<IFriendsState, IRootState>, "commit">;

export type FriendsActionsTypes = {
  [ActionTypes.GET_FRIENDS]({
    commit,
  }: AugmentedActionContext): Promise<IUserData[]>;
};
