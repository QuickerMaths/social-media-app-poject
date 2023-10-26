import postDb from "../../data-access/post/index.ts";
import { PostCreateDataType } from "../../data-access/post/types.ts";

export default function makeCreatePostUseCase({
  post
}: {
  post: typeof postDb;
}) {
  return async function createPostUseCase({
    postCreateData
  }: {
    postCreateData: PostCreateDataType;
  }) {
    //TODO: validate data
    const createdPost = await post.createPost({ postCreateData });

    return createdPost;
  };
}
