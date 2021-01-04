import { IAuthState } from "@/store/interfaces/auth-state";
import { IRootState } from "@/store/interfaces/root";
import { ITokensResponse } from "@/store/interfaces/tokens";
import { IAuth, IUserData } from "@/store/interfaces/user";
import { ActionContext } from "vuex";
import { AuthMutationsTypes } from "./mutations.types";

export enum ActionTypes {
  CHECK_TOKEN = "CHECK_TOKEN",
  GET_USER_DATA = "GET_USER_DATA",
  GET_AUTH = "GET_AUTH",
}

export type AugmentedActionContext = {
  commit<K extends keyof AuthMutationsTypes>(
    key: K,
    payload: Parameters<AuthMutationsTypes[K]>[1]
  ): ReturnType<AuthMutationsTypes[K]>;
} & Omit<ActionContext<IAuthState, IRootState>, "commit">;

export type AuthActionsTypes = {
  [ActionTypes.GET_AUTH](
    { dispatch, commit }: AugmentedActionContext,
    payload: IAuth
  ): Promise<ITokensResponse>;
  [ActionTypes.GET_USER_DATA]({
    commit,
  }: AugmentedActionContext): Promise<IUserData>;
  [ActionTypes.CHECK_TOKEN]({ commit }: AugmentedActionContext): string;
};
