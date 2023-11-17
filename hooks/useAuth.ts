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

  const redirectToLogin = async () => {
    const router = useRouter();

    router.push("/");
  };

  const refreshAccessToken = async () => {
    try {
      const response = await API.post("/Security/UserLogin/RefreshToken", {
        username: localStorage.getItem("username"),
        refreshToken: localStorage.getItem("refresh_token"),
      });

      const { token } = response.data;

      localStorage.setItem("access_token", token);

      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return token;
    } catch {
      redirectToLogin();
    }
  };

  return { login, redirectToLogin, refreshAccessToken };
};
