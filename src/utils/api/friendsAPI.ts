import { TokenType } from "@/store/modules/user";
import { HTTP } from "../axios";
import { headers } from "./userAPI";

const url = "api/v1/users/relationship";

export default {
  search(token: TokenType, q: string) {
    return HTTP.get(`api/v1/users?q=${q}`, headers(token));
  },
  get(token: TokenType) {
    return HTTP.get(url, headers(token));
  },
  create(token: TokenType, to_user: string) {
    return HTTP.post(url, { to_user: to_user }, headers(token));
  },
  putRead(token: TokenType, from_user: string) {
    return HTTP.put(
      url,
      {
        from_user,
        type: "read",
      },
      headers(token)
    );
  },
  putAccept(token: TokenType, from_user: string) {
    return HTTP.put(
      url,
      {
        from_user,
        type: "accept",
      },
      headers(token)
    );
  },
  delete(token: TokenType, user_to_delete: string) {
    return HTTP.delete(
      `${url}?user_to_delete=${user_to_delete}`,
      headers(token)
    );
  },
};
