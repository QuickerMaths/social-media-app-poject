// External dependencies

import moment from "moment";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

// Internal dependencies

import { openModal } from "../../../features/modalSlice/modalSlice";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { IPost } from "../types";
import { useDeletePostMutation } from "../../../features/apiSlice/postApiSlice/postApiSlice";
import useToastCreator from "../../../hooks/useToastCreator";
import Spinner from "../../../utilities/spinner/Spinner";

interface Props {
  post: IPost;
}

const PostEdit: React.FC<Props> = ({ post }) => {
  const [deletePost, { isLoading: isDeleting, isError, error }] =
    useDeletePostMutation();

  if (isError) useToastCreator(error as string, "error");

  const dispatch = useAppDispatch();
  const { created_at, id: postId } = post;

  return (
    <>
      <div className="post__edit-wrapper">
        <button
          className="post__edit-button"
          onClick={() => dispatch(openModal(`${postId}edit`))}
        >
          <AiOutlineEdit className="post__edit-icon" />
        </button>

        {isDeleting ? (
          <Spinner size={25} />
        ) : (
          <button
            className="post__edit-button"
            onClick={() => {
              deletePost({
                id: postId,
              });
            }}
            disabled={isDeleting}
          >
            <AiOutlineDelete className="post__edit-icon" />
          </button>
        )}
        <p className="post__createdAt">{moment(created_at).fromNow()}</p>
      </div>
    </>
  );
};

export default PostEdit;
