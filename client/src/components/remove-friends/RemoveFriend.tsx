// External dependencies

import axios from "axios";
import { AiOutlineUserDelete } from "react-icons/ai";
import { useParams } from "react-router";

// Internal dependencies

import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";

const RemoveFriend = () => {
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const { userId: friendToDeleteId } = useParams();

  const handleSendFriendRequest = async (
    userId: string,
    friendToDeleteId: string
  ) => {
    try {
      const res = await axios.delete("http://localhost:5000/api/friends", {
        data: { userId, friendToDeleteId },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="send-friend-request">
      <button
        onClick={() =>
          handleSendFriendRequest(userId as string, friendToDeleteId as string)
        }
        className="send-friend-request__button"
      >
        <AiOutlineUserDelete className="send-friend-request__icon" />
      </button>
    </section>
  );
};

export default RemoveFriend;
