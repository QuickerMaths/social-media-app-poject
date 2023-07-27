// External dependencies

import { createEntityAdapter } from "@reduxjs/toolkit";

// Internal dependencies

import { IUserAddress } from "../../../components/user-details/types";
import { IUser, IUserBasicData } from "../../../pages/user-profile/types";
import { apiSlice } from "../apiSlice";
import { IResponse } from "../types";

const friendsAdapter = createEntityAdapter<IUserBasicData>({
  selectId: (friend) => friend._id,
});

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUserBasicData[], void>({
      query: () => "/api/users",
      transformResponse: (response: IResponse<string, IUser[]>) => {
        return response.data.map((user) => ({
          _id: user._id,
          username: user.username,
          profilePicture: user.profilePicture,
        }));
      },
    }),
    getUserById: builder.query<IUser, string>({
      query: (userId: string) => ({
        method: "GET",
        url: `/api/users/${userId}`,
      }),
      transformResponse: (response: IResponse<string, IUser>) => {
        response.data.friends = friendsAdapter.setAll(
          friendsAdapter.getInitialState(),
          response.data.friends as IUserBasicData[]
        );
        return response.data;
      },
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    updateUserAddress: builder.mutation<
      IResponse<string, IUser>,
      { userId: string; addressToUpdate: IUserAddress }
    >({
      query: ({ userId, addressToUpdate }) => {
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
    uploadUserImage: builder.mutation<
      IResponse<string, IUser>,
      { userId: string; path: string }
    >({
      query: ({ userId, path }) => {
        return {
          method: "PUT",
          url: "/api/users/uploads",
          body: { userId, path },
        };
      },
      invalidatesTags: (result, error, req) => [
        { type: "User", id: req.userId },
      ],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserAddressMutation,
  useUploadUserImageMutation,
} = userApiSlice;
