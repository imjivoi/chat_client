import { IAttachments } from './chat';
import { IMessage } from './message';

export enum ChatSocketEvents {
  NEW_MESSAGE = 'CHAT:NEW_MESSAGE',
  MESSAGE_STATUS = 'CHAT:MESSAGE_STATUS',
  DELETE_MESSAGE = 'CHAT:DELETE_MESSAGE',
  DELETE_USER = 'CHAT:DELETE_USER',
  TYPING_MESSAGE = 'CHAT:TYPING_MESSAGE',
  FETCH_CHATS = 'CHAT:FETCH_CHATS',
  FETCH_MESSAGES = 'CHAT:FETCH_MESSAGES',
  BLOCK_USER = 'CHAT:BLOCK_USER',

  CREATE_CHAT = 'CHAT:CREATE_CHAT',
  NEW_PARTICIPANT = 'CHAT:NEW_PARTICIPANT',
  UPDATE_PARTICIPANT = 'CHAT:UPDATE_PARTICIPANT',
  READ_MESSAGE = 'CHAT:READ_MESSAGE',
  READ_MESSAGES = 'CHAT:READ_MESSAGES',
  UPDATE_MESSAGE = 'CHAT:UPDATE_MESSAGE',
  DELETE_CHAT = 'CHAT:DELETE_CHAT',
  QUIT_CHAT = 'CHAT:QUIT_CHAT',
  JOIN_CHAT = 'CHAT:JOIN_CHAT',
}

export enum SocketStatusConnect {
  OPEN = 'OPEN',
  CONNECTING = 'CONNECTING',
  CLOSED = 'CLOSED',
  CONNECT_ERROR = 'CONNECT_ERROR',
}

interface IChatSocketMesStatusResp {
  event: ChatSocketEvents.MESSAGE_STATUS;
  data: IChatSocketMessageStatus;
}

interface IChatSocketMesResponse {
  event: ChatSocketEvents.NEW_MESSAGE;
  data: IMessage;
}

interface IChatSocketTypingResponse {
  event: ChatSocketEvents.TYPING_MESSAGE;
  data: IChatSocketTypingData;
}

export type ChatSocketResponse =
  | IChatSocketMesResponse
  | IChatSocketMesStatusResp
  | IChatSocketTypingResponse;

export type ChatSocketSendDataType<T = ChatSocketEvents> = {
  event: T;
  data: SocketChatData<T>;
};

export type SocketChatData<T = ChatSocketEvents> = T extends ChatSocketEvents.DELETE_MESSAGE
  ? IChatSocketDeleteMessageData
  : T extends ChatSocketEvents.DELETE_USER
  ? IChatSocketUserData
  : T extends ChatSocketEvents.MESSAGE_STATUS
  ? IChatSocketMessageStatus
  : T extends ChatSocketEvents.NEW_MESSAGE
  ? IChatSocketMessageData
  : T extends ChatSocketEvents.TYPING_MESSAGE
  ? IChatSocketTypingData
  : any;

interface IChatSocketUserData {
  chat_id: string | number;
  user_id: string | number;
}

export interface IChatSocketMessageStatus {
  chat_id: string | number;
  user_id: string | number | null | undefined;
}

interface IChatSocketDeleteMessageData {
  chat_id: string | number;
  message_id: string | number;
}

interface IChatSocketMessageData {
  text: string | null;
  attachments: Array<IAttachments> | null;
  chat_id: string | number;
}

export interface IChatSocketTypingData {
  chat_id: string | number;
  status: boolean;
  nickname: string;
}
