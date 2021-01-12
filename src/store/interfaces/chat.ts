import { IMessage } from "./message";
import { IUserData } from "./user";

export interface IChatItem {
  participants: Array<IUserData>;
  created: string;
  id: string;
  messages: Array<IMessage>;
  type: "D" | "C";
  admin: string;
  title: string | null;
  image: string | null;
  typing: {
    status: boolean;
    nickname: string;
  } | null;
  total_messages: number;
  unreaded_messages: number;
  last_message: IMessage | null;
}

export interface IChatState {
  chats: Array<IChatItem> | [];
}

export interface IAttachments {
  file: string | ArrayBuffer | null;
  title: string;
}
