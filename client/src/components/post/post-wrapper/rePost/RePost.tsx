// External dependencies

import React from "react";
import moment from "moment";
import { EntityState } from "@reduxjs/toolkit";

// Internal dependencies

import PostOwner from "../../subcomponents/PostOwner";
import PostAction from "../../subcomponents/PostAction";
import PostComments from "../../subcomponents/PostComments";
import PostDetailsModal from "../../../../portals/post-details-modal/PostDetailsModal";
import { IPost, IRePost } from "../../types";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { RootState } from "../../../../redux/store";
import { openModal } from "../../../../features/modalSlice/modalSlice";
import { IComment } from "../../../comment/types";

interface Props {
  rePost: IRePost;
}

const RePost: React.FC<Props> = ({ rePost }) => {
  const { comments, commentTotal, originalPost, _id: postId } = rePost;

  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state: RootState) => state.modal);

  return (
    <>
      {originalPost === null ? (
        <div className="re-post">
          <h2 className="re-post__deleted-message">Post has been deleted</h2>
        </div>
      ) : (
        <div className="re-post">
          {(originalPost as IPost).postImage && (
            <img
              src={(originalPost as IPost).postImage as string}
              alt="post image"
              className="post__image"
            />
          )}
          <div className="post__top-container">
            <PostOwner owner={(originalPost as IPost).owner} />
            <p className="post__createdAt">
              {moment((originalPost as IPost).createdAt).fromNow()}
            </p>
          </div>
          <p className="post__body">{(originalPost as IPost).postBody}</p>
        </div>
      )}

      <PostAction post={rePost} />
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
      {modals[`${postId}details`] && <PostDetailsModal post={rePost} />}
    </>
  );
};

export default RePost;
