import { IAuthState } from "@/store/auth/types/auth-state";

export const state: IAuthState = {
  userData: null,
  isLoading: false,
  isLogged: false,
};
