// External dependencies

import React from "react";
import { EntityId } from "@reduxjs/toolkit";
import { skipToken } from "@reduxjs/toolkit/dist/query";

// Internal dependencies

import PostOwner from "../post/subcomponents/PostOwner";
import useToastCreator from "../../hooks/useToastCreator";
import Spinner from "../../utilities/spinner/Spinner";
import { useAppSelector } from "../../hooks/reduxHooks";
import { IUserPartial } from "../../pages/user-profile/types";
import { RootState } from "../../redux/store";

interface Props {
  request: IUserPartial;
}

const FriendsRequest: React.FC<Props> = ({ request }) => {
  const { userId } = useAppSelector((state: RootState) => state.auth);

  // const [resolveFriendRequest, { isLoading: isResolving, isError, error }] =
  //   useResolveFriendRequestMutation();

  // if (isError) useToastCreator(error as string, "error");

  let content;

  // if (isResolving) {
  //   content = <Spinner size={50} />;
  // } else {
  content = (
    <>
      <PostOwner post_owner={request} />
      <div className="request__button-container">
        <button
          className="request__button request__button--accept"
          // onClick={() =>
          //   resolveFriendRequest({
          //     userId: userId as string,
          //     userToAddId,
          //     action: "accept",
          //     requestId: (request as IUserBasicData)._id,
          //   })
          // }
          // disabled={isResolving}
        >
          Accept
        </button>
        <button
          className="request__button request__button--decline"
          // onClick={() =>
          //   resolveFriendRequest({
          //     userId: userId as string,
          //     userToAddId,
          //     action: "reject",
          //     requestId: (request as IUserBasicData)._id,
          //   })
          // }
          // disabled={isResolving}
        >
          Decline
        </button>
      </div>
    </>
  );
  // }

  return <li className="request">{content}</li>;
};

export default FriendsRequest;
