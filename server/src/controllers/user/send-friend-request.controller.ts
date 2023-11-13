import userUseCase from "../../use-cases/user/index.ts";

export default function makeSendFriendRequestController({
  useCase
}: {
  useCase: typeof userUseCase.sendFriendRequestUseCase;
}) {
  return async function sendFriendRequestController(httpRequest: any) {
    const loggedInUserId = httpRequest.user.id;
    const responderId = httpRequest.params.responderId;

    const result = await useCase({ loggedInUserId, responderId });

    return {
      statusCode: 200,
      body: result
    };
  };
}
