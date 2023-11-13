// External dependencies

import { skipToken } from "@reduxjs/toolkit/dist/query";
import { AiOutlineLeft } from "react-icons/ai";

//Internal dependencies

import FriendsRequest from "../friends-request/FriendsRequest";
import QueryError from "../../utilities/error/QueryError";
import Spinner from "../../utilities/spinner/Spinner";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useGetAllRequestsQuery } from "../../features/apiSlice/userApiSlice/userApiSlice";
import { closeModal } from "../../features/modalSlice/modalSlice";
import { RootState } from "../../redux/store";

const FriendsRequestList = () => {
  const dispatch = useAppDispatch();
  const { userId: loggedInUserId } = useAppSelector(
    (state: RootState) => state.auth
  );

  const {
    data: friendsRequests,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetAllRequestsQuery({ userId: loggedInUserId ?? skipToken });

  let content;

  if (isLoading || isFetching) {
    content = <Spinner size={125} />;
  } else if (isError) {
    content = <QueryError error={error as string} refetch={refetch} />;
  } else if (isSuccess) {
    content = (
      <ul className="friends-request-list__list">
        {friendsRequests.length > 0 ? (
          friendsRequests.map((request) => (
            <FriendsRequest key={request.id} request={request} />
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
