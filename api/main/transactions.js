import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";

export class TransactionsApi {
  static endpoint = "/api/v1/payments/order/";

  static create(id, data) {
    return mainCaller(
      `${this.endpoint}${id}/transactions`,
      HTTPMethods.POST,
      data
    );
  }

  static status(id, data) {
    return mainCaller(
      `/api/v1/payments/atb/status-change/${id}`,
      HTTPMethods.PUT,
      data
    );
  }
}
