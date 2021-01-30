import { IAuthState } from "@/store/interfaces/auth-state";
import { IUserData } from "@/store/interfaces/user";

export interface AuthGettersTypes {
  isLogged(state: IAuthState): boolean;
  isLoadingAuth(state: IAuthState): boolean;
  userData(state: IAuthState): IUserData | null;
}
