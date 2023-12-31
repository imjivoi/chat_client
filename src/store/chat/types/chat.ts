import { IMessage, ITypingMessage } from './message';
import { IUserData } from '../../user/types/user';

export interface IChatItem {
  participants: Array<IParticipant>;
  createdAt: string;
  id: string;
  admin: IUserData;
  name: string | null;
  image?: string | null;
  typing?: ITypingMessage | null;
  invite?: IChatInvite | null;
  messages: IMessage[];
  initiatedMessages?: boolean;
  lastMessage?: IMessage;
}

export interface IChatState {
  list: Array<IChatItem>;
  count: number;
  isLoading?: boolean;
}

export interface IAttachments {
  file: string | ArrayBuffer | null;
  title: string;
}

export interface IParticipant {
  id: string;
  user: IUserData;
  chatId?: string;
}

export interface IChatInvite {
  id: string | number;
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
