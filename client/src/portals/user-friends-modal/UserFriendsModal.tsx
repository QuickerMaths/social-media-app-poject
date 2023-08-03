// External dependencies

import ReactDOM from "react-dom";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { EntityId, EntityState } from "@reduxjs/toolkit";
import { AiOutlineClose } from "react-icons/ai";
import { useParams } from "react-router";

// Internal dependencies

import Friend from "../../components/friend/Friend";
import { useGetFriendsByUserIdQuery } from "../../features/apiSlice/friendsApiSlice/friendsApiSlice";
import { closeModal } from "../../features/modalSlice/modalSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import QueryError from "../../utilities/error/QueryError";
import { IUserBasicData } from "../../pages/user-profile/types";

//TODO: created modal wrapper to avoid code duplication

const UserFriendsModal = () => {
  const dispatch = useAppDispatch();

  const { userId } = useParams();

  const { modals } = useAppSelector((state: RootState) => state.modal);

  const {
    data: friends,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetFriendsByUserIdQuery(userId ?? skipToken);

  let content;

  //TODO: loading

  if (isLoading || isFetching) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <QueryError error={error as string} refetch={refetch} />;
  } else if (isSuccess) {
    content = (
      <ul className="user-friends-modal__list-modal">
        {(friends as EntityState<IUserBasicData>).ids.map(
          (friendId: EntityId) => (
            <Friend key={friendId} friendId={friendId} />
          )
        )}
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
