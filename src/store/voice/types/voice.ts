import { IUserData } from "../../auth/types/user";

export interface IVoice {
  _id: string;
  name: string;
  admin: IUserData;
  createdAt: string;
  updatedAt: string;
}

export interface IVoiceState {
  voices: IVoice[] | [];
  isLoading: boolean;
}
