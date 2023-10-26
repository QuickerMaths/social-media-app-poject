import userDB from "../../data-access/user/index.ts";
import { UserUpdateDataType } from "../../data-access/user/types.ts";

export default function makeUpdateUserUseCase({
  user
}: {
  user: typeof userDB;
}) {
  return async function updateUserUseCase({
    userId,
    userUpdateData
  }: {
    userId: number;
    userUpdateData: UserUpdateDataType;
  }) {
    const updatedUser = await user.updateUser({ userId, userUpdateData });

    return updatedUser;
  };
}
