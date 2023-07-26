import { IUserBasicData } from "../../../pages/user-profile/types";
import { apiSlice } from "../apiSlice";
import { IResponse } from "../types";

export const friendsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFriendsRequests: builder.query<
      IResponse<string, IUserBasicData[]>,
      string
    >({
      query: (userId: string) => ({
        url: `/api/requests/${userId}`,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetFriendsRequestsQuery } = friendsApiSlice;
