import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { IPost, IRePost } from "../../components/post/types";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { AiOutlineClose } from "react-icons/ai";
import { useFormik } from "formik";
import { closeModal } from "../../features/modalSlice/modalSlice";
import PostAction from "../../components/post/sumcomponents/PostAction";
import PostComments from "../../components/post/sumcomponents/PostComments";
import PostOwner from "../../components/post/sumcomponents/PostOwner";
import axios from "axios";

interface Props {
  post: IPost | IRePost;
  reRender: boolean;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostDetailsModal: React.FC<Props> = ({ post, reRender, setReRender }) => {
  const { _id: postId, isRePost, createdAt, postImage, owner, postBody } = post;
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const { modals } = useAppSelector((state: RootState) => state.modal);

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

  if (!modals.detailsPostModal) return null;

  return ReactDOM.createPortal(
    <div className="post-details-modal">
      <div
        className="post-details-modal__overlay"
        onClick={() => dispatch(closeModal("detailsPostModal"))}
      ></div>
      <div className="post-details-modal__content">
        {!post ? (
          <p>Loading...</p>
        ) : (
          <>
            <button
              className="post-details-modal__close"
              onClick={() => dispatch(closeModal("detailsPostModal"))}
            >
              <AiOutlineClose className="post-details-modal__close-icon" />
            </button>
            <div className="post-details-modal__top-container">
              <PostOwner owner={owner} />

              <p className="post-details-modal__createdAt">
                {moment(createdAt).fromNow()}
              </p>
            </div>
            <div className="post-details-modal__overflow">
              <p className="post-details-modal__body">{postBody}</p>
              {postImage && (
                <img
                  src={postImage}
                  alt="post image"
                  className="post-details-modal__image"
                />
              )}
              <PostAction
                post={post}
                reRender={reRender}
                setReRender={setReRender}
              />
              {post.commentTotal > 0 && (
                <PostComments
                  comments={post.comments}
                  reRender={reRender}
                  setReRender={setReRender}
                />
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
