<template>
  <div v-if="currentChat" class="chat">
    <div class="chat__header">
      <div class="chat__header-left">
        <!--        <el-avatar size="medium" sr></el-avatar>-->
        <div class="chat__info p-ml-5">
          <div class="chat__name">
            <h3>{{ currentChat.name }}</h3>
          </div>
          <div class="chat__status p-mt-1">{{ status }}</div>
        </div>
      </div>

      <div class="chat__options">
        <button>
          <AdjustmentIcon/>
        </button>
        <button @click="dialogVisible=true">
          <OptionsIcon/>
        </button>
      </div>
    </div>
    <div class="chat__messages">
      <div ref="content" class="chat__messages-content">
        <Message
          v-for="message in currentChat.messages"
          :key="message.id"
          :messageData="message"
          :isMe="message.sender.user._id===user.userData._id"
        />
      </div>
      <ChatInput/>
    </div>
  </div>

  <Spinner v-else/>
</template>

<script lang="ts">
import OptionsIcon from "../icons/Options.vue";
import AdjustmentIcon from "../icons/Adjustment.vue";
import Spinner from "../common/Spinner.vue";
import Message from "../chat/Message.vue";
import ChatInput from "../chat/ChatInput.vue";

import {computed, defineComponent, nextTick, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useAuthStore, useChatStore} from "@/store";
import chatAPI from "@/api/chatAPI";

export default defineComponent({
  name: "ChatContainer",
  components: {
    ChatInput,
    Message,
    Spinner,
    AdjustmentIcon,
    OptionsIcon,
  },
  setup() {
    const user = useAuthStore();
    const chat = useChatStore()
    const route = useRoute();
    const content = ref();

    const dialogVisible = ref(false)

    const chatId = computed(() => route.params.id);
    const currentChat = computed(() => chat.list.find(chat => chat._id === chatId.value));

    const participants = computed(() =>
      currentChat.value?.participants.filter((i) => i._id !== user.userData?._id)
    );
    const status = computed(() => {
      if (
        currentChat.value?.typing &&
        currentChat.value.typing.status &&
        currentChat.value.typing.nickname !== user.userData?.username
      ) {
        return `${currentChat.value.typing.nickname} is typing ...`;
      } else {
        return "connecting";
      }
    });

    async function createInvite() {
      const today = new Date()
      const tomorrow = new Date(today)
      const expiresAt = tomorrow.setDate(tomorrow.getDate() + 1)
      const res = await chatAPI.createInvite(chatId.value, expiresAt)
      console.log(res)
    }


    function toBottom() {
      nextTick(() => {
        if (content.value)
          content.value.scrollTop = content.value.scrollHeight;
      });
    }


    watch(() => currentChat, () => toBottom(), {deep: true});

    return {

      currentChat,
      user,
      chatId,
      status,
      participants,
      content,
      dialogVisible,
      createInvite
    };
  },
});
</script>

<style lang="scss" scoped>
.chat {
  min-width: 500px;
  width: 70%;
}

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
