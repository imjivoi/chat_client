import { IFriendsState } from "@/store/interfaces/friends-state";
import { IRootState } from "@/store/interfaces/root";
import { GetterTree } from "vuex";
import { FriendsGettersTypes } from "./getters.types";

export const getters: GetterTree<IFriendsState, IRootState> &
  FriendsGettersTypes = {
  friends: (state) => state.friends,
};
