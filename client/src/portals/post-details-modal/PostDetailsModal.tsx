import moment from "moment";
import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { IPost } from "../../components/post/types";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import defaultImg from "../../assets/images/default_img.png";
import useToastCreator from "../../hooks/useToastCreator";
import {
  AiOutlineComment,
  AiOutlineLike,
  AiOutlineClose,
} from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import axios from "axios";
import { IComment } from "../../components/comment/types";
import Comment from "../../components/comment/Comment";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post: IPost;
}

const PostDetailsModal: React.FC<Props> = ({
  setIsOpen,
  isOpen,
  post: {
    owner,
    createdAt,
    postBody,
    likedBy,
    _id: postId,
    postImage,
    comments,
    commentTotal,
  },
}) => {
  const { userId, userImg } = useAppSelector((state: RootState) => state.auth);

  const handleLikePost = async (postId: string, userId: string) => {
    try {
      await axios.put("http://localhost:5000/api/posts", {
        postId,
        userId,
      });
      //TODO: rtkQuery optimistic updates !
      // setReRender(!reRender);
    } catch (err) {
      console.log(err);
    }
  };

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="post-details-modal">
      <div
        className="post-details-modal__overlay"
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="post-details-modal__content">
        <button
          className="post-details-modal__close"
          onClick={() => setIsOpen(false)}
        >
          <AiOutlineClose className="post-details-modal__close-icon" />
        </button>
        <div className="post-details-modal__top-container">
          <Link
            to={`/user/${owner._id}`}
            className="post-details-modal__owner-wrapper"
            onClick={() => setIsOpen(false)}
          >
            <img
              className="post-details-modal__profile-img"
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
            <h3 className="post-details-modal__owner">{owner.username}</h3>
          </Link>

          <p className="post-details-modal__createdAt">
            {moment(createdAt).fromNow()}
          </p>
        </div>

        <p className="post-details-modal__body">{postBody}</p>
        {postImage && (
          <img
            src={postImage}
            alt="post image"
            className="post-details-modal__image"
          />
        )}
        <div className="post-details-modal__bottom-container">
          <button
            className={`post-details-modal__action-button ${
              likedBy.includes(userId as string) && "post-details-modal__liked"
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
              className={`post-details-modal__action-icon ${
                likedBy.includes(userId as string) &&
                "post-details-modal__liked"
              }`}
            />
            {likedBy.length}
          </button>
          <button className="post-details-modal__action-button">
            <AiOutlineComment className="post-details-modal__action-icon" />{" "}
            {commentTotal}
          </button>
          <button className="post-details-modal__action-button">
            <BiRepost className="post-details-modal__action-icon" /> 0
          </button>
        </div>
        {commentTotal > 0 && (
          <>
            <ul className="post-details-modal__comments-container">
              {comments.map((comment: IComment) => (
                <Comment key={comment._id} comment={comment} />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default PostDetailsModal;
