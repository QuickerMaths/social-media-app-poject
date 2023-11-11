import userDB from "../../data-access/user/index.ts";

export default function makeSelectUserByIdUseCase({
  userDataBase
}: {
  userDataBase: typeof userDB;
}) {
  return async function selectUserByIdUseCase({ userId }: { userId: number }) {
    const selectedUser = await userDataBase.selectUserById({ userId });

    return selectedUser;
  };
}
