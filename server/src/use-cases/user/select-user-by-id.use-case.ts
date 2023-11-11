import userDB from "../../data-access/user/index.ts";

export default function makeSelectUserByIdUseCase({
  userDataBase
}: {
  userDataBase: typeof userDB;
}) {
  return async function selectUserByIdUseCase({
    userId,
    loggedInUserId
  }: {
    userId: number;
    loggedInUserId?: number;
  }) {
    const selectedUser = await userDataBase.selectUserById({
      userId,
      loggedInUserId
    });

    return selectedUser;
  };
}
