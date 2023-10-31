// External dependencies

import React from "react";
import ReactDOM from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

// Internal dependencies

import PostEditImageForm from "./subcomponents/PostEditImageForm";
import PostEditRePostForm from "./subcomponents/PostEditRePostForm";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { closeModal } from "../../features/modalSlice/modalSlice";
import { IPost } from "../../components/post/types";

interface Props {
  post: IPost;
}

const PostEditModal: React.FC<Props> = ({ post }) => {
  const { id: postId, is_shared } = post;

  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state: RootState) => state.modal);

  if (!modals[`${postId}edit`]) return null;
  return ReactDOM.createPortal(
    <div className="post-edit-modal">
      <div
        className="post-edit-modal__overlay"
        onClick={() => dispatch(closeModal(`${postId}edit`))}
      ></div>
      <div className="post-edit-modal__content">
        <button
          className="post-edit-modal__close"
          onClick={() => dispatch(closeModal(`${postId}edit`))}
        >
          <AiOutlineClose className="post-edit-modal__close-icon" />
        </button>
        <h2 className="post-edit-modal__title">Edit post</h2>
        {is_shared === true ? (
          <PostEditRePostForm post={post as IRePost} />
        ) : (
          <PostEditImageForm post={post as IPost} />
        )}
      </div>
    </div>,
    document.body
  );
};

export default PostEditModal;
