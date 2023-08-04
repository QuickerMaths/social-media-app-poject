// External dependencies

import React from "react";
import moment from "moment";
import { AiOutlineDelete } from "react-icons/ai";

// Internal dependencies

import Spinner from "../../../utilities/spinner/Spinner";
import useToastCreator from "../../../hooks/useToastCreator";
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

  if (isError) useToastCreator(error as string, "error");

  return (
    <>
      {owner._id === activeUserId ? (
        <div className="comment__wrapper">
          {isDeleting ? (
            <Spinner size={20} />
          ) : (
            <button
              className="comment__edit-button"
              onClick={() => deleteComment({ _id: commentId, postId })}
            >
              <AiOutlineDelete className="comment__edit-icon" />
            </button>
          )}
          <p className="comment__createdAt">{moment(createdAt).fromNow()}</p>
        </div>
      ) : (
        <p className="comment__createdAt">{moment(createdAt).fromNow()}</p>
      )}
    </>
  );
};

export default CommentEdit;
