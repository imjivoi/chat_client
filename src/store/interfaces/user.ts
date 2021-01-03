export interface IUserData {
  nickname: string | null;
  id: string | null;
  token?: string;
  email: string | null;
  avatar?: string | null | undefined;
  isAuthorized?: boolean | null;
  loading?: boolean;
}

export interface IAuth {
  nickname?: string | null;
  email: string | null;
  password: string | null;
}
