import notificationService from "./notificationService";

export default class ErrorService {
  constructor() {}

  static onError(error: any) {
    console.log(error);
  }

  static requestError(error: any) {
    console.log(error);
  }

  static displayErrorAlert(message: string) {
    notificationService.error(message);
  }
}
