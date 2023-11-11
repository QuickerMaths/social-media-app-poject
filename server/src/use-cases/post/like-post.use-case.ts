import postDb from "../../data-access/post/index.ts";

export default function makeLikePostUseCase({
  postDataBase
}: {
  postDataBase: typeof postDb;
}) {
  return async function likePostUseCase({
    userId,
    postId
  }: {
    userId: number;
    postId: number;
  }) {
    const likedPost = await postDataBase.likePost({ userId, postId });

    return likedPost;
  };
}
