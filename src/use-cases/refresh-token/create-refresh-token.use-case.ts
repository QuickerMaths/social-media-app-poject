import refreshTokenDb from "../../data-access/refresh-token/index.ts";
import authService from "../../services/auth/index.ts";
import { ITokenPayload } from "../../services/auth/types.ts";

export default function makeCreateRefreshTokenUseCase({
  db,
  auth
}: {
  db: typeof refreshTokenDb;
  auth: typeof authService;
}) {
  return async function createRefreshTokenUseCase({
    payload
  }: {
    payload: ITokenPayload;
  }) {
    const token = auth.jwtService().generateRefreshToken({ payload });

    const refreshToken = await db.createRefreshToken({
      token,
      userId: payload.id
    });

    return refreshToken;
  };
}
