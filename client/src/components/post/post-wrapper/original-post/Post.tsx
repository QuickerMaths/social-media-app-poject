// External dependencies

import React from "react";

// Internal dependencies

import PostAction from "../../subcomponents/PostAction";
import PostComments from "../../subcomponents/PostComments";
import CreateRePostModal from "../../../../portals/create-repost-modal/CreateRePostModal";
import PostDetailsModal from "../../../../portals/post-details-modal/PostDetailsModal";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { openModal } from "../../../../features/modalSlice/modalSlice";
import { RootState } from "../../../../redux/store";
import { IPost } from "../../types";

interface Props {
  post: IPost;
}

const Post: React.FC<Props> = ({ post }) => {
  const { media_location, comments, comment_count, id } = post;

  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state: RootState) => state.modal);

  return (
    <>
      {media_location && (
        <img
          src={media_location}
          alt="post image"
          className="post__image"
          onClick={() => dispatch(openModal(`${id}details`))}
        />
      )}
      <PostAction post={post} />
      {comment_count > 0 && (
        <>
          <PostComments comments={comments} />
          {comment_count > 2 && (
            <button
              className="post__see-more"
              onClick={() => dispatch(openModal(`${id}details`))}
            >
              See more
            </button>
          )}
        </>
      )}

      {modals[`${id}repost`] && <CreateRePostModal post={post} />}
      {modals[`${id}details`] && <PostDetailsModal id={id} />}
    </>
  );
};

export default Post;
