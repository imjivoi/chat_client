import { IChatItem } from '@/store/chat/types/chat';
import { IUserData } from '../../user/types/user';

export interface IVoice {
  id: string;
  chat: IChatItem | null;
}

export interface IVoiceState {
  voices: IVoice[] | [];
  isLoading: boolean;
  activeVoiceId: string | null;
}

export enum VoiceIoEvents {
  CREATE_VOICE = 'CREATE_VOICE',
  DELETE_VOICE = 'DELETE_VOICE',
  JOIN_VOICE = 'JOIN_VOICE',
  LEAVE_VOICE = 'LEAVE_VOICE',
  USER_JOINED = 'USER_JOINED',
  SENDING_SIGNAL = 'SENDING_SIGNAL',
  RETURNING_SIGNAL = 'RETURNING_SIGNAL',
  RECEIVING_RETURNED_SIGNAL = 'RECEIVING_RETURNED_SIGNAL',
}
