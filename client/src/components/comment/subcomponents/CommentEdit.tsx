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
  comment: { profile_id, id, post_id, created_at },
}) => {
  const { userId: activeUserId } = useAppSelector(
    (state: RootState) => state.auth
  );

  const [deleteComment, { isLoading: isDeleting, error, isError }] =
    useDeleteCommentMutation();

  if (isError) useToastCreator(error as string, "error");

  return (
    <>
      {profile_id === activeUserId ? (
        <div className="comment__wrapper">
          {isDeleting ? (
            <Spinner size={20} />
          ) : (
            <button
              className="comment__edit-button"
              onClick={() => deleteComment({ id, post_id })}
            >
              <AiOutlineDelete className="comment__edit-icon" />
            </button>
          )}
          <p className="comment__createdAt">{moment(created_at).fromNow()}</p>
        </div>
      ) : (
        <p className="comment__createdAt">{moment(created_at).fromNow()}</p>
      )}
    </>
  );
};

export default CommentEdit;
