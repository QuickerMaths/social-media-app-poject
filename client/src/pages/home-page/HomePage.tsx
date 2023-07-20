// External dependencies

import { EntityId } from "@reduxjs/toolkit";

// Internal dependencies

import TextArea from "../../components/textArea/TextArea";
import PostWrapper from "../../components/post/post-wrapper/PostWrapper";
import { useGetPostsQuery } from "../../features/apiSlice/postApiSlice/postApiSlice";

const HomePage = () => {
  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    isSuccess,
  } = useGetPostsQuery("");

  let content;

  if (isLoading || isFetching) {
    //TODO: switch for loading spinner
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>Error</div>;
  } else if (isSuccess) {
    content = (
      //TODO: get rid or the setReRender and reRender state
      <ul className="home-page__posts-list">
        {posts?.ids.map((postId: EntityId) => (
          <PostWrapper key={postId} postId={postId} />
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
