// Internal dependencies

import TextArea from "../../components/textArea/TextArea";
import Spinner from "../../utilities/spinner/Spinner";
import PostWrapper from "../../components/post/post-wrapper/PostWrapper";
import QueryError from "../../utilities/error/QueryError";
import { useGetPostsQuery } from "../../features/apiSlice/postApiSlice/postApiSlice";
import { useState } from "react";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
    refetch,
  } = useGetPostsQuery({ page });

  let content;

  if (isLoading || isFetching) {
    content = <Spinner size={155} />;
  } else if (isError) {
    content = <QueryError error={error as string} refetch={refetch} />;
  } else if (isSuccess) {
    content = (
      <>
        <ul className="home-page__posts-list">
          {posts.map((post) => (
            <PostWrapper key={post.id} post={post} userId={undefined} />
          ))}
        </ul>
        <button onClick={() => setPage(page + 1)}>Load more...</button>
      </>
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
