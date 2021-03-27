<template>
  <Spinner height="100vh" width="100vw" text="Loading..." v-if="isLoading" />

  <div class="content" v-else>
    <SideBar />
    <div class="wrapper">
      <h2>{{ routeTitle }}</h2>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import SideBar from "@/components/common/Sidebar.vue";
import Spinner from "@/components/common/Spinner.vue";

import { useSocket } from "@/composable";
import { useRoute } from "vue-router";

import { computed, defineComponent, onBeforeMount,  provide } from "vue";
import { useChatStore, useVoiceStore, useAuthStore } from "@/store";
import { useFriendshipStore } from "@/store/friendship/useFriendshipStore";
export default defineComponent({
  name: "AppLayoutDefault",
  components: { SideBar, Spinner },
  setup() {
    const auth = useAuthStore();
    const voice = useVoiceStore();
    const friends = useFriendshipStore();
    const route = useRoute();
    const routeTitle = computed(() => route.meta.title);
    const { socket } = useSocket("127.0.0.1:80");
    const isLoading = computed(() => auth.isLoading);
    provide("socket", socket);

    onBeforeMount(() => {
      voice.GET_VOICES();
      friends.GET_ALL();
    });

    return { routeTitle, isLoading };
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 0 0 0 250px;
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
