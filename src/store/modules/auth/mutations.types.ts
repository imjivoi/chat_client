import { IUserData } from "@/store/interfaces/user";

export enum MutationTypes {
  SET_AUTH = "SET_AUTH",
}

export type AuthMutationsTypes<S = IUserData> = {
  [MutationTypes.SET_AUTH](state: S, payload: IUserData): void;
};
