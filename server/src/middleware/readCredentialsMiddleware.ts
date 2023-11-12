import { Request, Response, NextFunction } from "express";
import authService from "../services/auth/index.ts";

const readCredentialsMiddleware =
  (jwt: typeof authService.jwt) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;

    const decodedAccessToken = jwt.verifyToken({
      token: accessToken
    });

    if (decodedAccessToken && decodedAccessToken !== "expired") {
      req.user = decodedAccessToken;
    }

    next();
  };

export default readCredentialsMiddleware(authService.jwt);
