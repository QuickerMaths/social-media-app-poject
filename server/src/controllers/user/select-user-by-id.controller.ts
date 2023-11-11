import userUseCase from "../../use-cases/user/index.ts";

export default function makeSelectUserByIdController({
  useCase
}: {
  useCase: typeof userUseCase.selectUserByIdUseCase;
}) {
  return async function selectUserByIdController(httpRequest: any) {
    const userId = httpRequest.params.userId;
    const id = httpRequest?.user?.id;

    const selectedUser = await useCase({ userId, loggedInUserId: id });

    return {
      statusCode: 200,
      body: selectedUser
    };
  };
}
