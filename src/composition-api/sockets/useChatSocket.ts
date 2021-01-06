import {
  ChatSocketEvents,
  IChatSocketState,
  ISocketResponseData,
  SocketStatusConnect,
} from "@/store/interfaces/chat";
import { AllActionTypes } from "@/store/types/actions.types";
import { reactive } from "vue";
import { useStore } from "../useStore";

export default function() {
  const store = useStore();

  const state = reactive<IChatSocketState>({
    socket: null,
    socketStatus: SocketStatusConnect.CLOSED,
    quantityConnectErrors: 0,
  });

  async function connect_socket() {
    console.log(state.socket);
    if (state.quantityConnectErrors === 10) {
      state.socketStatus = SocketStatusConnect.CLOSED;
    }
    const token = await store.dispatch(AllActionTypes.GET_TOKEN);
    if (!token) return false;
    const socket_url = `${process.env.VUE_APP_SOCKET_URL}chat/${token}/`;
    const ws = (state.socket = new WebSocket(socket_url));
    ws.onopen = () => {
      console.log("Chat connected");
      state.socketStatus = SocketStatusConnect.CLOSED;
    };

    ws.onmessage = ({ data }) => {
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
    ws.onerror = () => {
      state.quantityConnectErrors++;
      setTimeout(() => connect_socket(), 5000);
      state.socketStatus = SocketStatusConnect.CONNECTING;
    };
  }

  function send(data: ISocketResponseData) {
    state.socket?.send(JSON.stringify(data));
  }

  function disconnect_socket() {
    state.socket?.close();
    state.socket = null;

    state.socketStatus = SocketStatusConnect.CLOSED;
  }

  return {
    state,
    connect_socket,
    send,
    disconnect_socket,
  };
}
