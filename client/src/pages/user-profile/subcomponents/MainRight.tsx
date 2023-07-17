// External dependencies

import React, { useState } from "react";
import { EntityId } from "@reduxjs/toolkit";

// Internal dependencies

import TextArea from "../../../components/textArea/TextArea";
import PostWrapper from "../../../components/post/post-wrapper/PostWrapper";
import { useGetPostsByUserQuery } from "../../../features/apiSlice/postApiSlice/postApiSlice";
interface Props {
  userId: string | undefined;
}

const MainRight: React.FC<Props> = ({ userId }) => {
  const [reRender, setReRender] = useState<boolean>(false);

  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    isSuccess,
  } = useGetPostsByUserQuery(userId as string);

  let content;

  if (isLoading || isFetching) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>Error</div>;
  } else if (isSuccess) {
    content = (
      <ul className="user-profile__posts-list">
        {posts?.ids.length > 0 ? (
          posts?.ids.map((postId: EntityId) => (
            <PostWrapper
              key={postId}
              postId={postId}
              setReRender={setReRender}
              reRender={reRender}
            />
          ))
        ) : (
          <p className="user-profile__no-posts-msg">No posts yet...</p>
        )}
      </ul>
    );
  }

  return (
    <div className="user-profile__main-right">
      <TextArea reRender={reRender} setReRender={setReRender} />

      {content}
    </div>
  );
};

export default MainRight;
