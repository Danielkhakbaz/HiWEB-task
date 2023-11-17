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
      <div className="hero min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="flex flex-col items-center space-y-12">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              مشکلی بوجود آمده است!
            </h1>
            <div dir="ltr" className="mockup-code">
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
            <div className="flex flex-col justify-center items-center space-y-4 sm:flex-row">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                تلاش مجدد <FaArrowRotateLeft />
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={reset}
              >
                تلاش مجدد <FaArrowRotateLeft />
              </button>
              <Link href="/">
                <button className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded">
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
