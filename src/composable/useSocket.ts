import { onMounted, onUnmounted } from '@vue/runtime-core';
import { VueCookieNext } from 'vue-cookie-next';
import io from 'socket.io-client';
import { useSocketListeners } from '@/composable/index';
import { ref } from 'vue';
import { SocketStatusConnect } from '@/store/chat/types/chat-socket';

const socket = ref<any>();
const connectionStatus = ref<SocketStatusConnect>(SocketStatusConnect.CONNECTING);

export default function useSocket(url: string) {
  const token = VueCookieNext.getCookie('accessToken');
  const { initListeners } = useSocketListeners();

  onMounted(() => {
    socket.value = io(url, {
      reconnectionDelayMax: 10000,
      query: {
        token: token,
      },
    });
    socket.value.connect();
    socket.value.on('connect', () => {
      connectionStatus.value = SocketStatusConnect.OPEN;
      initListeners(socket);
    });
    socket.value.on('connecting', () => (connectionStatus.value = SocketStatusConnect.CONNECTING));
    socket.value.on('disconnect ', () => {
      connectionStatus.value = SocketStatusConnect.CLOSED;
    });
  });
  onUnmounted(() => {
    connectionStatus.value = SocketStatusConnect.CONNECTING;
    socket.value.disconnect();
  });

  return {
    socket,
    connectionStatus,
  };
}
