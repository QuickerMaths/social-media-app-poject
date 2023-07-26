// External dependencies

import React from "react";
import { EntityId } from "@reduxjs/toolkit";

// Internal dependencies

import PostOwner from "../post/sumcomponents/PostOwner";
import { useAppSelector } from "../../hooks/reduxHooks";
import { IUserBasicData } from "../../pages/user-profile/types";
import { RootState } from "../../redux/store";
import { useGetFriendsRequestsQuery } from "../../features/apiSlice/friendsApiSlice/friendsApiSlice";

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

  // //TODO: refactor to rtkQuery
  // const handleRequest = async (
  //   userId: string,
  //   userToAddId: string,
  //   action: "accept" | "reject"
  // ) => {
  //   try {
  //     const res = await axios.put(
  //       `http://localhost:5000/api/friends/${action}`,
  //       {
  //         userId,
  //         userToAddId,
  //       }
  //     );
  //     console.log(res);
  //     setReRender(!reRender);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  //TODO: close modal after clicking on post owner
  return (
    <li className="request">
      <PostOwner owner={request as IUserBasicData} />
      <div className="request__button-container">
        <button
          className="request__button request__button--accept"
          // onClick={() =>
          //   handleRequest(userId as string, userToAddId as string, "accept")
          // }
        >
          Accept
        </button>
        <button
          className="request__button request__button--decline"
          // onClick={() =>
          //   handleRequest(userId as string, userToAddId as string, "reject")
          // }
        >
          Decline
        </button>
      </div>
    </li>
  );
};

export default FriendsRequest;
