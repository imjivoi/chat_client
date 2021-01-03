import { IRootState } from "@/store/interfaces/root";
import { IUserData } from "@/store/interfaces/user";
import { Module } from "vuex";
import { state } from "./state";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
const AuthModule: Module<IUserData, IRootState> = {
  state,
  actions,
  mutations,
  getters,
};

export default AuthModule;
