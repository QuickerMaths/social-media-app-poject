import { apiSlice } from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
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
