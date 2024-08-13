import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { productHost } from "../../api/hosts";

export const getProductDataRtq = createApi({
  reducerPath: "productSlice/getProductDataRtq",
  baseQuery: fetchBaseQuery({ baseUrl: `${productHost}` }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetProductsQuery } = getProductDataRtq;
