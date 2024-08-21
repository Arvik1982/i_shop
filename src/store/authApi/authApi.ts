import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authHost } from "../../api/hosts";
import { IUser } from "../../types/userTypes";

export const getAuthRtq = createApi({
  reducerPath: "authSlice/getAuthUserRtq",
  baseQuery: fetchBaseQuery({
    baseUrl: `${authHost}`,

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
    getAuth: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    getUser: builder.query<IUser, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAuthMutation, useGetUserQuery } = getAuthRtq;
