// External dependencies

import { EntityId } from "@reduxjs/toolkit";
import { useParams } from "react-router";
import { skipToken } from "@reduxjs/toolkit/dist/query";

// Internal dependencies

import TextArea from "../../../components/textArea/TextArea";
import PostWrapper from "../../../components/post/post-wrapper/PostWrapper";
import QueryError from "../../../utilities/error/QueryError";
import { useGetPostsByUserQuery } from "../../../features/apiSlice/postApiSlice/postApiSlice";

const MainRight = () => {
  const { userId } = useParams();

  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
    refetch,
  } = useGetPostsByUserQuery(userId ?? skipToken);

  let content;

  if (isLoading || isFetching) {
    //TODO: switch for loading spinner
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <QueryError error={error as string} refetch={refetch} />;
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
