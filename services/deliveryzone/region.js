import serviceWithOutToken from "../auth";

const regionService = {
  get: (params) => serviceWithOutToken.get("/api/v1/rest/regions", { params }),
  show: (id, params) =>
    serviceWithOutToken.get(`/api/v1/rest/regions/${id}`, { params }),
  create: (data) => serviceWithOutToken.post("/api/v1/rest/regions", data),
  update: (id, data) =>
    serviceWithOutToken.put(`/api/v1/rest/regions/${id}`, data),
  delete: (id) => serviceWithOutToken.delete(`/api/v1/rest/regions/${id}`),
  status: (id) =>
    serviceWithOutToken.put(`/api/v1/rest/regions/status-change/${id}`),
};

export default regionService;
