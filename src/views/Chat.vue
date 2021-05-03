<template>
  <div class="not-accepted" v-if="!currentParticipant.accepted">
    You are not accepted
    yet
  </div>
  <div class="flex justify-between" v-else>

    <ChatContainer :chat="currentChat" :user="user"/>
    <ChatInfo/>

  </div>
</template>
<script>
import ChatInfo from "@/components/chat/ChatInfo";
import ChatContainer from "@/components/chat/ChatContainer";

import {defineComponent, watchEffect} from "vue";
import {useChatData} from "@/composable";

export default defineComponent({
  name:'Chat',
  components: {ChatContainer, ChatInfo},
  setup() {

    const {
      user,
      currentChat,
      updateMessages,
      getInvite,
      currentParticipant
    } = useChatData()

    watchEffect(() => {
      updateMessages()
      getInvite()

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

