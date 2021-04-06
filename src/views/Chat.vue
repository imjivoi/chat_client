<template>
  <div class="flex justify-between">
    <ChatContainer/>
    <ChatInfo/>
  </div>
</template>
<script>
import ChatInfo from "@/components/chat/ChatInfo";
import ChatContainer from "@/components/chat/ChatContainer";
export default {
  components:{ChatContainer,ChatInfo}
}
</script>

