// External dependencies

import React from "react";
import { Link } from "react-router-dom";

// Internal dependencies

import { IUserBasicData } from "../../../pages/user-profile/types";

// Assets

import defaultImg from "../../../assets/images/default_img.png";

interface Props {
  owner: IUserBasicData;
}

const CommentOwner: React.FC<Props> = ({
  owner: { _id, profilePicture, username },
}) => {
  return (
    <Link to={`/user/${_id}`} className="comment__owner">
      <img
        width={30}
        height={30}
        className="comment__user-profile-img"
        src={profilePicture ? profilePicture : defaultImg}
        alt="users profile img"
      />
      <h2 className="comment__username">{username}</h2>
    </Link>
  );
};

export default CommentOwner;
