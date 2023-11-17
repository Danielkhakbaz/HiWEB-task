import Link from "next/link";
import { FaHome } from "react-icons/fa";

const NotFound = async () => {
  return (
    <>
      <div dir="rtl" className="min-h-screen flex justify-center items-center">
        <div className="max-w-md flex flex-col items-center gap-4">
          <h3 className="font-extrabold" style={{ fontSize: "15rem" }}>
            404
          </h3>
          <div className="flex flex-col items-center gap-12">
            <h3 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              صفحه‌ای یافت نشد!
            </h3>
            <Link href="/">
              <button
                className="bg-[#46B666] text-white flex items-center gap-2 transition-colors rounded-lg py-2 px-4 hover:bg-[#3a9e57] active:bg-[#328c4c]"
              ><span>صفحه‌اصلی</span>
                    <FaHome />
                </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
