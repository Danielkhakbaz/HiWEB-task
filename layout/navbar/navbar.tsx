"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaPlus, FaPowerOff } from "react-icons/fa6";

const Navbar = async () => {
  const [username, setUsername] = useState<string | null>("");

  const router = useRouter();

  const handleLogOut = () => {
    router.push("/");

    localStorage.clear();
  };

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  return (
    <>
      <nav className="w-full flex justify-between items-center border-[#A0A0A0] border-b pb-4">
        <p className="text-[#5C5C5C]">لیست محصولات</p>
        <div className="flex items-center gap-6">
          <button className="bg-[#46B666] text-white flex items-center gap-2 rounded-lg transition-colors px-12 py-2 hover:bg-[#3a9e57] active:bg-[#328c4c]">
            <FaPlus />
            افزودن محصول
          </button>
          <span className="text-[#5C5C5C]">{username}</span>
          <button
            className="text-[#FF6666] flex items-center gap-1 rounded transition-colors px-3 py-2 hover:bg-red-50 active:bg-red-100"
            onClick={handleLogOut}
          >
            <FaPowerOff />
            خروج
          </button>{" "}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
