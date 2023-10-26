import commentDb from "../../data-access/comment/index.ts";
import postDb from "../../data-access/post/index.ts";
import userDB from "../../data-access/user/index.ts";

export default function makeSelectPostByIdUseCase({
  postDataBase,
  commentDataBase,
  userDataBase
}: {
  postDataBase: typeof postDb;
  commentDataBase: typeof commentDb;
  userDataBase: typeof userDB;
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
    const selectedPost = await postDataBase.selectPostById({
      postId,
      loggedInUserId
    });

    const postOwner = await userDataBase.selectUserAvatarAndUsernameById({
      // @ts-ignore
      userId: selectedPost.profile_id
    });

    const postWithOwner = { ...selectedPost, post_owner: postOwner };

    const comments = await commentDataBase.selectCommentsByPostId({
      postId: selectedPost.id,
      loggedInUserId,
      page,
      pageSize
    });

    const commentsWithOwner = [];

    for (const comment of comments) {
      const commentOwner = await userDataBase.selectUserAvatarAndUsernameById({
        // @ts-ignore
        userId: comment.profile_id
      });

      commentsWithOwner.push({ ...comment, comment_owner: commentOwner });
    }

    return {
      ...postWithOwner,
      comments: commentsWithOwner
    };
  };
}
