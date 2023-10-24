import postUseCase from "../../use-cases/post/index.ts";

export default function makeSelectPostByIdController({
  useCase
}: {
  useCase: typeof postUseCase.selectPostByIdUseCase;
}) {
  return async function selectPostByIdController(httpRequest: any) {
    const { page, pageSize } = httpRequest.query;
    const postId = httpRequest.params?.postId;
    // is used to check if the user that is logged in has liked the post
    const loggedInUserId = httpRequest?.user?.id;

    const post = await useCase({
      loggedInUserId,
      postId,
      page: +page || 1,
      pageSize: +pageSize || 10
    });

    return {
      statusCode: 200,
      body: post
    };
  };
}
