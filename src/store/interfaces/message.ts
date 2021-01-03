import { IUserData } from "./user";

export interface IMessage {
  user?: IUserData;
  chat?: string | null;
  created?: string;
  text: string | null;
  attachments?: any | null;
  id?: string;
  is_readed?: boolean;
}
