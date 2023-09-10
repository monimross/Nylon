import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";

export class DeliveryApi {
  static endpoint = "/api/v1/rest/delivery";
  static get(params) {
    return mainCaller(this.endpoint, HTTPMethods.GET, null, null, params);
  }
}
