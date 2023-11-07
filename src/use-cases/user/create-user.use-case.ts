import userDB from "../../data-access/user/index.ts";
import { UserCreateDataType } from "../../data-access/user/types.ts";
import authService from "../../services/auth/index.ts";

export default function makeCreateUserUseCase({
  userDataBase,
  hash
}: {
  userDataBase: typeof userDB;
  hash: typeof authService.hash;
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
    const hashedPassword = await hash.encrypt({
      password: userCreateData.password
    });

    const createdUser = await userDataBase.createUser({
      userCreateData: {
        ...userCreateData,
        password: hashedPassword
      }
    });

    return createdUser;
  };
}
