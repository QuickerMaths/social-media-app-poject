import commentUseCase from "../../use-cases/comment/index.ts";

export default function makeLikeCommentController({
  useCase
}: {
  useCase: typeof commentUseCase.likeCommentUseCase;
}) {
  return async function likeCommentController(httpRequest: any) {
    //TODO: get userId from access token and switch in api collection
    const userId = httpRequest.body.userId;
    const commentId = httpRequest.params.commentId;

    const likedComment = await useCase({ userId, commentId });

    return {
      statusCode: 200,
      body: likedComment
    };
  };
}
