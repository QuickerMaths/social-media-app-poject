import React from "react";
import ReactDOM from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { closeModal } from "../../features/modalSlice/modalSlice";
import PostEditImageForm from "./subcomponents/PostEditImageForm";
import PostEditRePostForm from "./subcomponents/PostEditRePostForm";
import { IPost, IRePost } from "../../components/post/types";

interface Props {
  post: IPost | IRePost;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
  reRender: boolean;
}

const PostEditModal: React.FC<Props> = ({ post, reRender, setReRender }) => {
  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state: RootState) => state.modal);

  //TODO: refactor to rktQuery and change rerender state

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
        {post.isRePost === true ? (
          <PostEditRePostForm
            post={post as IRePost}
            setReRender={setReRender}
            reRender={reRender}
          />
        ) : (
          <PostEditImageForm
            post={post as IPost}
            setReRender={setReRender}
            reRender={reRender}
          />
        )}
      </div>
    </div>,
    document.body
  );
};

export default PostEditModal;
