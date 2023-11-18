// External dependencies

import React from "react";
import moment from "moment";

// Internal dependencies

import PostEditModal from "../../../portals/post-edit-modal/PostEditModal";
import PostEdit from "../subcomponents/PostEdit";
import PostOwner from "../subcomponents/PostOwner";
import Post from "./original-post/Post";
import RePost from "./rePost/RePost";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../redux/store";
import { IPost } from "../types";

interface Props {
  post: IPost;
}

const PostWrapper = React.forwardRef<HTMLLIElement, Props>(({ post }, ref) => {
  const { userId: activeUserId } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { modals } = useAppSelector((state: RootState) => state.modal);

  const { is_shared, post_text, created_at, profile_id, post_owner, id } = post;

  return (
    <li className="post" ref={ref}>
      <div className="post__top-container">
        <PostOwner post_owner={post_owner} />
        {profile_id === activeUserId ? (
          <>
            <PostEdit post={post} />
            {modals[`${id}edit`] && <PostEditModal post={post} />}
          </>
        ) : (
          <p className="post__createdAt">{moment(created_at).fromNow()}</p>
        )}
      </div>
      <p className="post__body">{post_text}</p>
      {is_shared ? <RePost rePost={post} /> : <Post post={post} />}
    </li>
  );
});

export default PostWrapper;
