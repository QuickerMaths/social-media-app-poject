// External dependencies

import React from "react";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { AiOutlineDelete, AiOutlineLike } from "react-icons/ai";
import { EntityId } from "@reduxjs/toolkit";

// Internal dependencies

import useToastCreator from "../../hooks/useToastCreator";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { IComment } from "./types";
import {
  useDeleteCommentMutation,
  useLikeCommentMutation,
} from "../../features/apiSlice/commentApiSlice/commentApiSlice";
import { useSelectCommentsFromResult } from "../../hooks/useSelectCommentsFromResult";

// Assets

import defaultImg from "../../assets/images/default_img.png";

interface Props {
  commentId: EntityId;
  postId: EntityId;
}
const Comment: React.FC<Props> = ({
  commentId: commentEntityId,
  postId: postEntityId,
}) => {
  const { userId: activeUserId } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { userId } = useParams();

  const comment = useSelectCommentsFromResult({
    userId,
    postEntityId,
    commentEntityId,
  });

  const {
    owner,
    createdAt,
    postId,
    _id: commentId,
    commentBody,
    likedBy,
  } = comment as IComment;

  const [deleteComment, { isLoading: isDeleting, error, isError }] =
    useDeleteCommentMutation();

  const [likeComment] = useLikeCommentMutation();

  //TODO: split comment into EditComment and ActionComment components to make it more readable
  //TODO: make some if(activeUserId) checks to make sure that user is logged in and prevent using as string on null

  return (
    <li className="comment">
      <div className="comment__top-container">
        <Link to={`/user/${owner._id}`} className="comment__owner">
          <img
            width={30}
            height={30}
            className="comment__user-profile-img"
            src={owner.profilePicture ? owner.profilePicture : defaultImg}
            alt="users profile img"
          />
          <h2 className="comment__username">{owner.username}</h2>
        </Link>
        {owner._id === activeUserId ? (
          <div className="comment__wrapper">
            <button
              className="comment__edit-button"
              onClick={() => deleteComment({ _id: commentId, postId })}
            >
              <AiOutlineDelete className="comment__edit-icon" />
            </button>
            {/* 
              TODO: make it better
            */}
            {isDeleting && <p>Deleting...</p>}
            {isError && <p>{JSON.stringify(error)}</p>}
            <p className="comment__createdAt">{moment(createdAt).fromNow()}</p>
          </div>
        ) : (
          <p className="comment__createdAt">{moment(createdAt).fromNow()}</p>
        )}
      </div>
      <p className="comment__body">{commentBody}</p>
      <button
        className={`comment__action-button ${
          likedBy.includes(activeUserId as string) && "post__liked"
        }`}
        onClick={() => {
          activeUserId === null
            ? useToastCreator(
                "You have to be logged in to like this post",
                "error"
              )
            : likeComment({
                _id: commentId,
                postId,
                userId: activeUserId,
              });
        }}
      >
        <AiOutlineLike
          className={`comment__action-icon ${
            likedBy.includes(activeUserId as string) && "post__liked"
          }`}
        />
        {likedBy.length}
      </button>
    </li>
  );
};

export default Comment;
