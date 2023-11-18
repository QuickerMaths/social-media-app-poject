//External dependencies

import { useAppSelector } from "../../hooks/reduxHooks";

// Internal dependencies

import TextArea from "../../components/textArea/TextArea";
import Spinner from "../../utilities/spinner/Spinner";
import PostWrapper from "../../components/post/post-wrapper/PostWrapper";
import QueryError from "../../utilities/error/QueryError";
import useLastRef from "../../hooks/useLastRef";
import {
  postAdapter,
  useGetPostsQuery,
} from "../../features/apiSlice/postApiSlice/postApiSlice";
import { RootState } from "../../redux/store";
import { setPostPage } from "../../features/paginationSlice/paginationSlice";

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
  } = useGetPostsQuery(
    { page: postPage },
    {
      selectFromResult: ({
        data,
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
      }) => ({
        data: postAdapter
          .getSelectors()
          .selectAll(data ?? postAdapter.getInitialState()),
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
      }),
    }
  );

  const lastPostRef = useLastRef({
    isLoading,
    isFetching,
    page: postPage,
    actionToDispatch: setPostPage,
  });

  let content;

  if (isLoading || isFetching) {
    content = <Spinner size={155} />;
  } else if (isError) {
    content = <QueryError error={error as string} refetch={refetch} />;
  } else if (isSuccess) {
    content = (
      <>
        {posts.length > 0 ? (
          <ul className="home-page__posts-list">
            {posts.map((post, index) => {
              if (posts.length === index + 1) {
                return (
                  <PostWrapper ref={lastPostRef} key={post.id} post={post} />
                );
              }
              return <PostWrapper key={post.id} post={post} />;
            })}
          </ul>
        ) : (
          <p className="home-page__no-posts-msg">No posts yet...</p>
        )}
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
