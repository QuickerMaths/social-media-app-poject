// External dependencies

import { useState } from "react";

//Internal dependencies

import FriendsRequest from "../friends-request/FriendsRequest";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { IUserBasicData } from "../../pages/user-profile/types";
import { RootState } from "../../redux/store";
import { AiOutlineLeft } from "react-icons/ai";
import { closeModal } from "../../features/modalSlice/modalSlice";
import { useGetFriendsRequestsQuery } from "../../features/apiSlice/friendsApiSlice/friendsApiSlice";

const FriendsRequestList = () => {
  const dispatch = useAppDispatch();
  const { userId, friendsRequests: requestsCount } = useAppSelector(
    (state: RootState) => state.auth
  );

  const [reRender, setReRender] = useState<boolean>(false);

  const {
    data: friendsRequests,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetFriendsRequestsQuery(userId as string);

  let content;

  if (isLoading || isFetching) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>{JSON.stringify(error)}</div>;
  } else if (isSuccess) {
    content = (
      <ul className="friends-request-list__list">
        {requestsCount.length > 0 ? (
          friendsRequests.map((request: IUserBasicData) => (
            <FriendsRequest
              key={request._id}
              request={request}
              setReRender={setReRender}
              reRender={reRender}
            />
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
