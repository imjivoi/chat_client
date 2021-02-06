export interface IUserData {
  nickname: string;
  _id: string;
  email: string;
  avatar?: string;
  last_login?: string;
  is_online: boolean;
}

export interface IAuth {
  nickname?: string | null;
  email: string | null;
  password: string | null;
}
