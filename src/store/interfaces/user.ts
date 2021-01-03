export interface IUserData {
  nickname: string | null;
  id: string | null;
  email: string | null;
  avatar?: string | null | undefined;
}

export interface IAuth {
  nickname?: string | null;
  email: string | null;
  password: string | null;
}
