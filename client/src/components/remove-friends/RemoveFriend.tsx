// External dependencies

import { AiOutlineUserDelete } from "react-icons/ai";

// Internal dependencies

import useToastCreator from "../../hooks/useToastCreator";
import Spinner from "../../utilities/spinner/Spinner";
import { useDeleteFriendshipMutation } from "../../features/apiSlice/userApiSlice/userApiSlice";
import { IUser } from "../../pages/user-profile/types";

interface Props {
  user: IUser;
}

const RemoveFriend: React.FC<Props> = ({ user }) => {
  const { id } = user;

  const [deleteFriendship, { isLoading: isDeleting, isError, error }] =
    useDeleteFriendshipMutation();

  if (isError) useToastCreator(error as string, "error");

  let content;

  if (isDeleting) {
    content = <Spinner size={50} />;
  } else {
    content = (
      <button
        onClick={() =>
          deleteFriendship({
            requesterId: id,
          })
        }
        className="send-friend-request__button"
        disabled={isDeleting}
      >
        <AiOutlineUserDelete className="send-friend-request__icon" />
      </button>
    );
  }

  return <section className="send-friend-request">{content}</section>;
};

export default RemoveFriend;
