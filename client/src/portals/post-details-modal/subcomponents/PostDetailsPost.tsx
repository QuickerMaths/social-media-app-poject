import React from "react";
import { IPost } from "../../../components/post/types";

interface Props {
  post: IPost;
}

const PostDetailsPost: React.FC<Props> = ({ post }) => {
  const { media_location, post_text } = post;
  return (
    <>
      <p className="post-details-modal__body">{post_text}</p>
      {media_location && (
        <img
          src={media_location}
          alt="post image"
          className="post-details-modal__image"
        />
      )}
    </>
  );
};

export default PostDetailsPost;
