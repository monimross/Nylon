import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";

export class NotificationApi {
  static endpoint = "/api/v1/dashboard";

  static get(params) {
    return mainCaller(
      this.endpoint + "/notifications",
      HTTPMethods.GET,
      null,
      null,
      params
    );
  }
  static getById(id, params) {
    return mainCaller(
      this.endpoint + `/notifications/${id}`,
      HTTPMethods.GET,
      null,
      null,
      params
    );
  }
  static getStatistics(params) {
    return mainCaller(
      this.endpoint + `/user/profile/notifications-statistic`,
      HTTPMethods.GET,
      null,
      null,
      params
    );
  }
  static readAll(data) {
    return mainCaller(
      this.endpoint + `/notifications/read-all`,
      HTTPMethods.POST,
      data
    );
  }
  static readById(id, data) {
    return mainCaller(
      this.endpoint + `/notifications/${id}/read-at`,
      HTTPMethods.POST,
      data
    );
  }
}
