import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";

export class InviteApi {
  static endpoint = "/api/v1/dashboard/user/shop/invitation/";
  static get(params) {
    return mainCaller(
      `/api/v1/dashboard/user/invites/paginate`,
      HTTPMethods.GET,
      null,
      null,
      params
    );
  }
  static create(uuid) {
    return mainCaller(`${this.endpoint}${uuid}/link`, HTTPMethods.POST, {});
  }
}
