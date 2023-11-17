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
  const { data } = useProducts();

  return (
    <>
      {data?.data.data.totalRowCount !== 0 ? (
        <div
          className="grid gap-6 py-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, 300px)",
            justifyContent: "center",
          }}
        >
          {data?.data.data.list.map((item: CardProps) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <>
          <div className="w-full h-full flex flex-col flex-1 justify-center items-center py-4">
            <Image
              src={EmptyCart}
              alt="This image is getting shown whenever the cart is empty!"
            />
            <span className="text-[#ABABAB]">محصول خود را وارد نمایید.</span>
          </div>
        </>
      )}
    </>
  );
};

export default ProductsPage;
