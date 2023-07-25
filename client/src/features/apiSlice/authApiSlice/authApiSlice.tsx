// Internal dependencies

import { apiSlice } from "../apiSlice";
import { IAuthProps, IAuthResponse } from "../types";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useLoginUserMutation } = authApiSlice;
