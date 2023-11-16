import { useRouter } from "next/router";
import { API } from "services/interceptor";

export const useAuth = () => {
  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    return await API.post("/security/userLogin/login", {
      username,
      password,
    });
  };

  //   const router = useRouter();

  //   const redirectToLogin = async () => {
  //     router.push("/");
  //   };

  //   const refreshAccessToken = async () => {
  // try {
  //   const refreshToken = localStorage.getItem("refresh-token");
  //   const response = await axios.post("/api/token", {
  //     refreshToken,
  //   });
  //   const { token } = response.data;

  //   localStorage.setItem("access-token", token);
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //   return token;
  // } catch {
  // redirectToLogin();
  // }
  //   };

  return { login };
};
