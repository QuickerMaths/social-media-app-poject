import React from "react";
import { IComment } from "./types";

interface Props {
  comment: IComment;
}
const Comment: React.FC<Props> = ({ comment }) => {
  return <div>Comment</div>;
};

export default Comment;
