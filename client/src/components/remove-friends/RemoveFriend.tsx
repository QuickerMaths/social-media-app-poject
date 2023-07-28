// External dependencies

import { AiOutlineUserDelete } from "react-icons/ai";
import { useParams } from "react-router";

// Internal dependencies

import { useAppSelector } from "../../hooks/reduxHooks";
import { useDeleteFriendMutation } from "../../features/apiSlice/friendsApiSlice/friendsApiSlice";
import { RootState } from "../../redux/store";

const RemoveFriend = () => {
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const { userId: friendToDeleteId } = useParams();

  const [deleteFriend] = useDeleteFriendMutation();

  return (
    <section className="send-friend-request">
      <button
        onClick={() =>
          deleteFriend({
            userId: userId as string,
            friendToDeleteId: friendToDeleteId as string,
          })
        }
        className="send-friend-request__button"
      >
        <AiOutlineUserDelete className="send-friend-request__icon" />
      </button>
    </section>
  );
};

export default RemoveFriend;
