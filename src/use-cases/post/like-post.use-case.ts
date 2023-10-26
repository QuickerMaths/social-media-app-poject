import postDb from "../../data-access/post/index.ts";

export default function makeLikePostUseCase({ post }: { post: typeof postDb }) {
  return async function likePostUseCase({
    userId,
    postId
  }: {
    userId: number;
    postId: number;
  }) {
    const likedPost = await post.likePost({ userId, postId });

    return likedPost;
  };
}
