// External dependencies

import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { AiOutlineClose } from "react-icons/ai";

// Internal dependencies

import PostAction from "../../components/post/subcomponents/PostAction";
import PostComments from "../../components/post/subcomponents/PostComments";
import PostOwner from "../../components/post/subcomponents/PostOwner";
import PostDetailsPost from "./subcomponents/PostDetailsPost";
import PostDetailsRePost from "./subcomponents/PostDetailsRePost";
import CommentInput from "../../components/comment-input/CommentInput";
import { useGetPostByIdQuery } from "../../features/apiSlice/postApiSlice/postApiSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { closeModal } from "../../features/modalSlice/modalSlice";
import Spinner from "../../utilities/spinner/Spinner";
import useToastCreator from "../../hooks/useToastCreator";

interface Props {
  id: number;
}

const PostDetailsModal: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state: RootState) => state.modal);
  const page = useAppSelector(
    (state: RootState) => state.pagination.commentPage
  );

  const {
    data: post,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetPostByIdQuery({ id, page });

  let content;

  if (isLoading) {
    content = <Spinner size={60} />;
  } else if (isSuccess) {
    const { created_at, comments, comment_count, post_owner, is_shared } = post;

    content = (
      <>
        <div className="post-details-modal__top-container">
          <PostOwner post_owner={post_owner} />

          <p className="post-details-modal__createdAt">
            {moment(created_at).fromNow()}
          </p>
        </div>
        <div className="post-details-modal__overflow">
          {is_shared ? (
            <PostDetailsRePost post={post} />
          ) : (
            <PostDetailsPost post={post} />
          )}
          <PostAction post={post} />
          {comment_count > 0 && <PostComments comments={comments} />}
        </div>
        <CommentInput post={post} />
      </>
    );
  } else if (isError) {
    dispatch(closeModal(`${id}details`));
    useToastCreator(error as string, "error");
  }

  if (!modals[`${id}details`]) return null;
  return ReactDOM.createPortal(
    <div className="post-details-modal">
      <div
        className="post-details-modal__overlay"
        onClick={() => dispatch(closeModal(`${id}details`))}
      ></div>
      <div className="post-details-modal__content">
        <button
          className="post-details-modal__close"
          onClick={() => dispatch(closeModal(`${id}details`))}
        >
          <AiOutlineClose className="post-details-modal__close-icon" />
        </button>
        {content}
      </div>
    </div>,
    document.body
  );
};

export default PostDetailsModal;
