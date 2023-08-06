// External dependencies

import React from "react";
import { EntityState } from "@reduxjs/toolkit";

// Internal dependencies

import PostAction from "../../subcomponents/PostAction";
import PostComments from "../../subcomponents/PostComments";
import CreateRePostModal from "../../../../portals/create-repost-modal/CreateRePostModal";
import PostDetailsModal from "../../../../portals/post-details-modal/PostDetailsModal";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { openModal } from "../../../../features/modalSlice/modalSlice";
import { RootState } from "../../../../redux/store";
import { IPost } from "../../types";
import { IComment } from "../../../comment/types";

interface Props {
  post: IPost;
}

const Post: React.FC<Props> = ({ post }) => {
  const { postImage, comments, commentTotal, _id: postId } = post;

  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state: RootState) => state.modal);

  return (
    <>
      {postImage && (
        <img src={postImage} alt="post image" className="post__image" />
      )}
      <PostAction post={post} />
      {commentTotal > 0 && (
        <>
          <PostComments
            postId={postId}
            comments={comments as EntityState<IComment>}
          />
          {commentTotal > 2 && (
            <button
              className="post__see-more"
              onClick={() => dispatch(openModal(`${postId}details`))}
            >
              See more
            </button>
          )}
        </>
      )}

      {modals[`${postId}repost`] && <CreateRePostModal post={post as IPost} />}
      {modals[`${postId}details`] && <PostDetailsModal post={post} />}
    </>
  );
};

export default Post;
