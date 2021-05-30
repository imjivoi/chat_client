export default {
  apiUrl: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_BASE_URL : '/api',
  socketUrl: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_SOCKET_URL : '',
};
