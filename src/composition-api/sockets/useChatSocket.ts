import {
  ChatSocketEvents,
  ChatSocketResponse,
  ChatSocketSendDataType,
  IChatSocketState,
  SocketStatusConnect,
} from "@/store/interfaces/chat-socket";
import { AllActionTypes } from "@/store/types/actions.types";
import { AllMutationTypes } from "@/store/types/mutations.types";
import { reactive, readonly } from "vue";
import { VueCookieNext } from "vue-cookie-next";
import { useRoute } from "vue-router";
import { useStore } from "../useStore";

const state = reactive<IChatSocketState>({
  ws: null,
  status: SocketStatusConnect.CONNECTING,
  quantityConnectErrors: 0,
});

async function connect_socket() {
  const store = useStore();
  const route = useRoute();
  const token = VueCookieNext.getCookie("accessToken");
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

  state.ws.onmessage = ({ data }: any) => {
    const payload: ChatSocketResponse = JSON.parse(data);
    switch (payload.event) {
      case ChatSocketEvents.NEW_MESSAGE:
        store.commit(AllMutationTypes.SET_NEW_MESSAGE, payload.data);
        if (
          store.getters.userData?.id !== payload.data.user?.id &&
          route.params.id === payload.data.chat
        ) {
          const data: ChatSocketSendDataType<ChatSocketEvents.MESSAGE_STATUS> = {
            event: ChatSocketEvents.MESSAGE_STATUS,
            data: {
              chat_id: payload.data.chat,
              user_id: store.getters.userData?.id,
            },
          };
          send(data);
        }

        break;
      case ChatSocketEvents.MESSAGE_STATUS:
        store.commit(AllMutationTypes.SET_READ, payload.data);

        break;
      // case ChatSocketEvents.DELETE_MESSAGE:
      //   break;
      // case ChatSocketEvents.DELETE_USER:
      //   break;
      case ChatSocketEvents.TYPING_MESSAGE:
        store.commit(AllMutationTypes.SET_TYPING, payload.data);
        break;
    }
  };
  state.ws.onerror = () => {
    state.quantityConnectErrors += 1;
    setTimeout(() => connect_socket(), 5000);
    state.status = SocketStatusConnect.CONNECTING;
  };
}

function send(data: ChatSocketSendDataType) {
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
