import { IAuthState } from "@/store/interfaces/auth-state";
import { IUserData } from "@/store/interfaces/user";

export enum MutationTypes {
  SET_LOADING = "SET_LOADING",
  SET_TOKEN = "SET_TOKEN",
  SET_USER_DATA = "SET_USER_DATA",
}

export type AuthMutationsTypes<S = IAuthState> = {
  [MutationTypes.SET_LOADING](state: S, payload: boolean): void;
  [MutationTypes.SET_TOKEN](state: S, payload: string): void;
  [MutationTypes.SET_USER_DATA](state: S, paylaod: IUserData): void;
};
