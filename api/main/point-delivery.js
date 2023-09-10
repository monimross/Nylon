import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";

export class PointDeliveryApi {
  static endpoint = "/api/v1/dashboard/user/point-deliveries";

  static get(params) {
    return mainCaller(this.endpoint, HTTPMethods.GET, null, null, params);
  }
}
