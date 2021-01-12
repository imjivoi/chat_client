import { IChatItem } from "@/store/interfaces/chat";
import { HTTP } from "../axios";

const url = "api/v1/chat/";

export type TypeOfChatType = "C" | "D";

export interface ICreateChatData {
  participants: string[];
  type: TypeOfChatType;
  title?: string;
}

export default {
  getChats(id?: string) {
    if (id) return HTTP.get(`${url}?id=${id}`);
    return HTTP.get(url);
  },
  createChat(data: ICreateChatData) {
    return HTTP.post(url, {
      participants: data.participants,
      type: data.type,
      title: data.title,
    });
  },
  deleteChat(id: string | null) {
    return HTTP.delete(`${url}?id=${id}`);
  },
  exitFromChat(chat_id: string | null) {
    return HTTP.put(url + "exit/", { chat_id: chat_id });
  },
  deleteUserFromChat(chat_id: string, user_id: string) {
    return HTTP.delete(`${url}+delete/?chat_id=${chat_id}&user_id=${user_id}`);
  },
  addUserToChat(chat_id: string, user_id: string) {
    return HTTP.put(url + "add/", {
      user_id: user_id,
      chat_id: chat_id,
    });
  },
  changeChatTitle(chat_id: string, title: string) {
    return HTTP.put(url, {
      title: title,
      chat_id: chat_id,
    });
  },
  getMessages(chat_id: string | null) {
    return HTTP.get(`${url}messages/?chat_id=${chat_id}`);
  },
};
