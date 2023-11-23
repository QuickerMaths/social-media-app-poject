// External dependencies

import { AiOutlineLeft } from "react-icons/ai";

//Internal dependencies

import FriendsRequest from "../friends-request/FriendsRequest";
import QueryError from "../../utilities/error/QueryError";
import useLastRef from "../../hooks/useLastRef";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  useGetAllRequestsQuery,
  userFriendRequestAdapter,
} from "../../features/apiSlice/userApiSlice/userApiSlice";
import { closeModal } from "../../features/modalSlice/modalSlice";
import { RootState } from "../../redux/store";
import { setFriendRequestPage } from "../../features/paginationSlice/paginationSlice";

const FriendsRequestList = () => {
  const dispatch = useAppDispatch();
  const { userId: loggedInUserId } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { friendRequestPage } = useAppSelector(
    (state: RootState) => state.pagination
  );

  const {
    data: friendsRequests,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetAllRequestsQuery(
    {
      userId: loggedInUserId,
      page: friendRequestPage,
    },
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
          requests: userFriendRequestAdapter
            .getSelectors()
            .selectAll(data ?? userFriendRequestAdapter.getInitialState()),
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

  const lastFriendRequestRef = useLastRef({
    isLoading,
    isFetching,
    page: friendRequestPage,
    actionToDispatch: setFriendRequestPage,
    hasNextPage: friendsRequests.meta?.hasNextPage as boolean,
  });

  let content;

  if (isError) {
    content = <QueryError error={error as string} refetch={refetch} />;
  } else if (isSuccess) {
    content = (
      <>
        {friendsRequests.requests.length > 0 ? (
          <>
            <ul className="friends-request-list__list">
              {friendsRequests.requests.map((request, index) => {
                if (friendsRequests.requests.length === index + 1) {
                  return (
                    <FriendsRequest
                      key={request.id}
                      request={request}
                      ref={lastFriendRequestRef}
                    />
                  );
                }
                return <FriendsRequest key={request.id} request={request} />;
              })}
            </ul>
            {isLoading || (isFetching && <p>Loading...</p>)}
          </>
        ) : (
          <p className="friends-request-list__empty-list-message">
            No friends requests
          </p>
        )}
      </>
    );
  }

  return (
    <section className="friends-request-list">
      <button
        className="friends-request-list__back-button"
        onClick={() => dispatch(closeModal("friends-request-list"))}
      >
        <AiOutlineLeft className="friends-request-list__back-icon" />
      </button>
      {content}
    </section>
  );
};

export default FriendsRequestList;
