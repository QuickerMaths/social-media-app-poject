import React from "react";
import { IUserBasicData } from "../../pages/user-profile/types";
import defaultImg from "../../assets/images/default_img.png";
import { Link } from "react-router-dom";

interface Props {
  friend: IUserBasicData;
}
const Friend: React.FC<Props> = ({ friend }) => {
  const { profilePicture, _id: friendId } = friend;
  return (
    <Link to={`/user/${friendId}`}>
      <img
        src={profilePicture ? profilePicture : defaultImg}
        alt="user profile"
        className="friend__img"
        width={50}
        height={50}
      />
    </Link>
  );
};

export default Friend;
