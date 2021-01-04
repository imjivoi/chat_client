import { IChatItem, IChatState } from "@/store/interfaces/chat";

export interface ChatGettersTypes {
  chats(state: IChatState): IChatItem[];
}
