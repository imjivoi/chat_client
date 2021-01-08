import {
  ChatSocketEvents,
  IChatSocketState,
  ISocketResponseData,
  SocketStatusConnect,
} from "@/store/interfaces/chat";
import { AllActionTypes } from "@/store/types/actions.types";
import { onMounted, reactive, readonly, ref } from "vue";
import { useStore } from "../useStore";

// export function useChatSocket() {
//   const store = useStore();

//   let ws: WebSocket;
//   const socketStatus = ref<SocketStatusConnect>(SocketStatusConnect.CLOSED);
//   const quantityConnectErrors = ref<number>(0);

//   async function connect_socket() {
//     if (quantityConnectErrors.value === 10) {
//       socketStatus.value = SocketStatusConnect.CLOSED;
//       return false;
//     }
//     const token = await store.dispatch(AllActionTypes.GET_TOKEN);
//     if (!token) return false;
//     const socket_url = `${process.env.VUE_APP_SOCKET_URL}chat/${token}/`;
//     ws = new WebSocket(socket_url);
//     ws.onopen = () => {
//       console.log("Chat connected", ws);

//       socketStatus.value = SocketStatusConnect.OPEN;
//     };

//     ws.onmessage = ({ data }) => {
//       console.log("socket chatItem onmessage");

//       const payload = JSON.parse(data) as ISocketResponseData;
//       switch (payload.event) {
//         case ChatSocketEvents.NEW_MESSAGE:
//           break;
//         case ChatSocketEvents.MESSAGE_STATUS:
//           break;
//         case ChatSocketEvents.DELETE_MESSAGE:
//           break;
//         case ChatSocketEvents.DELETE_USER:
//           break;
//         case ChatSocketEvents.TYPING_MESSAGE:
//           break;
//       }
//     };
//     ws.onclose = ws.onerror = () => {
//       quantityConnectErrors.value += 1;
//       setTimeout(() => connect_socket(), 5000);
//       socketStatus.value = SocketStatusConnect.CONNECTING;
//     };
//   }

//   function send(data: ISocketResponseData) {
//     ws.send(JSON.stringify(data));
//   }

//   function disconnect_socket() {
//     ws.close();

//     socketStatus.value = SocketStatusConnect.CLOSED;
//   }

//   // onMounted(() => connect_socket());

//   return {
//     connect_socket,
//     send,
//     disconnect_socket,
//     socketStatus,
//   };
// }

// export type ChatSocketType = typeof useChatSocket;

const state = reactive<IChatSocketState>({
  ws: null,
  status: SocketStatusConnect.CONNECTING,
  quantityConnectErrors: 0,
});

async function connect_socket() {
  const store = useStore();
  const token = await store.dispatch(AllActionTypes.GET_TOKEN);
  if (state.quantityConnectErrors === 10) {
    state.status = SocketStatusConnect.CLOSED;
    return false;
  }
  if (!token) return false;
  const socket_url = `${process.env.VUE_APP_SOCKET_URL}chat/${token}/`;
  state.ws = new WebSocket(socket_url);
  state.ws.onopen = () => {
    console.log("Chat connected");

    state.status = SocketStatusConnect.OPEN;
  };

  state.ws.onmessage = ({ data }) => {
    console.log("socket chatItem onmessage");

    const payload = JSON.parse(data) as ISocketResponseData;
    switch (payload.event) {
      case ChatSocketEvents.NEW_MESSAGE:
        break;
      case ChatSocketEvents.MESSAGE_STATUS:
        break;
      case ChatSocketEvents.DELETE_MESSAGE:
        break;
      case ChatSocketEvents.DELETE_USER:
        break;
      case ChatSocketEvents.TYPING_MESSAGE:
        break;
    }
  };
   state.ws.onerror = () => {
    state.quantityConnectErrors += 1;
    setTimeout(() => connect_socket(), 5000);
    state.status = SocketStatusConnect.CONNECTING;
  };
}

function send(data: ISocketResponseData) {
  state.ws?.send(JSON.stringify(data));
}

function disconnect_socket() {
  state.ws?.close();

  state.status = SocketStatusConnect.CLOSED;
}

export const useChatSocket = readonly({
  state,
  connect_socket,
  disconnect_socket,
  send,
});
