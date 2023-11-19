import postUseCase from "../../use-cases/post/index.ts";

export default function makeSelectAllPostsByUserIdController({
  useCase
}: {
  useCase: typeof postUseCase.selectAllPostsByUserIdUseCase;
}) {
  return async function selectAllPostsByUserIdController(httpRequest: any) {
    const { page, pageSize } = httpRequest.query;
    // is used to fetch posts created by a specific user
    const userId = httpRequest.params.userId;
    // is used to check if the user that is logged in has liked any of the posts
    const loggedInUserId = httpRequest?.user?.id;

    const { posts, meta } = await useCase({
      page: +page || 1,
      pageSize: +pageSize || 10,
      userId,
      loggedInUserId
    });

    return {
      statusCode: 200,
      body: posts,
      meta
    };
  };
}
