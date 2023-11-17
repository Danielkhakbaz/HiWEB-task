import axios from "axios";

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

// API.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     console.log("INTERCEPTOR is handling", error);
//   }
// );
