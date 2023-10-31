// External dependencies

import React from "react";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";

// Internal dependencies

import useToastCreator from "../../../hooks/useToastCreator";
import { openModal } from "../../../features/modalSlice/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../redux/store";
import { IPost } from "../types";
import { useLikePostMutation } from "../../../features/apiSlice/postApiSlice/postApiSlice";

interface Props {
  post: IPost;
}

const PostAction: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const { is_liked, like_count, id, comment_count, is_shared, share_count } =
    post;
  const { userId } = useAppSelector((state: RootState) => state.auth);

  const [likePost, { isError, error }] = useLikePostMutation();

  const handlePostLike = () => {
    userId === null
      ? useToastCreator("You have to be logged in to like this post", "error")
      : likePost({ id, userId });
    if (isError) useToastCreator(error as string, "error");
  };
  return (
    <>
      <div className="post__bottom-container">
        <button
          className={`post__action-button ${is_liked && "post__liked"}`}
          onClick={handlePostLike}
        >
          <AiOutlineLike
            className={`post__action-icon ${is_liked && "post__liked"}`}
          />
          {like_count}
        </button>
        <button
          className="post__action-button"
          onClick={() => dispatch(openModal(`${id}details`))}
        >
          <AiOutlineComment className="post__action-icon" /> {comment_count}
        </button>
        {!is_shared && (
          <button
            className="post__action-button"
            onClick={() => {
              userId === null
                ? useToastCreator("You have to be logged in to repost", "error")
                : dispatch(openModal(`${id}repost`));
            }}
          >
            <BiRepost className="post__action-icon" />
            {share_count}
          </button>
        )}
      </div>
    </>
  );
};

export default PostAction;
