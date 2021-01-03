import { TokenType } from "@/store/modules/user";
import { HTTP } from "../axios";
import { headers } from "./userAPI";

const url = "api/v1/chat/";

export type TypeOfChatType = "C" | "D";

export interface ICreateChatData {
  participants: string[];
  type: TypeOfChatType;
  title: string;
}

export default {
  getChats(token: TokenType) {
    return HTTP.get(url, headers(token));
  },
  createChat(token: TokenType, data: ICreateChatData) {
    return HTTP.post(
      url,
      {
        participants: data.participants,
        type: data.type,
        title: data.title,
      },
      headers(token)
    );
  },
  deleteChat(token: TokenType, id: string | null) {
    return HTTP.delete(`${url}?id=${id}`, headers(token));
  },
  exitFromChat(token: TokenType, chat_id: string | null) {
    return HTTP.put(url + "exit/", { chat_id: chat_id }, headers(token));
  },
  deleteUserFromChat(token: TokenType, chat_id: string, user_id: string) {
    return HTTP.delete(
      `${url}+delete/?chat_id=${chat_id}&user_id=${user_id}`,
      headers(token)
    );
  },
  addUserToChat(token: TokenType, chat_id: string, user_id: string) {
    return HTTP.put(
      url + "add/",
      {
        user_id: user_id,
        chat_id: chat_id,
      },
      headers(token)
    );
  },
  changeChatTitle(token: TokenType, chat_id: string, title: string) {
    return HTTP.put(
      url,
      {
        title: title,
        chat_id: chat_id,
      },
      headers(token)
    );
  },
  getMessages(token: TokenType, chat_id: string | null, date: string) {
    return HTTP.get(
      `${url}messages/?chat_id=${chat_id}&date=${date}`,
      headers(token)
    );
  },
};
