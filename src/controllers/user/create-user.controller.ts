import userUseCase from "../../use-cases/user/index.ts";

export default function makeCreateUserController({
  useCase
}: {
  useCase: typeof userUseCase.createUserUseCase;
}) {
  return async function createUserController(httpRequest: any) {
    const userCreateData = httpRequest.body;

    const createdUser = await useCase({ userCreateData });

    return {
      statusCode: 201,
      body: createdUser
    };
  };
}
