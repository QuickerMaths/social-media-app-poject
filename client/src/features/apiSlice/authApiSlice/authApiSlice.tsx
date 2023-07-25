// Internal dependencies

import { apiSlice } from "../apiSlice";
import { IAuthProps, IAuthResponse } from "../types";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userAuthorization: builder.query<IAuthResponse, string>({
      query: () => ({
        url: "/auth/me",
        credentials: "include",
      }),
    }),
    loginUser: builder.mutation<IAuthResponse, IAuthProps>({
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
  }),
});

export const { useUserAuthorizationQuery, useLoginUserMutation } = authApiSlice;
