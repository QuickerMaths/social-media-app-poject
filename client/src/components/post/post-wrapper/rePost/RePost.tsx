// External dependencies

import React from "react";
import moment from "moment";

// Internal dependencies

import PostOwner from "../../sumcomponents/PostOwner";
import PostAction from "../../sumcomponents/PostAction";
import PostComments from "../../sumcomponents/PostComments";
import PostDetailsModal from "../../../../portals/post-details-modal/PostDetailsModal";
import { IRePost } from "../../types";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { RootState } from "../../../../redux/store";
import { openModal } from "../../../../features/modalSlice/modalSlice";

interface Props {
  rePost: IRePost;
  reRender: boolean;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
}

const RePost: React.FC<Props> = ({ rePost, reRender, setReRender }) => {
  const { comments, commentTotal, originalPost, _id: postId } = rePost;

  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state: RootState) => state.modal);

  return (
    <>
      {originalPost === null ? (
        <div className="re-post">
          <h2 className="re-post__deleted-message">Post has been deleted</h2>
        </div>
      ) : (
        <div className="re-post">
          {originalPost.postImage && (
            <img
              src={originalPost.postImage}
              alt="post image"
              className="post__image"
            />
          )}
          <div className="post__top-container">
            <PostOwner owner={originalPost.owner} />
            <p className="post__createdAt">
              {moment(originalPost.createdAt).fromNow()}
            </p>
          </div>
          <p className="post__body">{originalPost.postBody}</p>
        </div>
      )}

      <PostAction post={rePost} setReRender={setReRender} reRender={reRender} />
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
              onClick={() => dispatch(openModal(`${postId}details`))}
            >
              See more
            </button>
          )}
        </>
      )}
      {modals[`${postId}details`] && (
        <PostDetailsModal
          post={rePost}
          reRender={reRender}
          setReRender={setReRender}
        />
      )}
    </>
  );
};

export default RePost;
