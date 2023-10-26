import postUseCase from "../../use-cases/post/index.ts";

export default function makeCreatePostController({
  useCase
}: {
  useCase: typeof postUseCase.createPostUseCase;
}) {
  return async function createPostController(httpRequest: any) {
    const userId = httpRequest.body.userId;
    const postCreateData = httpRequest.body.postCreateData;

    const createdPost = await useCase({ userId, postCreateData });

    return {
      statusCode: 201,
      body: createdPost
    };
  };
}
