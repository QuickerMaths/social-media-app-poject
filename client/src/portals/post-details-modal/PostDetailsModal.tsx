// External dependencies

import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { AiOutlineClose } from "react-icons/ai";

// Internal dependencies

import PostAction from "../../components/post/subcomponents/PostAction";
import Comment from "../../components/comment/Comment";
import PostOwner from "../../components/post/subcomponents/PostOwner";
import PostDetailsPost from "./subcomponents/PostDetailsPost";
import PostDetailsRePost from "./subcomponents/PostDetailsRePost";
import CommentInput from "../../components/comment-input/CommentInput";
import useToastCreator from "../../hooks/useToastCreator";
import useLastRef from "../../hooks/useLastRef";
import { useGetPostByIdQuery } from "../../features/apiSlice/postApiSlice/postApiSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { closeModal } from "../../features/modalSlice/modalSlice";
import { commentAdapter } from "../../features/apiSlice/commentApiSlice/commentApiSlice";
import { IComment } from "../../components/comment/types";
import { setCommentPage } from "../../features/paginationSlice/paginationSlice";

interface Props {
  id: number;
}

const PostDetailsModal: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state: RootState) => state.modal);
  const { commentPage } = useAppSelector(
    (state: RootState) => state.pagination
  );
  const currentPage = commentPage[id] || 1;

  const {
    data: post,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
  } = useGetPostByIdQuery(
    { id, page: currentPage },
    {
      selectFromResult: ({
        data,
        isLoading,
        isFetching,
        isError,
        isSuccess,
        error,
      }): any => ({
        data: {
          ...data,
          comments: {
            comments: commentAdapter
              .getSelectors()
              .selectAll(data?.comments ?? commentAdapter.getInitialState()),
            meta: data?.comments.meta,
          },
        },
        isLoading,
        isFetching,
        isError,
        isSuccess,
        error,
      }),
    }
  );

  const lastCommentRef = useLastRef({
    isLoading,
    isFetching,
    page: currentPage,
    id: id,
    actionToDispatch: setCommentPage,
    hasNextPage: post?.comments.meta?.hasNextPage as boolean,
  });

  let content;

  if (isError) {
    dispatch(closeModal(`${id}details`));
    useToastCreator(error as string, "error");
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
          {comment_count > 0 && (
            <>
              <ul className="post__comments-container">
                {comments.comments.map((comment: IComment, index: number) => {
                  if (comments.comments.length === index + 1) {
                    return (
                      <Comment
                        ref={lastCommentRef}
                        key={comment.id}
                        comment={comment}
                      />
                    );
                  }
                  return <Comment key={comment.id} comment={comment} />;
                })}
              </ul>
              {isLoading || (isFetching && <p>Loading...</p>)}
            </>
          )}
        </div>
        <CommentInput post={post} />
      </>
    );
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
