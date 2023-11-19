import postDb from "../../data-access/post/index.ts";
import commentDb from "../../data-access/comment/index.ts";

export default function makeSelectAllPostsUseCase({
  postDataBase,
  commentDataBase,
  paginationMetadata
}: {
  postDataBase: typeof postDb;
  commentDataBase: typeof commentDb;
  paginationMetadata: Function;
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
    //TODO: cache this
    const total = await postDataBase.countPosts();
    const meta = paginationMetadata({
      currentPage: page,
      pageSize,
      total
    });

    const posts = await postDataBase.selectAllPosts({
      page,
      pageSize,
      loggedInUserId
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
