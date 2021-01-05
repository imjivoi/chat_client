import { IAuthState } from "@/store/interfaces/auth-state";

export const state: IAuthState = {
  userData: null,
  isLoading: true,
  isLogged: false,
  token: null,
};
