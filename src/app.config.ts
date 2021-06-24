export default {
  serverHost: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_SERVER_HOST : '',
  apiUrl: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_BASE_URL : '/api',
  socketUrl: process.env.VUE_APP_SOCKET_URL || '',
  socketVoiceUrl: process.env.VUE_APP_SOCKET_VOICE_URL || '',
};
