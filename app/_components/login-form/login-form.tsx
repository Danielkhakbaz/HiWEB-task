"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "hooks/useAuth";
import { toast } from "react-toastify";
import Loading from "app/loading";
import SuccessfulLogin from "assets/images/successful-login.png";

const LoginForm = () => {
  const [isRemembered, setIsRemembered] = useState<boolean>(false);

  const { login } = useAuth();

  const router = useRouter();

  const {
    register,
    watch,
    formState: { isValid },
  } = useForm();

  let goToProductsPage: NodeJS.Timeout;

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      localStorage.setItem("username", data.data.userName);
      localStorage.setItem("access_token", data.data.accessToken.access_token);
      localStorage.setItem(
        "refresh_token",
        data.data.accessToken.refresh_token
      );
      localStorage.setItem(
        "access_token_expire_date",
        data.data.accessToken.expire_access_token
      );

      goToProductsPage = setTimeout(() => {
        router.push("/products");
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    },
  });

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();

    localStorage.setItem("isRemembered", isRemembered.toString());

    mutate({
      username: watch("username"),
      password: watch("password"),
    });
  };

  useEffect(() => {
    const isAccessTokenValid = () => {
      const expireDateObject = new Date(
        localStorage.getItem("access_token_expire_date") as never
      );

      const expireTimestamp = Math.floor(expireDateObject.getTime() / 1000);

      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (
        expireTimestamp > currentTimestamp &&
        localStorage.getItem("isRemembered") === "true"
      ) {
        router.push("/products");
      }
    };

    isAccessTokenValid();

    return () => {
      clearTimeout(goToProductsPage);
    };
  }, [router]);

  if (!isSuccess) {
    return (
      <div className="w-[482px] h-[437px] flex flex-col justify-center items-center gap-10 border border-hiwebGray-400 rounded-xl px-10 py-14">
        <Image width={64} height={64} src={SuccessfulLogin} alt="" />
        <p className="text-hiwebGreen-500">ورود شما با موفقیت انجام شد.</p>
        <Loading />
      </div>
    );
  }

  return (
    <form className="w-[482px] h-[437px] flex flex-col justify-center gap-6 border border-hiwebGray-400 rounded-xl px-12 py-[58px]">
      <div className="flex flex-col gap-2">
        <label className="text-hiwebGray-300" htmlFor="username">
          نام کاربری
        </label>
        <input
          id="username"
          className="w-full h-12 text-sm border border-hiwebGray-300 rounded-lg p-2.5"
          type="text"
          placeholder="نام کاربری..."
          {...register("username", { required: true })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-hiwebGray-300" htmlFor="password">
          کلمه عبور
        </label>
        <input
          id="password"
          className="w-full h-12 text-sm border border-hiwebGray-400 rounded-lg p-2.5"
          type="password"
          placeholder="کلمه عبور..."
          {...register("password", { required: true })}
        />
      </div>
      <div className="flex gap-1">
        <input
          id="rememberme"
          className="text-sm border border-hiwebGray-400 rounded-lg p-2.5"
          type="checkbox"
          placeholder="کلمه عبور..."
          value={isRemembered ? "true" : "false"}
          onChange={() => {
            setIsRemembered((prevValue) => !prevValue);
          }}
        />
        <label className="text-hiwebGray-300" htmlFor="rememberme">
          مرا به خاطر بسپار
        </label>
      </div>
      <button
        className="w-full h-12 bg-hiwebGreen-500 text-white rounded-lg transition-colors py-3 hover:bg-hiwebGreen-700 active:bg-hiwebGreen-900 disabled:text-hiwebGray-700 disabled:bg-hiwebGray-100"
        disabled={!isValid || isPending}
        onClick={(e) => handleClick(e)}
      >
        {isPending ? <Loading /> : <span>ورود</span>}
      </button>
    </form>
  );
};

export default LoginForm;
