import { useAuthStore } from "@/store/auth/useAuthStore";
import { VoiceIoEvents } from "@/store/voice/types/voice";
//@ts-ignore

import Peer from "simple-peer";
import { computed, inject, onMounted, ref } from "vue";

export default function useVoice() {
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
  const callAccepted = ref(false);
  const callEnded = ref(false);
  const toId = ref();

  const createVoice = () => {};

  const joinVoice = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      myStream.value = stream;
    });
  };
  const leaveVoice = () => {
    callEnded.value = true;
    connection.value.destroy();
  };

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

  const waitForInvite = () => {
    socket.on(VoiceIoEvents.NEW_INVITE, (data: any) => {
      console.log(data);
    });
  };

  return {
    createVoice,
    leaveVoice,
    joinVoice,
    waitForInvite,
  };
}
