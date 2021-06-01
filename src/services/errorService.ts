import notificationService from './notificationService';
import { AxiosError } from 'axios';
import statusCodes from '../resource/statusCodes.json';

export default class ErrorService {
  constructor() {}

  static onError(error: any) {
    console.log(error);
  }

  static requestError(error: AxiosError) {
    const errorCode = error.response?.status;
    if (errorCode) {
      //@ts-ignore
      const errorText = statusCodes[errorCode];
      notificationService.error(errorText);
    }
  }
}
