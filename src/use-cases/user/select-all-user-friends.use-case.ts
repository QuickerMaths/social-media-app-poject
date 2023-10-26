import userDB from "../../data-access/user/index.ts";

export default function makeSelectAllUserFriendsUseCase({
  user
}: {
  user: typeof userDB;
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
    const selectedUserFriends = await user.selectAllUserFriends({
      userId,
      page,
      pageSize
    });

    return selectedUserFriends;
  };
}
