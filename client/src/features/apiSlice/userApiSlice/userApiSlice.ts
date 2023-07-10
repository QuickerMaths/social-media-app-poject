import { IUserAddress } from "../../../components/user-details/types";
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
    updateUserAddress: builder.mutation<
      IResponse<string, IUser>,
      { userId: string; addressToUpdate: IUserAddress }
    >({
      query: (arg) => {
        const { userId, addressToUpdate } = arg;
        return {
          method: "PUT",
          url: "/api/users",
          body: { userId, addressToUpdate },
        };
      },
      invalidatesTags: (result, error, req) => [
        { type: "User", id: req.userId },
      ],
    }),
  }),
});

export const { useGetUserByIdQuery, useUpdateUserAddressMutation } =
  userApiSlice;
