import userDB from "../../data-access/user/index.ts";
import { UserUpdateDataType } from "../../data-access/user/types.ts";

export default function makeUpdateUserUseCase({
  userDataBase
}: {
  userDataBase: typeof userDB;
}) {
  return async function updateUserUseCase({
    userId,
    userUpdateData
  }: {
    userId: number;
    userUpdateData: UserUpdateDataType;
  }) {
    const updatedUser = await userDataBase.updateUser({
      userId,
      userUpdateData
    });

    return updatedUser;
  };
}
