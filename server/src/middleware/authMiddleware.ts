import { NextFunction, Request, Response } from "express";
import authService from "../services/auth/index.ts";
import refreshTokenUseCase from "../use-cases/refresh-token/index.ts";
import InvalidTokenError from "../utils/errors/InvalidTokenError.ts";

const authMiddleware =
  (jwt: typeof authService.jwt) =>
  (verifyRefreshToken: typeof refreshTokenUseCase.verifyRefreshTokenUseCase) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken && !refreshToken) {
      next(
        new InvalidTokenError({
          message: "Access token and refresh token are missing",
          operational: true
        })
      );
    }

    const decodedAccessToken = jwt.verifyToken({
      token: accessToken
    });

    if (!decodedAccessToken) {
      next(
        new InvalidTokenError({ message: "Invalid Token", operational: true })
      );
    }

    if (decodedAccessToken === "expired") {
      await verifyRefreshToken({
        requestToken: refreshToken
      })
        .then((newAccessToken) => {
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true
          });
        })
        .catch(next);
    }

    req.user = decodedAccessToken;

    next();
  };

export default authMiddleware(authService.jwt)(
  refreshTokenUseCase.verifyRefreshTokenUseCase
);
