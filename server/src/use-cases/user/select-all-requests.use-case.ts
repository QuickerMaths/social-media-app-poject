import userDB from "../../data-access/user/index.ts";

export default function makeSelectAllRequestsUseCase({
  userDataBase,
  paginationMetadata
}: {
  userDataBase: typeof userDB;
  paginationMetadata: Function;
}) {
  return async function selectAllRequestsUseCase({
    userId,
    page,
    pageSize
  }: {
    userId: number;
    page: number;
    pageSize: number;
  }) {
    const total = await userDataBase.countAllFriendsRequestByUserId({ userId });
    const meta = paginationMetadata({ total, currentPage: page, pageSize });

    const requests = await userDataBase.selectAllUserRequests({
      userId,
      page,
      pageSize
    });

    return {
      requests,
      meta
    };
  };
}
