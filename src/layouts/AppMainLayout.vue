<template>
  <Spinner v-if="isLoading" height="100vh" text="Loading..." width="100vw"/>

  <div v-else class="content">
    <SideBar/>
    <div class="wrapper">
      <h2>{{ routeTitle }}</h2>
      <router-view/>
    </div>
  </div>
  <Modal/>

</template>

<script lang="ts">
import Modal from "@/components/common/Modal.vue";
import SideBar from "@/components/common/Sidebar.vue";
import Spinner from "@/components/common/Spinner.vue";

import {useSocket} from "@/composable";
import {useRoute} from "vue-router";

import {computed, defineComponent, onMounted, provide} from "vue";
import {useAuthStore, useChatStore} from "@/store";
import {ChatSocketEvents} from "@/store/chat/types/chat-socket";
import {IMessage} from "@/store/chat/types/message";
import {IChatItem, IChatState} from "@/store/chat/types/chat";

export default defineComponent({
  name: "AppLayoutDefault",
  components: {SideBar, Spinner, Modal},
  setup() {
    const auth = useAuthStore();
    const chat = useChatStore()
    const route = useRoute();
    const routeTitle = computed(() => route.meta.title);
    const {socket} = useSocket("127.0.0.1:30");
    const isLoading = computed(() => auth.isLoading);
    provide("socket", socket);

    onMounted(() => {
      console.log(chat)
      socket.on(ChatSocketEvents.NEW_MESSAGE, (message: IMessage) => {
      });
      socket.on(ChatSocketEvents.CREATE_CHAT, (newChat: IChatItem) => {
        chat.list.push(newChat)
      })
      socket.on(ChatSocketEvents.FETCH_CHATS, (chats: IChatState) => {
        chat.$patch({
          list:chats.list,
          count:chats.count
        })
      })

    })

    return {routeTitle, isLoading};
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 0 0 0 230px;
  padding: 50px 35px 0 35px;
  height: 100vh;
  overflow: hidden;
  position: relative;

  h2 {
    margin: 0 0 50px;
    font-size: 28px;
  }

  @media only screen and (max-width: 756px) {
    margin: 0;
    padding: 50px 20px 0 20px;
  }
}
</style>
