<template>
  <div v-if="isLoading" class="empty">
    <Spinner height="100%" />
  </div>

  <template v-else>
    <div class="wrapper">
      <div v-if="chatCount" style="height:88%">
        <div class="chats__header flex justify-between align-center mb-10">
          <Button icon="plus" :label="$t('Create chat')" @click="showModal" />
        </div>
        <div style="width:100%">
          <div class="mb-2">
            <transition-group name="fade" tag="div" class="chats__items">
              <div class="chat-item-block" v-for="chat in chatsList" :key="chat.id">
                <ChatItem
                  :id="chat.id"
                  :created="chat.createdAt"
                  :name="chat.name"
                  :participants="chat.participants"
                  :last-message="chat.lastMessage"
                  @click="toChat(chat.id)"
                  @contextmenu="openContextMenu($event, chat.id)"
                />
                <ContextMenu ref="contextMenu">
                  <template v-if="getImAdmin(contextChatId)">
                    <div class="danger" @click="removeChat">{{ $t('Delete') }}</div>
                    <!-- <div>{{ $t('Change name') }}</div> -->
                  </template>

                  <div class="danger" @click="quitChat" v-else>{{ $t('Quit') }}</div>
                </ContextMenu>
              </div>
            </transition-group>
          </div>
        </div>
      </div>
      <div v-else class="mt-5" style="height:88%;text-align: center">
        <h3>{{ $t('You have not chats yet') }}</h3>
        <Button style="margin: 20px auto 0" :label="$t('Create')" @click="showModal" />
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import Button from '@/components/ui/Button.vue';
import ContextMenu from '@/components/common/ContextMenu.vue';
import ChatItem from '@/components/chat/ChatItem.vue';
import Spinner from '@/components/common/Spinner.vue';

import { computed, defineComponent, inject, Ref, ref } from 'vue';
import { useChatStore, useModal } from '@/store';
import { useRouter } from 'vue-router';
import { useChatData } from '@/composable';
//todo:переименование чата, выход из чата
export default defineComponent({
  components: { Spinner, ChatItem, ContextMenu, Button },
  name: 'Home',
  setup() {
    const isLoading = ref(false);
    const contextMenu = ref();
    const router = useRouter();
    const modal = useModal();
    const chat = useChatStore();
    const { getImAdmin, deleteChat } = useChatData();
    const chatsList = computed(() => chat.list);
    const chatCount = computed(() => chat.count);
    const contextChatId = ref<string>('');

    const showModal = () => {
      modal.SHOW('Chat');
    };

    function toChat(id: string) {
      router.push({ name: 'Chat', params: { id } });
    }

    function openContextMenu(e: any, id: string) {
      contextChatId.value = id;
      e.preventDefault();
      contextMenu.value.open(e);
    }

    async function removeChat() {
      try {
        await deleteChat(contextChatId.value);
      } catch (error) {
        contextMenu.value.close();
      }
    }

    async function quitChat() {
      try {
        await chat.EXIT_FROM_CHAT(contextChatId.value);
      } catch (error) {
        contextMenu.value.close();
      }
    }

    return {
      isLoading,
      chatsList,
      chatCount,
      showModal,
      toChat,
      contextMenu,
      openContextMenu,
      removeChat,
      getImAdmin,
      contextChatId,
      quitChat,
    };
  },
});
</script>

<style lang="scss" scoped>
.chats {
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
    display: flex;
    flex-wrap: wrap;

    .chat-item-block {
      margin: 0 10px 10px 0;
      max-width: 300px;
      width: 100%;
    }
  }
}

.chat__content {
  width: 65%;
  position: relative;
  // background: #ffffff;
  border-radius: 6px;
  height: 100%;

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: $primary;
    font-size: 2em;
  }
}
</style>
