import { IAuth } from '@/store/auth/types/user';
import { TokenType } from '@/store/types/token';
import { HTTP } from '../../utils/axios';

export default {
  getToken(data: IAuth) {
    return HTTP.post('auth/login', {
      email: data.email,
      password: data.password,
    });
  },
  refreshToken(refresh_token: TokenType) {
    return HTTP.post('api/v1/auth/refresh_token/', {
      refresh: refresh_token,
    });
  },
  getUser() {
    return HTTP.get('/users/me/');
  },
  register(data: IAuth) {
    return HTTP.post('auth/register', {
      username: data.username,
      email: data.email,
      password: data.password,
    });
  },
  uploadAvatar(file: FormData) {
    return HTTP.post('/users/me/avatar', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
