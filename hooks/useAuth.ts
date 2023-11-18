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
    let username = localStorage.getItem("username");
    let refreshToken = localStorage.getItem("refresh_token");

    try {
      const response = await API.post("/Security/UserLogin/RefreshToken", {
        username,
        refreshToken,
      });

      const { access_token } = response.data.accessToken;

      return access_token;
    } catch {
      redirectToLogin();
    }
  };

  return { login, redirectToLogin, refreshAccessToken };
};
