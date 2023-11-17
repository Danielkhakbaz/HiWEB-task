import { useQuery } from "@tanstack/react-query";
import { API } from "services/interceptor";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => await API.get("/General/Product/ProductList"),
  });
};
