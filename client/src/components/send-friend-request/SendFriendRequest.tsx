// External dependencies

import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";

// Internal dependencies

import useToastCreator from "../../hooks/useToastCreator";
import Spinner from "../../utilities/spinner/Spinner";
import { useSendFriendRequestMutation } from "../../features/apiSlice/userApiSlice/userApiSlice";
import { IUser } from "../../pages/user-profile/types";

interface Props {
  user: IUser;
}

const SendFriendRequest: React.FC<Props> = ({ user }) => {
  const [sendFriendRequest, { isLoading: isSending, isError, error }] =
    useSendFriendRequestMutation();

  if (isError) useToastCreator(error as string, "error");

  let content;

  if (isSending) {
    content = <Spinner size={50} />;
  } else {
    content = (
      <button
        onClick={() =>
          sendFriendRequest({
            responderId: user.id,
          })
        }
        className="send-friend-request__button"
        disabled={isSending}
      >
        <AiOutlineUserAdd className="send-friend-request__icon" />
      </button>
    );
  }

  return <section className="send-friend-request">{content}</section>;
};

export default SendFriendRequest;
