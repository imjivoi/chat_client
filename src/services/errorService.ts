import notificationService from "./notificationService";

export default class ErrorService {
  constructor() {}

  static onError(error: any) {
    console.log(error);
  }

  // static initHandler() {
  //   const scope = this;
  //   window.onerror = (message, url, lineNo, columnNo, error) => {
  //     console.log(error, "test");
  //     if (error) {
  //       scope.onError(error);
  //       console.log(message, url, lineNo, columnNo, error);
  //     }
  //   };
  // }

  static requestError(error: any) {
    console.log(error);
  }

  static displayErrorAlert(message: string) {
    notificationService.error(message);
  }
}
