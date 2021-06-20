import router from '@/router';
import chatAPI, { ICreateChatData, IUpdateParticipant } from '@/services/api/chatAPI';
import { defineStore } from 'pinia';
import { state } from './state';
import { IChatItem } from '@/store/chat/types/chat';
import { AxiosResponse } from 'axios';

export const useChatStore = defineStore({
  id: 'chat',
  state: () => state,
  actions: {
    GET_CHATS() {
      return new Promise(async (resolve, reject) => {
        try {
          this.isLoading = true;
          const {
            data: { list, count },
          } = await chatAPI.getChats();
          this.list = list;
          this.count = count;
          resolve(list);
        } catch (error) {
          reject(error);
        }
        this.isLoading = false;
      });
    },

    CREATE_CHAT(payload: ICreateChatData): Promise<IChatItem> {
      return new Promise(async (resolve, reject) => {
        try {
          const res: AxiosResponse<IChatItem> = await chatAPI.createChat(payload.title);
          if (res.status === 226) {
            router.push(`/app/chats/${res.data.id}`);
          } else {
            this.list.push(res.data);
            this.count++;
            router.push(`/app/chats/${res.data.id}`);
          }
          resolve(res.data);
        } catch (error) {
          reject(error);
        }
      });
    },
    async DELETE_CHAT(chat_id: string) {
      try {
        await chatAPI.deleteChat(chat_id);
        this.list = this.list.filter((chat: IChatItem) => chat.id !== chat_id);
        this.count--;
      } catch (error) {}
    },
    async updateChat(chat_id: string, name: string) {
      try {
        const { data } = await chatAPI.updateChat(chat_id, name);
        let currentChat = this.list.find((chat: IChatItem) => chat.id === chat_id);
        if (currentChat) {
          currentChat.name = data.name;
        }
      } catch (e) {}
    },
    async GET_INVITE(chat_id: string | number | string[]) {
      this.isLoading = true;
      try {
        const { data } = await chatAPI.getInvite(chat_id);
        const chat = this.list.find((chat: IChatItem) => String(chat.id) === chat_id);

        if (data && chat) {
          chat.invite = data;
        }
      } catch (e) {}
      this.isLoading = false;
    },
    async CREATE_INVITE(id: string | string[], expiresAt?: number) {
      const { data } = await chatAPI.createInvite(id, expiresAt);
      let chat = this.list.find((chat: IChatItem) => String(chat.id) === id);
      if (chat) {
        chat.invite = data;
      }
    },

    async UPDATE_INVITE(id: string | string[], expiresAt?: number) {
      const { data } = await chatAPI.updateInvite(id, expiresAt);
      let chat = this.list.find((chat: IChatItem) => chat.id === id);
      if (chat) {
        chat.invite = data;
      }
    },
    SEND_REQUEST(key: string | string[]) {
      return new Promise(resolve => {
        chatAPI
          .requestInvite(key)
          .then(res => {
            this.GET_CHATS();
            router.push({ name: 'Chat', params: { id: res.data.data.chat_id } });
            resolve(res);
          })
          .catch(e => {
            const { status, data } = e.response;
            if (status === 302) {
              router.push({
                name: 'Chat',
                params: {
                  id: data.chat_id,
                },
              });
            } else {
              router.push({
                name: 'Error',
                query: {
                  status,
                  message: data.message,
                },
              });
            }
          });
      });
    },
    async UPDATE_PARTICIPANT(participant: IUpdateParticipant) {
      try {
        await chatAPI.updateParticipant(participant);
      } catch (e) {}
    },
    async GET_MESSAGES(chat_id: string | number | string[]) {
      let currentChat = this.list.find((chat: IChatItem) => String(chat.id) === String(chat_id));
      if (currentChat?.initiatedMessages) return;
      try {
        const { data } = await chatAPI.getMessages(chat_id);
        if (currentChat) {
          currentChat.messages = data;
          currentChat.initiatedMessages = true;
        }
      } catch (e) {}
    },
    async EXIT_FROM_CHAT(chat_id: string) {
      try {
        await chatAPI.exitFromChat(chat_id);
        this.list = this.list.filter((chat: IChatItem) => chat.id !== chat_id);
        this.count--;
      } catch (error) {}
    },
  },
});
