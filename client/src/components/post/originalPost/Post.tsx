import React from "react";
import { IPost } from "../types";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../redux/store";
import PostDetailsModal from "../../../portals/post-details-modal/PostDetailsModal";
import PostHeading from "../sumcomponents/PostHeading";
import PostAction from "../sumcomponents/PostAction";
import PostComments from "../sumcomponents/PostComments";
import { openModal } from "../../../features/modalSlice/modalSlice";

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

  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state: RootState) => state.modal);

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
          <PostComments
            comments={comments}
            reRender={reRender}
            setReRender={setReRender}
          />
          {commentTotal > 2 && (
            <button
              className="post__see-more"
              onClick={() => dispatch(openModal("detailsPostModal"))}
            >
              See more
            </button>
          )}
        </>
      )}

      {modals.detailsPostModal && (
        <PostDetailsModal
          postId={postId}
          reRender={reRender}
          setReRender={setReRender}
        />
      )}
    </li>
    //TODO: make sure that caching data works here in postdetailsmodal
  );
};

export default Post;
