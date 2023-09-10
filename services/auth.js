import axios from "axios";
import i18n from "./i18next";

const serviceWithOutToken = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "X-Custom-Header": "lEWGIQU",
    Accept: "application/json; charset=utf-8",
  },
});

serviceWithOutToken.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (config.method === "get") {
      config.params = { lang: i18n.language, ...config.params };
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
serviceWithOutToken.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default serviceWithOutToken;
