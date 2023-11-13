import userDB from "../../data-access/user/index.ts";

export default function makeDeleteFriendshipUseCase({
  userDataBase
}: {
  userDataBase: typeof userDB;
}) {
  return async function deleteFriendshipUseCase({
    loggedInUserId,
    requesterId
  }: {
    loggedInUserId: number;
    requesterId: number;
  }) {
    const friendship = await userDataBase.deleteFriendshipRecord({
      loggedInUserId,
      requesterId
    });

    return friendship;
  };
}
