import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";

export class CountryApi {
  static endpoint = "/api/v1/rest/countries";

  static get(params) {
    return mainCaller(this.endpoint, HTTPMethods.GET, null, null, params);
  }
}
