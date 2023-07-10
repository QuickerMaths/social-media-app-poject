import { apiSlice } from "../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/api/users",
    }),
  }),
});

const { useGetUserQuery } = userApiSlice;
