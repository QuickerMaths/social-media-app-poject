import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { GrAttachment } from "react-icons/gr";
import { closeModal } from "../../../features/modalSlice/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useConvertToBase64 } from "../../../hooks/useConvertToBase64";
import { RootState } from "../../../redux/store";

interface Props {
  postId: string;
  postImage: string | null;
  postBody: string;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
  reRender: boolean;
}

const PostEditImageForm: React.FC<Props> = ({
  reRender,
  setReRender,
  postId,
  postImage,
  postBody,
}) => {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const { handleSubmit, values, handleChange, setFieldValue } = useFormik({
    initialValues: {
      postBody: postBody,
      postImage: postImage,
    },
    onSubmit: async (values) => {
      try {
        await axios.put("http://localhost:5000/api/posts/edit", {
          postId,
          userId,
          postImage: values.postImage,
          postBody: values.postBody,
        });

        dispatch(closeModal("editPostModal"));
        setReRender(!reRender);
      } catch (err) {
        console.log(err);
      }
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
