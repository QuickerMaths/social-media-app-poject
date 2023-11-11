import authUseCase from "../../use-cases/auth/index.ts";
import makeLoginController from "./login.controller.ts";
import makeLogoutController from "./logout.controller.ts";
import makeVerifyController from "./verify.controller.ts";

const loginController = makeLoginController({
  useCase: authUseCase.loginUseCase
});
const verifyController = makeVerifyController({
  useCase: authUseCase.verifyUseCase
});
const logoutController = makeLogoutController({
  useCase: authUseCase.logoutUseCase
});

const authController = Object.freeze({
  loginController,
  verifyController,
  logoutController
});

export default authController;
