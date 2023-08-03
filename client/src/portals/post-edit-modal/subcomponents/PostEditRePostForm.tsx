// External dependencies

import React from "react";
import { useFormik } from "formik";

// Internal dependencies

import Spinner from "../../../utilities/spinner/Spinner";
import { closeModal } from "../../../features/modalSlice/modalSlice";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { useUpdatePostMutation } from "../../../features/apiSlice/postApiSlice/postApiSlice";
import { IRePost } from "../../../components/post/types";
import useToastCreator from "../../../hooks/useToastCreator";

interface Props {
  post: IRePost;
}

const PostEditRePostForm: React.FC<Props> = ({ post }) => {
  const [updatePost, { isLoading: isUpdating, isError, error }] =
    useUpdatePostMutation();

  if (isError) useToastCreator(error as string, "error");

  const dispatch = useAppDispatch();
  const { _id: postId, postBody } = post;

  const { handleSubmit, values, handleChange } = useFormik({
    initialValues: {
      postBody: postBody,
    },
    onSubmit: async (values) => {
      await updatePost({
        _id: postId,
        postBody: values.postBody,
        isRePost: true,
      });
      dispatch(closeModal(`${postId}edit`));
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
          name="postBody"
          id="postBody"
          value={values.postBody}
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
