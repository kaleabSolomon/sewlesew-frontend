import axios from "axios";
import Cookie from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3333/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (config.url?.includes("refresh")) {
    const token = Cookie.get("refresh_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } else {
    const token = Cookie.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosInstance;
