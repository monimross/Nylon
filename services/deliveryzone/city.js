import serviceWithOutToken from "../auth";

const cityService = {
  get: (params) => serviceWithOutToken.get("/api/v1/rest/cities", { params }),
  show: (id, params) =>
    serviceWithOutToken.get(`/api/v1/rest/cities/${id}`, { params }),
  create: (data) => serviceWithOutToken.post("/api/v1/rest/cities", data),
  update: (id, data) =>
    serviceWithOutToken.put(`/api/v1/rest/cities/${id}`, data),
  delete: (id) => serviceWithOutToken.delete(`/api/v1/rest/cities/${id}`),
  status: (id) =>
    serviceWithOutToken.put(`/api/v1/rest/cities/status-change/${id}`),
};

export default cityService;
