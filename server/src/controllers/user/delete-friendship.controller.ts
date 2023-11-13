import userUseCase from "../../use-cases/user/index.ts";

export default function makeDeleteFriendshipController({
  useCase
}: {
  useCase: typeof userUseCase.deleteFriendshipUseCase;
}) {
  return async function deleteFriendController(httpRequest: any) {
    const loggedInUserId = httpRequest.user.id;
    const requesterId = httpRequest.params.requesterId;

    const result = await useCase({
      loggedInUserId,
      requesterId
    });

    return {
      statusCode: 200,
      body: result
    };
  };
}
