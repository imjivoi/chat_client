<template>
  <div class="empty" v-if="isLoading"><Spinner height="100%" /></div>

  <template v-else>
    <div class="flex " style="height:88%" v-if="chat.count">
      <div style="width:300px">
        <div class="mb-2">
          <el-input
            placeholder="Find chat"
            prefix-icon="el-icon-search"
            v-model="search">
          </el-input>
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
      </div>
      <div class="chat__content">
        <router-view />
        <p v-if="!$route.params.id">Choose a chat</p>
      </div>
    </div>
    <div v-else style="height:88%" class="mt-5">
      <h3>Click button to create chat</h3>
      <el-button icon="el-icon-plus" type="primary" class="mt-2" @click="showModal">Create chat</el-button>
    </div>
  </template>
</template>

<script lang="ts">
import { Search } from "@/components/icons";
import CustomInput from "@/components/common/Input.vue";
import ChatItem from "@/components/chat/ChatItem.vue";
import Spinner from "@/components/common/Spinner.vue";

import {defineComponent, inject, ref} from "vue";
import {useChatStore, useModal} from "@/store";

export default defineComponent({
  components: { Spinner,  CustomInput, Search, ChatItem },
  name: "Chats",
  setup() {
    const search = ref("");
    const isLoading = ref(false);
    const modal=useModal()
    const chat=useChatStore()

    const showModal=()=>{
      modal.SHOW('Chat')
    }
    return {
      isLoading,
      search,
      chat,
      showModal
    };
  },
});
</script>

<style scoped lang="scss">
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
.chats__items {
  margin: 20px 0 0;
  height: 85%;
  overflow-y: auto;
  width: 106%;
  padding: 0 15px 0 0;
}
</style>
