import userDB from "../../data-access/user/index.ts";

export default function makeSelectUserByIdUseCase({
  user
}: {
  user: typeof userDB;
}) {
  return async function selectUserByIdUseCase({ userId }: { userId: number }) {
    const selectedUser = await user.selectUserById({ userId });

    return selectedUser;
  };
}
