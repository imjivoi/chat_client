import { HTTP } from '../../plugins/axios';

const url = '/chats/';

export interface ICreateChatData {
  title: string;
}

export interface IUpdateParticipant {
  accepted?: boolean;
  blocked?: boolean;
  chat_id: string | number;
  participant_id: string | number;
}

export default {
  getChats(id?: string) {
    if (id) return HTTP.get(`${url}?id=${id}`);
    return HTTP.get(url);
  },
  createChat(name: string) {
    return HTTP.post(url, { name });
  },
  deleteChat(id: string | null) {
    return HTTP.delete(`${url}${id}`);
  },
  exitFromChat(chat_id: string | number | null) {
    return HTTP.put(url + 'exit/', { chat_id: chat_id });
  },
  deleteUserFromChat(chat_id: string | number, user_id: string | number) {
    return HTTP.delete(`${url}+delete/?chat_id=${chat_id}&user_id=${user_id}`);
  },
  addUserToChat(chat_id: string | number, user_id: string | number) {
    return HTTP.put(url + 'add/', {
      user_id: user_id,
      chat_id: chat_id,
    });
  },
  updateChat(id: string | number, name: string) {
    return HTTP.put(url, {
      id,
      name,
    });
  },
  getMessages(chat_id: string | number | string[]) {
    return HTTP.get(`${url}messages/${chat_id}`);
  },
  createInvite(chat_id: string | number | string[], expiresAt?: number) {
    return HTTP.post(url + 'invite', {
      chat_id,
      expiresAt,
    });
  },
  requestInvite(key: string | string[]) {
    return HTTP.get(`${url}invite/${key}`);
  },
  getInvite(chat_id: string | number | string[]) {
    return HTTP.get(`${url}get-invite/${chat_id}`);
  },
  updateInvite(chat_id: string | number | string[], expiresAt?: number) {
    return HTTP.put(url + 'invite', {
      chat_id,
      expiresAt,
    });
  },
  updateParticipant(data: IUpdateParticipant) {
    return HTTP.put(url + 'participant', data);
  },
};
