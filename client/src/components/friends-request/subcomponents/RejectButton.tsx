//External dependencies

import React from "react";

// Internal dependencies

import useToastCreator from "../../../hooks/useToastCreator";
import { useRejectFriendRequestMutation } from "../../../features/apiSlice/userApiSlice/userApiSlice";
import { IUserPartial } from "../../../pages/user-profile/types";
import { RootState } from "../../../redux/store";
import { useAppSelector } from "../../../hooks/reduxHooks";

interface Props {
  request: IUserPartial;
}

const RejectButton: React.FC<Props> = ({ request: { id } }) => {
  const { userId: loggedInUserId } = useAppSelector(
    (state: RootState) => state.auth
  );

  const [rejectFriendRequest, { isLoading: isRejecting, isError, error }] =
    useRejectFriendRequestMutation();

  if (isError) useToastCreator(error as string, "error");

  return (
    <button
      className="request__button request__button--reject"
      onClick={() =>
        rejectFriendRequest({
          loggedInUserId,
          requesterId: id,
        })
      }
      disabled={isRejecting}
    >
      {isRejecting ? "Rejecting..." : "Reject"}
    </button>
  );
};

export default RejectButton;
