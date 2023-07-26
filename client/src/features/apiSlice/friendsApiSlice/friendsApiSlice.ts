import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { providesList } from "../../../hooks/reduxHooks";
import { errorMessageHandler } from "../../../utilities/errorMessageHandler";
import { apiSlice } from "../apiSlice";
import { IFriendsRequestResponse, IResponse, IRequest } from "../types";

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
  }),
});

export const { useGetFriendsRequestsQuery } = friendsApiSlice;
