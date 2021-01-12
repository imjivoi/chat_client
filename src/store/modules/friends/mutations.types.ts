import {
  IFriendshipReuqests,
  IFriendsState,
} from "@/store/interfaces/friends-state";
import { IUserData } from "@/store/interfaces/user";

export enum MutationTypes {
  SET_FRIENDS = "SET_FRIENDS",
  SET_REQUESTS = "SET_REQUESTS",
}

export type FriendsMutationsTypes<S = IFriendsState> = {
  [MutationTypes.SET_FRIENDS](state: S, payload: IUserData[]): void;
  [MutationTypes.SET_REQUESTS](state: S, payload: IFriendshipReuqests[]): void;
};
