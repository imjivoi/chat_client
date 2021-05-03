import {useAuthStore} from "@/store/auth/useAuthStore";
import {ChatSocketEvents} from "@/store/chat/types/chat-socket";
import {toBase64} from "@/utils/base64encryption";
import {computed, inject, ref} from "vue";
import {useRoute} from "vue-router";
import {Socket} from "socket.io"
import notificationService from "@/services/notificationService";

export default function useChatInput() {
  const socket = inject('socket') as Socket
  const message = ref<string | null>(null);
  const attachments = ref<Array<File>>([]);
  const activeEmojiPicker = ref<boolean>(false);
  const activeAudioRecord = ref<boolean>(false);
  const typing = ref<boolean>(false);
  const timeout = ref<any | null>(null);
  const textarea = ref()

  const route = useRoute();
  const auth = useAuthStore();

  const attachmentsUrl = computed(() => {

    const result = attachments.value.map(attachment => {
      if (attachment.type.includes('image')) {
        console.log(attachment)
        return URL.createObjectURL(attachment)
      }
    })
    return result.filter(Boolean);
  });

  async function getBase64ArrayAttachments() {
    let attachArray = [] as string[];

    if (attachments.value.length) {
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
        (!attachments.value.length && !message.value)
      ) {
        return
      }


      typing.value = false;

      activeEmojiPicker.value = false;

      const attachmentsResult = await getBase64ArrayAttachments()

      const data = {
        text: message.value,
        chat_id: route.params.id,
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
      attachments.value = [];


    })
  }

  function setAttachments(files: any) {

    if (files.length > 5) return notificationService.error('Can be uploaded more 5 images')
    if (files.type) {
      attachments.value.push(files);
    } else {
      attachments.value = [...files];
    }
  }
//todo:ограничить время записи аудиосообщения 30 сек
  function deleteFile(index: number | 'all') {
    typeof index === 'number'
      ? attachments.value?.splice(index, 1)
      : attachments.value.length = 0
  }

  function setEmoji(emoji: any) {
    message.value ? (message.value += emoji) : (message.value = emoji);
  }

  function sendTyping(status: boolean) {
    socket.emit(ChatSocketEvents.TYPING_MESSAGE, {
      chat_id: route.params.id,
      status: status,
      nickname: auth.userData?.username,
    });
  }

  function createChat(name: string) {
    socket.emit(ChatSocketEvents.CREATE_CHAT, {name})
  }


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
    textarea
  };
}
