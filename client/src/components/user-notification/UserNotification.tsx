import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { IUser } from "../../pages/user-profile/types";

interface Props {
  user: IUser;
}

const UserNotification: React.FC<Props> = ({ user }) => {
  const { friendsRequests } = user;

  return (
    <>
      <button className="user-notification__button">
        <p className="user-notification__request-count">
          {friendsRequests.length}
        </p>
        <IoIosNotifications className="user-notification__icon" />
      </button>
    </>
  );
};

export default UserNotification;
