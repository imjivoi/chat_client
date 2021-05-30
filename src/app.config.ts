export default {
  apiUrl: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_BASE_URL : '',
  socketUrl: process.env.VUE_APP_SOCKET_URL || '127.0.0.1:80',
};
