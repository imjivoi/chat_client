<template>
  <CutomInput>
    <template v-slot:icon> <Search class="svg" /> </template>
  </CutomInput>
  <ul class="chats__items">
    <ChatItem
      v-for="chat in chats"
      :key="chat._id"
      :last_message="chat.last_message"
      :id="chat._id"
      @click="toChat(chat._id)"
    />
  </ul>
</template>

<script>
import { Search } from "@/components/icons";
import CutomInput from "../common/Input.vue";
import ChatItem from "./ChatItem.vue";

export default {
  components: { CutomInput, Search, ChatItem },
};
</script>
<style lang="scss" scoped>
.chats__items {
  margin: 20px 0 0;
  height: 85%;
  overflow-y: auto;
  width: 106%;
  padding: 0 15px 0 0;
}
</style>
