// External dependencies

import React from "react";
import { useFormik } from "formik";

//Internal dependencies

import Spinner from "../../utilities/spinner/Spinner";
import useToastCreator from "../../hooks/useToastCreator";
import { IPost } from "../post/types";
import { useCreateCommentMutation } from "../../features/apiSlice/commentApiSlice/commentApiSlice";
import { useParams } from "react-router";

interface Props {
  post: IPost;
}

const CommentInput: React.FC<Props> = ({ post }) => {
  const { userId } = useParams();
  const { id } = post;
  const [createComment, { isLoading: isUpdating, error, isError }] =
    useCreateCommentMutation();

  const { handleSubmit, values, handleChange } = useFormik({
    initialValues: {
      comment_text: "",
    },
    onSubmit: async ({ comment_text }) => {
      await createComment({
        comment_text,
        userId: +userId!,
        id,
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
  return (
    <div className="post-details-modal__comment-input-container">{content}</div>
  );
};

export default CommentInput;
