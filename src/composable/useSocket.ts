import { onMounted, onUnmounted } from '@vue/runtime-core';
import { VueCookieNext } from 'vue-cookie-next';
import io from 'socket.io-client';
import { useSocketListeners } from '@/composable/index';
import { ref } from 'vue';

const socket = ref<any>();

export default function useSocket(url: string) {
  const token = VueCookieNext.getCookie('accessToken');
  // const socket = io(url, {
  //   reconnectionDelayMax: 10000,
  //   query: {
  //     token: token,
  //   },
  // });
  const { initListeners } = useSocketListeners();

  onMounted(() => {
    socket.value = io(url, {
      reconnectionDelayMax: 10000,
      query: {
        token: token,
      },
    });
    socket.value.connect();
    socket.value.on('connect', () => initListeners(socket));
  });
  onUnmounted(() => socket.value.disconnect());

  return {
    socket,
  };
}
