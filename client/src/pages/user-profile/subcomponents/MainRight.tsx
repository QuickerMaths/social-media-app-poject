// External dependencies

import { Navigate, useParams } from "react-router";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useSelector } from "react-redux";

// Internal dependencies

import TextArea from "../../../components/textArea/TextArea";
import PostWrapper from "../../../components/post/post-wrapper/PostWrapper";
import QueryError from "../../../utilities/error/QueryError";
import useLastRef from "../../../hooks/useLastRef";
import {
  postAdapter,
  useGetPostsByUserQuery,
} from "../../../features/apiSlice/postApiSlice/postApiSlice";
import { RootState } from "../../../redux/store";
import { setUserPostPage } from "../../../features/paginationSlice/paginationSlice";

const MainRight = () => {
  const { userPostPage } = useSelector((state: RootState) => state.pagination);
  const { userId } = useParams();

  if (!userId) return <Navigate to="/" />;
  const currentPage = userPostPage[+userId] || 1;

  const { data, isLoading, isFetching, isError, isSuccess, error, refetch } =
    useGetPostsByUserQuery(
      { userId: +userId, page: currentPage } ?? skipToken,
      {
        selectFromResult: ({
          data,
          isLoading,
          isFetching,
          isSuccess,
          isError,
          error,
        }) => ({
          data: {
            posts: postAdapter
              .getSelectors()
              .selectAll(data ?? postAdapter.getInitialState()),
            meta: data?.meta,
          },
          isLoading,
          isFetching,
          isSuccess,
          isError,
          error,
        }),
        refetchOnMountOrArgChange: true,
      }
    );

  const lastPostRef = useLastRef({
    isLoading,
    isFetching,
    page: currentPage,
    id: +userId,
    actionToDispatch: setUserPostPage,
    hasNextPage: data.meta?.hasNextPage as boolean,
  });

  let content;

  if (isError) {
    content = <QueryError error={error as string} refetch={refetch} />;
  } else if (isSuccess) {
    content = (
      <>
        {data.posts.length > 0 ? (
          <>
            <ul className="user-profile__posts-list">
              {data.posts.map((post, index) => {
                if (data.posts.length === index + 1) {
                  return (
                    <PostWrapper ref={lastPostRef} key={post.id} post={post} />
                  );
                }
                return <PostWrapper key={post.id} post={post} />;
              })}
            </ul>
            {isLoading || (isFetching && <p>Loading...</p>)}
          </>
        ) : (
          <p className="user-profile__no-posts-msg">No posts yet...</p>
        )}
      </>
    );
  }

  return (
    <div className="user-profile__main-right">
      <TextArea />
      {content}
    </div>
  );
};

export default MainRight;
