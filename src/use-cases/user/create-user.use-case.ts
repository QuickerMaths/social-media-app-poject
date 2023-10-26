import userDB from "../../data-access/user/index.ts";
import { UserCreateDataType } from "../../data-access/user/types.ts";

export default function makeCreateUserUseCase({
  user
}: {
  user: typeof userDB;
}) {
  return async function createUserUseCse({
    userCreateData
  }: {
    userCreateData: UserCreateDataType;
  }) {
    const existingUser = await user.selectUserByEmail({
      email: userCreateData.email
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    //TODO: validation
    //TODO: hash password
    const createdUser = await user.createUser({ userCreateData });

    return createdUser;
  };
}
