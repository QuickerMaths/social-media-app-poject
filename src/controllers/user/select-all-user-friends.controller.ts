import userUseCase from "../../use-cases/user/index.ts";

export default function makeSelectAllUserFriendsController({
  useCase
}: {
  useCase: typeof userUseCase.selectAllUserFriendsUseCase;
}) {
  return async function selectAllUserFriendsController(httpRequest: any) {
    const userId = httpRequest.params.userId;
    const { page, pageSize } = httpRequest.query;

    const selectedUserFriends = await useCase({
      userId,
      page: +page || 1,
      pageSize: +pageSize || 10
    });

    return {
      statusCode: 200,
      body: selectedUserFriends
    };
  };
}
