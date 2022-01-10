const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const fetcher = axios.create({
  baseURL: process.env.CMC_API_ENDPOINT,
  headers: { "X-CMC_PRO_API_KEY": "b5b154cd-ba36-4dd6-9406-fe3cca57a1f0" },
});

fetcher.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

fetcher.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

module.exports = fetcher;
