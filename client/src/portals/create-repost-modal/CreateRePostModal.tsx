import React from "react";
import ReactDOM from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
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
  const { modals } = useAppSelector((state: RootState) => state.modal);

  if (!modals[`${postId}repost`]) return null;
  return ReactDOM.createPortal(
    <div className="post-edit-modal">
      <div
        className="post-edit-modal__overlay"
        onClick={() => dispatch(closeModal(`${postId}repost`))}
      ></div>
      <div className="post-edit-modal__content">
        <button
          className="post-edit-modal__close"
          onClick={() => dispatch(closeModal(`${postId}repost`))}
        >
          <AiOutlineClose className="post-edit-modal__close-icon" />
        </button>
        <h2 className="post-edit-modal__title">Edit repost</h2>
      </div>
    </div>,
    document.body
  );
};

export default CreateRePostModal;
