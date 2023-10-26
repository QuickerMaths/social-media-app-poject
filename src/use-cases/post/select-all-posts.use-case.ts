import postDb from "../../data-access/post/index.ts";
import commentDb from "../../data-access/comment/index.ts";
import userDB from "../../data-access/user/index.ts";

export default function makeSelectAllPostsUseCase({
  post,
  comment,
  user
}: {
  post: typeof postDb;
  comment: typeof commentDb;
  user: typeof userDB;
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

    const postsWithOwnerAndComments = [];

    // page and pageSize has hard coded values because there are only two comments displayed per post
    // rest of the comments is displayed when user clicks on selected post and navigates to post details page
    for (const post of posts) {
      const postOwner = await user.selectUserAvatarAndUsernameById({
        // @ts-ignore
        userId: post.profile_id
      });
      const postWithOwner = { ...post, post_owner: postOwner };

      const comments = await comment.selectCommentsByPostId({
        postId: post.id,
        loggedInUserId,
        page: 1,
        pageSize: 2
      });

      const commentsWithOwner = [];

      for (const comment of comments) {
        const commentOwner = await user.selectUserAvatarAndUsernameById({
          // @ts-ignore
          userId: comment.profile_id
        });

        commentsWithOwner.push({ ...comment, comment_owner: commentOwner });
      }

      postsWithOwnerAndComments.push({
        ...postWithOwner,
        comments: commentsWithOwner
      });
    }

    return postsWithOwnerAndComments;
  };
}
