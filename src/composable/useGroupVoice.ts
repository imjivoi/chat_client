import { useAuthStore } from "@/store/";
import { VoiceIoEvents } from "@/store/voice/types/voice";
//@ts-ignore

import Peer from "simple-peer";
import { Socket } from "socket.io";
import { computed, reactive, ref } from "vue";

export default function useVoice(socket: Socket | undefined) {
  const peers = reactive<any[]>([]);

  const userStream = ref();
  const peersRef = reactive<any[]>([]);

  const createVoice = () => {};

  const joinVoice = (roomID: string) => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      userStream.value = stream;
      socket?.emit("join room", roomID);
      socket?.on("all users", (users) => {
        users.forEach((userID: string) => {
          const peer = createPeer(userID, socket.id, stream);
          peersRef.push({
            peerID: userID,
            peer,
          });
          peers.push(peer);
        });
      });

      socket?.on("user joined", (payload) => {
        console.log(payload);
        const peer = addPeer(payload.signal, payload.callerID, stream);
        peersRef.push({
          peerID: payload.callerID,
          peer,
        });
        peers.push(peer);
        console.log(peers, peersRef);
      });

      socket?.on("receiving returned signal", (payload) => {
        const item = peersRef.find((p) => p.peerID === payload.id);
        item.peer.signal(payload.signal);
      });
    });
  };

  const createPeer = (userToSignal: string, callerID: string, stream: any) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal: any) => {
      socket?.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  };

  const addPeer = (incomingSignal: any, callerID: string, stream: any) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal: any) => {
      socket?.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  // const leaveVoice = () => {
  //   callEnded.value = true;
  //   connection.value.destroy();
  // };

  // const callUser = (id: string) => {
  //   const peer = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream: myStream.value,
  //   });
  //   peer.on("signal", (data: any) => {
  //     socket?.emit("callUser", {
  //       userToCall: toId.value,
  //       signalData: data,
  //       from: socketId.value,
  //       name: userData.value?.username,
  //     });
  //   });
  //   peer.on("stream", (stream: any) => {
  //     userAudio.value.current.srcObject = stream;
  //   });
  //   socket?.on("callAccepted", (signal: any) => {
  //     callAccepted.value = true;
  //     peer.signal(signal);
  //   });

  //   connection.value = peer;
  // };

  // const answerCall = () => {
  //   console.log(11);
  //   callAccepted.value = true;
  //   const peer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream: myStream.value,
  //   });
  //   peer.on("signal", (data: any) => {
  //     console.log(data);
  //     socket?.emit("answerCall", { signal: data, to: caller.value });
  //   });
  //   peer.on("stream", (stream: any) => {
  //     console.log(stream);
  //     userAudio.value.srcObject = stream;
  //   });
  //   peer.signal(callerSignal.value);
  //   connection.value = peer;
  // };

  const waitForInvite = () => {
    socket?.on(VoiceIoEvents.NEW_INVITE, (data: any) => {
      console.log(data);
    });
  };

  return {
    createVoice,
    joinVoice,
    waitForInvite,
    peers,
  };
}
