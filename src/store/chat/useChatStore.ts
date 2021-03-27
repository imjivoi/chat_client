import router from "@/router";
import chatAPI, { ICreateChatData } from "@/utils/api/chatAPI";
import { defineStore } from "pinia";
import { state } from "./state";
import {inject} from "vue";

export const useChatStore = defineStore({
  id: "chat",
  state: () => state,
  actions: {
    GET_CHATS() {
      return new Promise(async (resolve, reject) => {
        try {
          this.isLoading = true;
          const { data } = await chatAPI.getChats();
          this.list = data;
          resolve(data);
        } catch (error) {
          reject(error);
        }
        this.isLoading = false;
      });
    },
    async GET_MESSAGES(payload: string | string[]) {
      try {
        const { data } = await chatAPI.getMessages(payload);
        let chat = this.list.find((chat) => chat._id === payload);
        if (chat) {
          chat.all_messages.list.push(...data);
        }
      } catch (error) {}
    },
    CREATE_CHAT(payload: ICreateChatData) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await chatAPI.createChat();
          if (res.status === 226) {
            router.push(`/chats/${res.data.id}`);
          } else {
            this.list = res.data;
            router.push(`/chats/${res.data._id}`);
          }
          resolve(res.data);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
});
