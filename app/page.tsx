"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "hooks/useAuth";
import { toast } from "react-toastify";
import Loading from "components/loading/loading";
import LandingImage from "assets/images/landing-image.png";
import HiWEBLogo from "public/hiweb-logo.png";

const LoginPage = () => {
  const { login } = useAuth();

  const navigate = useRouter();

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

      navigate.push("/products");
    },
    onError: () => {
      toast.error("نام‌کاربری یا رمزعبور اشتباه است!", {
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

    mutate({
      username: watch("username"),
      password: watch("password"),
    });
  };

  return (
    <>
      <main className="h-screen flex flex-row">
        <div className="w-1/2 flex justify-center items-center">
          <Image
            className="w-auto h-auto"
            src={LandingImage}
            alt="Landing Image"
          />
        </div>
        <div className="w-1/2 flex flex-col items-center gap-4 py-28">
          <Image className="flex-none" src={HiWEBLogo} alt="HiWeb's logo" />
          <div className="w-full flex flex-1 justify-center items-center">
            <form className="w-3/5 flex flex-col gap-6 border border-[#9A9A9A] rounded-xl px-10 py-14">
              <div className="flex flex-col gap-2">
                <label className="text-[#A0A0A0]" htmlFor="username">
                  نام کاربری
                </label>
                <input
                  className="text-[14px] border border-[#9A9A9A] rounded-[8px] p-2.5 placeholder:text-[14px]"
                  type="text"
                  placeholder="نام کاربری..."
                  {...register("username", { required: true })}
                  id="username"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#A0A0A0]" htmlFor="password">
                  کلمه عبور
                </label>
                <input
                  className="text-[14px] border border-[#9A9A9A] rounded-[8px] p-2.5 placeholder:text-[14px]"
                  type="password"
                  placeholder="کلمه عبور..."
                  {...register("password", { required: true })}
                  id="password"
                />
              </div>
              <div className="flex gap-1">
                <label className="text-[#A0A0A0]" htmlFor="rememberme">
                  مرا به خاطر بسپار
                </label>
                <input
                  className="text-[14px] border border-[#9A9A9A] rounded-[8px] p-2.5 placeholder:text-[14px]"
                  type="checkbox"
                  placeholder="کلمه عبور..."
                  id="rememberme"
                />
              </div>
              <button
                className="w-full bg-[#46B666] text-white rounded-[8px] transition-colors py-3 hover:bg-[#3a9e57] active:bg-[#328c4c] disabled:text-[#666] disabled:bg-[#CCC]"
                disabled={!isValid}
                onClick={(e) => handleClick(e)}
              >
                {isPending ? <Loading /> : <span>ورود</span>}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
