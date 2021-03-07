<template> </template>

<script lang="ts">
import { useAuthStore } from "@/store/auth/useAuthStore";
//@ts-ignore

import Peer from "simple-peer";
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  reactive,
  ref,
} from "vue";
export default defineComponent({
  name: "Rooms",
  setup(_, root) {
    const auth = useAuthStore();

    const userData = computed(() => auth.userData);
    const socket: any = inject("socket");
    const socketId = ref();
    const connection = ref();
    const myAudio = ref();
    const userAudio = ref();
    const caller = ref<string>();
    const isReceivingCall = ref<boolean>(false);
    const callerSignal = ref();
    const myStream = ref();
    const userStream = ref();
    const callAccepted = ref(false);
    const callEnded = ref(false);
    const toId = ref();

    const callUser = (id: string) => {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: myStream.value,
      });
      peer.on("signal", (data: any) => {
        socket.emit("callUser", {
          userToCall: toId.value,
          signalData: data,
          from: socketId.value,
          name: userData.value?.username,
        });
      });
      peer.on("stream", (stream: any) => {
        userAudio.value.current.srcObject = stream;
      });
      socket.on("callAccepted", (signal: any) => {
        callAccepted.value = true;
        peer.signal(signal);
      });

      connection.value = peer;
    };

    const answerCall = () => {
      console.log(11);
      callAccepted.value = true;
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: myStream.value,
      });
      peer.on("signal", (data: any) => {
        console.log(data);
        socket.emit("answerCall", { signal: data, to: caller.value });
      });
      peer.on("stream", (stream: any) => {
        console.log(stream);
        userAudio.value.srcObject = stream;
      });
      peer.signal(callerSignal.value);
      connection.value = peer;
    };

    const stop = () => {
      callEnded.value = true;
      connection.value.destroy();
    };

    onMounted(() => {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        myStream.value = stream;
        // myAudio.value.srcObject = stream;
      });
      socket.on("me", (id: string) => {
        socketId.value = id;
      });
      socket.on("callUser", (data: any) => {
        console.log(data);
        isReceivingCall.value = true;
        caller.value = data.from;
        callerSignal.value = data.signal;
      });
    });

    return {
      stop,
      myAudio,
      userAudio,
      callUser,
      isReceivingCall,
      answerCall,
      socketId,
      toId,
    };
  },
});
</script>

<style></style>
