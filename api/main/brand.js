import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";

export class BrandApi {
  static endpoint = "/api/v1/rest/brands/paginate";

  static get(params) {
    return mainCaller(this.endpoint, HTTPMethods.GET, null, null, params);
  }
  static getProducts(id, params) {
    return mainCaller(
      `/api/v1/rest/products/brands/${id}`,
      HTTPMethods.GET,
      null,
      null,
      params
    );
  }
  static getId(id) {
    return mainCaller(this.endpoint + `/${id}`, HTTPMethods.GET);
  }
  static create(data) {
    return mainCaller(this.endpoint, HTTPMethods.POST, data);
  }

  static update(id, data) {
    return mainCaller(this.endpoint + `${id}/`, HTTPMethods.PATCH, data);
  }

  static delete(id) {
    return mainCaller(this.endpoint + `${id}/`, HTTPMethods.DELETE);
  }
}
