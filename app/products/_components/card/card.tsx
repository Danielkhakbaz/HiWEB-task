"use client";

type CardProps = {
  description: string;
  id: string;
  imageUrl: string;
  rate: number;
  title: string;
  view: number;
};

const Card = ({ item }: { item: CardProps }) => {
  return (
    <>
      <div className="w-full h-full flex flex-col border rounded-lg shadow">
        {
          // Issue: Unable to use <Image /> tag from next/image.
          // Description: The tag is throwing an error related to an incorrect SSL certificate, although I believe this shouldn't be the case.
          // Example usage:
          // <Image width="..." height="..." src="..." alt="..." />
        }
        <img className="rounded-lg" src={item.imageUrl} alt="" />
        <section className="h-full flex flex-col justify-between gap-4 p-4">
          <h4>{item.title}</h4>
          <p className="text-hiwebGray-500 text-xs flex-1">
            {item.description.length > 45
              ? `${item.description.substring(0, 60)}...`
              : item.description}
          </p>
          <p className="text-sm">
            <span className="text-hiwebGray-300">قیمت:</span>{" "}
            {item.view.toLocaleString("fa")}
          </p>
        </section>
      </div>
    </>
  );
};

export default Card;
