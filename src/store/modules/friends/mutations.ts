import { IFriendsState } from "@/store/interfaces/friends-state";
import { MutationTree } from "vuex";
import { FriendsMutationsTypes } from "./mutations.types";

export const mutations: MutationTree<IFriendsState> & FriendsMutationsTypes = {
  SET_FRIENDS(state, payload) {
    state.friends = payload;
  },
  SET_REQUESTS(state, payload) {
    state.friendshipRequests = payload;
  },
};
