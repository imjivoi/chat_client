import { IUserData } from "../../auth/types/user";

export interface IMessage {
  sender?: IUserData;
  chat: string;
  created?: string;
  text: string | null;
  attachments?: any | null;
  _id?: string;
  is_readed?: boolean;
}

export interface IMessagesList {
  list: IMessage[];
  count: number;
}
