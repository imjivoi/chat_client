import { IMessage } from './message';
import { IUserData } from '../../auth/types/user';

export interface IChatItem {
  participants: Array<IParticipant>;
  createdAt: string;
  _id: string | number;
  admin: IUserData;
  name: string | null;
  image?: string | null;
  typing?: ITypingData | null;
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
  _id: string | number;
  accepted: boolean;
  blocked: boolean;
  user: IUserData;
  chat_id?: string;
}

export interface IChatInvite {
  _id: string | number;
  createdAt: string;
  expiresAt: string;
  unique_key: string;
}
export interface ITypingData {
  status: boolean;
  participant_id: string | number;
  isAudio: boolean;
  chat_id?: string | number;
}
