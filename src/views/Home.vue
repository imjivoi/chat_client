<template>
  <section class="home">
    <Sidebar />
    <div class="container"><router-view></router-view></div>
  </section>
</template>

<script lang="ts">
import Sidebar from "../components/Sidebar.vue";

import { defineComponent, onBeforeMount, onUnmounted } from "vue";
import { AllActionTypes } from "@/store/types/actions.types";
import { useStore } from "@/composition-api/useStore";
import useChatSocket from "@/composition-api/sockets/useChatSocket";

export default defineComponent({
  name: "Home",
  components: { Sidebar },
  setup() {
    const { connect_socket, disconnect_socket } = useChatSocket();

    onBeforeMount(async () => {
      await connect_socket();
    });

    onUnmounted(() => disconnect_socket());
  },
});
</script>
<style lang='scss' scoped>
.container {
  padding: 5px 10px 5px 60px;
  height: calc(100vh - 53px);
}
</style>
