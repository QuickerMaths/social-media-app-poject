import refreshTokenDb from "../../data-access/refresh-token/index.ts";
import authService from "../../services/auth/index.ts";

export default function makeVerifyRefreshTokenUseCase({
  db,
  auth
}: {
  db: typeof refreshTokenDb;
  auth: typeof authService;
}) {
  return async function verifyRefreshTokenUseCase({
    requestToken
  }: {
    requestToken: string;
  }) {
    const decodedToken = auth.jwt.decodeToken({ token: requestToken });

    //TODO: custom error
    if (!decodedToken || typeof decodedToken === "string")
      throw new Error("Invalid token");

    const isTokenInDB = await db.selectRefreshTokenByUserId({
      userId: decodedToken.id
    });

    if (!isTokenInDB) throw new Error("Invalid token");
    if (isTokenInDB.token !== requestToken) throw new Error("Invalid token");

    const verificationResult = auth.jwt.verifyRefreshToken({
      token: requestToken
    });

    if (verificationResult instanceof Error) {
      await db.deleteRefreshToken({ token: isTokenInDB.token });
      throw new Error("Invalid refresh token.");
    }
    return {
      accessToken: verificationResult
    };
  };
}
