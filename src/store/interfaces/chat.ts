import { IMessage, IMessagesList } from "./message";
import { IUserData } from "./user";

export interface IChatItem {
  participants: Array<IUserData>;
  created: string;
  _id: string;
  all_messages: IMessagesList;
  type: "D" | "C";
  admin: IUserData;
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
  count: number | null;
}

export interface IAttachments {
  file: string | ArrayBuffer | null;
  title: string;
}
