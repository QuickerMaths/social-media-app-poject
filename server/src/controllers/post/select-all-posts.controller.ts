import postUseCase from "../../use-cases/post/index.ts";

export default function makeSelectAllPostsController({
  useCase
}: {
  useCase: typeof postUseCase.selectAllPostsUseCase;
}) {
  return async function selectAllPostsController(httpRequest: any) {
    const { page, pageSize } = httpRequest.query;
    // is used to check if the user that is logged in has liked any of the posts
    const loggedInUserId = httpRequest?.user?.id;

    const { posts, meta } = await useCase({
      loggedInUserId,
      page: +page || 1,
      pageSize: +pageSize || 10
    });

    return {
      statusCode: 200,
      body: posts,
      meta
    };
  };
}
