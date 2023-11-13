import userUseCase from "../../use-cases/user/index.ts";

export default function makeRejectFriendRequestController({
  useCase
}: {
  useCase: typeof userUseCase.rejectFriendRequestUseCase;
}) {
  return async function rejectFriendRequestController(httpRequest: any) {
    const loggedInUserId = httpRequest.user.id;
    const requesterId = httpRequest.params.requesterId;

    const request = await useCase({ loggedInUserId, requesterId });

    return {
      statusCode: 200,
      body: request
    };
  };
}
