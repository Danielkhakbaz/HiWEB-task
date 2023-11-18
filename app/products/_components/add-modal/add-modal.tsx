"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useQueryClient,
  useMutation,
  InvalidateQueryFilters,
} from "@tanstack/react-query";
import Loading from "app/loading";
import { useAPI } from "hooks/useAPI";
import { FaX } from "react-icons/fa6";

type AddModalProps = {
  setShowModal: (prevValue: React.SetStateAction<boolean>) => void;
};

const AddModal = ({ setShowModal }: AddModalProps) => {
  const [uploadedImage, setUploadedImage] = useState<File>();

  const modalRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();

  const { addProduct } = useAPI();

  const {
    register,
    watch,
    formState: { isValid },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationKey: ["products"],
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products" as InvalidateQueryFilters);

      setShowModal(false);
    },
  });

  const handleAddProduct = () => {
    mutate({
      ProductTitle: watch("ProductTitle"),
      ProductPrice: watch("ProductPrice"),
      Description: watch("Description"),
      file: uploadedImage,
    });
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !(event.target as Element)?.closest(".modal-content")
      ) {
        setShowModal(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [setShowModal]);

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div
              className="modal-content bg-white px-4 pt-8"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="w-3/4 flex flex-col justify-center items-center gap-4 mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3
                  className="w-full flex text-base leading-6 text-gray-900"
                  id="modal-title"
                >
                  افزودن محصول
                </h3>
                <form className="w-full text-sm text-gray-500 flex flex-col justify-center gap-6 pt-4">
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="w-full flex font-medium text-hiwebGray-300"
                      htmlFor="ProductTitle"
                    >
                      نام محصول
                    </label>
                    <input
                      id="ProductTitle"
                      className="text-sm border border-hiwebGray-300 rounded-lg p-2.5"
                      type="text"
                      placeholder="نام محصول..."
                      {...register("ProductTitle", { required: true })}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="w-full flex font-medium text-hiwebGray-300"
                      htmlFor="ProductPrice"
                    >
                      قیمت محصول
                    </label>
                    <input
                      id="ProductPrice"
                      className="text-sm border border-hiwebGray-300 rounded-lg p-2.5"
                      type="number"
                      placeholder="قیمت محصول..."
                      {...register("ProductPrice", { required: true })}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="w-full flex font-medium text-hiwebGray-300"
                      htmlFor="Description"
                    >
                      توضیحات
                    </label>
                    <textarea
                      id="Description"
                      className="text-sm border border-hiwebGray-300 rounded-lg p-2.5"
                      placeholder="..."
                      {...register("Description", { required: true })}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="w-full flex font-medium text-hiwebGray-300"
                      htmlFor="file"
                    >
                      بارگذاری عکس محصول
                    </label>
                    <input
                      id="file"
                      dir="ltr"
                      className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer border border-solid px-3 py-[0.32rem] font-normal leading-[2.15] transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:px-3 file:py-[0.32rem] file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] focus:border-primary focus:shadow-te-primary focus:outline-none dark:file:bg-hiwebGray-600 dark:file:text-hiwebGray-500 border-hiwebGray-300 rounded-lg"
                      type="file"
                      onChange={(e) => setUploadedImage(e.target.files?.[0])}
                    />
                  </div>
                </form>
              </div>
              <button
                className="absolute left-4 top-4 rounded-lg p-4 transition-colors hover:bg-hiwebGray-100 active:bg-hiwebGray-200"
                onClick={() => setShowModal(false)}
              >
                <FaX className="text-xs" />
              </button>
            </div>
            <div className="w-full flex justify-center">
              <div className="w-3/4 modal-content flex justify-center gap-12 px-4 py-8">
                <button
                  className="w-full text-hiwebGray-500 rounded-lg transition-colors px-6 py-2 hover:bg-hiwebGray-100 hover:text-white active:bg-hiwebGray-200 active:text-white"
                  onClick={() => setShowModal(false)}
                >
                  انصراف
                </button>
                <button
                  className="w-full bg-hiwebGreen-500 text-white rounded-lg transition-colors px-6 py-2 hover:bg-hiwebGreen-700 active:bg-hiwebGreen-900 disabled:text-hiwebGray-700 disabled:bg-hiwebGray-100"
                  disabled={!isValid || isPending || !uploadedImage}
                  onClick={handleAddProduct}
                >
                  {isPending ? <Loading /> : <span>ثبت محصول</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
