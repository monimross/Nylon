import serviceWithOutToken from "./auth";

const informationService = {
  translations: (params) =>
    serviceWithOutToken.get("/api/v1/rest/translations/paginate", { params }),
  settingsInfo: (params) => request.get("/api/v1/rest/settings", { params }),
};

export default informationService;
