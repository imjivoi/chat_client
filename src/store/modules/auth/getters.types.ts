import { IAuthState } from "@/store/interfaces/auth-state";

export interface AuthGettersTypes {
  isLogged(state: IAuthState): boolean;
}
