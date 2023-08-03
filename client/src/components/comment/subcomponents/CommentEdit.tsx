// External dependencies

import React from "react";
import moment from "moment";
import { AiOutlineDelete } from "react-icons/ai";

// Internal dependencies

import { useDeleteCommentMutation } from "../../../features/apiSlice/commentApiSlice/commentApiSlice";
import { IComment } from "../types";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../redux/store";

interface Props {
  comment: IComment;
}

const CommentEdit: React.FC<Props> = ({
  comment: { owner, _id: commentId, postId, createdAt },
}) => {
  const { userId: activeUserId } = useAppSelector(
    (state: RootState) => state.auth
  );

  const [deleteComment, { isLoading: isDeleting, error, isError }] =
    useDeleteCommentMutation();

  return (
    <>
      {owner._id === activeUserId ? (
        <div className="comment__wrapper">
          <button
            className="comment__edit-button"
            onClick={() => deleteComment({ _id: commentId, postId })}
          >
            <AiOutlineDelete className="comment__edit-icon" />
          </button>
          {/* 
            TODO: make it better
          */}
          {isDeleting && <p>Deleting...</p>}
          {isError && <p>{JSON.stringify(error)}</p>}
          <p className="comment__createdAt">{moment(createdAt).fromNow()}</p>
        </div>
      ) : (
        <p className="comment__createdAt">{moment(createdAt).fromNow()}</p>
      )}
    </>
  );
};

export default CommentEdit;
