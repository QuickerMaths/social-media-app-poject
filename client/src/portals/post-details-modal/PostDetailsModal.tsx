import moment from "moment";
import React, { useEffect, useState } from "react";
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
import { useFormik } from "formik";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postId: string;
  reRender: boolean;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostDetailsModal: React.FC<Props> = ({
  setIsOpen,
  isOpen,
  postId,
  reRender,
  setReRender,
}) => {
  const { userId, userImg } = useAppSelector((state: RootState) => state.auth);
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await axios.get(
          `http://localhost:5000/api/posts/${postId}`
        );

        // setPost(data);
        setPost(data.data.post[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [reRender]);

  const { handleSubmit, values, handleChange } = useFormik({
    initialValues: {
      commentBody: "",
    },
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:5000/api/comments", {
          commentBody: values.commentBody,
          postId,
          userId,
        });
        values.commentBody = "";
        setReRender(!reRender);
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleLikePost = async (postId: string, userId: string) => {
    try {
      await axios.put("http://localhost:5000/api/posts", {
        postId,
        userId,
      });
      //TODO: rtkQuery optimistic updates !
      setReRender(!reRender);
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
        {!post ? (
          <p>Loading...</p>
        ) : (
          <>
            {" "}
            <button
              className="post-details-modal__close"
              onClick={() => setIsOpen(false)}
            >
              <AiOutlineClose className="post-details-modal__close-icon" />
            </button>
            <div className="post-details-modal__top-container">
              <Link
                to={`/user/${post.owner._id}`}
                className="post-details-modal__owner-wrapper"
                onClick={() => setIsOpen(false)}
              >
                <img
                  className="post-details-modal__profile-img"
                  //TODO: figure out how to display userImg even if its null (displaying after img its removal without need to reloading the page)
                  src={
                    userImg && userId === post.owner._id
                      ? userImg
                      : post.owner.profilePicture
                      ? post.owner.profilePicture
                      : defaultImg
                  }
                  width={50}
                  height={50}
                />
                <h3 className="post-details-modal__owner">
                  {post.owner.username}
                </h3>
              </Link>

              <p className="post-details-modal__createdAt">
                {moment(post.createdAt).fromNow()}
              </p>
            </div>
            <div className="post-details-modal__overflow">
              <p className="post-details-modal__body">{post.postBody}</p>
              {post.postImage && (
                <img
                  src={post.postImage}
                  alt="post image"
                  className="post-details-modal__image"
                />
              )}
              <div className="post-details-modal__bottom-container">
                <button
                  className={`post-details-modal__action-button ${
                    post.likedBy.includes(userId as string) &&
                    "post-details-modal__liked"
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
                      post.likedBy.includes(userId as string) &&
                      "post-details-modal__liked"
                    }`}
                  />
                  {post.likedBy.length}
                </button>
                <button className="post-details-modal__action-button">
                  <AiOutlineComment className="post-details-modal__action-icon" />{" "}
                  {post.commentTotal}
                </button>
                <button className="post-details-modal__action-button">
                  <BiRepost className="post-details-modal__action-icon" /> 0
                </button>
              </div>
              {post.commentTotal > 0 && (
                <ul className="post-details-modal__comments-container">
                  {post.comments.map((comment: IComment) => (
                    <Comment
                      key={comment._id}
                      comment={comment}
                      reRender={reRender}
                      setReRender={setReRender}
                    />
                  ))}
                </ul>
              )}
            </div>
            <form onSubmit={handleSubmit} className="post-details-modal__form">
              <input
                name="commentBody"
                id="commentBody"
                value={values.commentBody}
                onChange={handleChange}
                className="post-details-modal__text-area"
                placeholder="Write a comment..."
              />
              <button
                className="post-details-modal__submit-button"
                type="submit"
              >
                Comment
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default PostDetailsModal;
