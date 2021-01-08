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
        <ChatItem
          v-for="chat in chats"
          :key="chat.id"
          :chat="chat"
          :userId="userId"
        />
      </ul>
    </div>
    <div class="chat__content">
      <router-view />
      <p v-if="!route.params.id">Choose a chat</p>
    </div>
  </section>
</template>

<script lang='ts'>
import Chat from "./Chat.vue";
import ChatItem from "../components/chat/ChatItem.vue";

import InputText from "primevue/inputtext";

import { computed, defineComponent, ref } from "vue";
import { useStore } from "@/composition-api/useStore";
import { useRoute } from "vue-router";

export default defineComponent({
  components: { InputText, ChatItem, Chat },
  name: "Chats",
  setup() {
    const search = ref("");

    const route = useRoute();

    const store = useStore();
    const chats = computed(() => store.getters.chats);
    const userId = store.getters.userData?.id;

    return {
      chats,
      search,
      userId,
      route,
    };
  },
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
  padding: 20px 3px 20px 10px;
  width: 60%;

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--primary-color);
    font-size: 2em;
  }
}
</style>