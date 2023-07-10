import React from "react";
import UserDetails from "../../../components/user-details/UserDetails";
import UserFriends from "../../../components/user-friends/UserFriends";
import { IUser } from "../types";

interface Props {
  user: IUser;
}

const MainLeft: React.FC<Props> = ({ user }) => {
  return (
    <div className="user-profile__main-left">
      <UserDetails user={user} />
      <UserFriends user={user} />
    </div>
  );
};

export default MainLeft;
