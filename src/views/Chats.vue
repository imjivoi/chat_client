<template>
  <section class="chats p-d-flex ">
    <div class="empty" v-if="isLoading"><Spinner height="100%" /></div>

    <template v-else>
      <div class="chats__list">
        <div class="chats__header p-mb-2">
          <h2>Chats</h2>
          <Button label="Create New Chat">
            <template v-slot:icon>
              <Plus />
            </template>
          </Button>
        </div>
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
      </div>
      <div class="chat__content">
        <router-view />
        <p v-if="!$route.params.id">Choose a chat</p>
      </div>
    </template>
  </section>
</template>

<script lang="ts">
import Plus from "../components/icons/Plus.vue";
import Button from "../components/Button.vue";
import Search from "../components/icons/Search.vue";
import CutomInput from "../components/Input.vue";
import Spinner from "../components/Spinner.vue";
import Chat from "./Chat.vue";
import ChatItem from "../components/chat/ChatItem.vue";

import {
  computed,
  defineComponent,
  inject,
  onMounted,
  provide,
  ref,
} from "vue";
import { useStore } from "@/composition-api/useStore";
import { useRoute, useRouter } from "vue-router";
import { AllActionTypes } from "@/store/types/actions.types";
import { ChatSocketEvents } from "@/store/interfaces/chat-socket";
import { AllMutationTypes } from "@/store/types/mutations.types";

export default defineComponent({
  components: { ChatItem, Chat, Spinner, CutomInput, Search, Button, Plus },
  name: "Chats",
  setup() {
    const search = ref("");
    const isLoading = ref(false);

    const router = useRouter();
    const store = useStore();
    const chats = computed(() => store.getters.chats);
    const userId = store.getters.userData?._id;
    function toChat(id: string) {
      router.push({ name: "Chat", params: { id } });
    }

    return {
      chats,
      search,
      userId,

      isLoading,
      toChat,
    };
  },
});
</script>

<style scoped lang="scss">
.chats {
  height: 100%;
  margin: 0 0 0 310px;
  padding: 90px 0 0;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h2 {
    font-size: 28px;
  }
  &__list {
    width: 300px;
  }

  &__items {
    margin: 20px 0 0;
    height: 85%;
    overflow-y: auto;
    width: 106%;
    padding: 0 15px 0 0;
  }
}

.chat__content {
  width: 65%;
  position: relative;
  margin: 0 0 0 80px;
  // background: #ffffff;
  border-radius: 6px;

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
