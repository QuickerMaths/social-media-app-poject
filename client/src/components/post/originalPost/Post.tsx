import React, { useState } from "react";
import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { IPost } from "../types";
import { IComment } from "../../comment/types";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../redux/store";
import axios from "axios";
import useToastCreator from "../../../hooks/useToastCreator";
import PostDetailsModal from "../../../portals/post-details-modal/PostDetailsModal";
import Comment from "../../comment/Comment";
import PostHeading from "../sumcomponents/PostHeading";

interface Props {
  post: IPost;
  reRender: boolean;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
}

const Post: React.FC<Props> = ({ post, setReRender, reRender }) => {
  const {
    owner,
    createdAt,
    postBody,
    likedBy,
    _id: postId,
    postImage,
    comments,
    commentTotal,
  } = post;
  const { userId } = useAppSelector((state: RootState) => state.auth);

  const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false);

  const handleLikePost = async (postId: string, userId: string) => {
    try {
      await axios.put("http://localhost:5000/api/posts", {
        postId,
        userId,
      });
      //TODO: rtkQuery optimistic updates !
      setReRender(!reRender);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li className="post">
      <PostHeading
        owner={owner}
        createdAt={createdAt}
        postId={postId}
        postImage={postImage}
        postBody={postBody}
        setReRender={setReRender}
        reRender={reRender}
      />
      <p className="post__body">{postBody}</p>
      {postImage && (
        <img src={postImage} alt="post image" className="post__image" />
      )}
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
          onClick={() => setIsOpenDetails(true)}
        >
          <AiOutlineComment className="post__action-icon" /> {commentTotal}
        </button>
        <button className="post__action-button">
          <BiRepost className="post__action-icon" /> 0
        </button>
      </div>
      {commentTotal > 0 && (
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
              onClick={() => setIsOpenDetails(true)}
            >
              See more
            </button>
          )}
        </>
      )}

      {isOpenDetails && (
        <PostDetailsModal
          postId={postId}
          isOpen={isOpenDetails}
          setIsOpen={setIsOpenDetails}
          reRender={reRender}
          setReRender={setReRender}
        />
      )}
    </li>
    //TODO: make sure that caching data works here in postdetailsmodal
  );
};

export default Post;
