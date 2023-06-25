import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useFormik } from "formik";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostEditModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="post-edit-modal">
      <div
        className="post-edit-modal__overlay"
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="post-edit-modal__content">
        <button
          className="post-edit-modal__close"
          onClick={() => setIsOpen(false)}
        >
          <AiOutlineClose className="post-edit-modal__close-icon" />
        </button>
        <h2 className="post-edit-modal__title">Edit post</h2>
      </div>
    </div>,
    document.body
  );
};

export default PostEditModal;
