import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api",
});

api.interceptors.request.use((config) => {
  // 🚫 Do NOT attach token for auth endpoints
  if (!config.url.startsWith("/auth")) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
