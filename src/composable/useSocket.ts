import { onMounted, onUnmounted } from "@vue/runtime-core";
import { VueCookieNext } from "vue-cookie-next";
import io from "socket.io-client";
import {useSocketListeners} from "@/composable/index";

export default function useSocket(url: string) {
  const token = VueCookieNext.getCookie("accessToken");
  const socket = io(url, {
    reconnectionDelayMax: 10000,
    query: {
      token: token,
    },
  });
  const {initListeners}=useSocketListeners(socket)


  onMounted(() => {
    socket.connect()
    socket.on('connect',()=>initListeners())
  });
  onUnmounted(() => socket.disconnect());

  return {
    socket,
  };
}
