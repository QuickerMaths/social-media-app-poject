// External dependencies

import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

// Internal dependencies

import { errorTransformer } from "../../../hooks/reduxHooks";
import { IUser, IUserPartial } from "../../../pages/user-profile/types";
import { apiSlice } from "../apiSlice";
import { IErrorResponse } from "../types";
import { IUserUpdateData } from "../../../pages/user-profile/types";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUserPartial[], { page: number }>({
      query: ({ page = 1 }) => ({
        method: "GET",
        url: `/api/user?page=${page}&pageSize=20`,
        credentials: "include",
      }),
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
    }),

    getUserById: builder.query<IUser, string>({
      query: (userId: string) => ({
        method: "GET",
        url: `/api/user/${userId}`,
        credentials: "include",
      }),
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),

    getAllUserFriends: builder.query<
      IUserPartial[],
      { userId: number; page: number }
    >({
      query: ({ userId, page = 1 }) => ({
        method: "GET",
        url: `/api/user/${userId}/friends?page=${page}&pageSize=20`,
        credentials: "include",
      }),
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
    }),

    updateUser: builder.mutation<
      IUser,
      { userId: number; userUpdateData: IUserUpdateData }
    >({
      query: ({ userId, userUpdateData }) => {
        return {
          method: "PATCH",
          url: `/api/user/${userId}`,
          credentials: "include",
          body: userUpdateData,
        };
      },
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
      invalidatesTags: (_result, error, req) =>
        error ? [] : [{ type: "User", id: req.userId }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetAllUserFriendsQuery,
  useUpdateUserMutation,
} = userApiSlice;
