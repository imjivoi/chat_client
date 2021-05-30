import { IUserData } from '@/store/auth/types/user';

export interface IFriendship {
  _id: string | number;
  createdAt: string;
  updatedAt: string;
  fromUser: IUserData;
  toUser: IUserData;
  status: FriendshipStatus;
}

export enum FriendshipStatus {
  requested = 'requested',
  accepted = 'accepted',
  denied = 'denied',
}
