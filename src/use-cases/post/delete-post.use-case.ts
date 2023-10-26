import postDb from "../../data-access/post/index.ts";

export default function makeDeletePostUseCase({
  post
}: {
  post: typeof postDb;
}) {
  return async function deletePostUseCase({ postId }: { postId: number }) {
    const deletedPost = await post.deletePost({ postId });

    return deletedPost;
  };
}
