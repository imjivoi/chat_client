import {HTTP} from "../utils/axios";

const url = "/chats/";

export interface ICreateChatData {
  title?: string;
}

export interface IUpdateParticipant {
  accepted?: boolean,
  blocked?: boolean,
  chat_id: string,
  participant_id: string
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
  },
  updateParticipant(data: IUpdateParticipant) {
    return HTTP.put(url + 'participant', data)
  }
};
