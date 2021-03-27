import { onMounted, onUnmounted } from "@vue/runtime-core";
import { VueCookieNext } from "vue-cookie-next";
import io from "socket.io-client";

export default function useSocket(url: string) {
  const token = VueCookieNext.getCookie("accessToken");
  const socket = io(url, {
    reconnectionDelayMax: 10000,

    query: {
      token: token,
    },
  });
  onMounted(() => socket.connect());
  onUnmounted(() => socket.disconnect());

  return {
    socket,
  };
}
