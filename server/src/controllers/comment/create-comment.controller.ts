import commentUseCase from "../../use-cases/comment/index.ts";

export default function makeCreateCommentController({
  useCase
}: {
  useCase: typeof commentUseCase.createCommentUseCase;
}) {
  return async function createCommentController(httpRequest: any) {
    //TODO: get userId from access token and switch in api collection
    const userId = httpRequest.body.userId;
    const commentCreateData = httpRequest.body.commentCreateData;

    const updatedComment = await useCase({ userId, commentCreateData });

    return {
      statusCode: 204,
      body: updatedComment
    };
  };
}
