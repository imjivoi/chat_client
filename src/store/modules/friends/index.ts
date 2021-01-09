import { IFriendsState } from "@/store/interfaces/friends-state";
import { IRootState } from "@/store/interfaces/root";
import { Module } from "vuex";
import { state } from "./state";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { getters } from "./getters";

const friends: Module<IFriendsState, IRootState> = {
  state,
  actions,
  mutations,
  getters,
};

export default friends;
