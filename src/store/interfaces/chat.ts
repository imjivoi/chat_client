import { IMessage } from "./message";
import { IUserData } from "./user";

export interface IChatItem {
  participants: Array<IUserData>;
  created: string;
  id: string;
  messages: Array<IMessage>;
  type: "Dialog" | "Chat";
  admin: string;
  title: string | null;
  image: string | null;
  typing: {
    status: boolean;
    nickname: string;
  } | null;
  total_messages: number;
  unreaded_messages: number;
  last_message: IMessage;
}

export interface IChatState {
  chats: Array<IChatItem> | [];
}

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

export interface ISocketResponseData {
  event: ChatSocketEvents;
  data:
    | IChatSocketUserData
    | IChatSocketDeleteMessageData
    | IChatSocketMessageData
    | IChatSocketTypingData;
}

interface IChatSocketUserData {
  chat_id: string;
  user_id: string;
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

export interface IAttachments {
  file: string | ArrayBuffer | null;
  title: string;
}
