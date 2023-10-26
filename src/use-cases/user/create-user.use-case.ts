import userDB from "../../data-access/user/index.ts";
import { UserCreateDataType } from "../../data-access/user/types.ts";

export default function makeCreateUserUseCase({
  userDataBase
}: {
  userDataBase: typeof userDB;
}) {
  return async function createUserUseCse({
    userCreateData
  }: {
    userCreateData: UserCreateDataType;
  }) {
    const existingUser = await userDataBase.selectUserByEmail({
      email: userCreateData.email
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    //TODO: validation
    //TODO: hash password
    const createdUser = await userDataBase.createUser({ userCreateData });

    return createdUser;
  };
}
