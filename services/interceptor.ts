import axios from "axios";
import { useAuth } from "hooks/useAuth";

export const API = axios.create({
  baseURL: "https://taskapi.hiweb.ir/api/",
});

const { refreshAccessToken } = useAuth();

let isRefreshing = false;
let refreshSubscribers: ((newToken: string) => void)[] = [];

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (config.url !== "/security/userLogin/login") {
    if (token) {
      if (config.url !== "/Security/UserLogin/RefreshToken") {
        config.headers.Authorization = `Bearer ${token}`;
      }
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
          if (!isRefreshing) {
            isRefreshing = true;

            const token = await refreshAccessToken();

            isRefreshing = false;
            onRefreshed(token);
          }

          const retryOriginalRequest = new Promise(() => {
            addSubscriber((newToken: string) => {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;

              return API(originalRequest);
            });
          });

          return retryOriginalRequest;
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

function addSubscriber(callback: (newToken: string) => void) {
  refreshSubscribers.push(callback);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}
