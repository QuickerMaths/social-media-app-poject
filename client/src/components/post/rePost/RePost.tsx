import React from "react";
import { IRePost } from "../types";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../redux/store";
import PostOwner from "../sumcomponents/PostOwner";
import PostEdit from "../sumcomponents/PostEdit";
import moment from "moment";
import PostAction from "../sumcomponents/PostAction";
import PostComments from "../sumcomponents/PostComments";
import { openModal } from "../../../features/modalSlice/modalSlice";
import PostDetailsModal from "../../../portals/post-details-modal/PostDetailsModal";
import PostEditModal from "../../../portals/post-edit-modal/PostEditModal";

interface Props {
  rePost: IRePost;
  reRender: boolean;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
}

const RePost: React.FC<Props> = ({ rePost, reRender, setReRender }) => {
  const {
    owner,
    postBody,
    originalPost,
    commentTotal,
    comments,
    createdAt,
    _id: postId,
  } = rePost;
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const { modals } = useAppSelector((state: RootState) => state.modal);

  return (
    <li className="post">
      <div className="post__top-container">
        <PostOwner owner={owner} />
        {owner._id === userId ? (
          <>
            <PostEdit
              post={rePost}
              setReRender={setReRender}
              reRender={reRender}
            />
            {modals[`${postId}edit`] && (
              <PostEditModal
                post={rePost}
                setReRender={setReRender}
                reRender={reRender}
              />
            )}
          </>
        ) : (
          <p className="post__createdAt">{moment(createdAt).fromNow()}</p>
        )}
      </div>
      <p className="post__body">{postBody}</p>

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
    </li>
  );
};

export default RePost;
