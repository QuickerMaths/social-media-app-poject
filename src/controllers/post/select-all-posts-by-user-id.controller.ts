import postUseCase from "../../use-cases/post/index.ts";

export default function makeSelectAllPostsByUserId({
  useCase
}: {
  useCase: typeof postUseCase;
}) {
  return async function selectAllPostsByUserId(httpRequest: any) {
    const { page, pageSize } = httpRequest.query;
    const userId = httpRequest.params?.userId;

    const posts = await useCase.selectAllPostsByUserId({
      page: +page || 1,
      pageSize: +pageSize || 10,
      userId
    });

    return {
      statusCode: 200,
      body: posts
    };
  };
}
