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

    getUserById: builder.query<IUser, { userId: number }>({
      query: ({ userId }) => ({
        method: "GET",
        url: `/api/user/${userId}`,
        credentials: "include",
      }),
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
      providesTags: (_result, _error, { userId }) => [
        { type: "User", id: userId },
      ],
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
    getAllRequests: builder.query<IUserPartial[], { userId: number }>({
      query: ({ userId }) => ({
        method: "GET",
        url: `/api/user/${userId}/requests`,
        credentials: "include",
      }),
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
    }),
    sendFriendRequest: builder.mutation<IUserPartial, { responderId: number }>({
      query: ({ responderId }) => ({
        method: "POST",
        url: `/api/user/${responderId}/send-request`,
        credentials: "include",
      }),
      onQueryStarted: ({ responderId }, { dispatch, queryFulfilled }) => {
        const result = dispatch(
          userApiSlice.util.updateQueryData(
            "getUserById",
            { userId: responderId },
            (draft) => {
              draft.friendship_status = 2;
            }
          )
        );
        queryFulfilled.catch(result.undo);
      },
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
    }),
    acceptFriendRequest: builder.mutation<
      IUserPartial,
      { requesterId: number; loggedInUserId: number }
    >({
      query: ({ requesterId }) => ({
        method: "PATCH",
        url: `/api/user/${requesterId}/accept-request`,
        credentials: "include",
      }),
      onQueryStarted: (
        { requesterId, loggedInUserId },
        { dispatch, queryFulfilled }
      ) => {
        const resultGetUserById = dispatch(
          userApiSlice.util.updateQueryData(
            "getUserById",
            { userId: loggedInUserId },
            (draft) => {
              draft.friendship_status = 1;
            }
          )
        );
        const resultGetAllRequests = dispatch(
          userApiSlice.util.updateQueryData(
            "getAllRequests",
            { userId: loggedInUserId },
            (draft) => draft.filter((item) => item.id !== requesterId)
          )
        );
        Promise.all([
          queryFulfilled.catch(resultGetUserById.undo),
          queryFulfilled.catch(resultGetAllRequests.undo),
        ]);
      },
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
    }),
    rejectFriendRequest: builder.mutation<
      {},
      { requesterId: number; loggedInUserId: number }
    >({
      query: ({ requesterId }) => ({
        method: "DELETE",
        url: `/api/user/${requesterId}/reject-request`,
        credentials: "include",
      }),
      onQueryStarted: (
        { requesterId, loggedInUserId },
        { dispatch, queryFulfilled }
      ) => {
        const resultGetUserById = dispatch(
          userApiSlice.util.updateQueryData(
            "getUserById",
            { userId: loggedInUserId },
            (draft) => {
              draft.friendship_status = 1;
            }
          )
        );
        const resultGetAllRequests = dispatch(
          userApiSlice.util.updateQueryData(
            "getAllRequests",
            { userId: loggedInUserId },
            (draft) => draft.filter((item) => item.id !== requesterId)
          )
        );
        Promise.all([
          queryFulfilled.catch(resultGetUserById.undo),
          queryFulfilled.catch(resultGetAllRequests.undo),
        ]);
      },
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
    }),
    deleteFriendship: builder.mutation<{}, { requesterId: number }>({
      query: ({ requesterId }) => ({
        method: "DELETE",
        url: `/api/user/${requesterId}/delete-friendship`,
        credentials: "include",
      }),
      onQueryStarted: ({ requesterId }, { dispatch, queryFulfilled }) => {
        const resultGetUserById = dispatch(
          userApiSlice.util.updateQueryData(
            "getUserById",
            { userId: requesterId },
            (draft) => {
              draft.friendship_status = null;
            }
          )
        );

        Promise.all([queryFulfilled.catch(resultGetUserById.undo)]);
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetAllUserFriendsQuery,
  useUpdateUserMutation,
  useGetAllRequestsQuery,
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useRejectFriendRequestMutation,
  useDeleteFriendshipMutation,
} = userApiSlice;
