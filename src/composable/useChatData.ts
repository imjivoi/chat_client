import { useUserStore, useChatStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
import { computed, inject, Ref } from 'vue';
import expiresDate from '@/helpers/expiresDate';
import notificationService from '@/services/notificationService';
import { IChatItem, IParticipant } from '@/store/chat/types/chat';
import { IMessage } from '@/store/chat/types/message';
import { Socket } from 'socket.io';
import { ChatSocketEvents } from '@/store/chat/types/chat-socket';

export default function useChatData() {
  const chatStore = useChatStore();
  const route = useRoute();
  const router = useRouter();
  const userStore = useUserStore();
  const socket = inject('socket') as Ref<Socket>;

  const user = userStore.userData;

  const chatId = computed(() => route.params.id);
  const currentChat = computed(() =>
    chatStore.list.find((chat: IChatItem) => String(chat.id) === chatId.value),
  );
  const currentParticipant = computed(() =>
    currentChat.value?.participants.find(
      (participant: IParticipant) => participant.user.id === user?.id,
    ),
  );
  const participants = computed(() =>
    currentChat.value?.participants.sort((a: any, b: any) =>
      a.user.id === currentChat.value?.admin.id ? 1 : 0,
    ),
  );
  const inviteKey = computed(() => currentChat.value?.invite?.unique_key);
  const inviteLink = computed(() => `${window.location.origin}/app/invite/${inviteKey.value}`);
  const isValidInviteLink = computed(() => expiresDate(currentChat.value?.invite?.expiresAt));
  const imAdmin = computed(() => currentChat.value?.admin.id === user?.id);
  const unreadedMessages = computed(() =>
    currentChat.value?.messages?.filter(
      (message: IMessage) =>
        !message.isReaded && message.sender?.id !== currentParticipant.value?.id,
    ),
  );

  async function updateMessages() {
    if (!currentChat.value?.messages) {
      await chatStore.GET_MESSAGES(chatId.value);
    }
  }

  async function getInvite() {
    if (!currentChat.value?.invite) {
      await chatStore.GET_INVITE(chatId.value);
    }
  }
  async function createChat(title: string) {
    await chatStore.CREATE_CHAT({ title });
  }
  async function deleteChat(chat_id: string) {
    const id = chat_id || currentChat.value?.id;
    if (id) await chatStore.DELETE_CHAT(id);
    if (route.name === 'Chat') router.push({ name: 'Home' });
  }

  async function updateChat(title: string) {
    const id = currentChat.value?.id;
    if (id) await chatStore.updateChat(id, title);
  }

  function createInvite() {
    if (chatId.value) return chatStore.CREATE_INVITE(chatId.value);
    console.error('Chat id is undefined');
  }

  function updateInvite() {
    if (chatId.value) return chatStore.UPDATE_INVITE(chatId.value);
    console.error('Chat id is undefined');
  }

  function copyLink() {
    if (!navigator.clipboard)
      return notificationService.error("Link can't be copied, please use other navigator");

    navigator.clipboard
      .writeText(inviteLink.value)
      .then(() => notificationService.success('Link was copied'))
      .catch(() => notificationService.error('Something went wrong'));
  }

  async function updateParticipant(data: any) {
    await chatStore.UPDATE_PARTICIPANT({ chat_id: chatId.value, ...data });
  }

  function getImAdmin(chatId: string) {
    const chat = chatStore.list.find((chat: IChatItem) => chat.id === chatId);
    return chat?.admin?.id === user?.id;
  }

  function blockParticipant(participant_id: string) {
    socket.value.emit(ChatSocketEvents.BLOCK_USER, {
      participant_id,
      chat_id: currentChat.value?.id,
    });
  }

  return {
    blockParticipant,
    currentChat,
    updateMessages,
    getInvite,
    user,
    participants,
    inviteLink,
    isValidInviteLink,
    createInvite,
    createChat,
    updateInvite,
    copyLink,
    updateParticipant,
    currentParticipant,
    imAdmin,
    unreadedMessages,
    getImAdmin,
    deleteChat,
    updateChat,
  };
}
