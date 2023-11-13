import userDB from "../../data-access/user/index.ts";

export default function makeAcceptFriendRequestUseCase({
  userDataBase
}: {
  userDataBase: typeof userDB;
}) {
  return async function acceptFriendRequestUseCase({
    loggedInUserId,
    requesterId
  }: {
    loggedInUserId: number;
    requesterId: number;
  }) {
    const request = await userDataBase.updateFriendshipRecord({
      loggedInUserId,
      requesterId
    });

    return request;
  };
}
