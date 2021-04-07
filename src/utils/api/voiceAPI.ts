import { HTTP } from "../axios";

const url = "/voice";

export default {
  create(name: string) {
    return HTTP.post(url, {
      name,
    });
  },
  getAll() {
    return HTTP.get(url);
  },
};