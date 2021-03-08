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
  const userAudio = ref();
  const caller = ref<string>();
  const isReceivingCall = ref<boolean>(false);
  const callerSignal = ref();
  const myStream = ref();
  const callAccepted = ref(false);
  const callEnded = ref(false);

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
      socket.emit(VoiceIoEvents.CALL_USER, {
        userToCall: id,
        signalData: data,
        from: socketId.value,
        name: userData.value?.username,
      });
    });
    peer.on("stream", (stream: any) => {
      userAudio.value.srcObject = stream;
    });
    socket.on(VoiceIoEvents.CALL_ACCEPTED, (signal: any) => {
      callAccepted.value = true;
      peer.signal(signal);
    });

    connection.value = peer;
  };

  const answerCall = () => {
    callAccepted.value = true;
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: myStream.value,
    });
    peer.on("signal", (data: any) => {
      socket.emit(VoiceIoEvents.ANSWER_CALL, {
        signal: data,
        to: caller.value,
      });
    });
    peer.on("stream", (stream: any) => {
      userAudio.value.srcObject = stream;
    });
    peer.signal(callerSignal.value);
    connection.value = peer;
  };

  const initiateVoice = () => {
    socket.on(VoiceIoEvents.CALL_USER, (data: any) => {
      isReceivingCall.value = true;
      caller.value = data.from;
      callerSignal.value = data.signal;
    });

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      myStream.value = stream;
    });
  };

  return {
    leaveVoice,
    callUser,
    initiateVoice,
    answerCall,
  };
}
