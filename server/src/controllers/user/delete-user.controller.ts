import userUseCase from "../../use-cases/user/index.ts";

export default function makeDeleteUserController({
  useCase
}: {
  useCase: typeof userUseCase.deleteUserUseCase;
}) {
  return async function deleteUserController(httpRequest: any) {
    const userId = httpRequest.params.userId;
    const deletedUser = await useCase({ userId });

    return {
      statusCode: 204,
      body: deletedUser
    };
  };
}
