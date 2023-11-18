import { useInfiniteQuery } from "@tanstack/react-query";
import { useAPI } from "hooks/useAPI";

const { getProducts } = useAPI();

export const useGetProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 1 }) => getProducts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
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
