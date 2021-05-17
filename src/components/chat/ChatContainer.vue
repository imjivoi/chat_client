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
      <div class="chat__options" v-if="pickedMsg">
        <el-button icon="el-icon-edit" circle
                   @click="openEditMessage"></el-button>
        <el-popconfirm
          title="Are you sure to delete this message?"
          @confirm="deleteMsg"
        >
          <template #reference>
            <el-button icon="el-icon-delete-solid" circle></el-button>
          </template>
        </el-popconfirm>
      </div>

    </div>
    <div class="chat__messages">
      <div ref="content" class="chat__messages-content">
        <transition-group name="fade-to-top">
          <Message
            v-for="message in chat.messages"
            :key="message._id"
            :messageData="message"
            :is-me="message.sender._id===currentParticipant._id"
            :is-picked="pickedMsg?._id===message._id"
            @pickMsg="pickMsg"
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
import {useChatInput} from "@/composable";
import {IMessage} from "@/store/chat/types/message";

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
    const {pickedMsg, deleteMessage, openEditMessage} = useChatInput()


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

    function pickMsg(message: IMessage) {
      if (pickedMsg.value?._id === message._id) {
        pickedMsg.value = null
        return
      }
      pickedMsg.value = message
    }

    function deleteMsg() {
      if (pickedMsg.value?._id) {
        deleteMessage(pickedMsg.value._id)
        pickedMsg.value = null
      }
    }


    onMounted(()=>toBottom())

    watch(chat, () => {
      toBottom();
    }, {deep: true,immediate:true});


    return {

      content,
      typingUser,
      pickedMsg,
      pickMsg,
      deleteMsg,
      openEditMessage,


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
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 1px;
  z-index: 1;

  &:after {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background: #fff;
    filter: blur(5px);
    left: 0;
    top: 0;
    z-index: -1;
    opacity: 0.9;
  }

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

    .el-button {
      font-size: 18px;
    }
  }
}

.chat__messages {
  position: relative;

  padding: 10px 0 0 20px;

  &-content {
    overflow-y: scroll;
    height: calc(100vh - 130px);
    overflow-x: hidden;
    position: relative;
    padding: 80px 0 70px;

    &::-webkit-scrollbar-track-piece{
      background-color: #fff;
      margin-top: 70px;
      margin-bottom: 70px;
    }
  }
}
</style>
