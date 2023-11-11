import userDB from "../../data-access/user/index.ts";

export default function makeDeleteUserUseCase({
  userDataBase
}: {
  userDataBase: typeof userDB;
}) {
  return async function deleteUserUseCase({ userId }: { userId: number }) {
    const deletedUser = await userDataBase.deleteUser({ userId });

    return deletedUser;
  };
}
