import userUseCase from "../../use-cases/user/index.ts";

export default function makeSelectAllRequestsController({
  useCase
}: {
  useCase: typeof userUseCase.selectAllRequestsUseCase;
}) {
  return async function selectAllRequestsController(httpRequest: any) {
    const loggedInUserId = httpRequest.user.id;
    const { page, pageSize } = httpRequest.query;

    const { requests, meta } = await useCase({
      userId: loggedInUserId,
      page,
      pageSize
    });

    return {
      statusCode: 200,
      body: requests,
      meta
    };
  };
}
