// External dependencies

import React from "react";
import moment from "moment";

// Internal dependencies

import PostOwner from "../../../components/post/subcomponents/PostOwner";
import { IPost } from "../../../components/post/types";

interface Props {
  post: IPost;
}
const PostDetailsRePost: React.FC<Props> = ({ post }) => {
  const { shared_post } = post;

  return (
    <>
      {post === null ? (
        <div className="re-post">
          <h2 className="re-post__deleted-message">Post has been deleted</h2>
        </div>
      ) : (
        <div className="re-post">
          {shared_post.media_location && (
            <img
              src={shared_post.media_location}
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
    </>
  );
};

export default PostDetailsRePost;
