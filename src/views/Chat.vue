<template>
  <Spinner
    height="100%"
    :textSize="0.6"
    text="Loading messages..."
    v-if="isLoading"
  />

  <div v-else>
    <div class="chat__header">
      <div class="chat__header-left">
        <Avatar label="P" class="p-avatar-circle p-mr-2" />

        <div class="chat__info">
          <div class="chat__name">
            {{ chat.type === "D" ? participants[0].nickname : chat.title }}
          </div>
          <div class="chat__status p-mt-1">{{ status }}</div>
        </div>
      </div>

      <div class="chat__options">
        <Button>
          <template v-slot:icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g data-name="Layer 2">
                <g data-name="more-vertical">
                  <rect
                    width="24"
                    height="24"
                    transform="rotate(-90 12 12)"
                    opacity="0"
                  />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </g>
              </g>
            </svg>
          </template>
        </Button>
      </div>
    </div>
    <div class="chat__messages" ref="content">
      <Message
        v-for="message in chat.messages"
        :key="message.id"
        :messageData="message"
        :isMe="user.id === message.user.id ? true : false"
      />
    </div>
    <ChatInput :chatId="chatId" :user="user" />
  </div>
</template>

<script lang='ts'>
import Spinner from "../components/Spinner.vue";
import Message from "../components/chat/Message.vue";
import Button from "../components/Button.vue";
import ChatInput from "../components/chat/ChatInput.vue";

import { useStore } from "@/composition-api/useStore";
import { IMessage } from "../store/interfaces/message";

import Avatar from "primevue/avatar";

import {
  computed,
  defineComponent,
  inject,
  nextTick,
  onBeforeMount,
  onMounted,
  ref,
  watch,
} from "vue";
import { AllActionTypes } from "@/store/types/actions.types";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { ISocketResponseData } from "@/store/interfaces/chat";
export default defineComponent({
  components: { ChatInput, Button, Avatar, Message, Spinner },
  setup() {
    const store = useStore();
    const route = useRoute();
    const { state }: any = inject("socket");

    const isLoading = ref(true);

    const content = ref();

    const chatId = ref<string | string[]>(route.params.id);
    const user = computed(() => store.getters.userData);
    const chat = computed(() => store.getters.activeChat(chatId.value));
    const participants = computed(() =>
      chat.value?.participants.filter((i) => i.id !== user.value?.id)
    );
    const status = computed(() => {
      if (state.status === "OPEN") {
        //@ts-ignore

        participants.value[0].is_online //@ts-ignore
          ? participants.value[0].is_online //@ts-ignore
          : participants.value[0].last_login;
      } else {
        return state.status;
      }
    });

    async function fetchMessages() {
      if (chat.value && !chat.value?.messages.length) {
        //@ts-ignore
        await store.dispatch(AllActionTypes.GET_MESSAGES, chatId.value);
      }
      isLoading.value = false;
      toBottom();
    }

    function toBottom() {
      nextTick(() => {
        content.value.scrollTop = content.value.scrollHeight;
      });
    }

    onMounted(async () => {
      await fetchMessages();
    });

    onBeforeRouteUpdate(async (to, from) => {
      if (to.params.id !== from.params.id) {
        isLoading.value = true;
        chatId.value = to.params.id;
        await fetchMessages();
      }
    });

    watch(chat, () => setTimeout(() => toBottom(), 210));

    return {
      isLoading,
      chat,
      user,
      chatId,
      status,
      participants,
      content,
    };
  },
});
</script>

<style scoped lang='scss'>
.chat__header {
  width: 100%;
  height: 50px;
  box-shadow: 0 0 4px 0px #b8b8b8;
  padding: 10px 20px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;

  &-left {
    display: flex;
    text-align: left;
  }
  .chat__name {
    font-size: 0.9em;
  }
  .chat__status {
    font-size: 0.7em;
  }

  .chat__options {
  }
}
.chat__messages {
  overflow-y: scroll;
  margin: 40px 0 0px;
  height: calc(100vh - 190px);
  padding: 0 7px 20px 0;
  overflow-x: hidden;
  position: relative;
}
</style>