"use client";

import { useState, useEffect } from "react";
import { FaPowerOff, FaPlus } from "react-icons/fa6";

const Navbar = () => {
  const [username, setUsername] = useState<string | null>("");

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  return (
    <>
      <nav className="w-full flex justify-between items-center border-[#A0A0A0] border-b pb-3">
        <p>لیست محصولات</p>
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 bg-[#46B666] text-white rounded-lg py-2 px-12">
            <FaPlus />
            افزودن محصول
          </button>
          <span className="text-[#5C5C5C]">{username}</span>
          <button className="flex items-center gap-1 text-[#FF6666]">
            <FaPowerOff />
            خروج
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
