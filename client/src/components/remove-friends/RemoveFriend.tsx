// External dependencies

import { AiOutlineUserDelete } from "react-icons/ai";
import { useParams } from "react-router";

// Internal dependencies

import useToastCreator from "../../hooks/useToastCreator";
import Spinner from "../../utilities/spinner/Spinner";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useDeleteFriendMutation } from "../../features/apiSlice/friendsApiSlice/friendsApiSlice";
import { RootState } from "../../redux/store";

const RemoveFriend = () => {
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const { userId: friendToDeleteId } = useParams();

  const [deleteFriend, { isLoading: isDeleting, isError, error }] =
    useDeleteFriendMutation();

  if (isError) useToastCreator("error", error as string);

  let content;

  if (isDeleting) {
    content = <Spinner size={25} />;
  } else {
    content = (
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
    );
  }

  return <section className="send-friend-request">{content}</section>;
};

export default RemoveFriend;
