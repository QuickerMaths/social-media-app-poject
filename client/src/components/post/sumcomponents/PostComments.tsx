import React from "react";
import Comment from "../../comment/Comment";
import { IComment } from "../../comment/types";

interface Props {
  comments: IComment[];
  reRender: boolean;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostComments: React.FC<Props> = ({ comments, reRender, setReRender }) => {
  return (
    <ul className="post__comments-container">
      {comments.map((comment: IComment) => (
        <Comment
          key={comment._id}
          comment={comment}
          reRender={reRender}
          setReRender={setReRender}
        />
      ))}
    </ul>
  );
};

export default PostComments;
