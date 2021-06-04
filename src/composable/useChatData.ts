import { useUserStore, useChatStore } from '@/store';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import expiresDate from '@/helpers/expiresDate';
import notificationService from '@/services/notificationService';
import { IChatItem, IParticipant } from '@/store/chat/types/chat';
import { IMessage } from '@/store/chat/types/message';

export default function useChatData() {
  const chatStore = useChatStore();
  const route = useRoute();
  const userStore = useUserStore();

  const user = userStore.userData;

  const chatId = computed(() => route.params.id);
  const currentChat = computed(() =>
    chatStore.list.find((chat: IChatItem) => String(chat._id) === chatId.value),
  );
  const currentParticipant = computed(() =>
    currentChat.value?.participants.find(
      (participant: IParticipant) => participant.user._id === user?._id,
    ),
  );
  const acceptedParticipants = computed(() =>
    currentChat.value?.participants
      .sort((a: any, b: any) => (a.user._id === currentChat.value?.admin._id ? 1 : 0))
      .filter((participant: IParticipant) => participant.accepted),
  );
  const requests = computed(() =>
    currentChat.value?.participants.filter((participant: IParticipant) => !participant.accepted),
  );
  const inviteKey = computed(() => currentChat.value?.invite?.unique_key);
  const inviteLink = computed(() => `${window.location.origin}/app/invite/${inviteKey.value}`);
  const isValidInviteLink = computed(() => expiresDate(currentChat.value?.invite?.expiresAt));
  const imAdmin = computed(() => currentChat.value?.admin._id === user?._id);
  const imAccepted = computed(() => currentParticipant.value?.accepted);
  const unreadedMessages = computed(() =>
    currentChat.value?.messages?.filter(
      (message: IMessage) =>
        !message.isReaded && message.sender?._id !== currentParticipant.value?._id,
    ),
  );

  async function updateMessages() {
    if (!imAccepted) return;
    if (!currentChat.value?.messages) {
      await chatStore.GET_MESSAGES(chatId.value);
    }
  }

  async function getInvite() {
    if (!imAccepted) return;
    if (!currentChat.value?.invite) {
      await chatStore.GET_INVITE(chatId.value);
    }
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
    const chat = chatStore.list.find((chat: IChatItem) => chat._id === chatId);
    return chat?.admin?._id === user?._id;
  }

  return {
    currentChat,
    updateMessages,
    getInvite,
    user,
    acceptedParticipants,
    requests,
    inviteLink,
    isValidInviteLink,
    createInvite,
    updateInvite,
    copyLink,
    updateParticipant,
    currentParticipant,
    imAdmin,
    unreadedMessages,
    getImAdmin,
  };
}
