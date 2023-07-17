import React from "react";
import { IPost } from "../../types";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { RootState } from "../../../../redux/store";
import PostDetailsModal from "../../../../portals/post-details-modal/PostDetailsModal";
import PostAction from "../../sumcomponents/PostAction";
import PostComments from "../../sumcomponents/PostComments";
import { openModal } from "../../../../features/modalSlice/modalSlice";
import PostOwner from "../../sumcomponents/PostOwner";
import PostEdit from "../../sumcomponents/PostEdit";
import moment from "moment";
import PostEditModal from "../../../../portals/post-edit-modal/PostEditModal";
import CreateRePostModal from "../../../../portals/create-repost-modal/CreateRePostModal";

interface Props {
  post: IPost;
  reRender: boolean;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
}

const Post: React.FC<Props> = ({ post, setReRender, reRender }) => {
  const { postImage, comments, commentTotal, _id: postId } = post;

  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state: RootState) => state.modal);

  return (
    <>
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

      {modals[`${postId}repost`] && (
        <CreateRePostModal
          post={post as IPost}
          reRender={reRender}
          setReRender={setReRender}
        />
      )}
      {modals[`${postId}details`] && (
        <PostDetailsModal
          post={post}
          reRender={reRender}
          setReRender={setReRender}
        />
      )}
    </>

    //TODO: make sure that caching data works here in postdetailsmodal
  );
};

export default Post;
