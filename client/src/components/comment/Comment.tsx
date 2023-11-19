// External dependencies

import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { useParams } from "react-router";

// Internal dependencies

import CommentOwner from "./subcomponents/CommentOwner";
import CommentEdit from "./subcomponents/CommentEdit";
import useToastCreator from "../../hooks/useToastCreator";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { IComment } from "./types";
import { useLikeCommentMutation } from "../../features/apiSlice/commentApiSlice/commentApiSlice";

interface Props {
  comment: IComment;
}
const Comment = React.forwardRef<HTMLLIElement, Props>(({ comment }, ref) => {
  const { userId: loggedInUserId } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { userId } = useParams();

  const { post_id, id, comment_text, is_liked, like_count, comment_owner } =
    comment;

  const [likeComment, { isError, error }] = useLikeCommentMutation();

  const handleCommentLike = () => {
    loggedInUserId === null
      ? useToastCreator("You have to be logged in to like this post", "error")
      : likeComment({
          id,
          post_id,
          userId: +userId!,
        });
    if (isError) useToastCreator(error as string, "error");
  };

  return (
    <li className="comment" ref={ref}>
      <div className="comment__top-container">
        <CommentOwner comment_owner={comment_owner} />
        <CommentEdit comment={comment} />
      </div>
      <p className="comment__body">{comment_text}</p>
      <button
        className={`comment__action-button ${
          loggedInUserId && is_liked && "post__liked"
        }`}
        onClick={handleCommentLike}
      >
        <AiOutlineLike
          className={`comment__action-icon ${
            loggedInUserId && is_liked && "post__liked"
          }`}
        />
        {like_count}
      </button>
    </li>
  );
});

export default Comment;
