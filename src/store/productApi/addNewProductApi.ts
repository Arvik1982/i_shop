import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cartsUpdateHost } from "../../api/hosts";

export const addNewProductToCartRtq = createApi({
  reducerPath: "productSlice/addNewProductToCartRtq",
  baseQuery: fetchBaseQuery({
    baseUrl: `${cartsUpdateHost}`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addNewProductToCart: builder.mutation({
      query: ({ cartId, newProducts }) => ({
        url: `${cartId}`,
        method: "PUT",
        body: {
          merge: false,
          products: newProducts,
        },
      }),
    }),
  }),
});

export const { useAddNewProductToCartMutation } = addNewProductToCartRtq;
