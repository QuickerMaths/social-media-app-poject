// External dependencies

import React from "react";
import { useFormik } from "formik";

// Internal dependencies

import Spinner from "../../../utilities/spinner/Spinner";
import { closeModal } from "../../../features/modalSlice/modalSlice";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { useUpdatePostMutation } from "../../../features/apiSlice/postApiSlice/postApiSlice";
import { IPost } from "../../../components/post/types";
import useToastCreator from "../../../hooks/useToastCreator";

interface Props {
  post: IPost;
}

const PostEditRePostForm: React.FC<Props> = ({ post }) => {
  const [updatePost, { isLoading: isUpdating, isError, error }] =
    useUpdatePostMutation();

  if (isError) useToastCreator(error as string, "error");

  const dispatch = useAppDispatch();
  const { id, post_text } = post;

  const { handleSubmit, values, handleChange } = useFormik({
    initialValues: {
      post_text,
    },
    onSubmit: async ({ post_text }) => {
      await updatePost({
        id,
        post_text,
      });
      dispatch(closeModal(`${id}edit`));
    },
  });

  let content;

  if (isUpdating) {
    content = <Spinner size={100} />;
  } else {
    content = (
      <>
        <textarea
          rows={5}
          cols={10}
          name="post_text"
          id="post_text"
          value={values.post_text || ""}
          onChange={handleChange}
          className="post-edit-modal__text-area"
        />
        <button className="post-edit-modal__button" type="submit">
          Edit
        </button>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="post-edit-modal__form">
      {content}
    </form>
  );
};

export default PostEditRePostForm;
