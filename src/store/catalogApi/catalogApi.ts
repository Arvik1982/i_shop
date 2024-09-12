import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { catalogHost } from "../../api/hosts";

export const getCatalogDataRtq = createApi({
  reducerPath: "catalogSlice/getCatalogDataRtq",
  baseQuery: fetchBaseQuery({
    baseUrl: `${catalogHost}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCatalog: builder.query({
      query: ({ searchInput, skip }) =>
        `/search?q=${searchInput}&limit=12&skip=${skip}`,
    }),
  }),
});

export const { useGetCatalogQuery } = getCatalogDataRtq;
