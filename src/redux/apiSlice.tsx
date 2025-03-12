import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store"; 
import { RegistrationResponseJSON } from '@simplewebauthn/types';


const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        let token = state.auth.authToken; // ✅ Get token from Redux
    
        if (!token) {
          token = localStorage.getItem("authToken"); // ✅ Fallback to localStorage
        }
    
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
    
        headers.set("Content-Type", "application/json");
        return headers;
      },
  }),
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
        body: { otp, userId },
      }),
    }),
    logoutUser: builder.mutation<void, void>({
      queryFn: () => {
        try {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId");
          sessionStorage.clear();
          return { data: undefined };
        } catch {
          return {
            error: { status: 500, statusText: "Logout Error", data: "Logout failed." },
          };
        }
      },
    }),
    generatePasskey: builder.mutation({
      query: (userId) => ({
        url: "auth/passkey/generate",
        method: "POST",
        body: { user_id: userId },
      }),
    }),
      // New passkey registration mutation
   // Update in your apiSlice
   registerPasskey: builder.mutation({
    query: ({
      registrationResponse,
      userId,
    }: {
      registrationResponse: RegistrationResponseJSON;
      userId: string;
    }) => ({
      url: "auth/passkey/register",
      method: "POST",
      body: { registrationResponse, user_id: userId },
    }),
  }),
  }),
});

export const {
  useGetUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useVerifyOTPMutation,
  useLogoutUserMutation,
  useGeneratePasskeyMutation,
  useRegisterPasskeyMutation
} = apiSlice;


// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "./store"; // Correct import based on your file structure

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: BASE_URL,
//     prepareHeaders: (headers, { getState }) => {
//       const state = getState() as RootState;
//       let token = state.auth.authToken;

//       if (!token) {
//         token = localStorage.getItem("authToken") ?? "";
//       }

//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }

//       headers.set("Content-Type", "application/json");
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     getUser: builder.query({
//       query: (id: string) => `/user/${id}`,
//     }),
//     registerUser: builder.mutation({
//       query: (userData: { username: string; password: string }) => ({
//         url: "auth/register",
//         method: "POST",
//         body: userData,
//       }),
//     }),
//     loginUser: builder.mutation({
//       query: (credentials: { username: string; password: string }) => ({
//         url: "auth/login",
//         method: "POST",
//         body: credentials,
//       }),
//     }),
//     verifyOTP: builder.mutation({
//       query: ({ otp, userId }: { otp: string; userId: string }) => ({
//         url: "auth/verify-otp",
//         method: "POST",
//         body: { otp, userId },
//       }),
//     }),
//     logoutUser: builder.mutation<void, void>({
//       queryFn: () => {
//         try {
//           localStorage.removeItem("authToken");
//           localStorage.removeItem("userId");
//           sessionStorage.clear();
//           return { data: undefined };
//         } catch {
//           return {
//             error: { status: 500, statusText: "Logout Error", data: "Logout failed." },
//           };
//         }
//       },
//     }),
//     generatePasskey: builder.mutation({
//       query: (userId: string) => ({
//         url: "auth/passkey/generate",
//         method: "POST",
//         body: { user_id: userId },
//       }),
//     }),
//     // New passkey registration mutation
//     registerPasskey: builder.mutation({
//       query: ({
//         registrationResponse,
//         userId,
//       }: {
//         registrationResponse: PublicKeyCredential;
//         userId: string;
//       }) => ({
//         url: "/register-passkey",
//         method: "POST",
//         body: { registrationResponse, user_id: userId },
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }),
//     }),
//   }),
// });

// export const {
//   useGetUserQuery,
//   useRegisterUserMutation,
//   useLoginUserMutation,
//   useVerifyOTPMutation,
//   useLogoutUserMutation,
//   useGeneratePasskeyMutation,
//   useRegisterPasskeyMutation, // Export the new mutation hook
// } = apiSlice;

