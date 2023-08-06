// External dependencies

import React from "react";
import { useFormik } from "formik";
import { GrAttachment } from "react-icons/gr";

// Internal dependencies

import useToastCreator from "../../../hooks/useToastCreator";
import Spinner from "../../../utilities/spinner/Spinner";
import { IPost } from "../../../components/post/types";
import { useUpdatePostMutation } from "../../../features/apiSlice/postApiSlice/postApiSlice";
import { closeModal } from "../../../features/modalSlice/modalSlice";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { useConvertToBase64 } from "../../../hooks/useConvertToBase64";

interface Props {
  post: IPost;
}

const PostEditImageForm: React.FC<Props> = ({ post }) => {
  //TODO: when image is already uploaded and user wants to edit post, this occures in the console ||| response Formik.tsx:823 Warning: An unhandled error was caught from submitForm() TypeError: Failed to execute 'readAsDataURL' on 'FileReader': parameter 1 is not of type 'Blob'.
  const { _id: postId, postImage, postBody } = post;

  const [updatePost, { isLoading: isUpdating, isError, error }] =
    useUpdatePostMutation();

  if (isError) useToastCreator(error as string, "error");

  const dispatch = useAppDispatch();
  const { handleSubmit, values, handleChange, setFieldValue } = useFormik({
    initialValues: {
      postBody: postBody,
      postImage: postImage,
    },
    onSubmit: async (values) => {
      await updatePost({
        _id: postId,
        postImage: values.postImage
          ? ((await useConvertToBase64(values.postImage)) as string)
          : null,
        postBody: values.postBody,
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
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="post-edit-modal__form">
      {content}
    </form>
  );
};

export default PostEditImageForm;
