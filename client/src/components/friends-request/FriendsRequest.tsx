// External dependencies

import React from "react";
import { EntityId } from "@reduxjs/toolkit";

// Internal dependencies

import PostOwner from "../post/sumcomponents/PostOwner";
import { useAppSelector } from "../../hooks/reduxHooks";
import { IUserBasicData } from "../../pages/user-profile/types";
import { RootState } from "../../redux/store";
import {
  useGetFriendsRequestsQuery,
  useResolveFriendRequestMutation,
} from "../../features/apiSlice/friendsApiSlice/friendsApiSlice";
import { IRequest } from "../../features/apiSlice/types";

interface Props {
  requestId: EntityId;
}

const FriendsRequest: React.FC<Props> = ({ requestId }) => {
  const { userId } = useAppSelector((state: RootState) => state.auth);

  const { request } = useGetFriendsRequestsQuery(userId as string, {
    selectFromResult: ({ data }) => ({
      request: data?.entities[requestId],
    }),
  });

  const { _id: userToAddId } = request as IRequest;

  const [resolveFriendRequest] = useResolveFriendRequestMutation();

  //TODO: close modal after clicking on post owner
  return (
    <li className="request">
      <PostOwner owner={request as IUserBasicData} />
      <div className="request__button-container">
        <button
          className="request__button request__button--accept"
          onClick={() =>
            resolveFriendRequest({
              userId: userId as string,
              userToAddId,
              action: "accept",
            })
          }
        >
          Accept
        </button>
        <button
          className="request__button request__button--decline"
          onClick={() =>
            resolveFriendRequest({
              userId: userId as string,
              userToAddId,
              action: "reject",
            })
          }
        >
          Decline
        </button>
      </div>
    </li>
  );
};

export default FriendsRequest;
