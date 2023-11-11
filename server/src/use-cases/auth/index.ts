import authService from "../../services/auth/index.ts";
import userDB from "../../data-access/user/index.ts";
import refreshTokenDb from "../../data-access/refresh-token/index.ts";
import refreshTokenUseCase from "../refresh-token/index.ts";
import makeLoginUseCase from "./login.use-case.ts";
import makeVerifyUseCase from "./verify.use-case.ts";
import makeLogoutUseCase from "./logout.use-case.ts";

const loginUseCase = makeLoginUseCase({
  user: userDB,
  refreshToken: refreshTokenUseCase.createRefreshTokenUseCase,
  auth: authService
});
const verifyUseCase = makeVerifyUseCase({
  auth: authService.jwt
});
const logoutUseCase = makeLogoutUseCase({
  db: refreshTokenDb
});
const authUseCase = Object.freeze({
  loginUseCase,
  verifyUseCase,
  logoutUseCase
});

export default authUseCase;
