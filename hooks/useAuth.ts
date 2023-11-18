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

      const { access_token } = response.data.accessToken;

      localStorage.setItem("access_token", access_token);

      API.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      return access_token;
    } catch {
      redirectToLogin();
    }
  };

  return { login, redirectToLogin, refreshAccessToken };
};
