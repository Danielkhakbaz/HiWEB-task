type CardProps = {
  description: string;
  id: string;
  imageUrl: string;
  rate: number;
  title: string;
  view: number;
};

const Card = async ({ item }: { item: CardProps }) => {
  return (
    <>
      <div className="w-full h-full flex flex-col border rounded-lg shadow">
        <img src={item.imageUrl} alt="" />
        <div className="h-full flex flex-col justify-between gap-4 p-4">
          <h4>{item.title}</h4>
          <p className="text-[#5C5C5C] text-[12px] flex-1">
            {item.description.length > 45
              ? `${item.description.substring(0, 60)}...`
              : item.description}
          </p>
          <p className="text-[14px]">
            <span className="text-[#A0A0A0]">قیمت:</span>{" "}
            {item.view.toLocaleString("fa")}
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
