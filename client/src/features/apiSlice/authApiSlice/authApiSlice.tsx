// Internal dependencies
//TODO: refactor
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { errorTransformer } from "../../../hooks/reduxHooks";
import { IUser } from "../../../pages/user-profile/types";
import { apiSlice } from "../apiSlice";
import {
  IAuthProps,
  IAuthResponse,
  IErrorResponse,
  IRegisterProps,
  IResponse,
} from "../types";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userAuthorization: builder.query<IResponse<string, IAuthResponse>, string>({
      query: () => ({
        url: "/auth/me",
        credentials: "include",
      }),
    }),

    logoutUser: builder.mutation<IResponse<string, null>, string>({
      query: () => ({
        url: "/api/logout",
        method: "POST",
        credentials: "include",
      }),
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
    }),

    loginUser: builder.mutation<IResponse<string, IAuthResponse>, IAuthProps>({
      query: ({ username, password }) => ({
        url: `/auth`,
        method: "POST",
        credentials: "include",
        body: {
          username,
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
