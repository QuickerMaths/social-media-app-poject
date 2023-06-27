import React from "react";
import moment from "moment";
import defaultImg from "../../assets/images/default_img.png";
import { Link } from "react-router-dom";
import { IComment } from "./types";

interface Props {
  comment: IComment;
}
const Comment: React.FC<Props> = ({
  comment: { owner, createdAt, commentBody },
}) => {
  return (
    <li className="comment">
      <div className="comment__top-container">
        <Link to={`/user/${owner._id}`} className="comment__owner">
          <img
            width={30}
            height={30}
            className="comment__user-profile-img"
            src={owner.profilePicture ? owner.profilePicture : defaultImg}
            alt="users profile img"
          />
          <h2 className="comment__username">{owner.username}</h2>
        </Link>
        <p className="post__createdAt">{moment(createdAt).fromNow()}</p>
      </div>
      <p className="comment__body">{commentBody}</p>
    </li>
  );
};

export default Comment;
