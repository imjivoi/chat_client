<template>
  <Spinner v-if="isLoading" height="100vh" text="Loading..." width="100vw" />

  <div v-else class="content">
    <!-- <SideBar /> -->
    <Header />
    <div class="wrapper">
      <div class="top  mb-2 transition">
        <div class="back" @click="goBack">
          <Back v-if="isRouteBack" class="arrow-back mr-1 transition" />
          <h2 class="transition">{{ $t(routeTitle) }}</h2>
        </div>
        <!-- <transition name="fade">
          <div
            class="connection"
            v-if="showConnectionStatus"
            :style="{ color: connectionText === 'Connected!' ? '#4caf50' : '#f56c6c' }"
          >
            {{ $t(connectionText) }}
          </div>
        </transition> -->
      </div>
    </div>
    <router-view />
  </div>
  <Modal />
</template>

<script lang="ts">
import Header from '@/components/common/MainHeader.vue';
import Modal from '@/components/common/Modal.vue';
import SideBar from '@/components/common/Sidebar.vue';
import Spinner from '@/components/common/Spinner.vue';
import { Back } from '@/components/icons';

import { useRoute, useRouter } from 'vue-router';
import { computed, defineComponent, onBeforeMount, provide, ref, watch } from 'vue';
import { useChatStore, useUserStore } from '@/store';

export default defineComponent({
  name: 'AppMainLayout',
  components: { SideBar, Spinner, Modal, Back, Header },
  setup() {
    const user = useUserStore();
    const chat = useChatStore();
    const route = useRoute();
    const router = useRouter();

    const routeTitle = computed(() => route.meta.title);
    const isRouteBack = computed(() => route.meta.back);
    const isLoading = computed(() => user.isLoading);

    onBeforeMount(() => chat.GET_CHATS());

    function goBack() {
      router.back();
    }

    return {
      routeTitle,
      isLoading,
      goBack,
      isRouteBack,
    };
  },
});
</script>

<style lang="scss">
.top {
  display: flex;
}
.back {
  display: flex;
  cursor: pointer;
}
.wrapper {
  margin: 0 auto;
  padding: 0 35px 0 35px;
  overflow: hidden;
  position: relative;
  max-width: 1280px;

  h2 {
    font-size: 28px;
  }

  @media only screen and (max-width: 756px) {
    margin: 0;
    padding: 50px 20px 0 20px;
  }
}

.connection {
  font-size: 18px;
  font-weight: 600;
  transition: all 0.2s;
}
</style>
