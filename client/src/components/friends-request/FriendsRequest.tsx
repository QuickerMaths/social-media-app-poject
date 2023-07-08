import React from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { IUserBasicData } from "../../pages/user-profile/types";
import PostOwner from "../post/sumcomponents/PostOwner";

interface Props {
  request: IUserBasicData;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
  reRender: boolean;
}

const FriendsRequest: React.FC<Props> = ({
  request,
  setReRender,
  reRender,
}) => {
  const dispatch = useAppDispatch();
  return (
    <li className="request">
      <PostOwner owner={request} />
      <div className="request__button-container">
        <button className="request__button request__button--accept">
          Accept
        </button>
        <button className="request__button request__button--decline">
          Decline
        </button>
      </div>
    </li>
  );
};

export default FriendsRequest;
