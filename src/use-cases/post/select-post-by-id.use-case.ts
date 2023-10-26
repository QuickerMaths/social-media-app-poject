import commentDb from "../../data-access/comment/index.ts";
import postDb from "../../data-access/post/index.ts";

export default function makeSelectPostByIdUseCase({
  postDataBase,
  commentDataBase
}: {
  postDataBase: typeof postDb;
  commentDataBase: typeof commentDb;
}) {
  return async function selectPostByIdUseCase({
    postId,
    loggedInUserId,
    page,
    pageSize
  }: {
    postId: number;
    loggedInUserId?: number;
    page: number;
    pageSize: number;
  }) {
    const post = await postDataBase.selectPostById({
      postId,
      loggedInUserId
    });

    const comments = await commentDataBase.selectCommentsByPostId({
      postId: post.id,
      loggedInUserId,
      page,
      pageSize
    });

    return {
      ...post,
      comments
    };
  };
}
