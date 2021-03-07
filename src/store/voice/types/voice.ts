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

export enum VoiceIoEvents {
  CREATE_VOICE = "CREATE_VOICE",
  DELETE_VOICE = "DELETE_VOICE",
  JOIN_VOICE = "JOIN_VOICE",
  LEAVE_VOICE = "LEAVE_VOICE",
  BLOCK_USER = "BLOCK_USER",
  CREATE_INVITE = "CREATE_INVITE",
  NEW_INVITE = "NEW_INVITE",
}
