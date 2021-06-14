<template>
  <div class="not-accepted" v-if="!currentParticipant">
    {{ $t('You are not accepted yet') }}
  </div>
  <template v-else>
    <div class="wrapper">
      <div class="flex justify-between" v-if="currentChat">
        <!-- <VoiceRoom /> -->
        <ChatContainer :chat="currentChat" :current-participant="currentParticipant" />
        <ChatInfo />
      </div>
    </div>
  </template>
</template>
<script lang="ts">
//todo:emoji
import VoiceRoom from '@/components/voice/VoiceRoom.vue';
import ChatInfo from '@/components/chat/ChatInfo.vue';
import ChatContainer from '@/components/chat/ChatContainer.vue';

import { useChatData, useChatInput, useSocket } from '@/composable';

import { defineComponent, onMounted, onUnmounted, provide } from 'vue';
import appConfig from '@/app.config';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Chat',
  components: { ChatContainer, ChatInfo, VoiceRoom },
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
    } = useChatData();
    const { readMessages, message } = useChatInput();
    const id = route.params.id as string;
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
    };
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
