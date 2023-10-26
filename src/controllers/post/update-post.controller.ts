import postUseCase from "../../use-cases/post/index.ts";

export default function makeUpdatePostController({
  useCase
}: {
  useCase: typeof postUseCase.updatePostUseCase;
}) {
  return async function updatePostController(httpRequest: any) {
    const postUpdateData = httpRequest.body;
    const postId = httpRequest.params.postId;

    const updatedPost = await useCase({ postId, postUpdateData });

    return {
      statusCode: 200,
      body: updatedPost
    };
  };
}
