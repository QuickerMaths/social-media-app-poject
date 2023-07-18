// External dependencies

import moment from "moment";
import React from "react";
import axios from "axios";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

// Internal dependencies

import { openModal } from "../../../features/modalSlice/modalSlice";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { IPost, IRePost } from "../types";
import { useDeletePostMutation } from "../../../features/apiSlice/postApiSlice/postApiSlice";

interface Props {
  post: IPost | IRePost;
}

const PostEdit: React.FC<Props> = ({ post }) => {
  const [deletePost, { isLoading: isUpdating, isError, error }] =
    useDeletePostMutation();

  const dispatch = useAppDispatch();
  const { createdAt, _id: postId } = post;

  return (
    <>
      <div className="post__edit-wrapper">
        <button
          className="post__edit-button"
          onClick={() => dispatch(openModal(`${postId}edit`))}
        >
          <AiOutlineEdit className="post__edit-icon" />
        </button>
        <button
          className="post__edit-button"
          onClick={() =>
            deletePost({
              _id: postId,
            })
          }
        >
          <AiOutlineDelete className="post__edit-icon" />
        </button>
        <p className="post__createdAt">{moment(createdAt).fromNow()}</p>
        {isUpdating && <div>Updating...</div>}
        {isError && <div>{JSON.stringify(error)}</div>}
      </div>
    </>
  );
};

export default PostEdit;
