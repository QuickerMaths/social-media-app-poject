import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { invalidatesList, providesList } from "../../../hooks/reduxHooks";
import { IUser } from "../../../pages/user-profile/types";
import { errorMessageHandler } from "../../../utilities/errorMessageHandler";
import { apiSlice } from "../apiSlice";
import {
  IFriendsRequestResponse,
  IResponse,
  IRequest,
  IResolveFriendRequestProps,
} from "../types";

const requestAdapter = createEntityAdapter<IRequest>({
  selectId: (request) => request._id,
});

export const friendsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
      //   transformErrorResponse: (error: IResponse<number, { error: string }>) => {
      //     return (error.data.error = errorMessageHandler(error.status));
      //   },
      providesTags: (result, error, arg) =>
        providesList(result?.ids, "Request"),
    }),
    resolveFriendRequest: builder.mutation<
      IRequest,
      IResolveFriendRequestProps
    >({
      query: ({ action, userId, userToAddId }) => ({
        url: `/api/friends/${action}`,
        method: "PUT",
        credentials: "include",
        body: {
          userId,
          userToAddId,
        },
      }),
      invalidatesTags: (result, error, req) => [
        { type: "Request", id: (result as IRequest)._id },
        { type: "User", id: req.userId },
        { type: "User", id: req.userToAddId },
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
      invalidatesTags: (result, error, req) => [
        { type: "User", id: req.userId },
        { type: "User", id: req.friendToDeleteId },
      ],
    }),
  }),
});

export const {
  useGetFriendsRequestsQuery,
  useResolveFriendRequestMutation,
  useDeleteFriendMutation,
} = friendsApiSlice;
