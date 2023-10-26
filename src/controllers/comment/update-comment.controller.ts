import commentUseCase from "../../use-cases/comment/index.ts";

export default function makeUpdateCommentController({
  useCase
}: {
  useCase: typeof commentUseCase.updateCommentUseCase;
}) {
  return async function updateCommentController(httpRequest: any) {
    const commentId = httpRequest.params.commentId;
    const commentUpdateData = httpRequest.body;

    const updatedComment = await useCase({ commentId, commentUpdateData });

    return {
      statusCode: 200,
      body: updatedComment
    };
  };
}
