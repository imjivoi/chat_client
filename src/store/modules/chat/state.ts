import { IChatState } from "@/store/interfaces/chat";

export const state: IChatState = {
  chats: [],
  isLoading: false,
  activeChatId: null,
};
