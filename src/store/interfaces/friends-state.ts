import { IUserData } from "./user";

export interface IFriendsState {
  friends: IUserData[];
  isLoading: boolean;
}
