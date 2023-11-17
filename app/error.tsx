"use client";

import Link from "next/link";
import { FaArrowRotateLeft } from "react-icons/fa6";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="flex flex-col items-center space-y-12">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">
              مشکلی بوجود آمده است!
            </h1>
            <div dir="ltr">
              <pre>
                <code className="text-red-500 whitespace-pre-wrap">
                  {error.message}
                </code>
              </pre>
            </div>
            <p className="max-w-lg text-sm sm:text-md">
              لطفا مجدد تلاش کنید و اگر مجددا به مشکل برخوردید، با پشتیبانی تماس
              بگیرید!
            </p>
            <div className="flex justify-center items-center gap-4 sm:flex-row">
              <button
                className="font-bold bg-blue-500 text-white flex items-center gap-1 px-4 py-2 rounded-lg transition-colors hover:bg-blue-700"
                onClick={reset}
              >
                تلاش مجدد <FaArrowRotateLeft />
              </button>
              <Link href="/">
                <button className="font-bold text-blue-500 border border-blue-500 rounded-lg transition-colors px-4 py-2 hover:bg-blue-500 hover:text-white">
                  بازگشت به صفحه‌اصلی
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
