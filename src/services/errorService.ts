import notificationService from './notificationService';
import { AxiosError } from 'axios';
import statusCodes from '../resource/statusCodes.json';

export default class ErrorService {
  constructor() {}

  static onError(error: any) {
    console.log(error);
  }

  static requestError(error: AxiosError | any) {
    console.log('error', error);
    const errorCode = error.response?.status || error.statusCode;
    //@ts-ignore

    const errorText = statusCodes[errorCode];

    if (errorCode && errorText) {
      notificationService.error(errorText);
    }
  }
}
