"use client";

import { useState } from "react";
import ShowUsername from "layout/navbar/show-username/show-username";
import LogoutButton from "layout/navbar/logout-button/logout-button";
import AddModal from "app/products/_components/add-modal/add-modal";
import { FaPlus } from "react-icons/fa6";

const Navbar = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <nav className="w-full h-14 flex justify-between items-center border-hiwebGray-300 border-b pb-4">
        <p className="text-hiwebGray-500">لیست محصولات</p>
        <section className="flex items-center gap-6">
          <button
            className="bg-hiwebGreen-500 text-white flex items-center gap-2 rounded-lg transition-colors px-12 py-2 hover:bg-hiwebGreen-700 active:bg-hiwebGreen-900"
            onClick={() => setShowModal(true)}
          >
            <FaPlus />
            افزودن محصول
          </button>
          <ShowUsername />
          <LogoutButton />
        </section>
      </nav>
      {showModal && <AddModal setShowModal={setShowModal} />}
    </>
  );
};

export default Navbar;
