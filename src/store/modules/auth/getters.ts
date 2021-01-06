import { IAuthState } from "@/store/interfaces/auth-state";
import { IRootState } from "@/store/interfaces/root";
import { IUserData } from "@/store/interfaces/user";
import { GetterTree } from "vuex";
import { AuthGettersTypes } from "./getters.types";

export const getters: GetterTree<IAuthState, IRootState> & AuthGettersTypes = {
  isLogged: (state) => state.isLogged,
  isLoading: (state) => state.isLoading,
  userId: (state) => state.userData?.id,
};
