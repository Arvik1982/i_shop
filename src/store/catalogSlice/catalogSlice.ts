import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { catalogHost } from "../../api/hosts";

export const getCatalogDataRtq = createApi({
  reducerPath: "catalogSlice/getCatalogDataRtq",
  baseQuery: fetchBaseQuery({ baseUrl: `${catalogHost}` }),
  endpoints: (builder) => ({
    getCatalog: builder.query({
      query: ({ searchInput, skip }) =>
        `/search?q=${searchInput}&limit=12&skip=${skip}`,
    }),
  }),
});

export const { useGetCatalogQuery } = getCatalogDataRtq;
