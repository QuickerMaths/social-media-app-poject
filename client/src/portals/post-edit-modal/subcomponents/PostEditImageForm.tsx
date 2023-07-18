import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { GrAttachment } from "react-icons/gr";
import { IPost } from "../../../components/post/types";
import { useUpdatePostMutation } from "../../../features/apiSlice/postApiSlice/postApiSlice";
import { closeModal } from "../../../features/modalSlice/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useConvertToBase64 } from "../../../hooks/useConvertToBase64";
import { RootState } from "../../../redux/store";

interface Props {
  post: IPost;
}

const PostEditImageForm: React.FC<Props> = ({ post }) => {
  const { _id: postId, postImage, postBody } = post;

  const [updatePost, { isLoading: isUpdating, isError, error }] =
    useUpdatePostMutation();

  const dispatch = useAppDispatch();
  const { handleSubmit, values, handleChange, setFieldValue } = useFormik({
    initialValues: {
      postBody: postBody,
      postImage: postImage,
    },
    onSubmit: async (values) => {
      await updatePost({
        _id: postId,
        postImage: values.postImage,
        postBody: values.postBody,
      });
      dispatch(closeModal("editPostModal"));
    },
  });

  return (
    <form onSubmit={handleSubmit} className="post-edit-modal__form">
      <textarea
        rows={5}
        cols={10}
        name="postBody"
        id="postBody"
        value={values.postBody}
        onChange={handleChange}
        className="post-edit-modal__text-area"
      />
      {isUpdating && <p>Updating...</p>}
      {isError && <p>{JSON.stringify(error)}</p>}
      {values.postImage ? (
        <>
          <label htmlFor="postImage" className="post-edit-modal__label">
            <GrAttachment className="post-edit-modal__icon" />
            <img
              src={values.postImage}
              alt="post image"
              className="post-edit-modal__image-label"
            />
          </label>
          <input
            type="file"
            name="postImage"
            id="postImage"
            accept=".png, .jpg, .jpeg"
            onChange={async (e) => {
              setFieldValue(
                "postImage",
                await useConvertToBase64(e.target.files![0])
              );
            }}
            className="post-edit-modal__file-input-image"
          />
        </>
      ) : (
        <>
          <label htmlFor="postImage">Add Image</label>
          <input
            type="file"
            name="postImage"
            id="postImage"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => {
              setFieldValue("postImage", e.target.files![0]);
            }}
            className="post-edit-modal__file-input"
          />
        </>
      )}
      <button className="post-edit-modal__button" type="submit">
        Edit
      </button>
    </form>
  );
};

export default PostEditImageForm;
