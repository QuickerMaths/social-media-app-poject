import postDb from "../../data-access/post/index.ts";
import commentDb from "../../data-access/comment/index.ts";

export default function makeSelectAllPosts({
  post,
  comment
}: {
  post: typeof postDb;
  comment: typeof commentDb;
}) {
  return async function selectAllPosts({
    page,
    pageSize,
    userId
  }: {
    page: number;
    pageSize: number;
    userId?: number;
  }) {
    const posts = await post.selectAllPosts({ page, pageSize, userId });

    const postsWithComments = [];

    // page and pageSize has hard coded values because there are only two comments displayed per post
    // rest of the comments is displayed when user clicks on selected post and navigates to post details page
    for (const post of posts) {
      const comments = await comment.getCommentsByPostId({
        postId: post.id,
        userId,
        page: 1,
        pageSize: 2
      });

      postsWithComments.push({ ...post, comments });
    }

    return postsWithComments;
  };
}
