import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";

export class UploadApi {
  static endpoint = "/api/v1/dashboard/galleries";

  static create(data) {
    return mainCaller(this.endpoint, HTTPMethods.POST, data);
  }
}
