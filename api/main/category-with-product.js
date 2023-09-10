import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";

export class CategoryWithProductApi {
  static endpoint = "/api/v1/rest/categories/product/paginate";

  static get(params) {
    return mainCaller(this.endpoint, HTTPMethods.GET, null, null, params);
  }
}
