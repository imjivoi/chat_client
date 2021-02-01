<template>
  <div v-show="!isLoading">
    <div class="chat__header">
      <div class="chat__header-left">
        <Avatar
          image="https://res.cloudinary.com/dqgfkzejx/image/upload/v1611968865/avatar/jivoi.jpg"
          nickname="nickname"
          size="54"
        />

        <div class="chat__info p-ml-5">
          <div class="chat__name">
            <h3>nickname</h3>
          </div>
          <div class="chat__status p-mt-1">{{ status }}</div>
        </div>
      </div>

      <div class="chat__options">
        <button><AdjustmentIcon /></button>
        <button><OptionsIcon /></button>
      </div>
    </div>
    <div class="chat__messages">
      <div class="chat__messages-content" ref="content">
        <Message
          v-for="message in messages"
          :key="message.id"
          :messageData="message"
          :isMe="false"
        />
        <Message
          v-for="message in messages"
          :key="message.id"
          :messageData="message"
          :isMe="true"
        />
      </div>
      <ChatInput />
    </div>
  </div>
  <Spinner
    height="100%"
    :textSize="0.6"
    text="Loading messages..."
    v-if="isLoading"
  />
</template>

<script lang="ts">
import OptionsIcon from "../components/icons/Options.vue";
import AdjustmentIcon from "../components/icons/Adjustment.vue";
import Spinner from "../components/Spinner.vue";
import Message from "../components/chat/Message.vue";
import Button from "../components/Button.vue";
import ChatInput from "../components/chat/ChatInput.vue";
import Avatar from "../components/Avatar.vue";

import { useStore } from "@/composition-api/useStore";
import { IMessage } from "../store/interfaces/message";

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
import { ChatSocketEvents } from "@/store/interfaces/chat-socket";
export default defineComponent({
  components: {
    ChatInput,
    Button,
    Avatar,
    Message,
    Spinner,
    AdjustmentIcon,
    OptionsIcon,
  },
  data: () => ({
    messages: [
      {
        id: "34345dsdg",
        text: "some text",
        created: "345346",
        attachments: [],
        user: {
          avatar:
            "https://res.cloudinary.com/dqgfkzejx/image/upload/v1611968865/avatar/jivoi.jpg",
          nickname: "nickname",
        },
      },
    ],
  }),
  setup() {
    const store = useStore();
    const route = useRoute();
    const { state, send }: any = inject("socket");

    const isLoading = ref(false);

    const content = ref();

    const chatId = ref<string | string[]>(route.params.id);
    const user = computed(() => store.getters.userData);
    const chat = computed(() => store.getters.activeChat(chatId.value));
    const participants = computed(() =>
      chat.value?.participants.filter((i) => i.id !== user.value?.id)
    );
    const status = computed(() => {
      if (
        chat.value?.typing &&
        chat.value.typing.status &&
        chat.value.typing.nickname !== user.value?.nickname
      ) {
        return `${chat.value.typing.nickname} is typing ...`;
      } else if (state.status === "OPEN") {
        //@ts-ignore

        return participants.value[0].is_online
          ? "online" //@ts-ignore
          : participants.value[0].last_login;
      } else {
        return state.status + "...";
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

    // onMounted(async () => {
    //   await fetchMessages();
    //   send({
    //     event: ChatSocketEvents.MESSAGE_STATUS,
    //     data: {
    //       chat_id: chatId.value,
    //       user_id: store.getters.userData?.id,
    //     },
    //   });
    // });

    onBeforeRouteUpdate(async (to, from) => {
      if (to.params.id !== from.params.id) {
        isLoading.value = true;
        chatId.value = to.params.id;
        await fetchMessages();
      }
    });

    watch(chat, () => toBottom(), { deep: true });

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

<style scoped lang="scss">
.chat__header {
  width: 100%;
  height: 80px;
  padding: 10px 20px;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 1px;
  background: #fff;

  &-left {
    display: flex;
    align-items: center;
    text-align: left;
  }
  .chat__name {
    font-size: 14px;
    margin: 0 0 6px;
  }
  .chat__status {
    font-size: 12px;
    color: $color_blue;
    font-weight: 500;
  }

  .chat__options {
    display: flex;
    button {
      width: 52px;
      height: 52px;
      background: #fff;
      border: none;
      box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.03),
        0px 7px 25px rgba(42, 139, 242, 0.03),
        0px 5px 25px rgba(42, 139, 242, 0.07);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      cursor: pointer;

      &:focus,
      &:active {
        outline: none;
      }

      &:first-child {
        margin: 0 20px 0 0;
      }
    }
  }
}
.chat__messages {
  padding: 10px 20px 0;
  background: #fff;
  position: relative;
  height: calc(100vh - 200px);
  box-shadow: $box_shadow;

  &-content {
    overflow-y: scroll;
    height: calc(100vh - 290px);
    overflow-x: hidden;
    position: relative;
  }
}
</style>
