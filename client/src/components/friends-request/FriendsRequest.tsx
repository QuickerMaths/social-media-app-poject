// External dependencies

import React from "react";
import { EntityId } from "@reduxjs/toolkit";
import { skipToken } from "@reduxjs/toolkit/dist/query";

// Internal dependencies

import PostOwner from "../post/subcomponents/PostOwner";
import useToastCreator from "../../hooks/useToastCreator";
import Spinner from "../../utilities/spinner/Spinner";
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

  const { request } = useGetFriendsRequestsQuery(userId ?? skipToken, {
    selectFromResult: ({ data }) => ({
      request: data?.entities[requestId],
    }),
  });

  const { _id: userToAddId } = request as IRequest;

  const [resolveFriendRequest, { isLoading: isResolving, isError, error }] =
    useResolveFriendRequestMutation();

  if (isError) useToastCreator(error as string, "error");

  let content;

  if (isResolving) {
    content = <Spinner size={50} />;
  } else {
    content = (
      <>
        <PostOwner owner={request as IUserBasicData} />
        <div className="request__button-container">
          <button
            className="request__button request__button--accept"
            onClick={() =>
              resolveFriendRequest({
                userId: userId as string,
                userToAddId,
                action: "accept",
                requestId: (request as IUserBasicData)._id,
              })
            }
            disabled={isResolving}
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
                requestId: (request as IUserBasicData)._id,
              })
            }
            disabled={isResolving}
          >
            Decline
          </button>
        </div>
      </>
    );
  }

  return <li className="request">{content}</li>;
};

export default FriendsRequest;
