// Internal dependencies

import { apiSlice } from "../apiSlice";
import { IAuthProps, IAuthResponse, IResponse } from "../types";

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
  }),
});

export const {
  useUserAuthorizationQuery,
  useLogoutUserMutation,
  useLoginUserMutation,
} = authApiSlice;
