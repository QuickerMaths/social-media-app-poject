import React from "react";
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
  const { userImg } = useAppSelector((state: RootState) => state.auth);
  return (
    <li className="post">
      <div className="post__top-container">
        <Link to={`/user/${owner._id}`} className="post_owner-wrapper">
          <img
            className="post__profile-img"
            //TODO: figure out how to display userImg even if its null (displaying after img removal without need to reload the page)
            src={
              userImg
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
      <button className="post__likes">Likes {likes}</button>
    </li> //TODO: set some icons for likes
  );
};

export default Post;
