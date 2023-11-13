import commentUseCase from "../../use-cases/comment/index.ts";

export default function makeLikeCommentController({
  useCase
}: {
  useCase: typeof commentUseCase.likeCommentUseCase;
}) {
  return async function likeCommentController(httpRequest: any) {
    const loggedInUserId = httpRequest.user.id;
    const commentId = httpRequest.params.commentId;

    const likedComment = await useCase({ userId: loggedInUserId, commentId });

    return {
      statusCode: 200,
      body: likedComment
    };
  };
}
