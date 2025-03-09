import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1" }), // Adjust base URL
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `/user/${id}`,
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyOTP: builder.mutation({
      query: ({ otp, userId }) => ({
        url: "auth/verify-otp",
        method: "POST",
        body: { otp, userId }, // ✅ Send userId along with OTP
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useVerifyOTPMutation,
} = apiSlice;
