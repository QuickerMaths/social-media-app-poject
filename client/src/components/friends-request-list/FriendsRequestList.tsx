//Internal dependencies

import FriendsRequest from "../friends-request/FriendsRequest";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { AiOutlineLeft } from "react-icons/ai";
import { closeModal } from "../../features/modalSlice/modalSlice";
import { useGetFriendsRequestsQuery } from "../../features/apiSlice/friendsApiSlice/friendsApiSlice";
import { EntityId } from "@reduxjs/toolkit";

const FriendsRequestList = () => {
  const dispatch = useAppDispatch();
  const { userId, friendsRequests: requestsCount } = useAppSelector(
    (state: RootState) => state.auth
  );

  const {
    data: friendsRequests,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetFriendsRequestsQuery(userId as string);

  let content;
  //TODO: add loading component and error

  if (isLoading || isFetching) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>{JSON.stringify(error)}</div>;
  } else if (isSuccess) {
    content = (
      <ul className="friends-request-list__list">
        {requestsCount.length > 0 ? (
          friendsRequests.ids.map((requestId: EntityId) => (
            <FriendsRequest key={requestId} requestId={requestId} />
          ))
        ) : (
          <p className="friends-request-list__empty-list-message">
            No friends requests
          </p>
        )}
      </ul>
    );
  }
  //TODO: figure out how to add smooth animation
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
