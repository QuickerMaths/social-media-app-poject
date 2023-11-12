import userUseCase from "../../use-cases/user/index.ts";

export default function makeSelectAllRequestsController({
  useCase
}: {
  useCase: typeof userUseCase.selectAllRequestsUseCase;
}) {
  return async function selectAllRequestsController(httpRequest: any) {
    const loggedInUserId = httpRequest.user.id;

    const requests = await useCase({ userId: loggedInUserId });

    return {
      statusCode: 200,
      body: requests
    };
  };
}
