import commentUseCase from "../../use-cases/comment/index.ts";

export default function makeCreateCommentController({
  useCase
}: {
  useCase: typeof commentUseCase.createCommentUseCase;
}) {
  return async function createCommentController(httpRequest: any) {
    const loggedInUserId = httpRequest.user.id;
    const commentCreateData = httpRequest.body;

    const createdComment = await useCase({
      userId: loggedInUserId,
      commentCreateData
    });

    return {
      statusCode: 201,
      body: createdComment
    };
  };
}
