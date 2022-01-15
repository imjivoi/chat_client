export default {
  serverHost: import.meta.env.DEV  ? import.meta.env.VITE_SERVER_HOST : '',
  apiUrl: import.meta.env.DEV  ? import.meta.env.VITE_BASE_URL : '/api',
  socketUrl: import.meta.env.VITE_SOCKET_URL || '',
  socketVoiceUrl: import.meta.env.VITE_SOCKET_VOICE_URL || '',
};
