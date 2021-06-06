<template>
  <Spinner v-if="isLoading" height="100vh" text="Loading..." width="100vw" />

  <div v-else class="content">
    <SideBar />
    <div class="wrapper">
      <div class="top  mb-2 transition">
        <Back v-if="isRouteBack" @click="goBack" class="arrow-back mr-1 transition" />
        <h2 class="transition">{{ $t(routeTitle) }}</h2>
        <transition name="fade">
          <div
            class="connection"
            v-if="showConnectionStatus"
            :style="{ color: connectionText === 'Connected!' ? '#4caf50' : '#f56c6c' }"
          >
            {{ $t(connectionText) }}
          </div>
        </transition>
      </div>
      <router-view />
    </div>
  </div>
  <Modal />
</template>

<script lang="ts">
import Modal from '@/components/common/Modal.vue';
import SideBar from '@/components/common/Sidebar.vue';
import Spinner from '@/components/common/Spinner.vue';
import { Back } from '@/components/icons';

import appConfig from '@/app.config';

import { useSocket } from '@/composable';
import { useRoute, useRouter } from 'vue-router';

import { computed, defineComponent, provide, ref, watch } from 'vue';
import { useUserStore } from '@/store';
import { SocketStatusConnect } from '@/store/chat/types/chat-socket';

export default defineComponent({
  name: 'AppMainLayout',
  components: { SideBar, Spinner, Modal, Back },
  setup() {
    const user = useUserStore();
    const { socket, connectionStatus } = useSocket(appConfig.socketUrl);
    const showConnectionStatus = ref(true);
    const route = useRoute();
    const router = useRouter();

    const routeTitle = computed(() => route.meta.title);
    const isRouteBack = computed(() => route.meta.back);
    const isLoading = computed(() => user.isLoading);
    const connectionText = computed(() =>
      connectionStatus.value === SocketStatusConnect.OPEN ? 'Connected!' : 'Connecting ...',
    );

    provide('socket', socket);

    function goBack() {
      router.back();
    }

    watch(connectionStatus, () => {
      if (connectionStatus.value === SocketStatusConnect.OPEN) {
        user.getUserData();
        setTimeout(() => (showConnectionStatus.value = false), 3000);
        return;
      }
      showConnectionStatus.value = true;
    });

    return {
      routeTitle,
      isLoading,
      goBack,
      isRouteBack,
      connectionText,
      showConnectionStatus,
      connectionStatus,
    };
  },
});
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wrapper {
  margin: 0 0 0 230px;
  padding: 35px 35px 0 35px;
  height: 100vh;
  overflow: hidden;
  position: relative;

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
