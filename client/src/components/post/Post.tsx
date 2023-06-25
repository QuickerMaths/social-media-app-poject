import React from "react";
import {
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import moment from "moment";
import defaultImg from "../../assets/images/default_img.png";
import { IPost } from "./types";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import axios from "axios";
import useToastCreator from "../../hooks/useToastCreator";

interface Props {
  post: IPost;
  reRender: boolean;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
}

const Post: React.FC<Props> = ({
  post: { owner, createdAt, postBody, likedBy, _id: postId },
  setReRender,
  reRender,
}) => {
  const { userId, userImg } = useAppSelector((state: RootState) => state.auth);

  const handlePostDelete = async (userId: string, postId: string) => {
    try {
      await axios.delete("http://localhost:5000/api/posts", {
        data: {
          userId,
          postId,
        },
      });

      setReRender(!reRender);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLikePost = async (postId: string, userId: string) => {
    try {
      await axios.put("http://localhost:5000/api/posts", {
        postId,
        userId,
      });

      setReRender(!reRender);
    } catch (err) {
      console.log(err);
    }
  };

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
        {owner._id === userId ? (
          <div className="post__edit-wrapper">
            <button className="post__edit-button">
              <AiOutlineEdit className="post__edit-icon" />
            </button>
            <button
              className="post__edit-button"
              onClick={() => handlePostDelete(userId, postId)}
            >
              <AiOutlineDelete className="post__edit-icon" />
            </button>
            <p className="post__createdAt">{moment(createdAt).fromNow()}</p>
          </div>
        ) : (
          <p className="post__createdAt">{moment(createdAt).fromNow()}</p>
        )}
      </div>
      <p className="post__body">{postBody}</p>
      <div className="post__bottom-container">
        <button
          className={`post__action-button ${
            likedBy.includes(userId as string) && "post__liked"
          }`}
          onClick={() => {
            userId === null
              ? useToastCreator(
                  "You have to be logged in to like this post",
                  "error"
                )
              : handleLikePost(postId, userId);
          }}
        >
          <AiOutlineLike
            className={`post__action-icon ${
              likedBy.includes(userId as string) && "post__liked"
            }`}
          />
          {likedBy.length}
        </button>
        <button className="post__action-button">
          <AiOutlineComment className="post__action-icon" /> 0
        </button>
        <button className="post__action-button">
          <BiRepost className="post__action-icon" /> 0
        </button>
      </div>
    </li>
  );
};

export default Post;
