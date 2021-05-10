import {ChatSocketEvents} from "@/store/chat/types/chat-socket";
import {IMessage} from "@/store/chat/types/message";
import {IChatItem, IChatState, IParticipant, ITypingData} from "@/store/chat/types/chat";
import {useChatStore} from "@/store";
import {reactive} from "vue";
import {onUnmounted} from "@vue/runtime-core";


export default function (socket: any) {
  const state = reactive({initiated: false})
  const chatStore = useChatStore()

  function getCurrentChat(id: string | undefined) {
    return chatStore.list.find(chat => chat._id === id)
  }

  function initListeners() {
    if (state.initiated) return
    state.initiated = true
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

    socket.on(ChatSocketEvents.READ_MESSAGES, ({
                                                 chat_id, participant_id
                                               }: { chat_id: string, participant_id: string }) => {
      const currentChat = getCurrentChat(chat_id)
      currentChat?.messages?.forEach(message => {
        if (!message.isReaded && message.sender?._id !== participant_id) {
          message.isReaded = true
        }
      })

    })

    socket.on(ChatSocketEvents.DELETE_MESSAGE, ({
                                                  chat_id, message_id
                                                }: { chat_id: string, message_id: string }) => {
      const currentChat = getCurrentChat(chat_id)
      if (currentChat)
        currentChat.messages = currentChat.messages?.filter(message => message._id !== message_id)
    })

  }

  socket.on(ChatSocketEvents.UPDATE_MESSAGE, (message: IMessage) => {
    const currentChat = getCurrentChat(message.chat?._id)
    const currentMessage = currentChat?.messages?.find(mes => message._id === mes._id)
    if (currentMessage) {
      currentMessage.text = message.text
      currentMessage.updatedAt = message.updatedAt
    }


  })

  onUnmounted(() => state.initiated = false)

  return {
    initListeners
  }
}
