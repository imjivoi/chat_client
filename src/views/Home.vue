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

import {
  defineComponent,
  onBeforeMount,
  onMounted,
  onUnmounted,
  provide,
} from "vue";
import { useChatSocket } from "@/composition-api/sockets/useChatSocket";
import { useStore } from "@/composition-api/useStore";
import { AllActionTypes } from "@/store/types/actions.types";

export default defineComponent({
  name: "Home",
  components: { Sidebar, Button, InputText },

  setup() {
    const { connect_socket, disconnect_socket } = useChatSocket;
    const store = useStore();
    async function createChat() {
      console.log(11);
      const res = await store.dispatch(AllActionTypes.CREATE_CHAT);
      console.log(res);
    }
    provide("socket", useChatSocket);
    onMounted(() => connect_socket());
    onUnmounted(() => disconnect_socket());

    return { createChat };
  },
});
</script>
<style lang="scss" scoped>
.container {
  // padding: 5px 10px 5px 60px;
  height: calc(100vh - 53px);
}
.donthavechats {
  position: relative;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #fff;
  opacity: 0.8;
  padding: 170px 0 0;
  h2 {
    font-size: 32px;
    text-align: center;
  }
}
</style>
