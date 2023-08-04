// External dependencies

import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import { AiOutlineClose } from "react-icons/ai";

//Internal dependencies

import { IPost } from "../../components/post/types";
import { closeModal } from "../../features/modalSlice/modalSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { useCreatePostMutation } from "../../features/apiSlice/postApiSlice/postApiSlice";
import Spinner from "../../utilities/spinner/Spinner";
import useToastCreator from "../../hooks/useToastCreator";

interface Props {
  post: IPost;
}

const CreateRePostModal: React.FC<Props> = ({ post }) => {
  const [createPost, { isLoading: isUpdating, error, isError }] =
    useCreatePostMutation();

  if (isError) useToastCreator(error as string, "error");

  const dispatch = useAppDispatch();
  const { _id: postId } = post;
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const { modals } = useAppSelector((state: RootState) => state.modal);

  const { handleSubmit, values, handleChange } = useFormik({
    initialValues: {
      postBody: "",
    },
    onSubmit: async (values) => {
      await createPost({
        postBody: values.postBody,
        originalPost: postId,
        _id: userId as string,
        isRePost: true,
      });
      dispatch(closeModal(`${postId}repost`));
    },
  });

  let content;

  if (isUpdating) {
    content = <Spinner size={125} />;
  } else {
    content = (
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
    );
  }

  if (!modals[`${postId}repost`]) return null;
  return ReactDOM.createPortal(
    <div className="create-repost-modal">
      <div
        className="create-repost-modal__overlay"
        onClick={() => dispatch(closeModal(`${postId}repost`))}
      ></div>
      {content}
    </div>,
    document.body
  );
};

export default CreateRePostModal;
