// External dependencies

import ReactDOM from "react-dom";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { AiOutlineClose } from "react-icons/ai";
import { useParams } from "react-router";

// Internal dependencies

import Friend from "../../components/friend/Friend";
import QueryError from "../../utilities/error/QueryError";
import Spinner from "../../utilities/spinner/Spinner";
import { useGetAllUserFriendsQuery } from "../../features/apiSlice/userApiSlice/userApiSlice";
import { closeModal } from "../../features/modalSlice/modalSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";

const UserFriendsModal = () => {
  const dispatch = useAppDispatch();

  const { userId } = useParams();
  const numberUserId = +(userId ?? "");

  const { modals } = useAppSelector((state: RootState) => state.modal);

  //TODO: user friend pagination
  const page = 1;

  const {
    data: friends,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetAllUserFriendsQuery({ userId: numberUserId, page } ?? skipToken);

  let content;

  if (isLoading || isFetching) {
    content = <Spinner size={125} />;
  } else if (isError) {
    content = <QueryError error={error as string} refetch={refetch} />;
  } else if (isSuccess) {
    content = (
      <ul className="user-friends-modal__list-modal">
        {friends.map((friend) => (
          <Friend key={friend.id} friend={friend} />
        ))}
      </ul>
    );
  }

  if (!modals["userFriendsModal"]) return null;
  return ReactDOM.createPortal(
    <div className="user-friends-modal">
      <div
        className="user-friends-modal__overlay"
        onClick={() => dispatch(closeModal("userFriendsModal"))}
      ></div>
      <div className="user-friends-modal__content">
        <button
          className="user-friends-modal__close"
          onClick={() => dispatch(closeModal("userFriendsModal"))}
        >
          <AiOutlineClose className="user-friends-modal__close-icon" />
        </button>
        <h2 className="user-friends-modal__title">Friends</h2>
        {content}
      </div>
    </div>,
    document.body
  );
};

export default UserFriendsModal;
