import userDB from "../../data-access/user/index.ts";

export default function makeRejectFriendRequestUseCase({
  userDataBase
}: {
  userDataBase: typeof userDB;
}) {
  return async function rejectFriendRequestUseCase({
    loggedInUserId,
    requesterId
  }: {
    loggedInUserId: number;
    requesterId: number;
  }) {
    const result = await userDataBase.rejectFriendRequest({
      loggedInUserId,
      requesterId
    });

    return result;
  };
}
