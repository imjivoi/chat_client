import {ChatSocketEvents} from "@/store/chat/types/chat-socket";
import {IMessage} from "@/store/chat/types/message";
import {IChatItem, IChatState, IParticipant, ITypingData} from "@/store/chat/types/chat";
import {useChatStore} from "@/store";
import {reactive} from "vue";
import {onUnmounted} from "@vue/runtime-core";
import {useChatData} from "@/composable/index";


export default function () {

  const state = reactive({initiated: false})
  const chatStore = useChatStore()
  const {currentChat: openedChat, currentParticipant} = useChatData()

  function getCurrentChat(id: string | undefined) {
    return chatStore.list.find(chat => chat._id === id)
  }


  function initListeners(socket: any) {
    if (state.initiated) return
    state.initiated = true
    socket.value.on(ChatSocketEvents.NEW_MESSAGE, ({chat, ...data}: IMessage) => {
      const currentChat = getCurrentChat(chat?._id)
      currentChat?.messages?.push(data)
      if (openedChat.value?._id === currentChat?._id && currentParticipant.value?._id !== data.sender?._id) {
        socket.value.emit(ChatSocketEvents.READ_MESSAGES, {chat_id: currentChat?._id})
      }
    });
    socket.value.on(ChatSocketEvents.CREATE_CHAT, (newChat: IChatItem) => {
      chatStore.list.push(newChat)
    })
    socket.value.on(ChatSocketEvents.FETCH_CHATS, ({list, count}: IChatState) => {
      chatStore.$patch({
        list, count
      })
    })
    socket.value.on(ChatSocketEvents.NEW_PARTICIPANT, ({chat_id, ...data}: IParticipant) => {
      const currentChat = getCurrentChat(chat_id)
      currentChat?.participants.push(data)
    })
    socket.value.on(ChatSocketEvents.TYPING_MESSAGE, ({chat_id, ...data}: ITypingData) => {
      const currentChat = getCurrentChat(chat_id)
      currentChat!.typing = data
    })

    socket.value.on(ChatSocketEvents.READ_MESSAGES, ({
                                                       chat_id, participant_id
                                                     }: { chat_id: string, participant_id: string }) => {
      const currentChat = getCurrentChat(chat_id)
      currentChat?.messages?.forEach(message => {
        if (!message.isReaded && message.sender?._id !== participant_id) {
          message.isReaded = true
        }
      })

    })

    socket.value.on(ChatSocketEvents.DELETE_MESSAGE, ({
                                                        chat_id, message_id
                                                      }: { chat_id: string, message_id: string }) => {
      const currentChat = getCurrentChat(chat_id)
      if (currentChat)
        currentChat.messages = currentChat.messages?.filter(message => message._id !== message_id)
    })
    socket.value.on(ChatSocketEvents.UPDATE_MESSAGE, (message: IMessage) => {
      const currentChat = getCurrentChat(message.chat?._id)
      const currentMessage = currentChat?.messages?.find(mes => message._id === mes._id)
      if (currentMessage) {
        currentMessage.text = message.text
        currentMessage.updatedAt = message.updatedAt
      }


    })
  }


  onUnmounted(() => state.initiated = false)

  return {
    initListeners
  }
}
