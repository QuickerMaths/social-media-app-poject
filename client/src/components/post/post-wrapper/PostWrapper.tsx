// External dependencies

import React from "react";
import moment from "moment";
import { EntityId } from "@reduxjs/toolkit";

// Internal dependencies

import PostEditModal from "../../../portals/post-edit-modal/PostEditModal";
import PostEdit from "../subcomponents/PostEdit";
import PostOwner from "../subcomponents/PostOwner";
import Post from "./original-post/Post";
import RePost from "./rePost/RePost";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../redux/store";
import { IPost, IRePost } from "../types";
import { useSelectPostFromResult } from "../../../hooks/useSelectPostFromResult";

interface Props {
  postId: EntityId;
  userId: string | undefined;
}

const PostWrapper: React.FC<Props> = ({ postId, userId }) => {
  const { userId: activeUserId } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { modals } = useAppSelector((state: RootState) => state.modal);

  const post = useSelectPostFromResult({
    userId,
    postId,
  });

  const { owner, isRePost, postBody, createdAt } = post;

  return (
    <li className="post">
      <div className="post__top-container">
        <PostOwner owner={owner} />
        {owner._id === activeUserId ? (
          <>
            <PostEdit post={isRePost ? (post as IRePost) : (post as IPost)} />
            {modals[`${postId}edit`] && (
              <PostEditModal
                post={isRePost ? (post as IRePost) : (post as IPost)}
              />
            )}
          </>
        ) : (
          <p className="post__createdAt">{moment(createdAt).fromNow()}</p>
        )}
      </div>
      <p className="post__body">{postBody}</p>
      {isRePost ? (
        <RePost rePost={post as IRePost} />
      ) : (
        <Post post={post as IPost} />
      )}
    </li>
  );
};

export default PostWrapper;
