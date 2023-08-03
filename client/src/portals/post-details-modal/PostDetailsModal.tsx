// External dependencies

import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { AiOutlineClose } from "react-icons/ai";
import { useFormik } from "formik";
import { EntityState } from "@reduxjs/toolkit";

// Internal dependencies

import PostAction from "../../components/post/subcomponents/PostAction";
import PostComments from "../../components/post/subcomponents/PostComments";
import PostOwner from "../../components/post/subcomponents/PostOwner";
import PostDetailsPost from "./subcomponents/PostDetailsPost";
import PostDetailsRePost from "./subcomponents/PostDetailsRePost";
import { IPost, IRePost } from "../../components/post/types";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { closeModal } from "../../features/modalSlice/modalSlice";
import { useCreateCommentMutation } from "../../features/apiSlice/commentApiSlice/commentApiSlice";
import { IComment } from "../../components/comment/types";

interface Props {
  post: IPost | IRePost;
}

const PostDetailsModal: React.FC<Props> = ({ post }) => {
  const [createComment, { isLoading: isUpdating, error, isError }] =
    useCreateCommentMutation();
  const {
    _id: postId,
    isRePost,
    createdAt,
    owner,
    comments,
    commentTotal,
  } = post;
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const { modals } = useAppSelector((state: RootState) => state.modal);

  const { handleSubmit, values, handleChange } = useFormik({
    initialValues: {
      commentBody: "",
    },
    onSubmit: async (values) => {
      await createComment({
        commentBody: values.commentBody,
        _id: postId,
        userId: userId as string,
        isRePost,
      });

      values.commentBody = "";
    },
  });

  if (!modals[`${postId}details`]) return null;

  return ReactDOM.createPortal(
    <div className="post-details-modal">
      <div
        className="post-details-modal__overlay"
        onClick={() => dispatch(closeModal(`${postId}details`))}
      ></div>
      <div className="post-details-modal__content">
        {!post ? (
          <p>Loading...</p>
        ) : (
          <>
            <button
              className="post-details-modal__close"
              onClick={() => dispatch(closeModal(`${postId}details`))}
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
              {isRePost ? (
                <PostDetailsRePost post={post as IRePost} />
              ) : (
                <PostDetailsPost post={post as IPost} />
              )}
              <PostAction post={post} />
              {commentTotal > 0 && (
                <PostComments
                  postId={postId}
                  comments={comments as EntityState<IComment>}
                />
              )}
            </div>
            <form onSubmit={handleSubmit} className="post-details-modal__form">
              {/* 
                TODO: make it better
              */}
              {isUpdating && <p>Updating...</p>}
              {isError && <p>{JSON.stringify(error)}</p>}
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
