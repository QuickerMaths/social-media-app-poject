import axios from "axios";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { IUserBasicData } from "../../pages/user-profile/types";
import { RootState } from "../../redux/store";
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
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const { _id: userToAddId } = request;

  //TODO: refactor to rtkQuery
  const handleRequest = async (
    userId: string,
    userToAddId: string,
    action: "accept" | "reject"
  ) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/friends/${action}`,
        {
          userId,
          userToAddId,
        }
      );
      console.log(res);
      setReRender(!reRender);
    } catch (err) {
      console.log(err);
    }
  };

  //TODO: close modal after clicking on post owner
  return (
    <li className="request">
      <PostOwner owner={request} />
      <div className="request__button-container">
        <button
          className="request__button request__button--accept"
          onClick={() =>
            handleRequest(userId as string, userToAddId as string, "accept")
          }
        >
          Accept
        </button>
        <button
          className="request__button request__button--decline"
          onClick={() =>
            handleRequest(userId as string, userToAddId as string, "reject")
          }
        >
          Decline
        </button>
      </div>
    </li>
  );
};

export default FriendsRequest;
