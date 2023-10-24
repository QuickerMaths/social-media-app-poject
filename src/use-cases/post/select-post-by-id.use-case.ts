import commentDb from "../../data-access/comment/index.ts";
import postDb from "../../data-access/post/index.ts";

export default function makeSelectPostByIdUseCase({
  post,
  comment
}: {
  post: typeof postDb;
  comment: typeof commentDb;
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
    const selectedPost = await post.selectPostById({ postId, loggedInUserId });

    const comments = await comment.getCommentsByPostId({
      postId: selectedPost.id,
      loggedInUserId,
      page,
      pageSize
    });

    return {
      ...selectedPost,
      comments
    };
  };
}
