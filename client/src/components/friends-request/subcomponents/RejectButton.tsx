//External dependencies

import React from "react";

// Internal dependencies

import useToastCreator from "../../../hooks/useToastCreator";
import { useRejectFriendRequestMutation } from "../../../features/apiSlice/userApiSlice/userApiSlice";
import { IUserPartial } from "../../../pages/user-profile/types";
import { RootState } from "../../../redux/store";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { decrementFriendRequestCount } from "../../../features/authSlice/authSlice";

interface Props {
  request: IUserPartial;
}

const RejectButton: React.FC<Props> = ({ request: { id } }) => {
  const dispatch = useAppDispatch();
  const { userId: loggedInUserId } = useAppSelector(
    (state: RootState) => state.auth
  );

  const [rejectFriendRequest, { isLoading: isRejecting, isError, error }] =
    useRejectFriendRequestMutation();

  if (isError) useToastCreator(error as string, "error");

  return (
    <button
      className="request__button request__button--reject"
      onClick={() => {
        rejectFriendRequest({
          loggedInUserId,
          requesterId: id,
        });
        dispatch(decrementFriendRequestCount());
      }}
      disabled={isRejecting}
    >
      {isRejecting ? "Rejecting..." : "Reject"}
    </button>
  );
};

export default RejectButton;
