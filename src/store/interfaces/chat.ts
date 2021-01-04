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
}

export interface IChatState {
  chats: Array<IChatItem> | [];
  isLoading: boolean;
  activeChatId: string | null;
  socket: WebSocket | null;
  socketStatus: "OPEN" | "CONNECTING" | "CLOSING" | "CLOSED";
}
