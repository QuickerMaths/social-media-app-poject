import postUseCase from "../../use-cases/post/index.ts";

export default function makeCreatePostController({
  useCase
}: {
  useCase: typeof postUseCase.createPostUseCase;
}) {
  return async function createPostController(httpRequest: any) {
    const loggedInUserId = httpRequest.user.id;
    const postCreateData = httpRequest.body;

    const createdPost = await useCase({
      userId: loggedInUserId,
      postCreateData
    });

    return {
      statusCode: 201,
      body: createdPost
    };
  };
}
