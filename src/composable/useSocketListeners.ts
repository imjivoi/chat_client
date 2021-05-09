import {ChatSocketEvents} from "@/store/chat/types/chat-socket";
import {IMessage} from "@/store/chat/types/message";
import {IChatItem, IChatState, IParticipant, ITypingData} from "@/store/chat/types/chat";
import {useChatStore} from "@/store";


export default function (socket: any) {
  const chatStore = useChatStore()

  function getCurrentChat(id: string | undefined) {
    return chatStore.list.find(chat => chat._id === id)
  }

  function initListeners() {
    socket.on(ChatSocketEvents.NEW_MESSAGE, ({chat, ...data}: IMessage) => {
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
    socket.on(ChatSocketEvents.TYPING_MESSAGE, ({chat_id, ...data}: ITypingData) => {
      const currentChat = getCurrentChat(chat_id)
      currentChat!.typing = data
    })

    socket.on(ChatSocketEvents.READ_MESSAGE, ({
                                                chat_id,
                                                message_id
                                              }: { chat_id: string, message_id: string }) => {
      const currentChat = getCurrentChat(chat_id)
      const message = currentChat?.messages?.find(message => message._id === message_id)
      if (message)
        message.isReaded = true
    })
  }

  return {
    initListeners
  }
}
