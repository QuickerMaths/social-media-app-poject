// External dependencies

import { EntityId } from "@reduxjs/toolkit";
import { useParams } from "react-router";

// Internal dependencies

import TextArea from "../../../components/textArea/TextArea";
import PostWrapper from "../../../components/post/post-wrapper/PostWrapper";
import { useGetPostsByUserQuery } from "../../../features/apiSlice/postApiSlice/postApiSlice";

const MainRight = () => {
  const { userId } = useParams();

  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    isSuccess,
  } = useGetPostsByUserQuery(userId as string);

  let content;

  if (isLoading || isFetching) {
    //TODO: switch for loading spinner
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>Error</div>;
  } else if (isSuccess) {
    content = (
      <ul className="user-profile__posts-list">
        {posts?.ids.length > 0 ? (
          posts?.ids.map((postId: EntityId) => (
            <PostWrapper key={postId} postId={postId} userId={userId} />
          ))
        ) : (
          <p className="user-profile__no-posts-msg">No posts yet...</p>
        )}
      </ul>
    );
  }

  //TODO: forceRefetch from Rtk query to create infinite scroll

  return (
    <div className="user-profile__main-right">
      <TextArea />
      {content}
    </div>
  );
};

export default MainRight;
