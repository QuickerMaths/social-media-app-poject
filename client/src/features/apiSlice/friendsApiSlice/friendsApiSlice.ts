// External dependencies

import {
  createEntityAdapter,
  EntityState,
  SerializedError,
} from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

// Internal dependencies

import { errorTransformer, providesList } from "../../../hooks/reduxHooks";
import { IUser, IUserBasicData } from "../../../pages/user-profile/types";
import { apiSlice } from "../apiSlice";
import {
  IFriendsRequestResponse,
  IResponse,
  IRequest,
  IResolveFriendRequestProps,
  IErrorResponse,
} from "../types";

const requestAdapter = createEntityAdapter<IRequest>({
  selectId: (request) => request._id,
});

const friendsAdapter = createEntityAdapter<IUserBasicData>({
  selectId: (friend) => friend._id,
});

export const friendsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // TODO: use this to display all users friends in special portal or component
    getFriendsByUserId: builder.query<EntityState<IUserBasicData>, string>({
      query: (userId: string) => ({
        url: `/api/friends/${userId}`,
        credentials: "include",
      }),
      transformResponse: (response: IResponse<string, IUser>) => {
        return friendsAdapter.setAll(
          friendsAdapter.getInitialState(),
          response.data.friends as IUserBasicData[]
        );
      },
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
    }),

    getFriendsRequests: builder.query<EntityState<IRequest>, string>({
      query: (userId: string) => ({
        url: `/api/friends/requests/${userId}`,
        credentials: "include",
      }),
      transformResponse: (
        response: IResponse<string, IFriendsRequestResponse>
      ) => {
        return requestAdapter.setAll(
          requestAdapter.getInitialState(),
          response.data.friendsRequests
        );
      },
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
      providesTags: (result, error, arg) =>
        providesList(result?.ids, "Request"),
    }),

    resolveFriendRequest: builder.mutation<IUser, IResolveFriendRequestProps>({
      query: ({ action, userId, userToAddId }) => ({
        url: `/api/friends/${action}`,
        method: "PUT",
        credentials: "include",
        body: {
          userId,
          userToAddId,
        },
      }),
      transformResponse: (response: IResponse<string, IUser>) => {
        return response.data;
      },
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
      invalidatesTags: (result, error, req) => [
        { type: "User", id: req.userId },
        { type: "User", id: req.userToAddId },
        { type: "Request", id: req.requestId },
      ],
    }),

    deleteFriend: builder.mutation<
      string,
      { userId: string; friendToDeleteId: string }
    >({
      query: ({ userId, friendToDeleteId }) => ({
        url: "/api/friends",
        method: "DELETE",
        body: { userId, friendToDeleteId },
      }),
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
      invalidatesTags: (result, error, req) => [
        { type: "User", id: req.userId },
        { type: "User", id: req.friendToDeleteId },
      ],
    }),

    sendFriendRequest: builder.mutation<
      IUser,
      { userId: string; userToAddId: string }
    >({
      query: ({ userId, userToAddId }) => ({
        url: "/api/friends",
        method: "PUT",
        body: { userId, userToAddId },
      }),
      transformResponse: (response: IResponse<string, IUser>) => {
        return response.data;
      },
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
      invalidatesTags: (result, error, req) => [
        { type: "User", id: req.userToAddId },
      ],
    }),
  }),
});

export const {
  useGetFriendsByUserIdQuery,
  useGetFriendsRequestsQuery,
  useResolveFriendRequestMutation,
  useDeleteFriendMutation,
  useSendFriendRequestMutation,
} = friendsApiSlice;
