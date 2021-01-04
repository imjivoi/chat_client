export interface IUserData {
  nickname: string | null;
  id: string | null;
  email: string | null;
  avatar?: string | null;
  last_login: string;
}

export interface IAuth {
  nickname?: string | null;
  email: string | null;
  password: string | null;
}
