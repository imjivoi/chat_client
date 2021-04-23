import {HTTP} from "../utils/axios";

const url = "/chats/";

export type TypeOfChatType = "C" | "D";

export interface ICreateChatData {
  title?: string;
}

export default {
  getChats(id?: string) {
    if (id) return HTTP.get(`${url}?id=${id}`);
    return HTTP.get(url);
  },
  createChat() {
    return HTTP.post(url);
  },
  deleteChat(id: string | null) {
    return HTTP.delete(`${url}?id=${id}`);
  },
  exitFromChat(chat_id: string | null) {
    return HTTP.put(url + "exit/", {chat_id: chat_id});
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
  getMessages(chat_id: string | string[]) {
    return HTTP.get(`${url}messages/?chat_id=${chat_id}`);
  },
  createInvite(chat_id: string | string[], expiresAt?: number) {
    return HTTP.post(url + 'invite', {
      chat_id, expiresAt
    })
  },
  getInvite(key: string | string[]) {
    return HTTP.get(`${url}invite/${key}`)
  },
  updateInvite(chat_id: string | string[], expiresAt?: number) {
    return HTTP.put(url + 'invite', {
      chat_id, expiresAt
    })
  }
};
