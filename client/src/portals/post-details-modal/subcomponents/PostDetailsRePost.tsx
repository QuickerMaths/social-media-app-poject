import moment from "moment";
import React from "react";
import PostOwner from "../../../components/post/sumcomponents/PostOwner";
import { IRePost } from "../../../components/post/types";

interface Props {
  post: IRePost;
}
const PostDetailsRePost: React.FC<Props> = ({ post }) => {
  const { originalPost } = post;
  return (
    <>
      {originalPost === null ? (
        <div className="re-post">
          <h2 className="re-post__deleted-message">Post has been deleted</h2>
        </div>
      ) : (
        <div className="re-post">
          {originalPost.postImage && (
            <img
              src={originalPost.postImage}
              alt="post image"
              className="post__image"
            />
          )}
          <div className="post__top-container">
            <PostOwner owner={originalPost.owner} />
            <p className="post__createdAt">
              {moment(originalPost.createdAt).fromNow()}
            </p>
          </div>
          <p className="post__body">{originalPost.postBody}</p>
        </div>
      )}
    </>
  );
};

export default PostDetailsRePost;
