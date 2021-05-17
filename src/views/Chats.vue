<template>
  <div v-if="isLoading" class="empty">
    <Spinner height="100%"/>
  </div>

  <template v-else>

    <div v-if="chatCount" style="height:88%">
      <div class="chats__header flex justify-between align-center mb-1">

        <el-button icon="el-icon-plus" type="primary"
                   @click="showModal">Create chat
        </el-button>
      </div>
      <div style="width:100%">
        <div class="mb-2">
          <ContextMenu ref="contextMenu">
            <el-button type="text" @click="deleteChat">Delete</el-button>
          </ContextMenu>
          <ul class="chats__items">
            <ChatItem
              v-for="chat in chatsList"
              :id="chat._id"
              :key="chat._id"
              :created="chat.createdAt"
              :name="chat.name"
              :participants="chat.participants"
              @click="toChat(chat._id)"
              @contextmenu="openContextMenu($event,chat._id)"
            />
          </ul>
        </div>
      </div>
    </div>
    <div v-else class="mt-5" style="height:88%">
      <h3>Click button to create chat</h3>
      <el-button class="mt-2" icon="el-icon-plus" type="primary"
                 @click="showModal">Create chat
      </el-button>
    </div>
  </template>
</template>

<script lang="ts">
import ContextMenu from "@/components/common/ContextMenu.vue";
import CustomInput from "@/components/common/Input.vue";
import ChatItem from "@/components/chat/ChatItem.vue";
import Spinner from "@/components/common/Spinner.vue";

import {computed, defineComponent, inject, Ref, ref} from "vue";
import {useChatStore, useModal} from "@/store";
import {useRouter} from "vue-router";
import {ChatSocketEvents} from "@/store/chat/types/chat-socket";
import {Socket} from "socket.io";
//todo:переименование чата, выход из чата
export default defineComponent({
  components: {Spinner, CustomInput, ChatItem, ContextMenu},
  name: "ChatItems",
  setup() {
    const socket = inject('socket') as Ref<Socket>
    const isLoading = ref(false);
    const contextMenu = ref()
    const router = useRouter()
    const modal = useModal()
    const chat = useChatStore()
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
      socket.value.emit(ChatSocketEvents.DELETE_CHAT, {chat_id: contextChatId.value}
      )
    }

    return {
      isLoading,
      chatsList,
      chatCount,
      showModal,
      toChat,
      contextMenu,
      openContextMenu,
      deleteChat
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

    li {
      margin: 5px;
      max-width: 300px;
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
    color: $color_blue;
    font-size: 2em;
  }
}


</style>
