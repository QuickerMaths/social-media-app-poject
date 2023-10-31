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
import Spinner from "../../utilities/spinner/Spinner";
import useToastCreator from "../../hooks/useToastCreator";
import { IPost } from "../../components/post/types";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { closeModal } from "../../features/modalSlice/modalSlice";
import { useCreateCommentMutation } from "../../features/apiSlice/commentApiSlice/commentApiSlice";
import { IComment } from "../../components/comment/types";

interface Props {
  post: IPost;
}

const PostDetailsModal: React.FC<Props> = ({ post }) => {
  const [createComment, { isLoading: isUpdating, error, isError }] =
    useCreateCommentMutation();

  const { id, created_at, comments, comment_count, post_owner, is_shared } =
    post;
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const { modals } = useAppSelector((state: RootState) => state.modal);

  const { handleSubmit, values, handleChange } = useFormik({
    initialValues: {
      comment_text: "",
    },
    onSubmit: async ({ comment_text }) => {
      await createComment({
        comment_text,
        id,
        userId: userId as number,
      });
      if (isError) useToastCreator(error as string, "error");
      if (!isUpdating && !isError) {
        comment_text = "";
      }
    },
  });

  let content;

  if (isUpdating) {
    content = <Spinner size={50} />;
  } else {
    content = (
      <form onSubmit={handleSubmit} className="post-details-modal__form">
        <input
          name="comment_text"
          id="comment_text"
          value={values.comment_text}
          onChange={handleChange}
          className="post-details-modal__text-area"
          placeholder="Write a comment..."
        />
        <button className="post-details-modal__submit-button" type="submit">
          Comment
        </button>
      </form>
    );
  }

  if (!modals[`${id}details`]) return null;
  return ReactDOM.createPortal(
    <div className="post-details-modal">
      <div
        className="post-details-modal__overlay"
        onClick={() => dispatch(closeModal(`${id}details`))}
      ></div>
      <div className="post-details-modal__content">
        <button
          className="post-details-modal__close"
          onClick={() => dispatch(closeModal(`${id}details`))}
        >
          <AiOutlineClose className="post-details-modal__close-icon" />
        </button>
        <div className="post-details-modal__top-container">
          <PostOwner post_owner={post_owner} />

          <p className="post-details-modal__createdAt">
            {moment(created_at).fromNow()}
          </p>
        </div>
        <div className="post-details-modal__overflow">
          {is_shared ? (
            <PostDetailsRePost post={post} />
          ) : (
            <PostDetailsPost post={post} />
          )}
          <PostAction post={post} />
          {comment_count > 0 && (
            <PostComments
              postId={id}
              comments={comments as EntityState<IComment>}
            />
          )}
        </div>
        {content}
      </div>
    </div>,
    document.body
  );
};

export default PostDetailsModal;
