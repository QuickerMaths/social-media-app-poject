// Internal dependencies

import { IUser } from "../../../pages/user-profile/types";
import { apiSlice } from "../apiSlice";
import { IAuthProps, IAuthResponse, IRegisterProps, IResponse } from "../types";

//TODO: remember to add error handling for all api calls

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
    }),

    registerUser: builder.mutation<IResponse<string, IUser>, IRegisterProps>({
      query: ({ username, email, firstName, lastName, password }) => ({
        url: "/register",
        method: "POST",
        body: {
          username,
          email,
          firstName,
          lastName,
          password,
        },
      }),
    }),
  }),
});

export const {
  useUserAuthorizationQuery,
  useLogoutUserMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
} = authApiSlice;
