import {Socket} from "socket.io";
import {ChatSocketEvents} from "@/store/chat/types/chat-socket";
import {useChatStore} from "@/store";
import {IChatItem} from "@/store/chat/types/chat";
import {IMessage} from "@/store/chat/types/message";

export const initChatSubscribers = (socket: Socket | any) => {
  const chat = useChatStore()

  function newMessage() {
    socket.on(ChatSocketEvents.NEW_MESSAGE, (message: IMessage) => {

    })
  }

  function createChat() {
    socket.on(ChatSocketEvents.CREATE_CHAT, (newChat: IChatItem) => {
      chat.list = [...chat.list, newChat]
    })
  }
}
