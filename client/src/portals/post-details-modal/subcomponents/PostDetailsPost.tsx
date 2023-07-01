import React from "react";
import { IPost } from "../../../components/post/types";

interface Props {
  post: IPost;
}

const PostDetailsPost: React.FC<Props> = ({ post }) => {
  const { postImage, postBody } = post;
  return (
    <>
      <p className="post-details-modal__body">{postBody}</p>
      {postImage && (
        <img
          src={postImage}
          alt="post image"
          className="post-details-modal__image"
        />
      )}
    </>
  );
};

export default PostDetailsPost;
