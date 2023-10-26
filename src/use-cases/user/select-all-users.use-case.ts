import userDB from "../../data-access/user/index.ts";

export default function makeSelectAllUsersUseCase({
  user
}: {
  user: typeof userDB;
}) {
  return async function selectAllUsersUseCase({
    page,
    pageSize
  }: {
    page: number;
    pageSize: number;
  }) {
    const selectedUsers = await user.selectAllUsers({ page, pageSize });

    return selectedUsers;
  };
}
