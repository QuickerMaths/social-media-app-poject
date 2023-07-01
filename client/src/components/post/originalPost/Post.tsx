import React from "react";
import { IPost } from "../types";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../redux/store";
import PostDetailsModal from "../../../portals/post-details-modal/PostDetailsModal";
import PostAction from "../sumcomponents/PostAction";
import PostComments from "../sumcomponents/PostComments";
import { openModal } from "../../../features/modalSlice/modalSlice";
import PostOwner from "../sumcomponents/PostOwner";
import PostEdit from "../sumcomponents/PostEdit";
import moment from "moment";
import PostEditModal from "../../../portals/post-edit-modal/PostEditModal";

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
    postImage,
    comments,
    commentTotal,
    _id: postId,
  } = post;

  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state: RootState) => state.modal);
  const { userId } = useAppSelector((state: RootState) => state.auth);

  return (
    <li className="post">
      <div className="post__top-container">
        <PostOwner owner={owner} />
        {owner._id === userId ? (
          <>
            <PostEdit
              post={post}
              setReRender={setReRender}
              reRender={reRender}
            />
            {modals[`${postId}edit`] && (
              <PostEditModal
                post={post}
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
      {postImage && (
        <img src={postImage} alt="post image" className="post__image" />
      )}
      <PostAction post={post} setReRender={setReRender} reRender={reRender} />
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
          post={post}
          reRender={reRender}
          setReRender={setReRender}
        />
      )}
    </li>
    //TODO: make sure that caching data works here in postdetailsmodal
  );
};

export default Post;
