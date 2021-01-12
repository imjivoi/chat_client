import { IAttachments } from "./chat";
import { IMessage } from "./message";

export interface IChatSocketState {
  ws: WebSocket | null;
  status: SocketStatusConnect;
  quantityConnectErrors: number;
}

export enum ChatSocketEvents {
  NEW_MESSAGE = "NEW_MESSAGE",
  MESSAGE_STATUS = "MESSAGE_STATUS",
  DELETE_MESSAGE = "DELETE_MESSAGE",
  DELETE_USER = "DELETE_USER",
  TYPING_MESSAGE = "TYPING_MESSAGE",
}

export enum SocketStatusConnect {
  OPEN = "OPEN",
  CONNECTING = "CONNECTING",
  CLOSED = "CLOSED",
}

export type ChatSocketResponseType<T = ChatSocketEvents> = {
  event: T;
  data: T extends ChatSocketEvents.NEW_MESSAGE
    ? IMessage
    : IChatSocketMessageStatus;
};

interface IChatSocketMesStatusResp {
  event: ChatSocketEvents.MESSAGE_STATUS;
  data: IChatSocketMessageStatus;
}

interface IChatSocketMesResponse {
  event: ChatSocketEvents.NEW_MESSAGE;
  data: IMessage;
}

export type ChatSocketResponse =
  | IChatSocketMesResponse
  | IChatSocketMesStatusResp;

export type ChatSocketSendDataType<T = ChatSocketEvents> = {
  event: T;
  data: SocketChatData<T>;
};

export type SocketChatData<
  T = ChatSocketEvents
> = T extends ChatSocketEvents.DELETE_MESSAGE
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
  chat_id: string;
  user_id: string;
}
export interface IChatSocketMessageStatus {
  chat_id: string;
  user_id: string | null | undefined;
}
interface IChatSocketDeleteMessageData {
  chat_id: string;
  message_id: string;
}

interface IChatSocketMessageData {
  text: string | null;
  attachments: Array<IAttachments> | null;
  chat_id: string;
}

interface IChatSocketTypingData {
  chat_id: string;
  status: boolean;
  nickname: string;
}
