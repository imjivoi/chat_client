<template>
  <div class="not-accepted"
       v-if="currentParticipant && !currentParticipant.accepted">
    You are not accepted
    yet
  </div>
  <template v-else>
    <div class="flex justify-between" v-if="currentChat">

      <ChatContainer :chat="currentChat"
                     :current-participant="currentParticipant"/>
      <ChatInfo/>

    </div>
  </template>

</template>
<script>
//todo:emoji
//todo:connect to chat when create,delete chat

import ChatInfo from "@/components/chat/ChatInfo";
import ChatContainer from "@/components/chat/ChatContainer";

import {useChatData, useChatInput} from "@/composable";

import {defineComponent, onUnmounted, watchEffect} from "vue";

export default defineComponent({
  name: 'Chat',
  components: {ChatContainer, ChatInfo},
  setup() {

    const {
      user,
      currentChat,
      updateMessages,
      getInvite,
      currentParticipant,
      unreadedMessages
    } = useChatData()
    const {readMessages, message} = useChatInput()


    onUnmounted(() => message.value = '')
    watchEffect(async () => {
      await updateMessages()
      await getInvite()
      if (unreadedMessages.value?.length) {
        readMessages()
      }
    }, {flush: 'post'})

    return {
      user, currentChat, currentParticipant
    }
  },


})
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

