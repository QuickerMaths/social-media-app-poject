// External dependencies

import { useParams } from "react-router";
import { AiOutlineUserAdd } from "react-icons/ai";

// Internal dependencies

import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { useSendFriendRequestMutation } from "../../features/apiSlice/friendsApiSlice/friendsApiSlice";

const SendFriendRequest = () => {
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const { userId: userToAddId } = useParams();

  const [sendFriendRequest] = useSendFriendRequestMutation();

  return (
    <section className="send-friend-request">
      <button
        onClick={() =>
          sendFriendRequest({
            userId: userId as string,
            userToAddId: userToAddId as string,
          })
        }
        className="send-friend-request__button"
      >
        <AiOutlineUserAdd className="send-friend-request__icon" />
      </button>
    </section>
  );
};

export default SendFriendRequest;
