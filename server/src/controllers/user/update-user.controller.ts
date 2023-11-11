import userUseCase from "../../use-cases/user/index.ts";

export default function makeUpdateUserController({
  useCase
}: {
  useCase: typeof userUseCase.updateUserUseCase;
}) {
  return async function updateUserController(httpRequest: any) {
    const userId = httpRequest.params.userId;
    const userUpdateData = httpRequest.body;

    const updatedUser = await useCase({ userId, userUpdateData });

    return {
      statusCode: 200,
      body: updatedUser
    };
  };
}
