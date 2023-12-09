"use client";

import { useState } from "react";
import Link from "next/link";
import ShowUsername from "layout/navbar/show-username/show-username";
import AddModal from "app/products/_components/add-modal/add-modal";
import { FaPlus, FaPowerOff } from "react-icons/fa6";

const Navbar = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <nav className="w-full h-14 flex justify-between items-center border-hiwebGray-300 border-b pb-4">
        <p className="text-hiwebGray-500">لیست محصولات</p>
        <section className="flex items-center gap-6">
          <button
            className="w-[266px] h-[47px] bg-hiwebGreen-500 text-white flex justify-center items-center gap-2 rounded-lg transition-colors hover:bg-hiwebGreen-700 active:bg-hiwebGreen-900"
            onClick={() => setShowModal(true)}
          >
            <FaPlus />
            افزودن محصول
          </button>
          <ShowUsername />
          <Link href="/">
            <button
              className="text-hiwebRed-500 flex items-center gap-1 rounded-lg transition-colors px-3 py-2 hover:bg-red-50 active:bg-red-100"
              onClick={() => localStorage.clear()}
            >
              <FaPowerOff />
              خروج
            </button>
          </Link>
        </section>
      </nav>
      {showModal && <AddModal setShowModal={setShowModal} />}
    </>
  );
};

export default Navbar;
