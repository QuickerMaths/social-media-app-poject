// External dependencies

import React from "react";
import axios from "axios";
import moment from "moment";
import { AiOutlineDelete, AiOutlineLike } from "react-icons/ai";

// Internal dependencies

import useToastCreator from "../../hooks/useToastCreator";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";

// Assets

import defaultImg from "../../assets/images/default_img.png";
import { useDeleteCommentMutation } from "../../features/apiSlice/commentApiSlice/commentApiSlice";
import { EntityId, EntityState } from "@reduxjs/toolkit";
import { useGetPostsQuery } from "../../features/apiSlice/postApiSlice/postApiSlice";
import { IComment } from "./types";

interface Props {
  commentId: EntityId;
  postId: EntityId;
  reRender: boolean;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
}
const Comment: React.FC<Props> = ({
  commentId: commentEntityId,
  postId: postEntityId,
  reRender,
  setReRender,
}) => {
  //TODO: type it
  const {
    comment: { owner, createdAt, postId, _id: commentId, commentBody, likedBy },
  } = useGetPostsQuery("", {
    selectFromResult: ({ data }) => ({
      comment: (data?.entities[postEntityId]?.comments as EntityState<IComment>)
        ?.entities[commentEntityId],
    }),
  });

  const [deleteComment, { isLoading: isDeleting, error, isError }] =
    useDeleteCommentMutation();
  const { userId } = useAppSelector((state: RootState) => state.auth);
  //TODO: refactor to rtqQuery
  const handleDeleteComment = async (commentId: string, postId: string) => {
    try {
      await axios.delete("http://localhost:5000/api/comments", {
        data: {
          commentId,
          postId,
        },
      });
      setReRender(!reRender);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLikePost = async (commentId: string, userId: string) => {
    try {
      await axios.put("http://localhost:5000/api/comments", {
        commentId,
        userId,
      });
      setReRender(!reRender);
    } catch (err) {
      console.log(err);
    }
  };

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
        {owner._id === userId ? (
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
          likedBy.includes(userId as string) && "post__liked"
        }`}
        onClick={() => {
          userId === null
            ? useToastCreator(
                "You have to be logged in to like this post",
                "error"
              )
            : handleLikePost(commentId, userId);
        }}
      >
        <AiOutlineLike
          className={`comment__action-icon ${
            likedBy.includes(userId as string) && "post__liked"
          }`}
        />
        {likedBy.length}
      </button>
    </li>
  );
};

export default Comment;
