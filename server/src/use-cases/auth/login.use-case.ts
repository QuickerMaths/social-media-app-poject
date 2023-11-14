import userDB from "../../data-access/user/index.ts";
import refreshTokenUseCase from "../refresh-token/index.ts";
import authService from "../../services/auth/index.ts";
import UnauthorizedError from "../../utils/errors/UnauthorizedError.ts";

export default function makeLoginUseCase({
  user,
  refreshToken,
  auth
}: {
  user: typeof userDB;
  refreshToken: typeof refreshTokenUseCase.createRefreshTokenUseCase;
  auth: typeof authService;
}) {
  return async function loginUseCase({
    email,
    password
  }: {
    email: string;
    password: string;
  }) {
    const userFound = await user.selectUserByEmail({ email });
    if (!userFound) {
      throw new UnauthorizedError({
        message: "User not found",
        operational: true
      });
    }

    const isPasswordValid = auth.hash.compare({
      password,
      hashedPassword: userFound.password
    });

    if (!isPasswordValid) {
      throw new UnauthorizedError({
        message: "Invalid password",
        operational: true
      });
    }

    const { id, username, email: userEmail, friend_request_count } = userFound;

    const payload = {
      id,
      username,
      email: userEmail,
      friend_request_count
    };

    const accessToken = auth.jwt.generateToken({
      payload
    });
    const newRefreshToken = await refreshToken({ payload });

    return {
      accessToken,
      refreshToken: newRefreshToken.token,
      user: userFound
    };
  };
}
