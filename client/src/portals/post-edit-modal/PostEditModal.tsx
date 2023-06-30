import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useFormik } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import { GrAttachment } from "react-icons/gr";
import { useConvertToBase64 } from "../../hooks/useConvertToBase64";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { closeModal } from "../../features/modalSlice/modalSlice";

interface Props {
  postId: string;
  postImage?: string | null;
  postBody: string;
  userId: string;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
  reRender: boolean;
}

const PostEditModal: React.FC<Props> = ({
  postId,
  postImage,
  postBody,
  userId,
  reRender,
  setReRender,
}) => {
  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state: RootState) => state.modal);
  //TODO: refactor to rktQuery and change rerender state
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
  if (!modals.editPostModal) return null;
  return ReactDOM.createPortal(
    <div className="post-edit-modal">
      <div
        className="post-edit-modal__overlay"
        onClick={() => dispatch(closeModal("editPostModal"))}
      ></div>
      <div className="post-edit-modal__content">
        <button
          className="post-edit-modal__close"
          onClick={() => dispatch(closeModal("editPostModal"))}
        >
          <AiOutlineClose className="post-edit-modal__close-icon" />
        </button>
        <h2 className="post-edit-modal__title">Edit post</h2>
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
      </div>
    </div>,
    document.body
  );
};

export default PostEditModal;
