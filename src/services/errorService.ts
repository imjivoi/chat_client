import notificationService from "./notificationService";

export default class ErrorService {
  constructor() {}

  static onError(error: any) {
    console.log(error);
    const response = error.response;
    if (response && response.status >= 400 && response.status < 405) {
      return false;
    }
  }

  static initHandler() {
    const scope = this;
    window.onerror = (message, url, lineNo, columnNo, error) => {
      console.log(error, "test");
      if (error) {
        scope.onError(error);
        console.log(message, url, lineNo, columnNo, error);
      }
    };
  }

  static displayErrorAlert(message: string) {
    notificationService.error(message);
  }
}
