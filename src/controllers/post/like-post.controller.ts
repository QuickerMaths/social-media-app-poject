import postUseCase from "../../use-cases/post/index.ts";

export default function makeLikePostController({
  useCase
}: {
  useCase: typeof postUseCase.likePostUseCase;
}) {
  return async function likePostController(httpRequest: any) {
    const postId = httpRequest.params.postId;
    //TODO: get userId from access token and switch in api collection
    const userId = httpRequest.body.userId;

    const likedPost = await useCase({ postId, userId });

    return {
      statusCode: 200,
      body: likedPost
    };
  };
}
