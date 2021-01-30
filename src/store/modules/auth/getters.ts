import { IAuthState } from "@/store/interfaces/auth-state";
import { IRootState } from "@/store/interfaces/root";
import { GetterTree } from "vuex";
import { AuthGettersTypes } from "./getters.types";

export const getters: GetterTree<IAuthState, IRootState> & AuthGettersTypes = {
  isLogged: (state) => state.isLogged,
  isLoadingAuth: (state) => state.isLoading,
  userData: (state) => state.userData,
};
