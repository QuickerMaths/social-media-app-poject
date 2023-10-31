// External dependencies

import { EntityId } from "@reduxjs/toolkit";
import { useParams } from "react-router";
import { skipToken } from "@reduxjs/toolkit/dist/query";

// Internal dependencies

import TextArea from "../../../components/textArea/TextArea";
import Spinner from "../../../utilities/spinner/Spinner";
import PostWrapper from "../../../components/post/post-wrapper/PostWrapper";
import QueryError from "../../../utilities/error/QueryError";
import { useGetPostsByUserQuery } from "../../../features/apiSlice/postApiSlice/postApiSlice";

const MainRight = () => {
  const { userId } = useParams();
  const numberUserId = +(userId ?? "");
  const page = 1;

  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
    refetch,
  } = useGetPostsByUserQuery({ userId: numberUserId, page } ?? skipToken);

  let content;

  if (isLoading || isFetching) {
    content = <Spinner size={155} />;
  } else if (isError) {
    content = <QueryError error={error as string} refetch={refetch} />;
  } else if (isSuccess) {
    content = (
      <ul className="user-profile__posts-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostWrapper key={post.id} post={post} userId={numberUserId} />
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
