import { IRootState } from "@/store/interfaces/root";
import { IUserData } from "@/store/interfaces/user";
import { ActionContext } from "vuex";
import { AuthMutationsTypes } from "./mutations.types";

export enum ActionTypes {
  GET_AUTH = "GET_AUTH",
}

export type AugmentedActionContext = {
  commit<K extends keyof AuthMutationsTypes>(
    key: K,
    payload: Parameters<AuthMutationsTypes[K]>[1]
  ): ReturnType<AuthMutationsTypes[K]>;
} & Omit<ActionContext<IUserData, IRootState>, "commit">;

export type AuthActionsTypes = {
  [ActionTypes.GET_AUTH]({
    commit,
  }: AugmentedActionContext): Promise<IUserData>;
};
