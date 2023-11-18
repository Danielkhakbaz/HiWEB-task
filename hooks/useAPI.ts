import { API } from "services/interceptor";

export const useAPI = () => {
  const getProducts = async (page: number) => {
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

  const addProduct = async ({
    ProductTitle,
    ProductPrice,
    Description,
    file,
  }: {
    ProductTitle: string;
    ProductPrice: number;
    Description: string;
    file: File | undefined;
  }) => {
    return await API.post(
      "/General/Product/AddProduct",
      {
        ProductTitle,
        ProductPrice,
        Description,
        file,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  return { getProducts, addProduct };
};
