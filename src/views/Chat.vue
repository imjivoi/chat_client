<template>
  <div class="not-accepted" v-if="!currentParticipant">
    {{ $t('You are not accepted yet') }}
  </div>
  <template v-else>
    <div class="flex justify-between" v-if="currentChat">
      <ChatContainer :chat="currentChat" :current-participant="currentParticipant" />
      <ChatInfo />
    </div>
  </template>
</template>
<script>
//todo:emoji

import ChatInfo from '@/components/chat/ChatInfo';
import ChatContainer from '@/components/chat/ChatContainer';

import { useChatData, useChatInput, useSocket } from '@/composable';

import { defineComponent, onMounted, onUnmounted, provide } from 'vue';
import appConfig from '@/app.config';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { i18n } from '@/resource/i18n';

export default defineComponent({
  name: 'Chat',
  components: { ChatContainer, ChatInfo },
  setup() {
    const route = useRoute();
    const {
      user,
      currentChat,
      updateMessages,
      getInvite,
      currentParticipant,
      unreadedMessages,
      imAdmin,
      deleteChat,
    } = useChatData();
    const { readMessages, message } = useChatInput();
    const id = route.params.id;
    const { socket } = useSocket(appConfig.socketUrl + '/chat', id);

    provide('socket', socket);

    onUnmounted(() => {
      message.value = '';
    });
    onMounted(async () => {
      await updateMessages();
      await getInvite();
      if (unreadedMessages.value?.length) {
        readMessages();
      }
    });

    return {
      user,
      currentChat,
      currentParticipant,
      imAdmin,
      deleteChat,
    };
  },
  async beforeRouteLeave(to, from, next) {
    if (!this.imAdmin) return;
    if (
      this.imAdmin &&
      confirm(this.$t('Are you really want to leave chat? All data of chat will be deleted'))
    ) {
      await this.deleteChat();
      next();
    }
    next(false);
  },
});
</script>
<style>
.not-accepted {
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 42px;
  font-weight: 600;
}
</style>
