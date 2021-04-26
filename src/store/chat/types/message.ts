import { IUserData } from "../../auth/types/user";
import {IParticipant} from "@/store/chat/types/chat";

export interface IMessage {
  sender?: IParticipant;
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
