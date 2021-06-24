import { HTTP } from '../../plugins/axios';

const url = '/voice';

export default {
  create(chat_id: string) {
    return HTTP.post(url, {
      chat_id,
    });
  },
  getAll() {
    return HTTP.get(url);
  },
};
