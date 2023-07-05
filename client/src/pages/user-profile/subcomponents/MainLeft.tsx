import React from "react";
import UserDetails from "../../../components/user-details/UserDetails";
import UserFriends from "../../../components/user-friends/UserFriends";
import { IUser } from "../types";

interface Props {
  user: IUser;
  reRenderAddress: boolean;
  setRerenderAddress: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainLeft: React.FC<Props> = ({
  user,
  reRenderAddress,
  setRerenderAddress,
}) => {
  return (
    <div className="user-profile__main-left">
      <UserDetails
        user={user}
        reRenderAddress={reRenderAddress}
        setRerenderAddress={setRerenderAddress}
      />
      <UserFriends />
    </div>
  );
};

export default MainLeft;
