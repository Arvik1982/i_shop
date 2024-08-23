import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authHost } from "../../api/hosts";
import { IUser } from "../../types/userTypes";
import { setToken, setUserId } from "../userSlice/userSlice";

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

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("token", data.token);
          dispatch(setToken(data.token));
          dispatch(setUserId(data.id));
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
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
