import userUseCase from "../../use-cases/user/index.ts";

export default function makeSelectUserByIdController({
  useCase
}: {
  useCase: typeof userUseCase.selectUserByIdUseCase;
}) {
  return async function selectUserByIdController(httpRequest: any) {
    const userId = httpRequest.params.userId;
    const loggedInUserId = httpRequest.user?.id;

    const selectedUser = await useCase({ userId, loggedInUserId });

    return {
      statusCode: 200,
      body: selectedUser
    };
  };
}
