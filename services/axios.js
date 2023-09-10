import axios from "axios";
import { parseCookies } from "nookies";

const axiosService = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "X-Custom-Header": "lEWGIQU",
    Accept: "application/json; charset=utf-8",
  },
  timeout: 16000,
});

axiosService.interceptors.request.use(
  function (config) {
    const cookies = parseCookies();
    const currency_id = cookies?.currency_id;
    const language_id = cookies?.language_id;
    const language_locale = cookies?.language_locale;

    config.params = {
      lang: language_locale,
      language_id,
      currency_id,
      ...config.params,
    };
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosService.interceptors.response.use(
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

export default axiosService;
