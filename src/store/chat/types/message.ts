import { IUserData } from '../../user/types/user';
import { IChatItem, IParticipant } from '@/store/chat/types/chat';

export interface IMessage {
  sender?: IParticipant;
  chat?: IChatItem;
  createdAt: string;
  updatedAt: string;
  text: string | null;
  attachment?: any | null;
  id: string | number;
  isReaded?: boolean;
}

export interface ITypingMessage {
  isAudio?: boolean;
  participant_id?: string | number;
  chat_id?: string | number;
  status?: boolean;
}

export interface IMessagesList {
  list: IMessage[] | ITypingMessage[];
  count: number;
}
