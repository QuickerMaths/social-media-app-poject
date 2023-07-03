import axios from "axios";
import moment from "moment";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { openModal } from "../../../features/modalSlice/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../redux/store";
import { IPost, IRePost } from "../types";

interface Props {
  post: IPost | IRePost;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
  reRender: boolean;
}

const PostEdit: React.FC<Props> = ({ post, setReRender, reRender }) => {
  const { createdAt, _id: postId, isRePost } = post;
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state: RootState) => state.auth);

  const handlePostDelete = async (userId: string, postId: string) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/${isRePost ? "repost" : "posts"}`,
        {
          data: {
            userId,
            postId,
          },
        }
      );

      setReRender(!reRender);
    } catch (err) {
      console.log(err);
    }
  };
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
          onClick={() => handlePostDelete(userId as string, postId)}
        >
          <AiOutlineDelete className="post__edit-icon" />
        </button>
        <p className="post__createdAt">{moment(createdAt).fromNow()}</p>
      </div>
    </>
  );
};

export default PostEdit;
