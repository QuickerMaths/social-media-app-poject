import userDB from "../../data-access/user/index.ts";
import refreshTokenUseCase from "../refresh-token/index.ts";
import authService from "../../services/auth/index.ts";

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
    //TODO: custom error
    if (!userFound) {
      throw new Error("User not found");
    }

    console.log(userFound);

    const isPasswordValid = auth.hash.compare({
      password,
      hashedPassword: userFound.password
    });
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const payload = {
      id: userFound.id,
      username: userFound.username,
      email: userFound.email
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
