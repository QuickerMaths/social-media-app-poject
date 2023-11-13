// External dependencies

import React from "react";
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
  const { userId: loggedInUserId } = useAppSelector(
    (state: RootState) => state.auth
  );

  const { friendship_status, id } = user;

  let content;

  if (loggedInUserId && loggedInUserId !== id) {
    const alreadyFriends = friendship_status === 1;
    const requestAlreadySent = friendship_status === 2;

    if (!friendship_status) {
      content = <SendFriendRequest user={user} />;
    } else if (alreadyFriends) {
      content = <RemoveFriend user={user} />;
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
