import postUseCase from "../../use-cases/post/index.ts";

export default function makeSelectAllPostsController({
  useCase
}: {
  useCase: typeof postUseCase;
}) {
  return async function selectAllPostsController(httpRequest: any) {
    const { page, pageSize } = httpRequest.query;

    const posts = await useCase.selectAllPosts({
      page: +page || 1,
      pageSize: +pageSize || 10,
      userId: httpRequest.user?.id
    });

    return {
      statusCode: 200,
      body: posts
    };
  };
}
