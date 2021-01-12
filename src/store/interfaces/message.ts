import { IUserData } from "./user";

export interface IMessage {
  user?: IUserData;
  chat: string;
  created?: string;
  text: string | null;
  attachments?: any | null;
  id?: string;
  is_readed?: boolean;
}
