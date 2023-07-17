// External dependencies

import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useFormik } from "formik";
import { AiOutlineClose } from "react-icons/ai";

//Internal dependencies

import { IPost } from "../../components/post/types";
import { closeModal } from "../../features/modalSlice/modalSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";

interface Props {
  post: IPost;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
  reRender: boolean;
}

const CreateRePostModal: React.FC<Props> = ({
  post,
  setReRender,
  reRender,
}) => {
  const { _id: postId } = post;
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const { modals } = useAppSelector((state: RootState) => state.modal);

  const { handleSubmit, values, handleChange } = useFormik({
    initialValues: {
      postBody: "",
    },
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:5000/api/repost", {
          postId,
          userId,
          postBody: values.postBody,
        });

        dispatch(closeModal(`${postId}repost`));
        setReRender(!reRender);
      } catch (err) {
        console.log(err);
      }
    },
  });

  if (!modals[`${postId}repost`]) return null;
  return ReactDOM.createPortal(
    <div className="create-repost-modal">
      <div
        className="create-repost-modal__overlay"
        onClick={() => dispatch(closeModal(`${postId}repost`))}
      ></div>
      <div className="create-repost-modal__content">
        <button
          className="create-repost-modal__close"
          onClick={() => dispatch(closeModal(`${postId}repost`))}
        >
          <AiOutlineClose className="create-repost-modal__close-icon" />
        </button>
        <h2 className="create-repost-modal__title">RePost</h2>
        <form onSubmit={handleSubmit} className="create-repost-modal__form">
          <textarea
            rows={5}
            cols={10}
            name="postBody"
            id="postBody"
            value={values.postBody}
            onChange={handleChange}
            className="create-repost-modal__text-area"
          />
          <button className="create-repost-modal__button" type="submit">
            RePost
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default CreateRePostModal;
