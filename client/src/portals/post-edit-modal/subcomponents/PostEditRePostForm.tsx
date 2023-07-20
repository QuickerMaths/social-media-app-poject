import axios from "axios";
import React from "react";
import { closeModal } from "../../../features/modalSlice/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../redux/store";
import { useFormik } from "formik";
import { IRePost } from "../../../components/post/types";
import { useUpdatePostMutation } from "../../../features/apiSlice/postApiSlice/postApiSlice";

interface Props {
  post: IRePost;
}

const PostEditRePostForm: React.FC<Props> = ({ post }) => {
  const [updatePost, { isLoading: isUpdating, isError, error }] =
    useUpdatePostMutation();

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
  return (
    <form onSubmit={handleSubmit} className="post-edit-modal__form">
      {/* 
        //TODO: make it prettier
      */}
      {isUpdating && <p>Updating...</p>}
      {isError && <p>{JSON.stringify(error)}</p>}
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
    </form>
  );
};

export default PostEditRePostForm;
