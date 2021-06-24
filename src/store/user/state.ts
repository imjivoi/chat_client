import { IAuthState } from '@/store/user/types/auth-state';

export const state: IAuthState = {
  userData: null,
  isLoading: false,
  isLogged: false,
};
