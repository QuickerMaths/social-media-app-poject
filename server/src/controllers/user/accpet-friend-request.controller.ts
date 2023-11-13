import userUseCase from "../../use-cases/user/index.ts";

export default function makeAcceptFriendRequestController({
  useCase
}: {
  useCase: typeof userUseCase.acceptFriendRequestUseCase;
}) {
  return async function acceptFriendRequestController(httpRequest: any) {
    const loggedInUserId = httpRequest.user.id;
    const requesterId = httpRequest.params.requesterId;

    const request = await useCase({ loggedInUserId, requesterId });

    return {
      statusCode: 200,
      body: request
    };
  };
}
