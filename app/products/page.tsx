"use client";

import Image from "next/image";
import { useProducts } from "hooks/useQuery";
import Card from "components/card/card";
import EmptyCart from "assets/images/empty-cart.png";

type CardProps = {
  description: string;
  id: string;
  imageUrl: string;
  rate: number;
  title: string;
  view: number;
};

const ProductsPage = () => {
  const {
    data,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useProducts();

  if (error instanceof Error) {
    throw new Error(error.message);
  }

  return (
    <>
      {data?.pages[0].data.data.totalRowCount !== 0 ? (
        <>
          <div
            className="grid gap-6 py-4"
            style={{
              gridTemplateColumns: "repeat(auto-fill, 300px)",
              justifyContent: "center",
            }}
          >
            {data?.pages.map((page) =>
              page.data.data.list.map((item: CardProps) => (
                <Card key={item.id} item={item} />
              ))
            )}
          </div>
          {hasNextPage && (
            <div className="w-full flex justify-center">
              <button
                className="w-fit bg-green-400 text-[14px] rounded-lg transition-colors my-4 px-4 py-3 hover:bg-green-500 active:bg-green-600"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? "منتظر بمانید..."
                  : hasNextPage && "مشاهده بیشتر..."}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex flex-col flex-1 justify-center items-center py-4">
          <Image
            src={EmptyCart}
            alt="This image is getting shown whenever the cart is empty!"
          />
          <span className="text-[#ABABAB]">محصول خود را وارد نمایید.</span>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
