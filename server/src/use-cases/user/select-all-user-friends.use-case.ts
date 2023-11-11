import userDB from "../../data-access/user/index.ts";

export default function makeSelectAllUserFriendsUseCase({
  userDataBase
}: {
  userDataBase: typeof userDB;
}) {
  return async function selectAllUserFriendsUseCase({
    userId,
    page,
    pageSize
  }: {
    userId: number;
    page: number;
    pageSize: number;
  }) {
    const selectedUserFriends = await userDataBase.selectAllUserFriends({
      userId,
      page,
      pageSize
    });

    return selectedUserFriends;
  };
}
