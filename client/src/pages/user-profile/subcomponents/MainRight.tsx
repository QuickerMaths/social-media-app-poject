// External dependencies

import { Navigate, useParams } from "react-router";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useSelector } from "react-redux";

// Internal dependencies

import TextArea from "../../../components/textArea/TextArea";
import Spinner from "../../../utilities/spinner/Spinner";
import PostWrapper from "../../../components/post/post-wrapper/PostWrapper";
import QueryError from "../../../utilities/error/QueryError";
import { useGetPostsByUserQuery } from "../../../features/apiSlice/postApiSlice/postApiSlice";
import { RootState } from "../../../redux/store";

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
  } = useGetPostsByUserQuery({ userId: +userId, page: postPage } ?? skipToken);

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
            <PostWrapper key={post.id} post={post} userId={+userId} />
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
