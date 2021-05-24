<template>
  <div v-if="isLoading" class="empty">
    <Spinner height="100%"/>
  </div>

  <template v-else>

    <div v-if="chatCount" style="height:88%">
      <div class="chats__header flex justify-between align-center mb-1">
        <Button icon="plus" label="Create chat" @click="showModal"/>
      </div>
      <div style="width:100%">
        <div class="mb-2">
          <transition-group name="fade" tag="div" class="chats__items">
            <div class="chat-item-block" v-for="chat in chatsList"
                 :key="chat._id"

            >
              <ChatItem
                :id="chat._id"
                :created="chat.createdAt"
                :name="chat.name"
                :participants="chat.participants"
                @click="toChat(chat._id)"
                @contextmenu="openContextMenu($event,chat._id)"
              />
              <ContextMenu ref="contextMenu">
                <template v-if="getImAdmin(contextChatId)">
                  <div class="danger" @click="deleteChat"
                  >Delete
                  </div>
                  <div>Change name</div>
                </template>

                <div class="danger" @click="quitChat"
                     v-else>Quit
                </div>
              </ContextMenu>

            </div>
          </transition-group>

        </div>
      </div>
    </div>
    <div v-else class="mt-5" style="height:88%">
      <h3>Click button to create chat</h3>
      <Button class="mt-2" label="Create chat" @click="showModal"/>
    </div>
  </template>
</template>

<script lang="ts">
import Button from "@/components/ui/Button.vue";
import ContextMenu from "@/components/common/ContextMenu.vue";
import ChatItem from "@/components/chat/ChatItem.vue";
import Spinner from "@/components/common/Spinner.vue";

import {computed, defineComponent, inject, Ref, ref} from "vue";
import {useChatStore, useModal} from "@/store";
import {useRouter} from "vue-router";
import {ChatSocketEvents} from "@/store/chat/types/chat-socket";
import {Socket} from "socket.io";
import {useChatData} from "@/composable";
import {IEmittedEventStatus} from "@/composable/useChatInput";
import notificationService from "@/services/notificationService";
//todo:переименование чата, выход из чата
export default defineComponent({
  components: {Spinner, ChatItem, ContextMenu, Button},
  name: "ChatItems",
  setup() {
    const socket = inject('socket') as Ref<Socket>
    const isLoading = ref(false);
    const contextMenu = ref()
    const router = useRouter()
    const modal = useModal()
    const chat = useChatStore()
    const {getImAdmin} = useChatData()
    const chatsList = computed(() => chat.list)
    const chatCount = computed(() => chat.count)
    const contextChatId = ref<string>('')

    const showModal = () => {
      modal.SHOW('Chat')
    }

    function toChat(id: string) {
      router.push({name: 'Chat', params: {id}})
    }

    function openContextMenu(e: any, id: string) {
      contextChatId.value = id
      e.preventDefault()
      contextMenu.value.open(e)
    }

    function deleteChat() {
      socket.value.emit(ChatSocketEvents.DELETE_CHAT, {chat_id: contextChatId.value},
        (response: IEmittedEventStatus) => {
          if (!response.status) notificationService.error(response.message)
        }
      )
      contextMenu.value.close()
    }

    function quitChat() {
      socket.value.emit(ChatSocketEvents.QUIT_CHAT, {chat_id: contextChatId.value},
        (response: IEmittedEventStatus) => {
          if (!response.status) notificationService.error(response.message)
        })
      contextMenu.value.close()
    }

    return {
      isLoading,
      chatsList,
      chatCount,
      showModal,
      toChat,
      contextMenu,
      openContextMenu,
      deleteChat,
      getImAdmin,
      contextChatId,
      quitChat
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
      margin: 5px;
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
