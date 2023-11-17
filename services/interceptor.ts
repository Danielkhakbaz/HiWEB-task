import axios from "axios";
import { useAuth } from "hooks/useAuth";

export const API = axios.create({
  baseURL: "https://taskapi.hiweb.ir/api/",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (config.url !== "/Security/UserLogin/Login" && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // const originalRequest = error.config;

    if (error.response) {
      switch (error.response.status) {
        case 401: {
          const { refreshAccessToken } = useAuth();

          const token = await refreshAccessToken();

          // originalRequest._retry = false;

          // originalRequest.headers["Authorization"] = `Bearer ${token}`;

          // return API(originalRequest);
        }
        default:
          break;
      }
    }
  }
);
