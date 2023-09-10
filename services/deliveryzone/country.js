import serviceWithOutToken from "../auth";

const countryService = {
  get: (params) =>
    serviceWithOutToken.get("/api/v1/rest/countries", { params }),
  show: (id, params) =>
    serviceWithOutToken.get(`/api/v1/rest/countries/${id}`, { params }),
  create: (data) => serviceWithOutToken.post("/api/v1/rest/countries", data),
  update: (id, data) =>
    serviceWithOutToken.put(`/api/v1/rest/countries/${id}`, data),
  delete: (id) => serviceWithOutToken.delete(`/api/v1/rest/countries/${id}`),
  status: (id) =>
    serviceWithOutToken.put(`/api/v1/rest/countries/status-change/${id}`),
};

export default countryService;
