<template>
  <section class="chats p-d-flex p-jc-between">
    <div class="chats__list">
      <h2 class="p-mb-2">Chats</h2>
      <div class="chats__search p-mb-3" style="text-align: left">
        <span class="p-input-icon-left" style="width: 100%">
          <i class="pi pi-search" />
          <InputText
            type="text"
            v-model="search"
            placeholder="Search"
            class="p-inputtext-sm"
            style="width: 100%"
          />
        </span>
      </div>
      <ul class="chats__items">
        <ChatItem />
      </ul>
    </div>
    <div class="chat__content">
      <!-- <router-view /> -->
      <Chat />
    </div>
  </section>
</template>

<script lang='ts'>
import Chat from "./Chat.vue";
import ChatItem from "../components/chat/ChatItem.vue";

import InputText from "primevue/inputtext";

import { defineComponent } from "vue";

export default defineComponent({
  components: { InputText, ChatItem, Chat },
  name: "Chats",
  data: () => ({
    search: "",
  }),
});
</script>

<style scoped lang='scss'>
.chats {
  height: 100%;

  &__list {
    width: 300px;
    @include block_mixin;
  }
}

.chat__content {
  @include block_mixin;
  min-width: 600px;
  position: relative;
}
</style>