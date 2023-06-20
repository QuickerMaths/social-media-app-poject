import React from "react";
import moment from "moment";
import defaultImg from "../../assets/images/default_img.png";
import { IPost } from "./types";
import { Link } from "react-router-dom";

interface Props {
  post: IPost;
}

const Post: React.FC<Props> = ({
  post: { ownerName, ownerId, createdAt, postBody, likes },
}) => {
  return (
    <li className="post">
      <div className="post__top-container">
        <Link
          to={`/user/${ownerId}`}
          state={{ ownerId }}
          className="post_owner-wrapper"
        >
          <img
            className="post__profile-img"
            src={defaultImg}
            width={50}
            height={50}
          />
          <h3 className="post__owner">{ownerName}</h3>
        </Link>
        <p className="post__createdAt">{moment(createdAt).fromNow()}</p>
      </div>
      <p className="post__body">{postBody}</p>
      <button className="post__likes">Likes {likes}</button>
    </li> //TODO: set some icons for likes
  );
};

export default Post;
