"use client";

import Link from "next/link";
import { FaPowerOff } from "react-icons/fa6";

const LogoutButton = () => {
  return (
    <Link href="/">
      <button
        className="text-hiwebRed-500 flex items-center gap-1 rounded transition-colors px-3 py-2 hover:bg-red-50 active:bg-red-100"
        onClick={() => localStorage.clear()}
      >
        <FaPowerOff />
        خروج
      </button>
    </Link>
  );
};

export default LogoutButton;
