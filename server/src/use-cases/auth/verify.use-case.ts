import authService from "../../services/auth/index.ts";
import userDB from "../../data-access/user/index.ts";
import { JwtPayload } from "jsonwebtoken";
import InvalidTokenError from "../../utils/errors/InvalidTokenError.ts";

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

    if (!decodedUser) {
      throw new InvalidTokenError({
        message: "Invalid Token",
        operational: true
      });
    }

    const user = await userDataBase.selectUserById({
      userId: (decodedUser as JwtPayload).id
    });

    return user;
  };
}
