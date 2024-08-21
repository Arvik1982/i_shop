import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { productHost } from "../../api/hosts";

export const getProductDataRtq = createApi({
  reducerPath: "productSlice/getProductDataRtq",
  baseQuery: fetchBaseQuery({
    baseUrl: `${productHost}`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");

      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetProductsQuery } = getProductDataRtq;
