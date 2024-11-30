// http.js
import axios from "axios";
import { getToken } from "./get-token";

const http = axios.create({
  //baseURL: process.env.SERVER_URL,
  //baseURL: `https://cmass-server.onrender.com/api`,
  baseURL: `http://localhost:5000/api`,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Change request data/error here
http.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ""}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;