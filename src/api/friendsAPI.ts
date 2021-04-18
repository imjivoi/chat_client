import { HTTP } from "../utils/axios";

const url = "/friendship";

export default {
  search(q: string) {
    return HTTP.get(`api/v1/users?q=${q}`);
  },
  getAll() {
    return HTTP.get(url);
  },
  create(toUser: string) {
    return HTTP.post(url, { toUser });
  },
};
