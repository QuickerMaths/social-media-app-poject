// External dependencies

import { useState } from "react";

// Internal dependencies

import Post from "../../components/post/post-wrapper/original-post/Post";
import TextArea from "../../components/textArea/TextArea";
import RePost from "../../components/post/post-wrapper/rePost/RePost";
import { useGetPostsQuery } from "../../features/apiSlice/postApiSlice/postApiSlice";
import { EntityId } from "@reduxjs/toolkit";
import PostWrapper from "../../components/post/post-wrapper/PostWrapper";

const HomePage = () => {
  const [reRender, setReRender] = useState<boolean>(false); //TODO: remove reRender state and use query refetch instead

  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    isSuccess,
  } = useGetPostsQuery("");
  console.log(posts);

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
