import userDB from "../../data-access/user/index.ts";

export default function makeDeleteUserUseCase({
  user
}: {
  user: typeof userDB;
}) {
  return async function deleteUserUseCase({ userId }: { userId: number }) {
    const deletedUser = await user.deleteUser({ userId });

    return deletedUser;
  };
}
