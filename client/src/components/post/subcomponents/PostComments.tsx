// External dependencies

import React from "react";

// Internal dependencies

import Comment from "../../comment/Comment";
import { IComment } from "../../comment/types";

interface Props {
  comments: IComment[];
}

const PostComments: React.FC<Props> = ({ comments }) => {
  return (
    <ul className="post__comments-container">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </ul>
  );
};

export default PostComments;
