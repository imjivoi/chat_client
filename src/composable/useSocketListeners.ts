import { ChatSocketEvents } from '@/store/chat/types/chat-socket';
import { IMessage, ITypingMessage } from '@/store/chat/types/message';
import { IChatItem, IChatState, IParticipant } from '@/store/chat/types/chat';
import { useChatStore } from '@/store';
import { reactive } from 'vue';
import { onUnmounted } from '@vue/runtime-core';
import { useChatData } from '@/composable/index';
import { useRouter } from 'vue-router';

export default function() {
  const state = reactive({ initiated: false });
  const chatStore = useChatStore();
  const router = useRouter();
  const { currentChat: openedChat, currentParticipant } = useChatData();

  function getCurrentChat(id: string | number | undefined) {
    return chatStore.list.find((chat: IChatItem) => chat.id === id);
  }

  function initListeners(socket: any) {
    if (state.initiated) return;
    state.initiated = true;
    socket.value.on(ChatSocketEvents.NEW_MESSAGE, ({ chat, ...data }: IMessage) => {
      const currentChat = getCurrentChat(chat?.id);
      currentChat?.messages?.push(data);
      if (
        openedChat.value?.id === currentChat?.id &&
        currentParticipant.value?.id !== data.sender?.id
      ) {
        socket.value.emit(ChatSocketEvents.READ_MESSAGES, { chat_id: currentChat?.id });
      }
    });
    socket.value.on(ChatSocketEvents.CREATE_CHAT, (newChat: IChatItem) => {
      chatStore.list.push(newChat);
      router.push({ name: 'Chat', params: { id: newChat.id } });
    });
    socket.value.on(ChatSocketEvents.FETCH_MESSAGES, (data: IMessage[]) => {
      if (!data.length) return;
      const chat = getCurrentChat(data[0].chat?.id);
      if (chat) {
        chat.messages = data;
      }
    });
    socket.value.on(ChatSocketEvents.NEW_PARTICIPANT, ({ chat_id, ...data }: IParticipant) => {
      const currentChat = getCurrentChat(chat_id);
      currentChat?.participants.push(data);
    });
    socket.value.on(ChatSocketEvents.TYPING_MESSAGE, ({ chat_id, ...data }: ITypingMessage) => {
      const currentChat = getCurrentChat(chat_id);
      if (currentChat) currentChat.typing = data;
    });

    socket.value.on(
      ChatSocketEvents.READ_MESSAGES,
      ({
        chat_id,
        participant_id,
      }: {
        chat_id: string | number;
        participant_id: string | number;
      }) => {
        const currentChat = getCurrentChat(chat_id);
        currentChat?.messages?.forEach((message: IMessage) => {
          if (!message.isReaded && message.sender?.id !== participant_id) {
            message.isReaded = true;
          }
        });
      },
    );

    socket.value.on(
      ChatSocketEvents.DELETE_MESSAGE,
      ({ chat_id, message_id }: { chat_id: string | number; message_id: string | number }) => {
        const currentChat = getCurrentChat(chat_id);
        if (currentChat)
          currentChat.messages = currentChat.messages?.filter(
            //@ts-ignore
            (message: IMessage) => message.id !== message_id,
          );
      },
    );
    socket.value.on(ChatSocketEvents.UPDATE_MESSAGE, (message: IMessage) => {
      const currentChat = getCurrentChat(message.chat?.id);
      const currentMessage = currentChat?.messages?.find((mes: IMessage) => message.id === mes.id);
      if (currentMessage) {
        (currentMessage as IMessage).text = message.text;
        (currentMessage as IMessage).updatedAt = message.updatedAt;
      }
    });
    socket.value.on(ChatSocketEvents.DELETE_CHAT, (data: any) => {
      chatStore.list = chatStore.list.filter((chat: IChatItem) => chat.id !== data.chat_id);
    });

    socket.value.on(
      ChatSocketEvents.QUIT_CHAT,
      ({
        chat_id,
        participant_id,
      }: {
        chat_id: string | number;
        participant_id: string | number;
      }) => {
        const chat = getCurrentChat(chat_id);
        if (!chat) return;
        chat.participants = chat.participants.filter((participant: IParticipant) => {
          return participant.id !== participant_id;
        });
      },
    );
    socket.value.on(ChatSocketEvents.UPDATE_PARTICIPANT, (participant: IParticipant) => {
      const chat = getCurrentChat(participant.chat_id);
      if (!chat) return;
      let currentParticipant = chat.participants.find(
        (item: IParticipant) => item.id === participant.id,
      );
      if (!currentParticipant) return;
      currentParticipant = participant;
    });
  }

  onUnmounted(() => (state.initiated = false));

  return {
    initListeners,
  };
}
