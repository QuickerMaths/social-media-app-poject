import { IUser } from "../../../pages/user-profile/types";
import { apiSlice } from "../apiSlice";
import { IResponse } from "../types";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<IResponse<string, IUser>, string>({
      query: (userId: string) => ({
        method: "GET",
        url: `/api/users/${userId}`,
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    updateUserAddress: builder.mutation({
      query: (userId: string) => ({
        method: "PUT",
        url: `/api/users/${userId}`,
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
});

export const { useGetUserByIdQuery, useUpdateUserAddressMutation } =
  userApiSlice;
