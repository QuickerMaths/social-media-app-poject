import refreshTokenDb from "../../data-access/refresh-token/index.ts";
import authService from "../../services/auth/index.ts";
import InvalidTokenError from "../../utils/errors/InvalidTokenError.ts";

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

    if (!decodedToken || typeof decodedToken === "string")
      throw new InvalidTokenError({
        message: "Invalid token",
        operational: true
      });

    const isTokenInDB = await db.selectRefreshTokenByUserId({
      userId: decodedToken.id
    });

    if (!isTokenInDB || isTokenInDB.token !== requestToken) {
      throw new InvalidTokenError({
        message: "Invalid token",
        operational: true
      });
    }

    const verificationResult = auth.jwt.verifyRefreshToken({
      token: requestToken
    });

    console.log(verificationResult);

    if (verificationResult instanceof InvalidTokenError) {
      await db.deleteRefreshToken({ token: isTokenInDB.token });
      throw new InvalidTokenError({
        message: "Invalid token",
        operational: true
      });
    }
    return {
      accessToken: verificationResult
    };
  };
}
