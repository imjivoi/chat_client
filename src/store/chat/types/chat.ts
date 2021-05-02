import {IMessage, IMessagesList} from "./message";
import {IUserData} from "../../auth/types/user";

export interface IChatItem {
  participants: Array<IParticipant>;
  createdAt: string;
  _id: string;
  admin: IUserData;
  name: string | null;
  image?: string | null;
  typing?: {
    status: boolean;
    nickname: string;
  } | null;
  invite?: IChatInvite | null;
  messages?: IMessage[];
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
  chat_id?:string;
}

export interface IChatInvite {
  _id: string;
  createdAt: string;
  expiresAt: string;
  unique_key: string;
}
