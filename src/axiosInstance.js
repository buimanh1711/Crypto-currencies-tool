import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import dotenv from "dotenv";
dotenv.config();

const chatServiceRequestor = axios.create({
  baseURL: "https://pro-api.coinmarketcap.com/v1/tools",
  timeout: 1000,
  headers: { "X-CMC_PRO_API_KEY": "b5b154cd-ba36-4dd6-9406-fe3cca57a1f0" },
});

chatServiceRequestor.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

chatServiceRequestor.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default chatServiceRequestor;
