import postDb from "../../data-access/post/index.ts";
import commentDb from "../../data-access/comment/index.ts";

export default function makeSelectAllPostsUseCase({
  post,
  comment
}: {
  post: typeof postDb;
  comment: typeof commentDb;
}) {
  return async function selectAllPostsUseCase({
    page,
    pageSize,
    loggedInUserId
  }: {
    page: number;
    pageSize: number;
    loggedInUserId?: number;
  }) {
    const posts = await post.selectAllPosts({ page, pageSize, loggedInUserId });

    const postsWithComments = [];

    // page and pageSize has hard coded values because there are only two comments displayed per post
    // rest of the comments is displayed when user clicks on selected post and navigates to post details page
    for (const post of posts) {
      const comments = await comment.getCommentsByPostId({
        postId: post.id,
        loggedInUserId,
        page: 1,
        pageSize: 2
      });

      postsWithComments.push({ ...post, comments });
    }

    return postsWithComments;
  };
}
