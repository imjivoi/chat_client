import { IAuthState } from "@/store/interfaces/auth-state";

export const state: IAuthState = {
  userData: null,
  isLoading: false,
  isLogged: false,
  token: null,
};
