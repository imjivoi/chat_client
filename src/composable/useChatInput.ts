import {ChatSocketEvents} from "@/store/chat/types/chat-socket";
import {toBase64} from "@/utils/base64encryption";
import {computed, inject, ref, watch} from "vue";
import {Socket} from "socket.io"
import notificationService from "@/services/notificationService";
import {useChatData} from "@/composable/index";

export default function useChatInput() {
  const socket = inject('socket') as Socket
  const message = ref<string | null>(null);
  const attachments = ref<Array<File> | null>([]);
  const activeEmojiPicker = ref<boolean>(false);
  const activeAudioRecord = ref<boolean>(false);
  const typing = ref<boolean>(false);
  const timeout = ref<any | null>(null);
  const textarea = ref()

  const {currentParticipant, currentChat} = useChatData()

  const attachmentsUrl = computed(() => {

    const result = attachments.value?.map(attachment => {
      if (attachment.type.includes('image')) {

        return URL.createObjectURL(attachment)
      }
    })
    return result?.filter(Boolean);
  });

  async function getBase64ArrayAttachments() {
    let attachArray = [] as string[];

    if (attachments.value?.length) {
      for (let i = 0; i < attachments.value.length; i++) {
        await toBase64(attachments.value[i])
          .then((res: any) =>
            attachArray.push(res)
          );
      }
    }
    return attachArray
  }

  function sendMessage(e: any) {
    return new Promise(async (resolve, reject) => {
      if (!e?.shiftKey && e?.which === 13) {
        e.preventDefault();
      }
      if (
        (message.value && message.value.trim() === "") ||
        (!attachments.value && !message.value)
      ) {
        return
      }

      typing.value = false;

      activeEmojiPicker.value = false;

      const attachmentsResult = await getBase64ArrayAttachments()

      const data = {
        text: message.value,
        chat_id: currentChat.value?._id,
        attachments: attachmentsResult,
      }
      console.log(data)
      socket.emit(
        ChatSocketEvents.NEW_MESSAGE, data
      );
      resolve(true)
      reject(false)
      textarea.value.focus()
      message.value = null;
      attachments.value = null;


    })
  }

  function setAttachments(files: any) {

    if (files.length > 5) return notificationService.error('Can be uploaded more 5 images')
    if (files.type) {
      attachments.value?.push(files);
    } else {
      attachments.value = [...files];
    }
  }

  function deleteFile(index: number | 'all') {
    typeof index === 'number'
      ? attachments.value?.splice(index, 1)
      : attachments.value = []
  }

  function setEmoji(emoji: any) {
    message.value ? (message.value += emoji) : (message.value = emoji);
  }

  function sendTyping(status: boolean, isAudio: boolean) {
    socket.emit(ChatSocketEvents.TYPING_MESSAGE, {
      chat_id: currentChat.value?._id,
      status,
      participant_id: currentParticipant.value?._id,
      isAudio
    });
  }

  function createChat(name: string) {
    socket.emit(ChatSocketEvents.CREATE_CHAT, {name})
  }

  function readMessage(message_id: string) {
    socket.emit(ChatSocketEvents.READ_MESSAGE, {chat_id: currentChat.value?._id, message_id})
  }

  function readMessages() {
    socket.emit(ChatSocketEvents.READ_MESSAGES, {chat_id: currentChat.value?._id})

  }

  watch(message, () => {
    message.value === "" ? (message.value = null) : message.value;
    clearInterval(timeout.value);
    if (!typing.value) {
      sendTyping(true, false);
    }

    typing.value = true;
    timeout.value = setTimeout(() => {
      typing.value = false;
      sendTyping(false, false);
    }, 3000);
  });

  watch(activeAudioRecord, () => {
    if (activeAudioRecord.value) {
      sendTyping(true, true)
      return
    }

    sendTyping(false, true)
  })


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
    readMessages
  };
}
