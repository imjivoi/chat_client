<template>
  <div v-if="chat" class="chat">
    <div class="chat__header">
      <div class="chat__header-left">
        <!--        <el-avatar size="medium" sr></el-avatar>-->
        <div class="chat__info p-ml-5">
          <div class="chat__name">
            <h3>{{ chat.name }}</h3>
          </div>
        </div>
      </div>

      <div class="chat__options">
        <button>
          <AdjustmentIcon/>
        </button>
        <button>
          <OptionsIcon/>
        </button>
      </div>
    </div>
    <div class="chat__messages">
      <div ref="content" class="chat__messages-content" @scroll="scrollHandler">
        <transition-group name="fade-to-top">
          <Message
            v-for="message in chat.messages"
            :key="message._id"
            :messageData="message"
            :is-me="message.sender._id===currentParticipant._id"
          />

        </transition-group>
        <TypingMessage
          v-if="chat.typing?.status && typingUser._id!==currentParticipant._id"
          :username="typingUser.user.username"
          :is-audio="chat.typing.isAudio"
        />
      </div>
    </div>
    <ChatInput/>

  </div>

  <Spinner v-else/>
</template>

<script lang="ts">
import TypingMessage from "./TypingMessage.vue"
import OptionsIcon from "../icons/Options.vue";
import AdjustmentIcon from "../icons/Adjustment.vue";
import Spinner from "../common/Spinner.vue";
import Message from "../chat/Message.vue";
import ChatInput from "../chat/ChatInput.vue";

import {
  computed,
  defineComponent,
  nextTick,
  PropType,
  ref,
  toRefs,
  watch
} from "vue";
import {IChatItem, IParticipant} from "@/store/chat/types/chat";
import {onMounted} from "@vue/runtime-core";

export default defineComponent({
  name: "ChatContainer",
  components: {
    ChatInput,
    Message,
    Spinner,
    AdjustmentIcon,
    OptionsIcon,
    TypingMessage
  },
  props: {
    chat: {
      type: Object as PropType<IChatItem>,
      required: true
    },
    currentParticipant: {
      type: Object as PropType<IParticipant>,
      required: true
    }
  },
  setup(props) {
    const {chat} = toRefs(props)
    const content = ref()
    const scrollPosition = ref(0)


    const
      typingUser = computed(() =>
        chat.value.participants.find(participant =>
          participant._id === chat.value.typing?.participant_id))

    function toBottom() {
      nextTick(() => {
        if (content.value)
          content.value.scrollTop = content.value.scrollHeight;
      });
    }

    function scrollHandler(e: any) {
      scrollPosition.value = e.target?.scrollTop
    }

    onMounted(() => toBottom())

    watch(chat, () => {
      toBottom();
    }, {deep: true});


    return {

      content,
      typingUser,
      scrollHandler,
      scrollPosition

    };
  },
});
</script>

<style lang="scss" scoped>
.chat {
  min-width: 500px;
  width: 70%;
  position: relative;
  background: #fff;
  box-shadow: $box_shadow;
  height: calc(100vh - 120px);
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
  position: relative;

  padding: 10px 0 0 20px;

  &-content {
    overflow-y: scroll;
    height: calc(100vh - 290px);
    overflow-x: hidden;
    position: relative;
    padding: 5px 0 0;
  }
}
</style>
