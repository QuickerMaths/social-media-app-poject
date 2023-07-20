// External dependencies

import React from "react";
import { EntityId, EntityState } from "@reduxjs/toolkit";

// Internal dependencies

import Comment from "../../comment/Comment";
import { IComment } from "../../comment/types";

interface Props {
  comments: EntityState<IComment>;
  postId: EntityId;
  reRender: boolean;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostComments: React.FC<Props> = ({
  comments,
  postId,
  reRender,
  setReRender,
}) => {
  return (
    <ul className="post__comments-container">
      {comments.ids.map((commentId: EntityId) => (
        <Comment
          key={commentId}
          commentId={commentId}
          postId={postId}
          reRender={reRender}
          setReRender={setReRender}
        />
      ))}
    </ul>
  );
};

export default PostComments;
