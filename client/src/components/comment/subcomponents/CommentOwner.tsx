// External dependencies

import React from "react";
import { Link } from "react-router-dom";

// Internal dependencies

import { ICommentOwner } from "../types";

// Assets

import defaultImg from "../../../assets/images/default_img.png";

interface Props {
  comment_owner: ICommentOwner;
}

const CommentOwner: React.FC<Props> = ({
  comment_owner: { id, avatar_url, username },
}) => {
  return (
    <Link to={`/user/${id}`} className="comment__owner">
      <img
        width={30}
        height={30}
        className="comment__user-profile-img"
        src={avatar_url || defaultImg}
        alt="users profile img"
      />
      <h2 className="comment__username">{username}</h2>
    </Link>
  );
};

export default CommentOwner;
