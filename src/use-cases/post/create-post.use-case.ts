import postDb from "../../data-access/post/index.ts";
import { PostCreateDataType } from "../../data-access/post/types.ts";

export default function makeCreatePostUseCase({
  post
}: {
  post: typeof postDb;
}) {
  return async function createPostUseCase({
    userId,
    postCreateData
  }: {
    userId: number;
    postCreateData: PostCreateDataType;
  }) {
    //TODO: validate data
    const createdPost = await post.createPost({ userId, postCreateData });

    return createdPost;
  };
}
