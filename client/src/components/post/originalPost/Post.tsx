import React, { useState } from "react";
import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { IPost } from "../types";
import { IComment } from "../../comment/types";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../redux/store";
import useToastCreator from "../../../hooks/useToastCreator";
import PostDetailsModal from "../../../portals/post-details-modal/PostDetailsModal";
import Comment from "../../comment/Comment";
import PostHeading from "../sumcomponents/PostHeading";
import PostAction from "../sumcomponents/PostAction";

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
      <PostAction
        likedBy={likedBy}
        commentTotal={commentTotal}
        postId={postId}
        setReRender={setReRender}
        reRender={reRender}
      />
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
