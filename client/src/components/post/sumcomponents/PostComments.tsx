import React from "react";
import { openModal } from "../../../features/modalSlice/modalSlice";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import Comment from "../../comment/Comment";
import { IComment } from "../../comment/types";

interface Props {
  comments: IComment[];
  commentTotal: number;
  reRender: boolean;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostComments: React.FC<Props> = ({
  comments,
  commentTotal,
  reRender,
  setReRender,
}) => {
  const dispatch = useAppDispatch();

  return (
    <>
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
      {commentTotal > 2 && (
        <button
          className="post__see-more"
          onClick={() => dispatch(openModal("detailsPostModal"))}
        >
          See more
        </button>
      )}
    </>
  );
};

export default PostComments;
