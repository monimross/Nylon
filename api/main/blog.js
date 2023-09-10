import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";

export class BlogApi {
  static endpoint = "/api/v1/rest/blogs/paginate";

  static get(params) {
    return mainCaller(this.endpoint, HTTPMethods.GET, null, null, params);
  }
  static getId(id) {
    return mainCaller(this.endpoint + `/${id}`, HTTPMethods.GET);
  }
}
