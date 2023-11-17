import { useInfiniteQuery } from "@tanstack/react-query";
import { API } from "services/interceptor";

const call = async (page: number) => {
  return await API.get("/General/Product/ProductList", {
    params: {
      count: 6,
      skip: (page - 1) * 6,
    },
  }).then((res) => {
    sessionStorage.setItem("totalRowCount", res.data.data.totalRowCount);

    return res;
  });
};

export const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 1 }) => call(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (
        lastPageParam ===
        Math.ceil((sessionStorage.getItem("totalRowCount") as never) / 6)
      ) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
};
