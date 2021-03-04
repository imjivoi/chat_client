import { IAuth } from "@/store/interfaces/user";
import { TokenType } from "@/store/types/token";
import { HTTP } from "../axios";

export default {
  getToken(data: IAuth) {
    return HTTP.post("auth/login", {
      email: data.email,
      password: data.password,
    });
  },
  refreshToken(refresh_token: TokenType) {
    return HTTP.post("api/v1/auth/refresh_token/", {
      refresh: refresh_token,
    });
  },
  getUser() {
    return HTTP.get("/users/me/");
  },
  register(data: IAuth) {
    return HTTP.post("auth/register", {
      username: data.username,
      email: data.email,
      password: data.password,
    });
  },
};
