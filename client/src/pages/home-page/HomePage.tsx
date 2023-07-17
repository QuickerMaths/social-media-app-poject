// External dependencies

import { useState } from "react";
import { EntityId } from "@reduxjs/toolkit";

// Internal dependencies

import TextArea from "../../components/textArea/TextArea";
import PostWrapper from "../../components/post/post-wrapper/PostWrapper";
import { useGetPostsQuery } from "../../features/apiSlice/postApiSlice/postApiSlice";

const HomePage = () => {
  const [reRender, setReRender] = useState<boolean>(false); //TODO: remove reRender state and use query refetch instead

  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    isSuccess,
  } = useGetPostsQuery("");

  let content;

  if (isLoading || isFetching) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>Error</div>;
  } else if (isSuccess) {
    content = (
      //TODO: get rid or the setReRender and reRender state
      <ul className="home-page__posts-list">
        {posts?.ids.map((postId: EntityId) => (
          <PostWrapper
            key={postId}
            postId={postId}
            setReRender={setReRender}
            reRender={reRender}
          />
        ))}
      </ul>
    );
  }

  //TODO: forceRefetch from Rtk query to create infinite scroll

  return (
    <section className="home-page">
      <TextArea setReRender={setReRender} reRender={reRender} />
      {content}
    </section>
  );
};

export default HomePage;
