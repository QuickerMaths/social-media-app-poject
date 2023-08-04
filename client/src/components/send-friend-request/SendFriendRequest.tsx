// External dependencies

import { useParams } from "react-router";
import { AiOutlineUserAdd } from "react-icons/ai";

// Internal dependencies

import useToastCreator from "../../hooks/useToastCreator";
import Spinner from "../../utilities/spinner/Spinner";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { useSendFriendRequestMutation } from "../../features/apiSlice/friendsApiSlice/friendsApiSlice";

const SendFriendRequest = () => {
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const { userId: userToAddId } = useParams();

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
            userId: userId as string,
            userToAddId: userToAddId as string,
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
