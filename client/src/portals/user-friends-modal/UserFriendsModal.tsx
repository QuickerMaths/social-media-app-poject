// External dependencies

import ReactDOM from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useParams } from "react-router";

// Internal dependencies

import Friend from "../../components/friend/Friend";
import QueryError from "../../utilities/error/QueryError";
import useLastRef from "../../hooks/useLastRef";
import {
  useGetAllUserFriendsQuery,
  userFriendAdapter,
} from "../../features/apiSlice/userApiSlice/userApiSlice";
import { closeModal } from "../../features/modalSlice/modalSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { setUserFriendsPage } from "../../features/paginationSlice/paginationSlice";

const UserFriendsModal = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const numberUserId = +(userId ?? "");
  const { modals } = useAppSelector((state: RootState) => state.modal);
  const { userFriendsPage } = useAppSelector(
    (state: RootState) => state.pagination
  );
  const currentPage = userFriendsPage[numberUserId] || 1;

  const {
    data: friends,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetAllUserFriendsQuery(
    { userId: numberUserId, page: currentPage },
    {
      selectFromResult: ({
        data,
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
      }) => ({
        data: {
          friends: userFriendAdapter
            .getSelectors()
            .selectAll(data ?? userFriendAdapter.getInitialState()),
          meta: data?.meta,
        },
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
      }),
    }
  );

  const lastFriendRef = useLastRef({
    isLoading,
    isFetching,
    page: currentPage,
    id: numberUserId,
    actionToDispatch: setUserFriendsPage,
    hasNextPage: friends?.meta?.hasNextPage as boolean,
  });

  let content;

  if (isError) {
    content = <QueryError error={error as string} refetch={refetch} />;
  } else if (isSuccess) {
    content = (
      <>
        <ul className="user-friends-modal__list-modal">
          {friends.friends.map((friend, index) => {
            if (friends.friends.length === index + 1) {
              return (
                <Friend key={friend.id} friend={friend} ref={lastFriendRef} />
              );
            }
            return <Friend key={friend.id} friend={friend} />;
          })}
        </ul>
        {isLoading || (isFetching && <p>Loading...</p>)}
      </>
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
