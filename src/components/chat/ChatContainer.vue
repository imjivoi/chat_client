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
        <Button is-icon icon="edit" @click="openEditMessage" />
        <Button is-icon icon="trash" @click="deleteMsg" />
      </div>
      <div class="chat__options" v-else>
        <PopOver v-if="imAdmin">
          <div class="pop-item">{{ $t('Create voice room') }}</div>
          <div class="pop-item" @click="removeChat">{{ $t('Delete chat') }}</div>
          <div class="pop-item" @click="updChat">{{ $t('Rename chat') }}</div>
        </PopOver>
      </div>
    </div>
    <div class="chat__messages">
      <div ref="content" class="chat__messages-content ">
        <transition-group name="fade-to-top">
          <Message
            v-for="message in chat.messages"
            :key="message.id"
            :messageData="message"
            :is-me="message.sender.id === currentParticipant.id"
            :is-picked="pickedMsg?.id === message.id"
            @pickMsg="pickMsg"
          />
        </transition-group>
        <transition name="fade-to-top">
          <TypingMessage
            v-if="chat.typing?.status && typingUser.id !== currentParticipant.id"
            :user="typingUser.user"
            :is-audio="chat.typing.isAudio"
          />
        </transition>
      </div>
    </div>
    <ChatInput />
  </div>

  <Spinner v-else />
</template>

<script lang="ts">
import PopOver from '@/components/ui/Popover.vue';
import TypingMessage from './TypingMessage.vue';
import OptionsIcon from '../icons/Options.vue';
import AdjustmentIcon from '../icons/Adjustment.vue';
import Spinner from '../common/Spinner.vue';
import Message from '../chat/Message.vue';
import ChatInput from '../chat/ChatInput.vue';

import { computed, defineComponent, nextTick, PropType, ref, toRefs, watch } from 'vue';
import { IChatItem, IParticipant } from '@/store/chat/types/chat';
import { onMounted } from '@vue/runtime-core';
import { useChatData, useChatInput } from '@/composable';
import { IMessage } from '@/store/chat/types/message';
import Button from '@/components/ui/Button.vue';
import { i18n } from '@/resource/i18n';

export default defineComponent({
  name: 'ChatContainer',
  components: {
    Button,
    ChatInput,
    Message,
    Spinner,
    AdjustmentIcon,
    OptionsIcon,
    TypingMessage,
    PopOver,
  },
  props: {
    chat: {
      type: Object as PropType<IChatItem>,
      required: true,
    },
    currentParticipant: {
      type: Object as PropType<IParticipant>,
      required: true,
    },
  },
  setup(props) {
    const { chat } = toRefs(props);
    const content = ref();
    const { pickedMsg, deleteMessage, openEditMessage, closeEditMsg } = useChatInput();
    const { deleteChat, updateChat, imAdmin } = useChatData();

    const typingUser = computed(() =>
      chat.value.participants.find(
        participant => participant.id === chat.value?.typing?.participant_id,
      ),
    );

    function toBottom() {
      nextTick(() => {
        if (content.value) content.value.scrollTop = content.value.scrollHeight;
      });
    }

    function pickMsg(message: IMessage) {
      if (pickedMsg.value?.id === message.id) {
        pickedMsg.value = null;
        return;
      }
      pickedMsg.value = message;
    }

    function deleteMsg() {
      if (pickedMsg.value?.id && confirm('Do you really want to delete message?')) {
        deleteMessage(pickedMsg.value.id);
        pickedMsg.value = null;
        closeEditMsg();
      }
    }

    function removeChat() {
      if (confirm(i18n.global.t('Are you really want to delete this chat?')))
        deleteChat(chat.value.id);
    }

    function updChat() {
      const name = prompt(i18n.global.t('Enter new chat name'));
      if (name) updateChat(name);
    }

    onMounted(() => toBottom());

    watch(
      chat,
      () => {
        toBottom();
      },
      { deep: true, immediate: true },
    );

    return {
      content,
      typingUser,
      pickedMsg,
      pickMsg,
      deleteMsg,
      openEditMessage,
      removeChat,
      updChat,
      imAdmin,
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
  height: calc(100vh - 160px);
  border-radius: 10px;
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
    color: $primary;
    font-weight: 500;
  }

  .chat__options {
    display: flex;

    button {
      height: 60px;
      width: 60px;
      background: #fff;
      border: none;
      box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.03), 0px 7px 25px rgba(42, 139, 242, 0.03),
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
  transition: all 0.5s;

  padding: 10px 0 0 20px;

  &-content {
    overflow-y: scroll;
    height: calc(100vh - 160px);
    overflow-x: hidden;
    position: relative;
    padding: 80px 0 70px;
    transition: all 0.5s;
    &::-webkit-scrollbar-track-piece {
      background-color: #fff;
      margin-top: 70px;
      margin-bottom: 70px;
    }
  }
}
</style>
