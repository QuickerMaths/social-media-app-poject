import axios from "axios";
import React from "react";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { openModal } from "../../../features/modalSlice/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import useToastCreator from "../../../hooks/useToastCreator";
import { RootState } from "../../../redux/store";
import { IPost, IRePost } from "../types";

interface Props {
  post: IPost | IRePost;
  reRender: boolean;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostAction: React.FC<Props> = ({ post, setReRender, reRender }) => {
  const { likedBy, _id: postId, commentTotal, isRePost } = post;
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state: RootState) => state.auth);

  const handleLikePost = async (postId: string, userId: string) => {
    try {
      await axios.put(
        `http://localhost:5000/api/${isRePost ? "repost" : "posts"}`,
        {
          postId,
          userId,
        }
      );
      //TODO: rtkQuery optimistic updates !
      setReRender(!reRender);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="post__bottom-container">
      <button
        className={`post__action-button ${
          likedBy.includes(userId as string) && "post__liked"
        }`}
        onClick={() => {
          userId === null
            ? useToastCreator(
                "You have to be logged in to like this post",
                "error"
              )
            : handleLikePost(postId, userId);
        }}
      >
        <AiOutlineLike
          className={`post__action-icon ${
            likedBy.includes(userId as string) && "post__liked"
          }`}
        />
        {likedBy.length}
      </button>
      <button
        className="post__action-button"
        onClick={() => dispatch(openModal(`${postId}details`))}
      >
        <AiOutlineComment className="post__action-icon" /> {commentTotal}
      </button>
      {!isRePost && (
        <button
          className="post__action-button"
          onClick={() => {
            userId === null
              ? useToastCreator("You have to be logged in to repost", "error")
              : dispatch(openModal(`${postId}repost`));
          }}
        >
          <BiRepost className="post__action-icon" />
          {(post as IPost).rePostsCount}
        </button>
      )}
    </div>
  );
};

export default PostAction;
