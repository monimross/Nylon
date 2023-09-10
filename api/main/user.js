import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";
export class UserApi {
  static endpoint = "/api/v1/dashboard/user";

  static get(params) {
    return mainCaller(
      `${this.endpoint}/profile/show`,
      HTTPMethods.GET,
      null,
      null,
      params
    );
  }
  static update(data) {
    return mainCaller(`${this.endpoint}/profile/update`, HTTPMethods.PUT, data);
  }
  static export(id) {
    return mainCaller(
      `${this.endpoint}/export/order/${id}/pdf`,
      HTTPMethods.GET,
      null,
      { responseType: "blob" }
    );
  }

  static passwordUpdate(data) {
    return mainCaller(
      `${this.endpoint}/profile/password/update`,
      HTTPMethods.POST,
      data
    );
  }
  static getWallet(params = {}) {
    return mainCaller(
      `${this.endpoint}/wallet/histories`,
      HTTPMethods.GET,
      null,
      null,
      params
    );
  }
  static firebaseTokenUpdate(data) {
    return mainCaller(
      `${this.endpoint}/profile/firebase/token/update`,
      HTTPMethods.POST,
      data
    );
  }

  static register(data) {
    return mainCaller(`/api/v1/auth/after-verify`, HTTPMethods.POST, data);
  }
}
