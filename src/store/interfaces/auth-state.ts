import { IUserData } from "./user";

export interface IAuthState {
  userData: IUserData | null;
  isLoading?: boolean;
  isLogged?: boolean;
  token?: string | null | undefined;
}
