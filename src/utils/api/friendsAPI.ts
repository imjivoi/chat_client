import { HTTP } from "../axios";

const url = "api/v1/users/relationship/";

export default {
  search(q: string) {
    return HTTP.get(`api/v1/users?q=${q}`);
  },
  get() {
    return HTTP.get(url);
  },
  create(to_user: string) {
    return HTTP.post(url, { to_user: to_user });
  },
  putRead(from_user: string) {
    return HTTP.put(url, {
      from_user,
      type: "read",
    });
  },
  putAccept(from_user: string) {
    return HTTP.put(url, {
      from_user,
      type: "accept",
    });
  },
  delete(user_to_delete: string) {
    return HTTP.delete(`${url}?user_to_delete=${user_to_delete}`);
  },
};
