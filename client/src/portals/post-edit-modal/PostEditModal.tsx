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
import PostEditImageForm from "./subcomponents/PostEditImageForm";
import PostEditRePostForm from "./subcomponents/PostEditRePostForm";

interface Props {
  postId: string;
  postImage: string | null;
  postBody: string;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
  reRender: boolean;
}

const PostEditModal: React.FC<Props> = ({
  postId,
  postImage,
  postBody,
  reRender,
  setReRender,
}) => {
  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state: RootState) => state.modal);
  const { userId } = useAppSelector((state: RootState) => state.auth);
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
        {postImage === null ? (
          <PostEditRePostForm
            postId={postId}
            postBody={postBody}
            setReRender={setReRender}
            reRender={reRender}
          />
        ) : (
          <PostEditImageForm
            postBody={postBody}
            postId={postId}
            postImage={postImage}
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
