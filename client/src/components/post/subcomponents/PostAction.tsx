// External dependencies

import React from "react";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";

// Internal dependencies

import useToastCreator from "../../../hooks/useToastCreator";
import { openModal } from "../../../features/modalSlice/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../redux/store";
import { IPost, IRePost } from "../types";
import { useLikePostMutation } from "../../../features/apiSlice/postApiSlice/postApiSlice";

interface Props {
  post: IPost | IRePost;
}

const PostAction: React.FC<Props> = ({ post }) => {
  const [likePost, { isError, error }] = useLikePostMutation();

  const dispatch = useAppDispatch();
  const { likedBy, _id, commentTotal, isRePost } = post;
  const { userId } = useAppSelector((state: RootState) => state.auth);

  return (
    <>
      <div className="post__bottom-container">
        <button
          className={`post__action-button ${
            likedBy.includes(userId as string) && "post__liked"
          }`}
          onClick={() => {
            userId === null
              ? useToastCreator(
                  "You have to be logged in to like this post",
                  "error"
                )
              : likePost({ _id, userId, isRePost });
            if (isError) useToastCreator(error as string, "error");
          }}
        >
          <AiOutlineLike
            className={`post__action-icon ${
              likedBy.includes(userId as string) && "post__liked"
            }`}
          />
          {likedBy.length}
        </button>
        <button
          className="post__action-button"
          onClick={() => dispatch(openModal(`${_id}details`))}
        >
          <AiOutlineComment className="post__action-icon" /> {commentTotal}
        </button>
        {!isRePost && (
          <button
            className="post__action-button"
            onClick={() => {
              userId === null
                ? useToastCreator("You have to be logged in to repost", "error")
                : dispatch(openModal(`${_id}repost`));
            }}
          >
            <BiRepost className="post__action-icon" />
            {(post as IPost).rePostsCount}
          </button>
        )}
      </div>
    </>
  );
};

export default PostAction;
