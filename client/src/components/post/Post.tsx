import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import moment from "moment";
import defaultImg from "../../assets/images/default_img.png";
import { IPost } from "./types";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";

interface Props {
  post: IPost;
}

const Post: React.FC<Props> = ({
  post: { owner, createdAt, postBody, likes },
}) => {
  const { userId, userImg } = useAppSelector((state: RootState) => state.auth);
  return (
    <li className="post">
      <div className="post__top-container">
        <Link to={`/user/${owner._id}`} className="post_owner-wrapper">
          <img
            className="post__profile-img"
            //TODO: figure out how to display userImg even if its null (displaying after img its removal without need to reloading the page)
            src={
              userImg && userId === owner._id
                ? userImg
                : owner.profilePicture
                ? owner.profilePicture
                : defaultImg
            }
            width={50}
            height={50}
          />
          <h3 className="post__owner">{owner.username}</h3>
        </Link>
        <p className="post__createdAt">{moment(createdAt).fromNow()}</p>
      </div>
      <p className="post__body">{postBody}</p>
      <button className="post__likes">
        <AiOutlineLike className="post__likes-icon" /> {likes}
      </button>
    </li>
  );
};

export default Post;
