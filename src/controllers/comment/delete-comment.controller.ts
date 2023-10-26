import commentUseCase from "../../use-cases/comment/index.ts";

export default function makeDeleteCommentController({
  useCase
}: {
  useCase: typeof commentUseCase.deleteCommentUseCase;
}) {
  return async function deleteCommentController(httpRequest: any) {
    const commentId = httpRequest.params.commentId;

    const deletedComment = await useCase({ commentId });

    return {
      statusCode: 204,
      body: deletedComment
    };
  };
}
