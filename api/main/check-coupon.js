import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";

export class CheckCoupon {
  static endpoint = "/api/v1/rest/coupons/check";

  static create(data) {
    return mainCaller(this.endpoint, HTTPMethods.POST, data);
  }
}
