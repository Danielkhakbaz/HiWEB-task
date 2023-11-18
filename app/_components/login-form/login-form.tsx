"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "hooks/useAuth";
import { toast } from "react-toastify";
import Loading from "app/loading";

const LoginForm = () => {
  const [isRemembered, setIsRemembered] = useState<boolean>(false);

  const { login } = useAuth();

  const router = useRouter();

  const {
    register,
    watch,
    formState: { isValid },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: ({ data: { data } }) => {
      localStorage.setItem("username", data.userName);
      localStorage.setItem("access_token", data.accessToken.access_token);
      localStorage.setItem("refresh_token", data.accessToken.refresh_token);
      localStorage.setItem(
        "access_token_expire_date",
        data.accessToken.expire_access_token
      );

      router.push("/products");
    },
    onError: (error: {
      response: {
        data: {
          error: string;
        };
      };
    }) => {
      toast.error(error.response.data.error, {
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

  return (
    <form className="w-3/5 flex flex-col gap-6 border border-hiwebGray-400 rounded-xl px-10 py-14">
      <div className="flex flex-col gap-2">
        <label className="text-hiwebGray-300" htmlFor="username">
          نام کاربری
        </label>
        <input
          id="username"
          className="text-sm border border-hiwebGray-300 rounded-lg p-2.5"
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
          className="text-sm border border-hiwebGray-400 rounded-lg p-2.5"
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
        className="w-full bg-hiwebGreen-500 text-white rounded-lg transition-colors py-3 hover:bg-hiwebGreen-700 active:bg-hiwebGreen-900 disabled:text-hiwebGray-700 disabled:bg-hiwebGray-100"
        disabled={!isValid}
        onClick={(e) => handleClick(e)}
      >
        {isPending ? <Loading /> : <span>ورود</span>}
      </button>
    </form>
  );
};

export default LoginForm;
