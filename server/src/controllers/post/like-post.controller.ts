import postUseCase from "../../use-cases/post/index.ts";

export default function makeLikePostController({
  useCase
}: {
  useCase: typeof postUseCase.likePostUseCase;
}) {
  return async function likePostController(httpRequest: any) {
    const postId = httpRequest.params.postId;
    const loggedInUserId = httpRequest.user.id;

    const likedPost = await useCase({ postId, userId: loggedInUserId });

    return {
      statusCode: 200,
      body: likedPost
    };
  };
}
