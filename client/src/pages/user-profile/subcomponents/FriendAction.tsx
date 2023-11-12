// External dependencies

import React from "react";
import { useParams } from "react-router";
import { AiOutlineUserSwitch } from "react-icons/ai";

// Internal dependencies

import SendFriendRequest from "../../../components/send-friend-request/SendFriendRequest";
import RemoveFriend from "../../../components/remove-friends/RemoveFriend";
import { IUser } from "../types";
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

  const { friendship_status } = user;

  let content;

  if (activeUserId && activeUserId !== userId) {
    const alreadyFriends = friendship_status === 1;
    const requestAlreadySent = friendship_status === 2;

    if (!friendship_status) {
      content = <SendFriendRequest />;
    } else if (alreadyFriends) {
      content = <RemoveFriend />;
    } else if (requestAlreadySent) {
      content = (
        <section className="send-friend-request">
          <button className="send-friend-request__button">
            <AiOutlineUserSwitch className="send-friend-request__icon" />
          </button>
        </section>
      );
    }
  }

  return <>{content}</>;
};

export default FriendAction;
