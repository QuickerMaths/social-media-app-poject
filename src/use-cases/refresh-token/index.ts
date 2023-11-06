import refreshTokenDb from "../../data-access/refresh-token/index.ts";
import authService from "../../services/auth/index.ts";
import makeVerifyRefreshTokenUseCase from "./verify-refresh-token.use-case.ts";
import makeCreateRefreshTokenUseCase from "./create-refresh-token.use-case.ts";

const verifyRefreshTokenUseCase = makeVerifyRefreshTokenUseCase({
  db: refreshTokenDb,
  auth: authService
});
const createRefreshTokenUseCase = makeCreateRefreshTokenUseCase({
  db: refreshTokenDb,
  auth: authService
});

const refreshTokenUseCase = Object.freeze({
  verifyRefreshTokenUseCase,
  createRefreshTokenUseCase
});

export default refreshTokenUseCase;
