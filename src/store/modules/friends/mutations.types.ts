import { IFriendsState } from "@/store/interfaces/friends-state";
import { IUserData } from "@/store/interfaces/user";

export enum MutationTypes {
  SET_FRIENDS = "SET_FRIENDS",
}

export type FriendsMutationsTypes<S = IFriendsState> = {
  [MutationTypes.SET_FRIENDS](state: S, payload: IUserData[]): void;
};
