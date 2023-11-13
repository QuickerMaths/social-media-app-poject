//External dependencies

import { useAppSelector } from "../../hooks/reduxHooks";

// Internal dependencies

import TextArea from "../../components/textArea/TextArea";
import Spinner from "../../utilities/spinner/Spinner";
import PostWrapper from "../../components/post/post-wrapper/PostWrapper";
import QueryError from "../../utilities/error/QueryError";
import { useGetPostsQuery } from "../../features/apiSlice/postApiSlice/postApiSlice";
import { RootState } from "../../redux/store";

const HomePage = () => {
  const { postPage } = useAppSelector((state: RootState) => state.pagination);

  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
    refetch,
  } = useGetPostsQuery({ page: postPage });

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
