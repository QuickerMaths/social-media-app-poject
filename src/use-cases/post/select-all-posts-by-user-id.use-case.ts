import commentDb from "../../data-access/comment/index.ts";
import postDb from "../../data-access/post/index.ts";

export default function makeSelectAllPostsByUserId({
  post,
  comment
}: {
  post: typeof postDb;
  comment: typeof commentDb;
}) {
  return async function selectAllPostsByUserId({
    userId,
    page,
    pageSize
  }: {
    userId: number;
    page: number;
    pageSize: number;
  }) {
    const posts = await post.selectPostsByUserId({ userId, page, pageSize });

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
