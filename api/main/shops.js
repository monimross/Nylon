import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";

export class ShopApi {
  static endpoint = "/api/v1/rest/shops";

  static get(params) {
    params.perPage = 8;
    return mainCaller(
      this.endpoint + "/paginate",
      HTTPMethods.GET,
      null,
      null,
      params
    );
  }
  static getId(id) {
    return mainCaller(this.endpoint + `/${id}`, HTTPMethods.GET);
  }
  static getDelivery(params) {
    return mainCaller(
      this.endpoint + `/deliveries`,
      HTTPMethods.GET,
      null,
      null,
      params
    );
  }
  static getNearby(params = {}) {
    return mainCaller(
      this.endpoint + "/nearby",
      HTTPMethods.GET,
      null,
      null,
      params
    );
  }
  static create(data) {
    return mainCaller(`/api/v1/dashboard/user/shops`, HTTPMethods.POST, data);
  }
  static getShop() {
    return mainCaller(`/api/v1/dashboard/user/shops`, HTTPMethods.GET);
  }
  static checkIds(params) {
    return mainCaller(this.endpoint, HTTPMethods.GET, null, null, params);
  }
}
