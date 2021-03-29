<template>
  <div v-if="isLoading" class="empty">
    <Spinner height="100%"/>
  </div>

  <template v-else>
    <div v-if="chatCount" class="flex justify-between" style="height:88%">
      <div style="width:300px">
        <div class="mb-2">
          <el-input
            v-model="search"
            placeholder="Find chat"
            prefix-icon="el-icon-search">
          </el-input>
          <ul class="chats__items">
            <ChatItem
              v-for="chat in chatsList"
              :id="chat._id"
              :key="chat._id"
              :last_message="chat.last_message"
              @click="toChat(chat._id)"
            />
          </ul>
        </div>
      </div>
      <div class="chat__content">
        <router-view/>
        <p v-if="!$route.params.id">Choose a chat</p>
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
import {Search} from "@/components/icons";
import CustomInput from "@/components/common/Input.vue";
import ChatItem from "@/components/chat/ChatItem.vue";
import Spinner from "@/components/common/Spinner.vue";

import {computed, defineComponent, ref} from "vue";
import {useChatStore, useModal} from "@/store";
import {useRouter} from "vue-router";

export default defineComponent({
  components: {Spinner, CustomInput, Search, ChatItem},
  name: "Chats",
  setup() {
    const search = ref("");
    const isLoading = ref(false);
    const router = useRouter()
    const modal = useModal()
    const chat = useChatStore()
    const chatsList = computed(() => chat.list)
    const chatCount = computed(() => chat.count)

    const showModal = () => {
      modal.SHOW('Chat')
    }

    function toChat(id: string) {
      router.push({name: 'Chat', params: {id}})
    }

    return {
      isLoading,
      search,
      chatsList,
      chatCount,
      showModal,
      toChat
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
  overflow-x: hidden;
}
</style>
