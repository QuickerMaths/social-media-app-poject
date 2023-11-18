// External dependencies

import { Navigate, useParams } from "react-router";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useDispatch, useSelector } from "react-redux";

// Internal dependencies

import TextArea from "../../../components/textArea/TextArea";
import Spinner from "../../../utilities/spinner/Spinner";
import PostWrapper from "../../../components/post/post-wrapper/PostWrapper";
import QueryError from "../../../utilities/error/QueryError";
import {
  postAdapter,
  useGetPostsByUserQuery,
} from "../../../features/apiSlice/postApiSlice/postApiSlice";
import { RootState } from "../../../redux/store";
import { setPostPage } from "../../../features/paginationSlice/paginationSlice";
import useLastRef from "../../../hooks/useLastRef";

const MainRight = () => {
  const { postPage } = useSelector((state: RootState) => state.pagination);
  const { userId } = useParams();
  if (!userId) return <Navigate to="/" />;

  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
    refetch,
  } = useGetPostsByUserQuery({ userId: +userId, page: postPage } ?? skipToken, {
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
  });

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
          <ul className="user-profile__posts-list">
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
          <p className="user-profile__no-posts-msg">No posts yet...</p>
        )}
      </>
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
