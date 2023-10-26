import commentDb from "../../data-access/comment/index.ts";
import postDb from "../../data-access/post/index.ts";
import userDB from "../../data-access/user/index.ts";

export default function makeSelectPostByIdUseCase({
  post,
  comment,
  user
}: {
  post: typeof postDb;
  comment: typeof commentDb;
  user: typeof userDB;
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

    const postOwner = await user.selectUserAvatarAndUsernameById({
      // @ts-ignore
      userId: selectedPost.profile_id
    });

    const postWithOwner = { ...selectedPost, postOwner };

    const comments = await comment.selectCommentsByPostId({
      postId: selectedPost.id,
      loggedInUserId,
      page,
      pageSize
    });

    const commentsWithOwner = [];

    for (const comment of comments) {
      const commentOwner = await user.selectUserAvatarAndUsernameById({
        // @ts-ignore
        userId: comment.profile_id
      });

      commentsWithOwner.push({ ...comment, commentOwner });
    }

    return {
      ...postWithOwner,
      comments: commentsWithOwner
    };
  };
}
