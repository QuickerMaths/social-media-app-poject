import postDb from "../../data-access/post/index.ts";
import { PostUpdateDataType } from "../../data-access/post/types.ts";

export default function makeUpdatePostUseCase({
  post
}: {
  post: typeof postDb;
}) {
  return async function updatePostUseCase({
    postId,
    postUpdateData
  }: {
    postId: number;
    postUpdateData: PostUpdateDataType;
  }) {
    //TODO: validate data
    const updatedPost = await post.updatePost({ postId, postUpdateData });

    return updatedPost;
  };
}
