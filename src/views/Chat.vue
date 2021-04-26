<template>
  <div class="flex justify-between">
    <ChatContainer :chat="currentChat" :user="user"/>
    <ChatInfo/>
  </div>
</template>
<script>
import ChatInfo from "@/components/chat/ChatInfo";
import ChatContainer from "@/components/chat/ChatContainer";

import {defineComponent, onBeforeUpdate, watchEffect} from "vue";
import {useChatData} from "@/composable";

export default defineComponent({
  components: {ChatContainer, ChatInfo},
  setup() {

    const {user, currentChat, updateMessages, getInvite,currentParticipant} = useChatData()

    watchEffect(() => {
      updateMessages()
      getInvite()

    }, {flush: 'post'})

    //TODO:route protect
    return {
      user, currentChat,currentParticipant
    }
  },

})
</script>

