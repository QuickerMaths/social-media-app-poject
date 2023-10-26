import postUseCase from "../../use-cases/post/index.ts";

export default function makeDeletePostController({
  useCase
}: {
  useCase: typeof postUseCase.deletePostUseCase;
}) {
  return async function deletePostController(httpRequest: any) {
    const postId = httpRequest.params.postId;

    const deletedPost = await useCase({ postId });

    return {
      statusCode: 204,
      body: deletedPost
    };
  };
}
