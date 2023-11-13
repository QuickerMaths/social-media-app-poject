import userDB from "../../data-access/user/index.ts";

export default function makeSendFriendRequestUseCase({
  userDataBase
}: {
  userDataBase: typeof userDB;
}) {
  return async function sendFriendRequestUseCase({
    loggedInUserId,
    responderId
  }: {
    loggedInUserId: number;
    responderId: number;
  }) {
    const request = await userDataBase.sendFriendRequest({
      loggedInUserId,
      responderId
    });

    return request;
  };
}
