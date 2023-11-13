//External dependencies

import React from "react";

// Internal dependencies

import { IUserPartial } from "../../../pages/user-profile/types";
import useToastCreator from "../../../hooks/useToastCreator";
import { useAcceptFriendRequestMutation } from "../../../features/apiSlice/userApiSlice/userApiSlice";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../redux/store";

interface Props {
  request: IUserPartial;
}

const AcceptButton: React.FC<Props> = ({ request: { id } }) => {
  const { userId: loggedInUserId } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [acceptFriendRequest, { isLoading: isAccepting, isError, error }] =
    useAcceptFriendRequestMutation();

  if (isError) useToastCreator(error as string, "error");

  return (
    <button
      className="request__button request__button--accept"
      onClick={() =>
        acceptFriendRequest({
          requesterId: id,
          loggedInUserId,
        })
      }
      disabled={isAccepting}
    >
      {isAccepting ? "Accepting..." : "Accept"}
    </button>
  );
};

export default AcceptButton;
