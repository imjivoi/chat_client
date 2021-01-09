import { IFriendsState } from "@/store/interfaces/friends-state";
import { IUserData } from "@/store/interfaces/user";

export interface FriendsGettersTypes {
  friends(state: IFriendsState): IUserData[];
}
