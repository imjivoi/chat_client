import {useAuthStore} from "@/store/auth/useAuthStore";
import {IAttachments} from "@/store/chat/types/chat";
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
    let newArr = [];
    for (let i = 0; i < attachments.value.length; i++) {
      newArr.push(
        URL.createObjectURL(attachments.value[i])
      );

    }
    return newArr;
  });

  function sendMessage(e: any) {
    return new Promise((resolve, reject) => {
      if (!e.shiftKey && e.which === 13) {
        e.preventDefault();
      }
      if (
        (message.value && message.value !== "\n") ||
        !!attachments.value.length
      ) {
        typing.value = false;

        activeEmojiPicker.value = false;
        const attachArray = [] as IAttachments[];

        if (attachments.value.length) {
          for (let i = 0; i < attachments.value.length; i++) {
            toBase64(attachments.value[i]).then((res: any) => {
              attachArray.push(res);
            });
          }
        }

        socket.emit(
          ChatSocketEvents.NEW_MESSAGE, {
            text: message.value,
            chat_id: route.params.id,
            attachments: attachments.value,
          }
        );
        resolve(true)
        reject(false)
        textarea.value.focus()
        message.value = null;
        attachments.value = [];
      }

    })
  }

  function setAttachments(event: any) {
    const files = event.target.files
    if(files.length>5) return notificationService.error('Can be uploaded more 5 images')
    if (files.type) {
      attachments.value.push(files);
    } else {
      attachments.value = [...files];
    }
  }
  //todo: отправка и сохранение фото
  //todo: аудиосообщения
  function deleteFile(index: number) {
    attachments.value?.splice(index, 1);
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
