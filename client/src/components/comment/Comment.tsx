// External dependencies

import React from "react";
import { useParams } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { EntityId } from "@reduxjs/toolkit";

// Internal dependencies

import CommentOwner from "./subcomponents/CommentOwner";
import CommentEdit from "./subcomponents/CommentEdit";
import useToastCreator from "../../hooks/useToastCreator";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { IComment } from "./types";
import { useLikeCommentMutation } from "../../features/apiSlice/commentApiSlice/commentApiSlice";
import { useSelectCommentsFromResult } from "../../hooks/useSelectCommentsFromResult";

interface Props {
  commentId: EntityId;
  postId: EntityId;
}
const Comment: React.FC<Props> = ({
  commentId: commentEntityId,
  postId: postEntityId,
}) => {
  const { userId: activeUserId } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { userId } = useParams();

  const comment = useSelectCommentsFromResult({
    userId,
    postEntityId,
    commentEntityId,
  });

  const {
    owner,
    postId,
    _id: commentId,
    commentBody,
    likedBy,
  } = comment as IComment;

  const [likeComment] = useLikeCommentMutation();

  return (
    <li className="comment">
      <div className="comment__top-container">
        <CommentOwner owner={owner} />
        <CommentEdit comment={comment as IComment} />
      </div>
      <p className="comment__body">{commentBody}</p>
      <button
        className={`comment__action-button ${
          activeUserId && likedBy.includes(activeUserId) && "post__liked"
        }`}
        onClick={() => {
          activeUserId === null
            ? useToastCreator(
                "You have to be logged in to like this post",
                "error"
              )
            : likeComment({
                _id: commentId,
                postId,
                userId: activeUserId,
              });
        }}
      >
        <AiOutlineLike
          className={`comment__action-icon ${
            activeUserId && likedBy.includes(activeUserId) && "post__liked"
          }`}
        />
        {likedBy.length}
      </button>
    </li>
  );
};

export default Comment;
