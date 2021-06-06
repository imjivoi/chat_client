import io from 'socket.io-client';

export default {
  install: (
    app: {
      config: { globalProperties: { $socket: SocketIOClient.Socket } };
      provide: (arg0: string, arg1: SocketIOClient.Socket) => void;
    },
    { connection, options }: any,
  ) => {
    const socket = io(connection, options);
    app.config.globalProperties.$socket = socket;

    app.provide('socket', socket);
  },
};
