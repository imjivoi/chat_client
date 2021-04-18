import {IMessagesList} from "./message";
import {IUserData} from "../../auth/types/user";

export interface IChatItem {
  participants: Array<IParticipant>;
  createdAt: string;
  _id: string;
  admin: IUserData;
  title: string | null;
  image: string | null;
  typing?: {
    status: boolean;
    nickname: string;
  } | null;
  invite: IChatInvite | null;
  messages: IMessagesList;
}

export interface IChatState {
  list: Array<IChatItem>;
  count: number | null;
  isLoading?: boolean;
}

export interface IAttachments {
  file: string | ArrayBuffer | null;
  title: string;
}

export interface IParticipant {
  _id: string;
  accepted: boolean;
  blocked: boolean;
  user: IUserData;
}

export interface IChatInvite {
  _id: string;
  createdAt: string;
  expiresAt: string | number;
  unique_key: string;
}
