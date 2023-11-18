import axios from "axios";
import { useAuth } from "hooks/useAuth";

export const API = axios.create({
  baseURL: "https://taskapi.hiweb.ir/api/",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (config.url !== "/security/userLogin/login") {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      window.location.href = "/";

      alert("شما ابتدا باید به سامانه وارد شوید!");
    }
  }

  return config;
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      switch (error.response.status) {
        case 401: {
          const { refreshAccessToken } = useAuth();

          const token = await refreshAccessToken();

          originalRequest._retry = true;

          originalRequest.headers["Authorization"] = `Bearer ${token}`;

          return API(originalRequest);
        }
        case 404: {
          console.error(error.message);

          break;
        }
        case 500: {
          console.error(error.message);

          break;
        }
        default: {
          console.error(error.message);

          break;
        }
      }
    }
  }
);
