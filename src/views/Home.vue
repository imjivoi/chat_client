<template>
  <section class="home">
    <Sidebar />
    <div class="container">
      <router-view></router-view>
    </div>
  </section>
</template>

<script lang="ts">
import InputText from "primevue/inputtext";
import Button from "../components/Button.vue";
import Sidebar from "../components/Sidebar.vue";

import { defineComponent, inject, onMounted, provide } from "vue";
import { useStore } from "@/composition-api/useStore";
import { ChatSocketEvents } from "@/store/interfaces/chat-socket";
import { AllMutationTypes } from "@/store/types/mutations.types";
import useSocket from "@/composition-api/useSocket";
import { AllActionTypes } from "@/store/types/actions.types";
export default defineComponent({
  name: "Home",
  components: { Sidebar, Button, InputText },

  setup() {
    const store = useStore();
    const { socket } = useSocket("127.0.0.1:80");
    provide("socket", socket);

    onMounted(async () => {
      //@ts-ignore
      socket.on(ChatSocketEvents.FETCH_CHATS, (data: any) => {
        store.dispatch(AllActionTypes.SET_CHATS, data);
      });
    });

    return {};
  },
});
</script>
<style lang="scss" scoped>
.container {
  // padding: 5px 10px 5px 60px;
  height: calc(100vh - 53px);
}
</style>
