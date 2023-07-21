// External dependencies

import React from "react";
import { Link } from "react-router-dom";

// Internal dependencies

import { IUserBasicData } from "../../pages/user-profile/types";

// Assets

import defaultImg from "../../assets/images/default_img.png";

interface Props {
  user: IUserBasicData;
}

const User: React.FC<Props> = ({ user: { username, _id, profilePicture } }) => {
  return (
    <li className="user">
      <Link to={`/user/${_id}`} className="user__link">
        <img
          className="user__img"
          src={profilePicture || defaultImg}
          alt={username}
        />
        <p className="user__name">{username}</p>
      </Link>
    </li>
  );
};

export default User;
