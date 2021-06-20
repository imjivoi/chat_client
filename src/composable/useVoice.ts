import appConfig from '@/app.config';
import { useUserStore } from '@/store/';
import { VoiceIoEvents } from '@/store/voice/types/voice';
import io from 'socket.io-client';

// @ts-ignore

import Peer from 'simple-peer';
import { Socket } from 'socket.io';
import { computed, inject, onMounted, onUnmounted, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';

export default function useVoice() {
  const token = localStorage.getItem('accessToken');
  const peers = ref<any[]>([]);
  const auth = useUserStore();
  const route = useRoute();
  const userData = computed(() => auth.userData);
  const userAudio = ref<HTMLAudioElement>();
  const peersRef = ref<any[]>([]);

  const socket = ref<Socket | any>();

  const chatId = route.params.id;

  function leaveVoice() {
    socket.value.disconnect();
  }

  function createPeer(userToSignal: string, callerID: string, stream: any) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal: any) => {
      socket.value!.emit(VoiceIoEvents.SENDING_SIGNAL, { userToSignal, callerID, signal });
    });

    return peer;
  }

  function addPeer(incomingSignal: any, callerID: string, stream: any) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal: any) => {
      socket.value!.emit(VoiceIoEvents.RETURNING_SIGNAL, { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function initVoice() {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
      // userAudio.value!.srcObject = stream;
      socket.value.emit(VoiceIoEvents.JOIN_VOICE, chatId);
      socket.value.on('all users', (users: any) => {
        users.forEach((userID: string) => {
          const peer = createPeer(userID, socket.value!.id, stream);
          peersRef.value.push({
            peerID: userID,
            peer,
          });
          peers.value.push(peer);
        });
      });

      socket.value.on(VoiceIoEvents.USER_JOINED, (payload: any) => {
        const peer = addPeer(payload.signal, payload.callerID, stream);
        peersRef.value.push({
          peerID: payload.callerID,
          peer,
        });

        peers.value.push(peer);
      });

      socket.value.on(VoiceIoEvents.RECEIVING_RETURNED_SIGNAL, (payload: any) => {
        const item = peersRef.value.find((p: any) => p.peerID === payload.id);
        item.peer.signal(payload.signal);
      });
    });
  }

  onMounted(() => {
    const url = appConfig.socketVoiceUrl + '/voice';
    socket.value! = io(url, {
      reconnectionDelayMax: 10000,
      query: {
        token,
      },
    });
  });

  onUnmounted(() => leaveVoice());

  return { peers, initVoice };
}
