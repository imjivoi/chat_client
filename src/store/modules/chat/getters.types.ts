import { IChatItem, IChatState } from "@/store/interfaces/chat";

export interface ChatGettersTypes {
  chats(state: IChatState): IChatItem[];
  activeChat: (
    state: IChatState
  ) => (payload: string | string[]) => IChatItem | null;
}
