import React from "react";
import moment from "moment";
import defaultImg from "../../assets/images/default_img.png";
import { Link } from "react-router-dom";
import { IComment } from "./types";
import axios from "axios";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { AiOutlineDelete } from "react-icons/ai";

interface Props {
  comment: IComment;
  reRender: boolean;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
}
const Comment: React.FC<Props> = ({
  comment: { owner, createdAt, commentBody, _id: commentId, postId },
  reRender,
  setReRender,
}) => {
  const { userId } = useAppSelector((state: RootState) => state.auth);
  //TODO: refactor to rtqQuery
  const handleDeleteComment = async (userId: string, postId: string) => {
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
              className="post__edit-button"
              onClick={() => handleDeleteComment(userId, postId)}
            >
              <AiOutlineDelete className="post__edit-icon" />
            </button>
            <p className="comment__createdAt">{moment(createdAt).fromNow()}</p>
          </div>
        ) : (
          <p className="comment__createdAt">{moment(createdAt).fromNow()}</p>
        )}
      </div>
      <p className="comment__body">{commentBody}</p>
    </li>
  );
};

export default Comment;
