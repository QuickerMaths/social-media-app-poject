// External dependencies

import {
  EntityState,
  SerializedError,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

// Internal dependencies

import { errorTransformer } from "../../../hooks/reduxHooks";
import { IUser, IUserPartial } from "../../../pages/user-profile/types";
import { apiSlice } from "../apiSlice";
import { IErrorResponse, IMetaData, IResponse } from "../types";
import { IUserUpdateData } from "../../../pages/user-profile/types";

export const userAdapter = createEntityAdapter<IUserPartial>({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.id - b.id,
});

export const userFriendAdapter = createEntityAdapter<IUserPartial>({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.id - b.id,
});

export const userFriendRequestAdapter = createEntityAdapter<IUserPartial>({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.id - b.id,
});

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<
      EntityState<IUserPartial> & { meta: IMetaData },
      { page: number }
    >({
      query: ({ page = 1 }) => ({
        method: "GET",
        url: `/api/user?page=${page}&pageSize=20`,
        credentials: "include",
      }),
      transformResponse: (response: IResponse<IUserPartial[]>) => {
        return userAdapter.setAll(
          userAdapter.getInitialState({ meta: { ...response.meta } }),
          response.data
        );
      },
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg;
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        return userAdapter.upsertMany(
          { ...currentCache, meta: { ...newItems.meta } },
          userAdapter.getSelectors().selectAll(newItems)
        );
      },
    }),

    getUserById: builder.query<IUser, { userId: number }>({
      query: ({ userId }) => ({
        method: "GET",
        url: `/api/user/${userId}`,
        credentials: "include",
      }),
      transformResponse: (response: IResponse<IUser>) => response.data,
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
    }),

    getAllUserFriends: builder.query<
      EntityState<IUserPartial> & { meta: IMetaData },
      { userId: number; page: number }
    >({
      query: ({ userId, page = 1 }) => ({
        method: "GET",
        url: `/api/user/${userId}/friends?page=${page}&pageSize=5`,
        credentials: "include",
      }),
      transformResponse: (response: IResponse<IUserPartial[]>) => {
        return userFriendAdapter.setAll(
          userFriendAdapter.getInitialState({ meta: { ...response.meta } }),
          response.data
        );
      },
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg;
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return endpointName + queryArgs.userId;
      },
      merge: (currentCache, newItems) => {
        return userFriendAdapter.upsertMany(
          { ...currentCache, meta: { ...newItems.meta } },
          userFriendAdapter.getSelectors().selectAll(newItems)
        );
      },
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

      //TODO: update cache manualy
      transformResponse: (response: IResponse<IUser>) => response.data,
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
    }),

    getAllRequests: builder.query<
      EntityState<IUserPartial> & { meta: IMetaData },
      { userId: number; page: number }
    >({
      query: ({ userId, page = 1 }) => ({
        method: "GET",
        url: `/api/user/${userId}/requests?page=${page}&pageSize=3`,
        credentials: "include",
      }),
      transformResponse: (response: IResponse<IUserPartial[]>) => {
        return userFriendRequestAdapter.setAll(
          userFriendRequestAdapter.getInitialState({
            meta: { ...response.meta },
          }),
          response.data
        );
      },
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg;
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        return userFriendRequestAdapter.upsertMany(
          { ...currentCache, meta: { ...newItems.meta } },
          userFriendRequestAdapter.getSelectors().selectAll(newItems)
        );
      },
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
      transformResponse: (response: IResponse<IUserPartial>) => response.data,
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
    }),

    acceptFriendRequest: builder.mutation<
      IUserPartial,
      {
        requesterId: number;
        loggedInUserId: number;
        requesterUsername: string;
        requesterAvatarUrl: string;
      }
    >({
      query: ({ requesterId }) => ({
        method: "PATCH",
        url: `/api/user/${requesterId}/accept-request`,
        credentials: "include",
      }),
      onQueryStarted: (
        { requesterId, loggedInUserId, requesterUsername, requesterAvatarUrl },
        { dispatch, queryFulfilled, getState }
      ) => {
        const resultGetUserById = dispatch(
          userApiSlice.util.updateQueryData(
            "getUserById",
            { userId: requesterId },
            (draft) => ({
              ...draft,
              friends:
                draft.friends && draft.friends.length < 10
                  ? [
                      ...draft.friends,
                      {
                        id: loggedInUserId,
                        //@ts-ignore
                        username: getState().auth.username,
                        //@ts-ignore
                        avatar_url: getState().auth.Img,
                      },
                    ]
                  : draft.friends,
              friendship_status: 1,
            })
          )
        );
        const resultLoggedInUser = dispatch(
          userApiSlice.util.updateQueryData(
            "getUserById",
            { userId: loggedInUserId },
            (draft) => ({
              ...draft,
              friends:
                draft.friends && draft.friends.length < 10
                  ? [
                      ...draft.friends,
                      {
                        id: requesterId,
                        username: requesterUsername,
                        avatar_url: requesterAvatarUrl,
                      },
                    ]
                  : draft.friends,
            })
          )
        );
        const resultGetAllRequests = dispatch(
          userApiSlice.util.updateQueryData(
            "getAllRequests",
            {
              userId: loggedInUserId,
              //@ts-ignore
              page: getState().pagination.friendRequestPage,
            },
            (draft) => {
              userFriendRequestAdapter.removeOne(draft, requesterId);
            }
          )
        );
        Promise.all([
          queryFulfilled.catch(resultGetUserById.undo),
          queryFulfilled.catch(resultGetAllRequests.undo),
          queryFulfilled.catch(resultLoggedInUser.undo),
        ]);
      },
      transformResponse: (response: IResponse<IUserPartial>) => response.data,
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
        { dispatch, queryFulfilled, getState }
      ) => {
        const resultGetUserById = dispatch(
          userApiSlice.util.updateQueryData(
            "getUserById",
            { userId: requesterId },
            (draft) => ({
              ...draft,
              friendship_status: null,
            })
          )
        );
        const resultGetAllRequests = dispatch(
          userApiSlice.util.updateQueryData(
            "getAllRequests",
            {
              userId: loggedInUserId,
              //@ts-ignore
              page: getState().pagination.friendRequestPage,
            },
            (draft) => {
              userFriendRequestAdapter.removeOne(draft, requesterId);
            }
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
      onQueryStarted: (
        { requesterId },
        { dispatch, queryFulfilled, getState }
      ) => {
        const resultGetUserById = dispatch(
          userApiSlice.util.updateQueryData(
            "getUserById",
            { userId: requesterId },
            (draft) => ({
              ...draft,
              friendship_status: null,
              friends:
                draft.friends &&
                draft.friends.filter(
                  //@ts-ignore
                  (friend) => friend.id !== getState().auth.userId
                ),
            })
          )
        );
        const resultLoggedInUser = dispatch(
          userApiSlice.util.updateQueryData(
            "getUserById",
            //@ts-ignore
            { userId: getState().auth.userId },
            (draft) => ({
              ...draft,
              friends:
                draft.friends &&
                draft.friends.filter((friend) => friend.id !== requesterId),
            })
          )
        );

        Promise.all([
          queryFulfilled.catch(resultGetUserById.undo),
          queryFulfilled.catch(resultLoggedInUser.undo),
        ]);
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
