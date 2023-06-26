import React from "react";
import ReactDOM from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostDetailsModal: React.FC<Props> = ({ setIsOpen, isOpen }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="post-details-modal">
      <div
        className="post-details-modal__overlay"
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="post-details-modal__content">
        <button
          className="post-details-modal__close"
          onClick={() => setIsOpen(false)}
        >
          <AiOutlineClose className="post-details-modal__close-icon" />
        </button>
      </div>
    </div>,
    document.body
  );
};

export default PostDetailsModal;
