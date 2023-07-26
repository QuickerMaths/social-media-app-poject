import { IUserBasicData } from "../../../pages/user-profile/types";
import { apiSlice } from "../apiSlice";
import { IFriendsRequestResponse, IResponse } from "../types";

export const friendsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFriendsRequests: builder.query<IUserBasicData[], string>({
      query: (userId: string) => ({
        url: `/api/friends/requests/${userId}`,
        credentials: "include",
      }),
      transformResponse: (
        response: IResponse<string, IFriendsRequestResponse>
      ) => {
        return response.data.friendsRequests;
      },
    }),
  }),
});

export const { useGetFriendsRequestsQuery } = friendsApiSlice;
