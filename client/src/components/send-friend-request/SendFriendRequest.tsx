import axios from "axios";
import { useParams } from "react-router";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { AiOutlineUserAdd } from "react-icons/ai";

const SendFriendRequest = () => {
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const { userId: userToAddId } = useParams();

  const handleSendFriendRequest = async (
    userId: string,
    userToAddId: string
  ) => {
    try {
      const res = await axios.put("http://localhost:5000/api/friends", {
        userId,
        userToAddId,
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
          handleSendFriendRequest(userId as string, userToAddId as string)
        }
        className="send-friend-request__button"
      >
        <AiOutlineUserAdd className="send-friend-request__icon" />
      </button>
    </section>
  );
};

export default SendFriendRequest;
