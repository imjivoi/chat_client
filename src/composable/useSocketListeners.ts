import {ChatSocketEvents} from "@/store/chat/types/chat-socket";
import {IMessage} from "@/store/chat/types/message";
import {IChatItem, IChatState, IParticipant} from "@/store/chat/types/chat";
import {useChatStore} from "@/store";


export default function (socket: any) {
  const chatStore = useChatStore()

  function getCurrentChat(id: string | undefined) {
    return chatStore.list.find(chat => chat._id === id)
  }

  function initListeners() {
    socket.on(ChatSocketEvents.NEW_MESSAGE, ({chat, ...data}: IMessage) => {
      console.log(data)
      const currentChat = getCurrentChat(chat?._id)
      currentChat?.messages?.push(data)
    });
    socket.on(ChatSocketEvents.CREATE_CHAT, (newChat: IChatItem) => {
      chatStore.list.push(newChat)
    })
    socket.on(ChatSocketEvents.FETCH_CHATS, ({list, count}: IChatState) => {
      chatStore.$patch({
        list, count
      })
    })
    socket.on(ChatSocketEvents.NEW_PARTICIPANT, ({chat_id, ...data}: IParticipant) => {
      const currentChat = getCurrentChat(chat_id)
      currentChat?.participants.push(data)
    })

  }

  return {
    initListeners
  }
}
