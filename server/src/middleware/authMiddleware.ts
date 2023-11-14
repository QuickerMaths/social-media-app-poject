import { NextFunction, Request, Response } from "express";
import authService from "../services/auth/index.ts";
import refreshTokenUseCase from "../use-cases/refresh-token/index.ts";

const authMiddleware =
  (jwt: typeof authService.jwt) =>
  (verifyRefreshToken: typeof refreshTokenUseCase.verifyRefreshTokenUseCase) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken } = req.cookies;

    //TODO: custom error
    if (!accessToken && !refreshToken) {
      next(new Error("Access token and refresh token are missing"));
    }

    const decodedAccessToken = jwt.verifyToken({
      token: accessToken
    });

    if (!decodedAccessToken) {
      next(new Error("InvalidToken"));
    }

    if (decodedAccessToken === "expired") {
      await verifyRefreshToken({
        requestToken: refreshToken
      })
        .then((newAccessToken) =>
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true
          })
        )
        .catch(next);
    }

    req.user = decodedAccessToken;

    next();
  };

export default authMiddleware(authService.jwt)(
  refreshTokenUseCase.verifyRefreshTokenUseCase
);
