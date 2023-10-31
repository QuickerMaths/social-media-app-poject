// External dependencies

import React from "react";
import moment from "moment";
import { EntityState } from "@reduxjs/toolkit";

// Internal dependencies

import PostOwner from "../../subcomponents/PostOwner";
import PostAction from "../../subcomponents/PostAction";
import PostComments from "../../subcomponents/PostComments";
import PostDetailsModal from "../../../../portals/post-details-modal/PostDetailsModal";
import { IPost } from "../../types";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { RootState } from "../../../../redux/store";
import { openModal } from "../../../../features/modalSlice/modalSlice";
import { IComment } from "../../../comment/types";

interface Props {
  rePost: IPost;
}

const RePost: React.FC<Props> = ({ rePost }) => {
  const { comments, comment_count, shared_post, id: postId } = rePost;

  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state: RootState) => state.modal);

  return (
    <>
      {/* TODO: handle scenario when post would be deleted */}
      {rePost === null ? (
        <div className="re-post">
          <h2 className="re-post__deleted-message">Post has been deleted</h2>
        </div>
      ) : (
        <div className="re-post">
          {shared_post.media_location && (
            <img
              src={shared_post.media_location as string}
              alt="post image"
              className="post__image"
            />
          )}
          <div className="post__top-container">
            <PostOwner post_owner={shared_post.post_owner} />
            <p className="post__createdAt">
              {moment(shared_post.created_at).fromNow()}
            </p>
          </div>
          <p className="post__body">{shared_post.post_text}</p>
        </div>
      )}

      <PostAction post={rePost} />
      {comment_count > 0 && (
        <>
          <PostComments comments={comments} />
          {comment_count > 2 && (
            <button
              className="post__see-more"
              onClick={() => dispatch(openModal(`${postId}details`))}
            >
              See more
            </button>
          )}
        </>
      )}
      {modals[`${postId}details`] && <PostDetailsModal post={rePost} />}
    </>
  );
};

export default RePost;
