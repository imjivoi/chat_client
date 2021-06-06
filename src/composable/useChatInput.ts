import { ChatSocketEvents } from '@/store/chat/types/chat-socket';
import { toBase64 } from '@/utils/base64encryption';
import { computed, inject, ref, Ref, watch } from 'vue';
import { Socket } from 'socket.io';
import notificationService from '@/services/notificationService';
import { useChatData } from '@/composable/index';
import { IMessage } from '@/store/chat/types/message';

const isEditMsgOpen = ref(false);
const pickedMsg = ref<IMessage | null>(null);
const message = ref<string | null>(null);
const typing = ref<boolean>(false);

export interface IEmittedEventStatus {
  status: Boolean;
  message: string;
}

export default function useChatInput() {
  const attachments = ref<Array<File> | any>([]);
  const activeEmojiPicker = ref<boolean>(false);
  const activeAudioRecord = ref<boolean>(false);
  const timeout = ref<any | null>(null);
  const textarea = ref();
  const socket = inject('socket') as Ref<Socket>;

  const { currentParticipant, currentChat } = useChatData();

  const attachmentsUrl = computed(() => {
    const result = attachments.value?.map((attachment: any) => {
      if (attachment.type.includes('image')) {
        return URL.createObjectURL(attachment);
      }
    });
    return result?.filter(Boolean);
  });

  async function getBase64ArrayAttachments() {
    let attachArray = [] as string[];

    if (attachments.value?.length) {
      for (let i = 0; i < attachments.value.length; i++) {
        await toBase64(attachments.value[i]).then((res: any) => attachArray.push(res));
      }
    }
    return attachArray;
  }

  async function sendMessage(e: any): Promise<IEmittedEventStatus | any> {
    if (!e?.shiftKey && e?.which === 13) {
      e.preventDefault();
    }
    if (!message.value?.trim().length && !attachments.value.length) {
      return { status: true };
    }
    typing.value = false;

    activeEmojiPicker.value = false;

    const attachmentsResult = await getBase64ArrayAttachments();
    const data = {
      text: message.value,
      chat_id: currentChat.value?.id,
      attachments: attachmentsResult,
    };
    console.log(data);
    textarea.value.focus();
    message.value = null;
    attachments.value = [];
    return new Promise(resolve =>
      socket.value.emit(ChatSocketEvents.NEW_MESSAGE, data, (response: IEmittedEventStatus) =>
        resolve(response),
      ),
    ) as Promise<IEmittedEventStatus>;
  }

  function setAttachments(files: any) {
    if (files.length > 5) return notificationService.error('Cannot be uploaded more 5 images');
    if (files.length && files[0]) {
      attachments.value = [].concat(...files);
    } else {
      attachments.value.push(files);
    }
  }

  function deleteFile(index: number | 'all') {
    typeof index === 'number' ? attachments.value?.splice(index, 1) : (attachments.value = []);
  }

  function setEmoji(emoji: any) {
    message.value ? (message.value += emoji) : (message.value = emoji);
  }

  function sendTyping(status: boolean, isAudio: boolean) {
    socket.value.emit(ChatSocketEvents.TYPING_MESSAGE, {
      chat_id: currentChat.value?.id,
      status,
      participant_id: currentParticipant.value?.id,
      isAudio,
    });
  }

  function createChat(name: string): Promise<IEmittedEventStatus> {
    return new Promise(resolve => {
      socket.value.emit(ChatSocketEvents.CREATE_CHAT, { name }, (response: IEmittedEventStatus) =>
        resolve(response),
      );
    });
  }

  function readMessage(message_id: string | number) {
    socket.value.emit(ChatSocketEvents.READ_MESSAGE, {
      chat_id: currentChat.value?.id,
      message_id,
    });
  }

  function readMessages() {
    socket.value.emit(ChatSocketEvents.READ_MESSAGES, { chat_id: currentChat.value?.id });
  }

  function deleteMessage(message_id: string | number) {
    socket.value.emit(ChatSocketEvents.DELETE_MESSAGE, {
      message_id,
      chat_id: currentChat.value?.id,
    });
  }

  function closeEditMsg() {
    pickedMsg.value = null;
    isEditMsgOpen.value = false;
    message.value = null;
  }

  function updateMessage() {
    socket.value.emit(ChatSocketEvents.UPDATE_MESSAGE, {
      message_id: pickedMsg.value?.id,
      text: message.value,
      chat_id: currentChat.value?.id,
    });
    closeEditMsg();
  }

  function openEditMessage() {
    if (pickedMsg.value?.text) {
      isEditMsgOpen.value = true;
      message.value = pickedMsg.value?.text;
    }
  }

  watch(activeAudioRecord, () => {
    if (activeAudioRecord.value) {
      sendTyping(true, true);
      return;
    }

    sendTyping(false, true);
  });

  return {
    message,
    attachments,
    attachmentsUrl,
    activeEmojiPicker,
    activeAudioRecord,
    sendMessage,
    setAttachments,
    sendTyping,
    deleteFile,
    setEmoji,
    typing,
    timeout,
    createChat,
    textarea,
    readMessage,
    readMessages,
    pickedMsg,
    deleteMessage,
    updateMessage,
    isEditMsgOpen,
    openEditMessage,
    closeEditMsg,
  };
}
