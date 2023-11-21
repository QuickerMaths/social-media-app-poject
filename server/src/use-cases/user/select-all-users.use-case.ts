import userDB from "../../data-access/user/index.ts";

export default function makeSelectAllUsersUseCase({
  userDataBase,
  paginationMetadata
}: {
  userDataBase: typeof userDB;
  paginationMetadata: Function;
}) {
  return async function selectAllUsersUseCase({
    page,
    pageSize
  }: {
    page: number;
    pageSize: number;
  }) {
    const total = await userDataBase.countAllUsers();
    const meta = paginationMetadata({ total, currentPage: page, pageSize });

    const selectedUsers = await userDataBase.selectAllUsers({ page, pageSize });

    return { selectedUsers, meta };
  };
}
