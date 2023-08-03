// External dependencies

import { EntityId } from "@reduxjs/toolkit";

// Internal dependencies

import TextArea from "../../components/textArea/TextArea";
import Spinner from "../../utilities/spinner/Spinner";
import PostWrapper from "../../components/post/post-wrapper/PostWrapper";
import QueryError from "../../utilities/error/QueryError";
import { useGetPostsQuery } from "../../features/apiSlice/postApiSlice/postApiSlice";

const HomePage = () => {
  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
    refetch,
  } = useGetPostsQuery("");

  let content;

  if (isLoading || isFetching) {
    content = <Spinner size={155} />;
  } else if (isError) {
    content = <QueryError error={error as string} refetch={refetch} />;
  } else if (isSuccess) {
    content = (
      <ul className="home-page__posts-list">
        {posts?.ids.map((postId: EntityId) => (
          <PostWrapper key={postId} postId={postId} userId={undefined} />
        ))}
      </ul>
    );
  }

  //TODO: forceRefetch from Rtk query to create infinite scroll

  return (
    <section className="home-page">
      <TextArea />
      {content}
    </section>
  );
};

export default HomePage;
