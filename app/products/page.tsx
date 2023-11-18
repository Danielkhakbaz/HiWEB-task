"use client";

import Image from "next/image";
import Card from "app/products/_components/card/card";
import { useGetProducts } from "hooks/useQuery";
import EmptyCart from "assets/images/empty-cart.png";
import Loading from "app/loading";

type CardProps = {
  description: string;
  id: string;
  imageUrl: string;
  title: string;
  price: number;
};

const ProductsPage = () => {
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetProducts();

  if (isLoading) {
    return (
      <main className="w-full min-h-[calc(100vh-6rem)] flex justify-center items-center">
        <Loading />
      </main>
    );
  }

  if (error instanceof Error) {
    throw new Error(error.message);
  }

  return (
    <>
      {data?.pages[0].data.data.totalRowCount !== 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-10 py-4">
            {data?.pages.map((page) =>
              page.data.data.list.map((item: CardProps) => (
                <Card key={item.id} item={item} />
              ))
            )}
          </div>
          {hasNextPage && (
            <div className="w-full flex justify-center">
              <button
                className="w-fit bg-hiwebGreen-500 text-white text-sm rounded-lg transition-colors my-4 px-4 py-3 hover:bg-hiwebGreen-700 active:bg-hiwebGreen-900"
                disabled={!hasNextPage || isFetchingNextPage}
                onClick={() => fetchNextPage()}
              >
                {isFetchingNextPage
                  ? "منتظر بمانید..."
                  : hasNextPage && "مشاهده بیشتر"}
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
          <span className="text-hiwebGray-200">محصول خود را وارد نمایید.</span>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
