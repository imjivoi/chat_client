import { IAttachments } from "@/store/interfaces/chat";
import { ChatSocketEvents } from "@/store/interfaces/chat-socket";
import { toBase64 } from "@/utils/base64encryption";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "./useStore";

export default function useChatInput(socket: any) {
  const message = ref<string | null>(null);
  const attachments = ref<Array<File>>([]);
  const activeEmojiPicker = ref<boolean>(false);
  const activeAudioRecord = ref<boolean>(false);
  const typing = ref<boolean>(false);
  const timeout = ref<any | null>(null);

  const route = useRoute();
  const store = useStore();

  console.log(route);
  const attachmentsUrl = computed(() => {
    let newArr = [];
    for (let i = 0; i < attachments.value.length; i++) {
      if (attachments.value[i].type.includes("file")) {
        newArr.push({
          name: attachments.value[i].name,
          type: "file",
        });
      } else if (attachments.value[i].type.includes("image")) {
        newArr.push({
          link: URL.createObjectURL(attachments.value[i]),
          type: "image",
        });
      }
    }
    return newArr;
  });

  async function sendMessage(e: any) {
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
          await toBase64(attachments.value[i]).then((res: any) => {
            attachArray.push(res);
          });
        }
      }

      socket.emit(ChatSocketEvents.NEW_MESSAGE, {
        text: message.value,
        chat_id: route.params.id,
        attachments: attachments.value,
      });

      message.value = null;
      attachments.value = [];
    }
  }

  function setAttachments(files: any) {
    if (files.type) {
      attachments.value.push(files);
    } else {
      attachments.value = [...files];
    }
  }
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
      nickname: store.getters.userData?.nickname,
    });
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
  };
}
