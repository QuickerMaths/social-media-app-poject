import moment from "moment";
import React from "react";
import ReactDOM from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { IPost } from "../../components/post/types";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import defaultImg from "../../assets/images/default_img.png";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post: IPost;
}

const PostDetailsModal: React.FC<Props> = ({
  setIsOpen,
  isOpen,
  post: {
    owner,
    createdAt,
    postBody,
    likedBy,
    _id: postId,
    postImage,
    comments,
    commentTotal,
  },
}) => {
  const { userId, userImg } = useAppSelector((state: RootState) => state.auth);
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
