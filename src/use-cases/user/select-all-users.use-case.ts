import userDB from "../../data-access/user/index.ts";

export default function makeSelectAllUsersUseCase({
  userDataBase
}: {
  userDataBase: typeof userDB;
}) {
  return async function selectAllUsersUseCase({
    page,
    pageSize
  }: {
    page: number;
    pageSize: number;
  }) {
    const selectedUsers = await userDataBase.selectAllUsers({ page, pageSize });

    return selectedUsers;
  };
}
