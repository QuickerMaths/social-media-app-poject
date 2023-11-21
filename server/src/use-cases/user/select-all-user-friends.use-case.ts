import userDB from "../../data-access/user/index.ts";

export default function makeSelectAllUserFriendsUseCase({
  userDataBase,
  paginationMetadata
}: {
  userDataBase: typeof userDB;
  paginationMetadata: Function;
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
    const total = await userDataBase.countAllUserFriends({ userId });

    const meta = paginationMetadata({ currentPage: page, pageSize, total });

    const selectedUserFriends = await userDataBase.selectAllUserFriends({
      userId,
      page,
      pageSize
    });

    return { selectedUserFriends, meta };
  };
}
