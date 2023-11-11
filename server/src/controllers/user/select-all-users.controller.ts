import userUseCase from "../../use-cases/user/index.ts";

export default function makeSelectAllUsersController({
  useCase
}: {
  useCase: typeof userUseCase.selectAllUsersUseCase;
}) {
  return async function selectAllUsersController(httpRequest: any) {
    const { page, pageSize } = httpRequest.query;

    const selectedUsers = await useCase({
      page: +page || 1,
      pageSize: +pageSize || 10
    });

    return {
      statusCode: 200,
      body: selectedUsers
    };
  };
}
