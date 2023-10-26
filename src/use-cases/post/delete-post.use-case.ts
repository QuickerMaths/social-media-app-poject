import postDb from "../../data-access/post/index.ts";

export default function makeDeletePostUseCase({
  postDataBase
}: {
  postDataBase: typeof postDb;
}) {
  return async function deletePostUseCase({ postId }: { postId: number }) {
    const deletedPost = await postDataBase.deletePost({ postId });

    return deletedPost;
  };
}
