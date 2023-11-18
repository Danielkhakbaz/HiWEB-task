import Link from "next/link";
import { FaHouse } from "react-icons/fa6";

const NotFound = async () => {
  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col justify-center items-center"
    >
      <h2 className="font-extrabold text-[15rem]">404</h2>
      <div className="flex flex-col items-center gap-12">
        <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl">
          صفحه‌ای یافت نشد!
        </h3>
        <Link href="/">
          <button className="bg-hiwebGreen-500 text-white flex items-center gap-2 transition-colors rounded-lg px-4 py-2 hover:bg-hiwebGreen-700 active:bg-hiwebGreen-900">
            <span>صفحه‌اصلی</span>
            <FaHouse />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
