// External dependencies

import React from "react";
import { EntityState } from "@reduxjs/toolkit";
import { useParams } from "react-router";

// Internal dependencies

import SendFriendRequest from "../../../components/send-friend-request/SendFriendRequest";
import RemoveFriend from "../../../components/remove-friends/RemoveFriend";
import { IUser, IUserBasicData } from "../types";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../redux/store";

interface Props {
  user: IUser;
}

const FriendAction: React.FC<Props> = ({ user }) => {
  const { userId: activeUserId } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { userId } = useParams();

  const alreadyFriends = (
    userId: string,
    userFriends: EntityState<IUserBasicData>
  ) => {
    return userFriends.ids.includes(userId);
  };

  const showSendRequestButton =
    activeUserId &&
    activeUserId !== userId &&
    !alreadyFriends(activeUserId, user.friends as EntityState<IUserBasicData>);

  const showRemoveButton =
    activeUserId &&
    activeUserId !== userId &&
    alreadyFriends(activeUserId, user.friends as EntityState<IUserBasicData>);

  let content;

  if (showSendRequestButton) {
    content = <SendFriendRequest />;
  } else if (showRemoveButton) {
    content = <RemoveFriend />;
  }

  return <>{content}</>;
};

export default FriendAction;
