import { IUserData } from "../../auth/types/user";
import {IChatItem, IParticipant} from "@/store/chat/types/chat";

export interface IMessage {
  sender?: IParticipant;
  chat?: IChatItem;
  createdAt: string;
  updatedAt?: string;
  text: string | null;
  attachment?: any | null;
  _id?: string;
  isReaded?: boolean;
}

export interface IMessagesList {
  list: IMessage[];
  count: number;
}
