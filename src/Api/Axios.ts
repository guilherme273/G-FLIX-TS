import axios from "axios";
import { toast_fy } from "../Toast/Toast";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers = config.headers || {};

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de respostas Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const objectError = JSON.parse(error.response.request.responseText);
      const content = `${objectError.error}: ${objectError.message}`;
      const data = {
        msg: { type: "error", content: content },
      };
      toast_fy(data);
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default api;
