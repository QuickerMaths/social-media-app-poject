import userDB from "../../data-access/user/index.ts";

export default function makeSelectAllRequestsUseCase({
  userDataBase
}: {
  userDataBase: typeof userDB;
}) {
  return async function selectAllRequestsUseCase({
    userId
  }: {
    userId: number;
  }) {
    const result = await userDataBase.selectAllUserRequests({ userId });

    return result;
  };
}
