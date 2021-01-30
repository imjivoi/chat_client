import { IAuthState } from "@/store/interfaces/auth-state";
import { ITokensResponse } from "@/store/interfaces/tokens";
import { IUserData } from "@/store/interfaces/user";

export enum MutationTypes {
  SET_LOADING = "SET_LOADING",
  SET_TOKEN = "SET_TOKEN",
  SET_USER_DATA = "SET_USER_DATA",
  CLEAR_STATE = "CLEAR_STATE",
  SET_LOGGED = "SET_LOGGED",
}

export type AuthMutationsTypes<S = IAuthState> = {
  [MutationTypes.SET_LOADING](state: S, payload: boolean): void;
  [MutationTypes.SET_TOKEN](state: S, payload: ITokensResponse): void;
  [MutationTypes.SET_USER_DATA](state: S, payload: IUserData): void;
  [MutationTypes.CLEAR_STATE](state: S): void;
  [MutationTypes.SET_LOGGED](state: S, payload: boolean): void;
};
