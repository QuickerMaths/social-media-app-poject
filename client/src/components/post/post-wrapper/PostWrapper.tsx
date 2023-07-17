import { EntityId } from "@reduxjs/toolkit";
import moment from "moment";
import React from "react";
import { useGetPostsQuery } from "../../../features/apiSlice/postApiSlice/postApiSlice";
import { useAppSelector } from "../../../hooks/reduxHooks";
import PostEditModal from "../../../portals/post-edit-modal/PostEditModal";
import { RootState } from "../../../redux/store";
import PostEdit from "../sumcomponents/PostEdit";
import PostOwner from "../sumcomponents/PostOwner";
import { IPost, IRePost } from "../types";
import Post from "./original-post/Post";
import RePost from "./rePost/RePost";

interface Props {
  postId: EntityId;
  reRender: boolean;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostWrapper: React.FC<Props> = ({ postId, setReRender, reRender }) => {
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const { modals } = useAppSelector((state: RootState) => state.modal);
  const { post } = useGetPostsQuery("", {
    selectFromResult: ({ data }) => ({
      post: data?.entities[postId] as IRePost | IPost,
    }),
  });

  const { owner, createdAt, postBody, isRePost } = post;

  return (
    <li className="post">
      <div className="post__top-container">
        <PostOwner owner={owner} />
        {owner._id === userId ? (
          <>
            <PostEdit
              post={isRePost ? (post as IRePost) : (post as IPost)}
              setReRender={setReRender}
              reRender={reRender}
            />
            {modals[`${postId}edit`] && (
              <PostEditModal
                post={isRePost ? (post as IRePost) : (post as IPost)}
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
      {isRePost ? (
        <RePost
          rePost={post as IRePost}
          reRender={reRender}
          setReRender={setReRender}
        />
      ) : (
        <Post
          post={post as IPost}
          reRender={reRender}
          setReRender={setReRender}
        />
      )}
    </li>
  );
};

export default PostWrapper;