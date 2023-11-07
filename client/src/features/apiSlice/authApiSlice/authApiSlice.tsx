// Internal dependencies
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { errorTransformer } from "../../../hooks/reduxHooks";
import { IUser } from "../../../pages/user-profile/types";
import { apiSlice } from "../apiSlice";
import { IAuthProps, IErrorResponse, IRegisterProps } from "../types";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userAuthorization: builder.query<IUser, undefined>({
      query: () => ({
        url: "/api/auth/me",
        credentials: "include",
      }),
    }),

    logoutUser: builder.mutation<{}, undefined>({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
        credentials: "include",
      }),
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
    }),

    loginUser: builder.mutation<IUser, IAuthProps>({
      query: ({ email, password }) => ({
        url: `/api/auth/login`,
        method: "POST",
        credentials: "include",
        body: {
          email,
          password,
        },
      }),
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
    }),

    registerUser: builder.mutation<IUser, IRegisterProps>({
      query: ({ username, email, password }) => ({
        url: "/api/auth/register",
        method: "POST",
        body: {
          username,
          email,
          password,
        },
      }),
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
    }),
  }),
});

export const {
  useUserAuthorizationQuery,
  useLogoutUserMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
} = authApiSlice;
