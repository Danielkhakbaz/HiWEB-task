import { useInfiniteQuery } from "@tanstack/react-query";
import { API } from "services/interceptor";

const call = async (page: number) => {
  return await API.get("/General/Product/ProductList", {
    params: {
      count: 6,
      skip: (page - 1) * 6,
    },
  });
};

export const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 1 }) => call(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.data.data.list.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
};
