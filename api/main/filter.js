import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";

export class FilterApi {
  static endpoint = "/api/v1/rest/filter";
  static get(params) {
    return mainCaller(this.endpoint, HTTPMethods.GET, null, null, params);
  }
}
