import authService from "../../services/auth/index.ts";
import userDB from "../../data-access/user/index.ts";
import { JwtPayload } from "jsonwebtoken";

export default function makeVerifyUseCase({
  auth,
  userDataBase
}: {
  auth: typeof authService.jwt;
  userDataBase: typeof userDB;
}) {
  return async function verifyUseCase({
    requestAccessToken
  }: {
    requestAccessToken: string;
  }) {
    const decodedUser = auth.decodeToken({ token: requestAccessToken });

    //TODO: custom error
    if (!decodedUser) {
      throw new Error("Invalid Token");
    }

    const user = await userDataBase.selectUserById({
      userId: (decodedUser as JwtPayload).id
    });

    return user;
  };
}
