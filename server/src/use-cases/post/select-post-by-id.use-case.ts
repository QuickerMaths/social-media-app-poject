import commentDb from "../../data-access/comment/index.ts";
import postDb from "../../data-access/post/index.ts";

export default function makeSelectPostByIdUseCase({
  postDataBase,
  commentDataBase,
  paginationMetadata
}: {
  postDataBase: typeof postDb;
  commentDataBase: typeof commentDb;
  paginationMetadata: Function;
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
    const total = await commentDataBase.countAllComments({ postId });
    const meta = paginationMetadata({ total, currentPage: page, pageSize });

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
      post: {
        ...post,
        comments
      },
      meta
    };
  };
}
