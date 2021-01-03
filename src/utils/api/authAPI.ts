import { IAuth } from "@/store/interfaces/user";
import { TokenType } from "@/store/types/token";
import { HTTP } from "../axios";

const headers = (token: TokenType) => {
  return {
    headers: {
      Authorization: `JWT ${token}`,
    },
  };
};

export default {
  getToken(data: IAuth) {
    return HTTP.post("api/v1/auth/obtain_token/", {
      email: data.email,
      password: data.password,
    });
  },
  refreshToken(refresh_token: TokenType) {
    return HTTP.post("api/v1/auth/refresh_token/", {
      refresh: refresh_token,
    });
  },
  getUser(token: TokenType) {
    return HTTP.get("auth/users/me/", headers(token));
  },
};
