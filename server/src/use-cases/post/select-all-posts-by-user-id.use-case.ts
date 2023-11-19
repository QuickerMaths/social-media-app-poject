import commentDb from "../../data-access/comment/index.ts";
import postDb from "../../data-access/post/index.ts";

export default function makeSelectAllPostsByUserIdUseCase({
  postDataBase,
  commentDataBase,
  paginationMetadata
}: {
  postDataBase: typeof postDb;
  commentDataBase: typeof commentDb;
  paginationMetadata: Function;
}) {
  return async function selectAllPostsByUserIdUseCase({
    userId,
    loggedInUserId,
    page,
    pageSize
  }: {
    userId: number;
    loggedInUserId?: number;
    page: number;
    pageSize: number;
  }) {
    const postCount = await postDataBase.countPostsByUserId({ userId });
    const meta = paginationMetadata({
      currentPage: page,
      pageSize,
      total: postCount
    });

    const posts = await postDataBase.selectPostsByUserId({
      userId,
      loggedInUserId,
      page,
      pageSize
    });

    const postsWithComments = [];

    // page and pageSize has hard coded values because there are only two comments displayed per post
    // rest of the comments is displayed when user clicks on selected post and navigates to post details page
    for (const post of posts) {
      const comments = await commentDataBase.selectCommentsByPostId({
        postId: post.id,
        loggedInUserId,
        page: 1,
        pageSize: 2
      });

      postsWithComments.push({
        ...post,
        comments
      });
    }

    return { posts: postsWithComments, meta };
  };
}
