import { IUserData } from "./user";

export interface IFriendsState {
  friends: IUserData[];
  friendshipRequests: IFriendshipReuqests[];
  isLoading: boolean;
}

export interface IFriendshipReuqests {
  id: string;
  from_user: IUserData;
  to_user: IUserData;
  created: string;
  accepted: boolean;
  readed: boolean;
}
