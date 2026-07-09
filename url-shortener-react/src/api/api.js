import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8080",
});

api.interceptors.request.use(
  (config) => {
    const savedToken = localStorage.getItem("JWT_TOKEN");
    if (savedToken) {
      try {
        const token = JSON.parse(savedToken);
        config.headers["Authorization"] = `Bearer ${token}`;
      } catch (e) {
        config.headers["Authorization"] = `Bearer ${savedToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
